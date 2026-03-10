import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { defaultConfig } from '../../lib/config/app-config';
import { NetworkStack } from '../../lib/stacks/network-stack';

describe('NetworkStack', () => {
  test('creates a VPC and service security group', () => {
    const app = new cdk.App();
    const stack = new NetworkStack(app, 'TestNetwork', {
      config: defaultConfig,
    });

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::VPC', 1);
    template.hasResourceProperties('AWS::EC2::SecurityGroup', {
      GroupDescription: Match.stringLikeRegexp('private OpenClaw ECS service'),
    });
  });
});

