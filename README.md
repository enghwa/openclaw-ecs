# openclaw-ecs

AWS ECS Fargate deployment design for OpenClaw, using AWS CDK with TypeScript.

Current scope:

- architecture and design documentation
- AWS CDK TypeScript app for one-off deployment
- local Docker asset for the OpenClaw bootstrap wrapper
- local CDK assertion tests

## One-Off Deploy Model

This repository is designed for direct operator-driven deployment:

- build and synthesize locally with CDK
- deploy directly with `cdk deploy`
- no CI/CD pipeline required

The bootstrap image is built locally by CDK from `images/openclaw-bootstrap/` and
uses the upstream OpenClaw image from the Helm chart as its base.

## Guides

- [Deployer Guide](/Users/huaz/Downloads/openclaw-ecs/docs/deployer-guide.md)
- [User Guide](/Users/huaz/Downloads/openclaw-ecs/docs/user-guide.md)
