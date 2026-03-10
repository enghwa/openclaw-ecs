# AWS CDK App

This directory will contain the AWS CDK TypeScript application for deploying OpenClaw to ECS Fargate.

Planned responsibilities:

- define the network, data, compute, and edge stacks
- enable ECS Exec for admin access and local port forwarding
- wire S3 startup restore and shutdown snapshot permissions
- manage ALB integration and container runtime configuration

Implementation is intentionally deferred until the design is approved.
