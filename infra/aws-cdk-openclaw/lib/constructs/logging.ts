import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { OpenClawAppConfig } from '../config/app-config';

export interface LoggingConstructProps {
  readonly config: OpenClawAppConfig;
}

export class LoggingConstruct extends Construct {
  public readonly applicationLogGroup: logs.LogGroup;
  public readonly chromiumLogGroup: logs.LogGroup;
  public readonly execLogGroup: logs.LogGroup;
  public readonly executeCommandLogGroup: logs.LogGroup;

  constructor(scope: Construct, id: string, props: LoggingConstructProps) {
    super(scope, id);

    this.applicationLogGroup = this.createGroup('ApplicationLogGroup', '/aws/ecs/openclaw/main', props.config.logRetention);
    this.chromiumLogGroup = this.createGroup('ChromiumLogGroup', '/aws/ecs/openclaw/chromium', props.config.logRetention);
    this.execLogGroup = this.createGroup('ExecTunnelLogGroup', '/aws/ecs/openclaw/exec-tunnel', props.config.logRetention);
    this.executeCommandLogGroup = this.createGroup('ExecuteCommandLogGroup', '/aws/ecs/openclaw/execute-command', props.config.logRetention);
  }

  private createGroup(id: string, name: string, retention: logs.RetentionDays): logs.LogGroup {
    return new logs.LogGroup(this, id, {
      logGroupName: name,
      retention,
    });
  }
}

