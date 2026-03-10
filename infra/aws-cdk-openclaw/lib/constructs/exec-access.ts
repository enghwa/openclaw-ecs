import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export interface ExecAccessConstructProps {
  readonly executeCommandLogGroup: logs.ILogGroup;
}

export class ExecAccessConstruct extends Construct {
  public readonly executeCommandConfiguration: ecs.ExecuteCommandConfiguration;

  constructor(scope: Construct, id: string, props: ExecAccessConstructProps) {
    super(scope, id);

    this.executeCommandConfiguration = {
      logging: ecs.ExecuteCommandLogging.OVERRIDE,
      logConfiguration: {
        cloudWatchLogGroup: props.executeCommandLogGroup,
        cloudWatchEncryptionEnabled: false,
      },
    };
  }

  public grantTaskRole(role: iam.IRole): void {
    role.addToPrincipalPolicy(new iam.PolicyStatement({
      actions: [
        'ssmmessages:CreateControlChannel',
        'ssmmessages:CreateDataChannel',
        'ssmmessages:OpenControlChannel',
        'ssmmessages:OpenDataChannel',
      ],
      resources: ['*'],
    }));
  }
}

