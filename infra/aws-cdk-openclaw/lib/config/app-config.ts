import * as logs from 'aws-cdk-lib/aws-logs';

export interface OpenClawImageConfig {
  readonly mainBaseImage: string;
  readonly chromiumImage: string;
  readonly execTunnelImage: string;
}

export interface OpenClawSecretNames {
  readonly anthropicApiKey?: string;
  readonly openclawGatewayToken?: string;
  readonly openaiApiKey?: string;
  readonly slackBotToken?: string;
  readonly slackAppToken?: string;
  readonly telegramBotToken?: string;
  readonly discordBotToken?: string;
}

export interface OpenClawNetworkConfig {
  readonly vpcCidr: string;
  readonly maxAzs: number;
  readonly natGateways: number;
}

export interface OpenClawTaskConfig {
  readonly cpu: number;
  readonly memoryMiB: number;
  readonly ephemeralStorageGiB: number;
  readonly platformVersion: string;
}

export interface OpenClawAppConfig {
  readonly stackPrefix: string;
  readonly envName: string;
  readonly account?: string;
  readonly region?: string;
  readonly images: OpenClawImageConfig;
  readonly network: OpenClawNetworkConfig;
  readonly task: OpenClawTaskConfig;
  readonly port: number;
  readonly chromiumPort: number;
  readonly snapshotBucketName?: string;
  readonly snapshotPrefix: string;
  readonly logRetention: logs.RetentionDays;
  readonly secretNames: OpenClawSecretNames;
  readonly tags: Record<string, string>;
}

export const defaultConfig: OpenClawAppConfig = {
  stackPrefix: 'openclaw',
  envName: 'dev',
  images: {
    mainBaseImage: 'ghcr.io/openclaw/openclaw:2026.3.7',
    chromiumImage: 'chromedp/headless-shell:146.0.7680.31',
    execTunnelImage: 'public.ecr.aws/amazonlinux/amazonlinux:2023',
  },
  network: {
    vpcCidr: '10.42.0.0/16',
    maxAzs: 2,
    natGateways: 1,
  },
  task: {
    cpu: 1024,
    memoryMiB: 2048,
    ephemeralStorageGiB: 50,
    platformVersion: 'LATEST',
  },
  port: 18789,
  chromiumPort: 9222,
  snapshotPrefix: 'state/dev',
  logRetention: logs.RetentionDays.ONE_MONTH,
  secretNames: {
    anthropicApiKey: 'openclaw/anthropic-api-key',
    openclawGatewayToken: 'openclaw/gateway-token',
  },
  tags: {
    Application: 'openclaw',
    ManagedBy: 'aws-cdk',
  },
};
