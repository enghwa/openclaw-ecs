#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "usage: $0 <cluster-name> <task-arn> [local-port]" >&2
  exit 1
fi

cluster_name="$1"
task_arn="$2"
local_port="${3:-18789}"
container_name="exec-tunnel"
remote_host="127.0.0.1"
remote_port="18789"

runtime_id="$(aws ecs describe-tasks \
  --cluster "$cluster_name" \
  --tasks "$task_arn" \
  --query "tasks[0].containers[?name=='${container_name}'].runtimeId | [0]" \
  --output text)"

task_id="${task_arn##*/}"
target="ecs:${cluster_name}_${task_id}_${runtime_id}"

aws ssm start-session \
  --target "$target" \
  --document-name AWS-StartPortForwardingSessionToRemoteHost \
  --parameters "{\"host\":[\"${remote_host}\"],\"portNumber\":[\"${remote_port}\"],\"localPortNumber\":[\"${local_port}\"]}"

