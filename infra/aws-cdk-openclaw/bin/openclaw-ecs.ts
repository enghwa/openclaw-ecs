#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { getEnvironmentConfig } from '../lib/config/environments';
import { DataStack } from '../lib/stacks/data-stack';
import { ComputeStack } from '../lib/stacks/compute-stack';
import { NetworkStack } from '../lib/stacks/network-stack';

const app = new cdk.App();
const config = getEnvironmentConfig(app);

const stackEnv = config.account && config.region
  ? {
      account: config.account,
      region: config.region,
    }
  : undefined;

const networkStack = new NetworkStack(app, `${config.stackPrefix}-network`, {
  env: stackEnv,
  config,
});

const dataStack = new DataStack(app, `${config.stackPrefix}-data`, {
  env: stackEnv,
  config,
});

new ComputeStack(app, `${config.stackPrefix}-compute`, {
  env: stackEnv,
  config,
  vpc: networkStack.vpc,
  serviceSecurityGroup: networkStack.serviceSecurityGroup,
  snapshotBucket: dataStack.snapshotBucket,
  importedSecrets: dataStack.importedSecrets,
  applicationLogGroup: dataStack.applicationLogGroup,
  chromiumLogGroup: dataStack.chromiumLogGroup,
  execLogGroup: dataStack.execLogGroup,
  executeCommandLogGroup: dataStack.executeCommandLogGroup,
});

