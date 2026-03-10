import * as cdk from 'aws-cdk-lib';
import { defaultConfig, OpenClawAppConfig } from './app-config';

const environmentOverrides: Record<string, Partial<OpenClawAppConfig>> = {
  dev: {
    envName: 'dev',
    stackPrefix: 'openclaw-dev',
    snapshotPrefix: 'state/dev',
  },
  prod: {
    envName: 'prod',
    stackPrefix: 'openclaw-prod',
    snapshotPrefix: 'state/prod',
  },
};

export function getEnvironmentConfig(app: cdk.App): OpenClawAppConfig {
  const envName = app.node.tryGetContext('env') ?? process.env.OPENCLAW_ENV ?? defaultConfig.envName;
  const override = environmentOverrides[envName] ?? {};

  return {
    ...defaultConfig,
    ...override,
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
    images: {
      ...defaultConfig.images,
      ...(override.images ?? {}),
    },
    network: {
      ...defaultConfig.network,
      ...(override.network ?? {}),
    },
    task: {
      ...defaultConfig.task,
      ...(override.task ?? {}),
    },
    secretNames: {
      ...defaultConfig.secretNames,
      ...(override.secretNames ?? {}),
    },
    tags: {
      ...defaultConfig.tags,
      ...(override.tags ?? {}),
    },
  };
}

