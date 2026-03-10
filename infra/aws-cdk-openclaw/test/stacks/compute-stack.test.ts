import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { defaultConfig } from '../../lib/config/app-config';
import { ComputeStack } from '../../lib/stacks/compute-stack';
import { DataStack } from '../../lib/stacks/data-stack';
import { NetworkStack } from '../../lib/stacks/network-stack';

describe('ComputeStack', () => {
  test('creates a single-instance Fargate service with ECS Exec enabled', () => {
    const app = new cdk.App();
    const network = new NetworkStack(app, 'TestNetwork', {
      config: defaultConfig,
    });
    const data = new DataStack(app, 'TestData', {
      config: defaultConfig,
    });
    const stack = new ComputeStack(app, 'TestCompute', {
      config: defaultConfig,
      vpc: network.vpc,
      serviceSecurityGroup: network.serviceSecurityGroup,
      snapshotBucket: data.snapshotBucket,
      importedSecrets: data.importedSecrets,
      applicationLogGroup: data.applicationLogGroup,
      chromiumLogGroup: data.chromiumLogGroup,
      execLogGroup: data.execLogGroup,
      executeCommandLogGroup: data.executeCommandLogGroup,
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::ECS::TaskDefinition', {
      Cpu: `${defaultConfig.task.cpu}`,
      Memory: `${defaultConfig.task.memoryMiB}`,
      EphemeralStorage: {
        SizeInGiB: defaultConfig.task.ephemeralStorageGiB,
      },
      ContainerDefinitions: Match.arrayWith([
        Match.objectLike({
          Name: 'main',
          PortMappings: Match.arrayWith([
            Match.objectLike({
              ContainerPort: defaultConfig.port,
            }),
          ]),
        }),
        Match.objectLike({
          Name: 'chromium',
        }),
        Match.objectLike({
          Name: 'exec-tunnel',
        }),
      ]),
    });

    template.hasResourceProperties('AWS::ECS::Service', {
      DesiredCount: 1,
      EnableExecuteCommand: true,
      DeploymentConfiguration: Match.objectLike({
        MaximumPercent: 100,
        MinimumHealthyPercent: 0,
      }),
    });
  });
});

