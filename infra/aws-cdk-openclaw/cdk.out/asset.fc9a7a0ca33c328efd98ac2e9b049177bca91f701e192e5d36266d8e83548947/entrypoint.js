const fs = require('fs');
const fsp = require('fs/promises');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const { pipeline } = require('stream/promises');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const tar = require('tar');

const stateDir = process.env.OPENCLAW_STATE_DIR || '/home/node/.openclaw';
const snapshotBucket = process.env.OPENCLAW_SNAPSHOT_BUCKET || '';
const snapshotKey = process.env.OPENCLAW_SNAPSHOT_KEY || '';
const archivePath = path.join(os.tmpdir(), 'openclaw-latest.tgz');
const s3 = new S3Client({});

let childProcess;
let shuttingDown = false;
let uploadStarted = false;

function log(message) {
  console.log(`[${new Date().toISOString()}] [openclaw-bootstrap] ${message}`);
}

async function ensureDirectory(dir) {
  await fsp.mkdir(dir, { recursive: true });
}

async function restoreSnapshot() {
  if (!snapshotBucket || !snapshotKey) {
    log('snapshot restore skipped: bucket or key not set');
    return;
  }

  await ensureDirectory(stateDir);

  try {
    const response = await s3.send(new GetObjectCommand({
      Bucket: snapshotBucket,
      Key: snapshotKey,
    }));

    if (!response.Body) {
      log('snapshot restore skipped: S3 object body is empty');
      return;
    }

    await pipeline(response.Body, fs.createWriteStream(archivePath));
    await tar.x({
      file: archivePath,
      cwd: stateDir,
      gzip: true,
    });
    log(`snapshot restored from s3://${snapshotBucket}/${snapshotKey}`);
  } catch (error) {
    log(`snapshot restore skipped: ${error.message}`);
  }
}

async function uploadSnapshot() {
  if (uploadStarted) {
    return;
  }
  uploadStarted = true;

  if (!snapshotBucket || !snapshotKey) {
    log('snapshot upload skipped: bucket or key not set');
    return;
  }

  try {
    await ensureDirectory(stateDir);
    await tar.c({
      gzip: true,
      cwd: stateDir,
      file: archivePath,
      portable: true,
    }, ['.']);

    const upload = new Upload({
      client: s3,
      params: {
        Bucket: snapshotBucket,
        Key: snapshotKey,
        Body: fs.createReadStream(archivePath),
        ContentType: 'application/gzip',
      },
    });

    await upload.done();
    log(`snapshot uploaded to s3://${snapshotBucket}/${snapshotKey}`);
  } catch (error) {
    log(`snapshot upload failed: ${error.message}`);
  }
}

async function terminateChildAndUpload(signal) {
  if (shuttingDown) {
    return;
  }
  shuttingDown = true;
  log(`received ${signal}, shutting down OpenClaw`);

  if (childProcess && !childProcess.killed) {
    childProcess.kill('SIGTERM');
    await new Promise((resolve) => {
      childProcess.once('exit', resolve);
      setTimeout(resolve, 115000);
    });
  }

  await uploadSnapshot();
  process.exit(0);
}

async function main() {
  const command = process.argv.slice(2);
  if (command.length === 0) {
    throw new Error('no application command provided');
  }

  await restoreSnapshot();

  log(`starting OpenClaw process: ${command.join(' ')}`);
  childProcess = spawn(command[0], command.slice(1), {
    stdio: 'inherit',
  });

  process.on('SIGTERM', () => {
    void terminateChildAndUpload('SIGTERM');
  });
  process.on('SIGINT', () => {
    void terminateChildAndUpload('SIGINT');
  });

  childProcess.on('exit', async (code, signal) => {
    if (shuttingDown) {
      return;
    }

    log(`OpenClaw exited with code=${code ?? 'null'} signal=${signal ?? 'null'}`);
    await uploadSnapshot();
    process.exit(code ?? 0);
  });
}

main().catch((error) => {
  log(`bootstrap failed: ${error.message}`);
  process.exit(1);
});

