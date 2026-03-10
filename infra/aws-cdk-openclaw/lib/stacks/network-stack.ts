import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { OpenClawAppConfig } from '../config/app-config';
import { VpcConstruct } from '../constructs/vpc';

export interface NetworkStackProps extends cdk.StackProps {
  readonly config: OpenClawAppConfig;
}

export class NetworkStack extends cdk.Stack {
  public readonly vpc: ec2.IVpc;
  public readonly serviceSecurityGroup: ec2.ISecurityGroup;

  constructor(scope: Construct, id: string, props: NetworkStackProps) {
    super(scope, id, props);

    const network = new VpcConstruct(this, 'Network', {
      config: props.config,
    });

    this.vpc = network.vpc;
    this.serviceSecurityGroup = network.serviceSecurityGroup;

    applyTags(this, props.config);
  }
}

function applyTags(stack: cdk.Stack, config: OpenClawAppConfig): void {
  Object.entries(config.tags).forEach(([key, value]) => {
    cdk.Tags.of(stack).add(key, value);
  });
}

