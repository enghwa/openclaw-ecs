import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { defaultConfig } from '../../lib/config/app-config';
import { DataStack } from '../../lib/stacks/data-stack';

describe('DataStack', () => {
  test('creates a private versioned snapshot bucket and log groups', () => {
    const app = new cdk.App();
    const stack = new DataStack(app, 'TestData', {
      config: defaultConfig,
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::S3::Bucket', {
      VersioningConfiguration: {
        Status: 'Enabled',
      },
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    });

    template.resourceCountIs('AWS::Logs::LogGroup', 4);
    template.hasResourceProperties('AWS::S3::BucketPolicy', {
      PolicyDocument: Match.objectLike({
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: 's3:*',
            Effect: 'Deny',
          }),
        ]),
      }),
    });
  });
});

