import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { OpenClawAppConfig } from '../config/app-config';

export interface SnapshotBucketConstructProps {
  readonly config: OpenClawAppConfig;
}

export class SnapshotBucketConstruct extends Construct {
  public readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: SnapshotBucketConstructProps) {
    super(scope, id);

    this.bucket = new s3.Bucket(this, 'Bucket', {
      bucketName: props.config.snapshotBucketName,
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      removalPolicy: RemovalPolicy.RETAIN,
      autoDeleteObjects: false,
      lifecycleRules: [
        {
          noncurrentVersionExpiration: Duration.days(30),
        },
      ],
    });
  }

  public grantSnapshotReadWrite(role: iam.IRole): void {
    this.bucket.grantReadWrite(role);
    role.addToPrincipalPolicy(new iam.PolicyStatement({
      actions: [
        's3:ListBucket',
      ],
      resources: [
        this.bucket.bucketArn,
      ],
    }));
  }
}
