# Deployer Guide

This guide covers the one-off deployment flow for OpenClaw on AWS ECS Fargate using AWS CDK.

## Prerequisites

- AWS account credentials configured locally
- `aws` CLI installed and authenticated
- `gh` optional, only if you want to publish the repo first
- `docker` installed and running locally
- Node.js and npm installed
- AWS CDK bootstrap completed in the target account and region

Useful checks:

```bash
aws sts get-caller-identity
docker version
node -v
npm -v
```

## Repository Paths

- CDK app: `infra/aws-cdk-openclaw/`
- Bootstrap image: `images/openclaw-bootstrap/`

## Configure The Deployment

Review and edit [app-config.ts](/Users/huaz/Downloads/openclaw-ecs/infra/aws-cdk-openclaw/lib/config/app-config.ts).

Important values:

- `stackPrefix`
- `network.vpcCidr`
- `task.cpu`
- `task.memoryMiB`
- `task.ephemeralStorageGiB`
- `snapshotBucketName` if you want a fixed bucket name
- `secretNames`

If you want separate environments, extend [environments.ts](/Users/huaz/Downloads/openclaw-ecs/infra/aws-cdk-openclaw/lib/config/environments.ts) and deploy with `-c env=<name>`.

## Create Required Secrets

At minimum, create the OpenClaw secrets referenced in config:

```bash
aws secretsmanager create-secret \
  --name openclaw/anthropic-api-key \
  --secret-string 'YOUR_ANTHROPIC_KEY'

aws secretsmanager create-secret \
  --name openclaw/gateway-token \
  --secret-string 'YOUR_OPENCLAW_GATEWAY_TOKEN'
```

Optional channel secrets:

- `openclaw/openai-api-key`
- `openclaw/slack-bot-token`
- `openclaw/slack-app-token`
- `openclaw/telegram-bot-token`
- `openclaw/discord-bot-token`

If a secret name is configured but the secret does not exist, deployment will fail during CloudFormation resolution.

## Bootstrap CDK

Run this once per AWS account and region:

```bash
cd /Users/huaz/Downloads/openclaw-ecs/infra/aws-cdk-openclaw
cdk bootstrap
```

If you deploy to a different region than your shell default:

```bash
CDK_DEFAULT_REGION=ap-southeast-1 cdk bootstrap
```

## Install Dependencies And Verify Locally

```bash
cd /Users/huaz/Downloads/openclaw-ecs/infra/aws-cdk-openclaw
npm install
npm run build
npm test
npm run synth -- --quiet
```

What this does:

- builds the TypeScript CDK app
- runs local assertion tests
- synthesizes CloudFormation templates
- prepares the Docker asset definition for the OpenClaw bootstrap image

## Deploy

Default environment:

```bash
cd /Users/huaz/Downloads/openclaw-ecs/infra/aws-cdk-openclaw
cdk deploy --all
```

Named environment from CDK context:

```bash
cdk deploy --all -c env=prod
```

During deploy, CDK will:

- build the local Docker asset from `images/openclaw-bootstrap/`
- push that asset to ECR
- create the VPC, S3 bucket, log groups, ECS cluster, task definition, and ECS service

## Verify Deployment

List stacks:

```bash
aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE
```

Check ECS service:

```bash
aws ecs list-clusters
aws ecs list-services --cluster <cluster-name>
aws ecs describe-services --cluster <cluster-name> --services <service-name>
```

Check tasks:

```bash
aws ecs list-tasks --cluster <cluster-name> --service-name <service-name>
aws ecs describe-tasks --cluster <cluster-name> --tasks <task-arn>
```

Check logs:

```bash
aws logs describe-log-groups --log-group-name-prefix /aws/ecs/openclaw
aws logs tail /aws/ecs/openclaw/main --follow
```

## Update The Deployment

After changing CDK code:

```bash
cd /Users/huaz/Downloads/openclaw-ecs/infra/aws-cdk-openclaw
npm run build
npm test
cdk deploy --all
```

After changing only the bootstrap image:

- rebuild is automatic during `cdk deploy`
- CDK will detect the Docker asset change and publish a new asset image

## Destroy

Destroy the stacks:

```bash
cd /Users/huaz/Downloads/openclaw-ecs/infra/aws-cdk-openclaw
cdk destroy --all
```

Important:

- the S3 snapshot bucket is configured to retain data by default
- you may need to empty or remove retained resources manually if you want a full cleanup

## Deployment Notes

- This design is private-only. There is no ALB or public endpoint.
- Access is through ECS Exec and SSM port forwarding only.
- The OpenClaw state snapshot is restored from S3 on startup and uploaded on graceful shutdown.
- Unexpected task crashes can still lose state created after startup.
