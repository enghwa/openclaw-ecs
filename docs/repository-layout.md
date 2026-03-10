# Repository Layout

## Proposed Tree

```text
openclaw-ecs/
├── README.md
├── docs/
│   ├── design.md
│   ├── repository-layout.md
│   └── cdk-stacks.md
├── infra/
│   └── aws-cdk-openclaw/
│       ├── bin/
│       │   └── openclaw-ecs.ts
│       ├── lib/
│       │   ├── config/
│       │   │   ├── app-config.ts
│       │   │   └── environments.ts
│       │   ├── constructs/
│       │   │   ├── ecs-service.ts
│       │   │   ├── exec-access.ts
│       │   │   ├── logging.ts
│       │   │   ├── s3-snapshot.ts
│       │   │   ├── secrets.ts
│       │   │   └── vpc.ts
│       │   └── stacks/
│       │       ├── network-stack.ts
│       │       ├── data-stack.ts
│       │       └── compute-stack.ts
│       ├── scripts/
│       │   ├── ecs-port-forward.sh
│       │   └── resolve-task.sh
│       ├── test/
│       │   └── stacks/
│       ├── package.json
│       ├── tsconfig.json
│       ├── cdk.json
│       └── README.md
└── images/
    └── openclaw-bootstrap/
        ├── Dockerfile
        ├── entrypoint.js
        ├── package.json
        └── README.md
```

## Directory Roles

| Path | Purpose |
| --- | --- |
| `docs/` | Architecture, stack plan, and operator workflows |
| `infra/aws-cdk-openclaw/` | Standalone AWS CDK TypeScript application |
| `infra/aws-cdk-openclaw/bin/` | CDK app entrypoints |
| `infra/aws-cdk-openclaw/lib/config/` | Typed deployment configuration and environment mapping |
| `infra/aws-cdk-openclaw/lib/constructs/` | Reusable infrastructure building blocks |
| `infra/aws-cdk-openclaw/lib/stacks/` | Top-level CDK stacks |
| `infra/aws-cdk-openclaw/scripts/` | Operator helper scripts for ECS Exec and port forwarding |
| `infra/aws-cdk-openclaw/test/` | CDK assertions and synthesis tests |
| `images/openclaw-bootstrap/` | Container wrapper for S3 restore/shutdown snapshot logic |

## Why Separate `images/`

The S3 restore and shutdown snapshot behavior is operational glue, not CDK logic. Keeping it under `images/` makes the boundary explicit:

- CDK defines infrastructure
- the bootstrap image defines runtime lifecycle behavior

## Why Separate `constructs/` And `stacks/`

- `constructs/` keeps reusable units small and testable
- `stacks/` keeps environment composition clear
- the split prevents the compute stack from becoming one large file
