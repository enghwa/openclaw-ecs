# User Guide

This guide covers how to access and administer the deployed OpenClaw service using ECS Exec and AWS Systems Manager Session Manager.

## Access Model

There is no public URL.

You access OpenClaw by:

1. finding the running ECS task
2. starting a Session Manager port-forwarding session to the `exec-tunnel` container
3. opening `http://localhost:18789`

## Prerequisites

- AWS CLI installed and authenticated
- Session Manager plugin installed for AWS CLI
- access to ECS Exec in the target account

Check auth:

```bash
aws sts get-caller-identity
```

## Find The Cluster And Service

The CDK app outputs:

- `ClusterName`
- `ServiceName`

You can also list them:

```bash
aws ecs list-clusters
aws ecs list-services --cluster <cluster-name>
```

## Find The Running Task

Use the helper:

```bash
cd /Users/huaz/Downloads/openclaw-ecs/infra/aws-cdk-openclaw
./scripts/resolve-task.sh <cluster-name> <service-name>
```

Example:

```bash
./scripts/resolve-task.sh openclaw-dev-compute-ClusterXXXXX openclaw-dev-compute-OpenClawServiceServiceXXXXX
```

This prints a task ARN.

## Port Forward The Gateway

Use the helper:

```bash
./scripts/ecs-port-forward.sh <cluster-name> <task-arn> 18789
```

What this does:

- resolves the `exec-tunnel` container runtime ID
- starts an SSM port-forwarding session
- forwards your local port `18789` to task `127.0.0.1:18789`

While that command is running, open:

```text
http://localhost:18789
```

## Pair And Use OpenClaw

Once the local gateway is open:

1. enter the configured gateway token
2. connect your client
3. approve device requests if required by your OpenClaw workflow

The exact OpenClaw UI flow depends on the upstream application behavior.

## Shell Into The Task

If you need an interactive shell, use ECS Exec directly.

Main container:

```bash
aws ecs execute-command \
  --cluster <cluster-name> \
  --task <task-arn> \
  --container main \
  --interactive \
  --command "/bin/sh"
```

Exec tunnel container:

```bash
aws ecs execute-command \
  --cluster <cluster-name> \
  --task <task-arn> \
  --container exec-tunnel \
  --interactive \
  --command "/bin/sh"
```

Use `exec-tunnel` when you specifically want the container intended for Session Manager access.

## Inspect Logs

Main container:

```bash
aws logs tail /aws/ecs/openclaw/main --follow
```

Chromium container:

```bash
aws logs tail /aws/ecs/openclaw/chromium --follow
```

Exec tunnel container:

```bash
aws logs tail /aws/ecs/openclaw/exec-tunnel --follow
```

## Force A Fresh Snapshot

The current design snapshots on graceful shutdown, not continuously.

If you want to force state upload:

1. stop using the session
2. stop the ECS service task cleanly
3. let ECS send `SIGTERM`
4. wait for the task to exit

Example:

```bash
aws ecs update-service \
  --cluster <cluster-name> \
  --service <service-name> \
  --desired-count 0
```

Then restart it:

```bash
aws ecs update-service \
  --cluster <cluster-name> \
  --service <service-name> \
  --desired-count 1
```

This forces a graceful stop and restart cycle, which triggers snapshot upload then restore.

## Troubleshooting

If port forwarding fails:

- verify `enableExecuteCommand` is enabled on the service
- verify your IAM principal can use ECS Exec and SSM sessions
- verify the Session Manager plugin is installed
- verify the task is running

If the OpenClaw UI does not load:

- check the `main` container logs
- check the task is listening on `18789`
- verify the gateway token secret is configured correctly

If restore or snapshot upload fails:

- check the `main` container logs for bootstrap messages
- verify the task role has `s3:GetObject`, `s3:PutObject`, and `s3:ListBucket`
- verify the snapshot bucket exists and is reachable from the private subnet path
