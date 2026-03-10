# CDK Stack Plan

## Stack Breakdown

### `NetworkStack`

Owns the VPC and basic network foundation:

- VPC
- public and private subnets
- internet gateway
- NAT gateway
- security groups for ECS service and controlled egress

Exports:

- VPC reference
- subnet selections
- ECS service security group

### `DataStack`

Owns state and secrets dependencies:

- S3 bucket for startup restore and shutdown snapshots
- bucket lifecycle configuration
- bucket versioning choice
- references to Secrets Manager secrets used by OpenClaw
- CloudWatch log groups if we want data-plane resources grouped here

Exports:

- S3 bucket
- secret references
- log group references if applicable

### `ComputeStack`

Owns ECS runtime resources:

- ECS cluster
- task execution role
- task role
- Fargate task definition
- main OpenClaw container
- Chromium sidecar
- `exec-tunnel` sidecar for ECS Exec sessions
- ephemeral storage sizing
- ECS service with `desiredCount=1`
- ECS Exec enabled

Responsibilities:

- wire S3 permissions for snapshot restore/upload
- wire Secrets Manager values into the main container
- keep Chromium internal-only

## Construct Plan

### `VpcConstruct`

Encapsulates:

- VPC sizing
- subnet layout
- default security groups

### `SnapshotBucketConstruct`

Encapsulates:

- S3 bucket
- encryption
- versioning
- lifecycle rules
- IAM grants for the task role

### `OpenClawServiceConstruct`

Encapsulates:

- task definition
- containers
- log configuration
- environment and secret injection
- ECS service settings

### `ExecAccessConstruct`

Encapsulates:

- ECS Exec enablement settings
- IAM permissions for exec channels
- outputs and script assumptions for local port forwarding

## Deployment Order

1. `NetworkStack`
2. `DataStack`
3. `ComputeStack`

## Operator Workflow To Support

1. resolve the running ECS task ID
2. start Session Manager port forwarding to the `exec-tunnel` container
3. open `http://localhost:18789`

## First Implementation Milestone

The first coding milestone should stop at:

- CDK app bootstrapped
- stack files created
- configuration model defined
- empty or partial constructs wired together
- no custom runtime image build yet

The second milestone should add:

- bootstrap image
- S3 restore/shutdown snapshot script
- ECS Exec helper scripts
