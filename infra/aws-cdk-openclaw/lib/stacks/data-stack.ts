import * as cdk from 'aws-cdk-lib';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { OpenClawAppConfig } from '../config/app-config';
import { LoggingConstruct } from '../constructs/logging';
import { ImportedSecrets, SecretsConstruct } from '../constructs/secrets';
import { SnapshotBucketConstruct } from '../constructs/s3-snapshot';

export interface DataStackProps extends cdk.StackProps {
  readonly config: OpenClawAppConfig;
}

export class DataStack extends cdk.Stack {
  public readonly snapshotBucket: s3.IBucket;
  public readonly importedSecrets: ImportedSecrets;
  public readonly applicationLogGroup: logs.ILogGroup;
  public readonly chromiumLogGroup: logs.ILogGroup;
  public readonly execLogGroup: logs.ILogGroup;
  public readonly executeCommandLogGroup: logs.ILogGroup;

  constructor(scope: Construct, id: string, props: DataStackProps) {
    super(scope, id, props);

    const snapshot = new SnapshotBucketConstruct(this, 'SnapshotBucket', {
      config: props.config,
    });

    const logging = new LoggingConstruct(this, 'Logging', {
      config: props.config,
    });

    const secrets = new SecretsConstruct(this, 'Secrets', {
      config: props.config,
    });

    this.snapshotBucket = snapshot.bucket;
    this.importedSecrets = secrets.importedSecrets;
    this.applicationLogGroup = logging.applicationLogGroup;
    this.chromiumLogGroup = logging.chromiumLogGroup;
    this.execLogGroup = logging.execLogGroup;
    this.executeCommandLogGroup = logging.executeCommandLogGroup;

    applyTags(this, props.config);
  }
}

function applyTags(stack: cdk.Stack, config: OpenClawAppConfig): void {
  Object.entries(config.tags).forEach(([key, value]) => {
    cdk.Tags.of(stack).add(key, value);
  });
}

