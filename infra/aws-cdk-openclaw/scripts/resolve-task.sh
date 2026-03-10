#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "usage: $0 <cluster-name> <service-name>" >&2
  exit 1
fi

cluster_name="$1"
service_name="$2"

task_arn="$(aws ecs list-tasks \
  --cluster "$cluster_name" \
  --service-name "$service_name" \
  --desired-status RUNNING \
  --query 'taskArns[0]' \
  --output text)"

if [[ -z "$task_arn" || "$task_arn" == "None" ]]; then
  echo "no running task found for service $service_name in cluster $cluster_name" >&2
  exit 1
fi

echo "$task_arn"

