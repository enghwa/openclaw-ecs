# OpenClaw Bootstrap Image

This directory is reserved for the custom container wrapper that will:

- restore OpenClaw state from S3 on startup
- start the OpenClaw process
- capture and upload a final snapshot to S3 on graceful shutdown

The image is built locally by CDK as a Docker asset for one-off deployments. It uses
the upstream OpenClaw image from the Helm chart as its base image and layers a small
Node-based S3 snapshot wrapper on top.
