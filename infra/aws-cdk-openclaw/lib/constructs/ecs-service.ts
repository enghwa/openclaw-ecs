import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import { OpenClawAppConfig } from '../config/app-config';
import { ImportedSecrets, toEcsSecrets } from './secrets';

export interface OpenClawServiceConstructProps {
  readonly config: OpenClawAppConfig;
  readonly cluster: ecs.ICluster;
  readonly vpc: ec2.IVpc;
  readonly serviceSecurityGroup: ec2.ISecurityGroup;
  readonly snapshotBucket: s3.IBucket;
  readonly importedSecrets: ImportedSecrets;
  readonly applicationLogGroup: logs.ILogGroup;
  readonly chromiumLogGroup: logs.ILogGroup;
  readonly execLogGroup: logs.ILogGroup;
}

export class OpenClawServiceConstruct extends Construct {
  public readonly taskDefinition: ecs.FargateTaskDefinition;
  public readonly service: ecs.FargateService;
  public readonly taskRole: iam.IRole;

  constructor(scope: Construct, id: string, props: OpenClawServiceConstructProps) {
    super(scope, id);

    this.taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDefinition', {
      cpu: props.config.task.cpu,
      memoryLimitMiB: props.config.task.memoryMiB,
      ephemeralStorageGiB: props.config.task.ephemeralStorageGiB,
      runtimePlatform: {
        operatingSystemFamily: ecs.OperatingSystemFamily.LINUX,
        cpuArchitecture: ecs.CpuArchitecture.X86_64,
      },
    });

    this.taskRole = this.taskDefinition.taskRole;
    const bootstrapAssetPath = path.resolve(__dirname, '../../../../images/openclaw-bootstrap');

    const mainContainer = this.taskDefinition.addContainer('OpenClawMain', {
      containerName: 'main',
      image: ecs.ContainerImage.fromAsset(bootstrapAssetPath, {
        buildArgs: {
          OPENCLAW_IMAGE: props.config.images.mainBaseImage,
        },
      }),
      memoryReservationMiB: 1024,
      logging: ecs.LogDrivers.awsLogs({
        logGroup: props.applicationLogGroup,
        streamPrefix: 'main',
      }),
      essential: true,
      environment: {
        OPENCLAW_GATEWAY_PORT: `${props.config.port}`,
        OPENCLAW_GATEWAY_BIND: 'lan',
        OPENCLAW_CHROMIUM_CDP_URL: `http://127.0.0.1:${props.config.chromiumPort}`,
        OPENCLAW_STATE_DIR: '/home/node/.openclaw',
        OPENCLAW_SNAPSHOT_BUCKET: props.snapshotBucket.bucketName,
        OPENCLAW_SNAPSHOT_KEY: `${props.config.snapshotPrefix}/latest.tgz`,
      },
      secrets: toEcsSecrets(props.importedSecrets),
      command: [
        'node',
        'dist/index.js',
        'gateway',
        '--bind',
        'lan',
        '--port',
        `${props.config.port}`,
      ],
      portMappings: [
        {
          containerPort: props.config.port,
          protocol: ecs.Protocol.TCP,
        },
      ],
      stopTimeout: Duration.seconds(120),
    });

    mainContainer.addUlimits({
      name: ecs.UlimitName.NOFILE,
      softLimit: 65535,
      hardLimit: 65535,
    });

    this.taskDefinition.addContainer('Chromium', {
      containerName: 'chromium',
      image: ecs.ContainerImage.fromRegistry(props.config.images.chromiumImage),
      memoryReservationMiB: 384,
      logging: ecs.LogDrivers.awsLogs({
        logGroup: props.chromiumLogGroup,
        streamPrefix: 'chromium',
      }),
      essential: true,
      environment: {
        XDG_CACHE_HOME: '/tmp',
      },
      portMappings: [
        {
          containerPort: props.config.chromiumPort,
          protocol: ecs.Protocol.TCP,
        },
      ],
    });

    this.taskDefinition.addContainer('ExecTunnel', {
      containerName: 'exec-tunnel',
      image: ecs.ContainerImage.fromRegistry(props.config.images.execTunnelImage),
      memoryReservationMiB: 128,
      logging: ecs.LogDrivers.awsLogs({
        logGroup: props.execLogGroup,
        streamPrefix: 'exec-tunnel',
      }),
      essential: true,
      command: [
        'sleep',
        'infinity',
      ],
    });

    this.service = new ecs.FargateService(this, 'Service', {
      cluster: props.cluster,
      taskDefinition: this.taskDefinition,
      desiredCount: 1,
      assignPublicIp: false,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      securityGroups: [props.serviceSecurityGroup],
      enableExecuteCommand: true,
      circuitBreaker: {
        rollback: true,
      },
      minHealthyPercent: 0,
      maxHealthyPercent: 100,
      platformVersion: ecs.FargatePlatformVersion.LATEST,
    });
  }
}
