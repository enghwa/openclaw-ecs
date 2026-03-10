import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { OpenClawAppConfig } from '../config/app-config';
import { OpenClawServiceConstruct } from '../constructs/ecs-service';
import { ExecAccessConstruct } from '../constructs/exec-access';
import { ImportedSecrets } from '../constructs/secrets';

export interface ComputeStackProps extends cdk.StackProps {
  readonly config: OpenClawAppConfig;
  readonly vpc: ec2.IVpc;
  readonly serviceSecurityGroup: ec2.ISecurityGroup;
  readonly snapshotBucket: s3.IBucket;
  readonly importedSecrets: ImportedSecrets;
  readonly applicationLogGroup: logs.ILogGroup;
  readonly chromiumLogGroup: logs.ILogGroup;
  readonly execLogGroup: logs.ILogGroup;
  readonly executeCommandLogGroup: logs.ILogGroup;
}

export class ComputeStack extends cdk.Stack {
  public readonly cluster: ecs.Cluster;
  public readonly service: ecs.FargateService;

  constructor(scope: Construct, id: string, props: ComputeStackProps) {
    super(scope, id, props);

    const execAccess = new ExecAccessConstruct(this, 'ExecAccess', {
      executeCommandLogGroup: props.executeCommandLogGroup,
    });

    this.cluster = new ecs.Cluster(this, 'Cluster', {
      vpc: props.vpc,
      containerInsightsV2: ecs.ContainerInsights.ENABLED,
      executeCommandConfiguration: execAccess.executeCommandConfiguration,
    });

    const openclawService = new OpenClawServiceConstruct(this, 'OpenClawService', {
      config: props.config,
      cluster: this.cluster,
      vpc: props.vpc,
      serviceSecurityGroup: props.serviceSecurityGroup,
      snapshotBucket: props.snapshotBucket,
      importedSecrets: props.importedSecrets,
      applicationLogGroup: props.applicationLogGroup,
      chromiumLogGroup: props.chromiumLogGroup,
      execLogGroup: props.execLogGroup,
    });

    props.snapshotBucket.grantReadWrite(openclawService.taskRole);
    execAccess.grantTaskRole(openclawService.taskRole);

    this.service = openclawService.service;

    new cdk.CfnOutput(this, 'ClusterName', {
      value: this.cluster.clusterName,
    });

    new cdk.CfnOutput(this, 'ServiceName', {
      value: this.service.serviceName,
    });

    applyTags(this, props.config);
  }
}

function applyTags(stack: cdk.Stack, config: OpenClawAppConfig): void {
  Object.entries(config.tags).forEach(([key, value]) => {
    cdk.Tags.of(stack).add(key, value);
  });
}

