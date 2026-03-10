#!/usr/bin/env sh
set -eu

STATE_DIR="${OPENCLAW_STATE_DIR:-/home/node/.openclaw}"
SNAPSHOT_BUCKET="${OPENCLAW_SNAPSHOT_BUCKET:-}"
SNAPSHOT_KEY="${OPENCLAW_SNAPSHOT_KEY:-}"
TMP_ARCHIVE="/tmp/openclaw-latest.tar.zst"
APP_PID=""

log() {
  echo "[$(date -Iseconds)] [openclaw-bootstrap] $*"
}

restore_snapshot() {
  if [ -z "$SNAPSHOT_BUCKET" ] || [ -z "$SNAPSHOT_KEY" ]; then
    log "snapshot restore skipped: bucket or key not set"
    return 0
  fi

  mkdir -p "$STATE_DIR"

  if aws s3 cp "s3://${SNAPSHOT_BUCKET}/${SNAPSHOT_KEY}" "$TMP_ARCHIVE"; then
    log "snapshot downloaded, extracting into $STATE_DIR"
    tar --zstd -xf "$TMP_ARCHIVE" -C "$STATE_DIR"
  else
    log "no snapshot found or restore failed, continuing with empty state"
  fi
}

upload_snapshot() {
  if [ -z "$SNAPSHOT_BUCKET" ] || [ -z "$SNAPSHOT_KEY" ]; then
    log "snapshot upload skipped: bucket or key not set"
    return 0
  fi

  mkdir -p "$(dirname "$TMP_ARCHIVE")"

  if [ -d "$STATE_DIR" ]; then
    log "creating snapshot from $STATE_DIR"
    tar --zstd -cf "$TMP_ARCHIVE" -C "$STATE_DIR" .
    aws s3 cp "$TMP_ARCHIVE" "s3://${SNAPSHOT_BUCKET}/${SNAPSHOT_KEY}"
    log "snapshot upload completed"
  else
    log "state directory not found, snapshot skipped"
  fi
}

handle_term() {
  log "received termination signal"
  if [ -n "$APP_PID" ]; then
    kill -TERM "$APP_PID" 2>/dev/null || true
    wait "$APP_PID" 2>/dev/null || true
  fi
  upload_snapshot
  exit 0
}

trap handle_term TERM INT

restore_snapshot

log "starting OpenClaw process: $*"
"$@" &
APP_PID="$!"
wait "$APP_PID"
EXIT_CODE="$?"

log "OpenClaw exited with code $EXIT_CODE"
upload_snapshot
exit "$EXIT_CODE"
