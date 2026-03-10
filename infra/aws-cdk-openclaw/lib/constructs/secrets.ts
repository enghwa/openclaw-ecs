import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { OpenClawAppConfig } from '../config/app-config';

export interface ImportedSecrets {
  readonly anthropicApiKey?: secretsmanager.ISecret;
  readonly openclawGatewayToken?: secretsmanager.ISecret;
  readonly openaiApiKey?: secretsmanager.ISecret;
  readonly slackBotToken?: secretsmanager.ISecret;
  readonly slackAppToken?: secretsmanager.ISecret;
  readonly telegramBotToken?: secretsmanager.ISecret;
  readonly discordBotToken?: secretsmanager.ISecret;
}

export interface SecretsConstructProps {
  readonly config: OpenClawAppConfig;
}

export class SecretsConstruct extends Construct {
  public readonly importedSecrets: ImportedSecrets;

  constructor(scope: Construct, id: string, props: SecretsConstructProps) {
    super(scope, id);

    this.importedSecrets = {
      anthropicApiKey: importByName(this, 'AnthropicApiKey', props.config.secretNames.anthropicApiKey),
      openclawGatewayToken: importByName(this, 'OpenClawGatewayToken', props.config.secretNames.openclawGatewayToken),
      openaiApiKey: importByName(this, 'OpenAiApiKey', props.config.secretNames.openaiApiKey),
      slackBotToken: importByName(this, 'SlackBotToken', props.config.secretNames.slackBotToken),
      slackAppToken: importByName(this, 'SlackAppToken', props.config.secretNames.slackAppToken),
      telegramBotToken: importByName(this, 'TelegramBotToken', props.config.secretNames.telegramBotToken),
      discordBotToken: importByName(this, 'DiscordBotToken', props.config.secretNames.discordBotToken),
    };
  }
}

export function toEcsSecrets(importedSecrets: ImportedSecrets): Record<string, ecs.Secret> {
  const result: Record<string, ecs.Secret> = {};

  addSecret(result, 'ANTHROPIC_API_KEY', importedSecrets.anthropicApiKey);
  addSecret(result, 'OPENCLAW_GATEWAY_TOKEN', importedSecrets.openclawGatewayToken);
  addSecret(result, 'OPENAI_API_KEY', importedSecrets.openaiApiKey);
  addSecret(result, 'SLACK_BOT_TOKEN', importedSecrets.slackBotToken);
  addSecret(result, 'SLACK_APP_TOKEN', importedSecrets.slackAppToken);
  addSecret(result, 'TELEGRAM_BOT_TOKEN', importedSecrets.telegramBotToken);
  addSecret(result, 'DISCORD_BOT_TOKEN', importedSecrets.discordBotToken);

  return result;
}

function importByName(scope: Construct, id: string, secretName?: string): secretsmanager.ISecret | undefined {
  if (!secretName) {
    return undefined;
  }

  return secretsmanager.Secret.fromSecretNameV2(scope, id, secretName);
}

function addSecret(target: Record<string, ecs.Secret>, envName: string, secret?: secretsmanager.ISecret): void {
  if (secret) {
    target[envName] = ecs.Secret.fromSecretsManager(secret);
  }
}

