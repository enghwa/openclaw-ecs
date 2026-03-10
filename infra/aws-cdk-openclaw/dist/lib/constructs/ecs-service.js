"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenClawServiceConstruct = void 0;
const ec2 = __importStar(require("aws-cdk-lib/aws-ec2"));
const ecs = __importStar(require("aws-cdk-lib/aws-ecs"));
const aws_cdk_lib_1 = require("aws-cdk-lib");
const constructs_1 = require("constructs");
const path = __importStar(require("path"));
const secrets_1 = require("./secrets");
class OpenClawServiceConstruct extends constructs_1.Construct {
    taskDefinition;
    service;
    taskRole;
    constructor(scope, id, props) {
        super(scope, id);
        this.taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDefinition', {
            cpu: props.config.task.cpu,
            memoryLimitMiB: props.config.task.memoryMiB,
            ephemeralStorageGiB: props.config.task.ephemeralStorageGiB,
            runtimePlatform: {
                operatingSystemFamily: ecs.OperatingSystemFamily.LINUX,
                cpuArchitecture: ecs.CpuArchitecture.X86_64,
            },
        });
        this.taskRole = this.taskDefinition.taskRole;
        const bootstrapAssetPath = path.resolve(__dirname, '../../../../images/openclaw-bootstrap');
        const mainContainer = this.taskDefinition.addContainer('OpenClawMain', {
            containerName: 'main',
            image: ecs.ContainerImage.fromAsset(bootstrapAssetPath, {
                buildArgs: {
                    OPENCLAW_IMAGE: props.config.images.mainBaseImage,
                },
            }),
            memoryReservationMiB: 1024,
            logging: ecs.LogDrivers.awsLogs({
                logGroup: props.applicationLogGroup,
                streamPrefix: 'main',
            }),
            essential: true,
            environment: {
                OPENCLAW_GATEWAY_PORT: `${props.config.port}`,
                OPENCLAW_GATEWAY_BIND: 'lan',
                OPENCLAW_CHROMIUM_CDP_URL: `http://127.0.0.1:${props.config.chromiumPort}`,
                OPENCLAW_STATE_DIR: '/home/node/.openclaw',
                OPENCLAW_SNAPSHOT_BUCKET: props.snapshotBucket.bucketName,
                OPENCLAW_SNAPSHOT_KEY: `${props.config.snapshotPrefix}/latest.tgz`,
            },
            secrets: (0, secrets_1.toEcsSecrets)(props.importedSecrets),
            command: [
                'node',
                'dist/index.js',
                'gateway',
                '--bind',
                'lan',
                '--port',
                `${props.config.port}`,
            ],
            portMappings: [
                {
                    containerPort: props.config.port,
                    protocol: ecs.Protocol.TCP,
                },
            ],
            stopTimeout: aws_cdk_lib_1.Duration.seconds(120),
        });
        mainContainer.addUlimits({
            name: ecs.UlimitName.NOFILE,
            softLimit: 65535,
            hardLimit: 65535,
        });
        this.taskDefinition.addContainer('Chromium', {
            containerName: 'chromium',
            image: ecs.ContainerImage.fromRegistry(props.config.images.chromiumImage),
            memoryReservationMiB: 384,
            logging: ecs.LogDrivers.awsLogs({
                logGroup: props.chromiumLogGroup,
                streamPrefix: 'chromium',
            }),
            essential: true,
            environment: {
                XDG_CACHE_HOME: '/tmp',
            },
            portMappings: [
                {
                    containerPort: props.config.chromiumPort,
                    protocol: ecs.Protocol.TCP,
                },
            ],
        });
        this.taskDefinition.addContainer('ExecTunnel', {
            containerName: 'exec-tunnel',
            image: ecs.ContainerImage.fromRegistry(props.config.images.execTunnelImage),
            memoryReservationMiB: 128,
            logging: ecs.LogDrivers.awsLogs({
                logGroup: props.execLogGroup,
                streamPrefix: 'exec-tunnel',
            }),
            essential: true,
            command: [
                'sleep',
                'infinity',
            ],
        });
        this.service = new ecs.FargateService(this, 'Service', {
            cluster: props.cluster,
            taskDefinition: this.taskDefinition,
            desiredCount: 1,
            assignPublicIp: false,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
            },
            securityGroups: [props.serviceSecurityGroup],
            enableExecuteCommand: true,
            circuitBreaker: {
                rollback: true,
            },
            minHealthyPercent: 0,
            maxHealthyPercent: 100,
            platformVersion: ecs.FargatePlatformVersion.LATEST,
        });
    }
}
exports.OpenClawServiceConstruct = OpenClawServiceConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNzLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvY29uc3RydWN0cy9lY3Mtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBMkM7QUFDM0MseURBQTJDO0FBSTNDLDZDQUF1QztBQUN2QywyQ0FBdUM7QUFDdkMsMkNBQTZCO0FBRTdCLHVDQUEwRDtBQWMxRCxNQUFhLHdCQUF5QixTQUFRLHNCQUFTO0lBQ3JDLGNBQWMsQ0FBNEI7SUFDMUMsT0FBTyxDQUFxQjtJQUM1QixRQUFRLENBQVk7SUFFcEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFvQztRQUM1RSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQzFFLEdBQUcsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQzFCLGNBQWMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQzNDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQjtZQUMxRCxlQUFlLEVBQUU7Z0JBQ2YscUJBQXFCLEVBQUUsR0FBRyxDQUFDLHFCQUFxQixDQUFDLEtBQUs7Z0JBQ3RELGVBQWUsRUFBRSxHQUFHLENBQUMsZUFBZSxDQUFDLE1BQU07YUFDNUM7U0FDRixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDO1FBQzdDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsdUNBQXVDLENBQUMsQ0FBQztRQUU1RixNQUFNLGFBQWEsR0FB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QUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQkFDOUIsUUFBUSxFQUFFLEtBQUssQ0FBQyxZQUFZO2dCQUM1QixZQUFZLEVBQUUsYUFBYTthQUM1QixDQUFDO1lBQ0YsU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUU7Z0JBQ1AsT0FBTztnQkFDUCxVQUFVO2FBQ1g7U0FDRixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ3JELE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztZQUN0QixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDbkMsWUFBWSxFQUFFLENBQUM7WUFDZixjQUFjLEVBQUUsS0FBSztZQUNyQixVQUFVLEVBQUU7Z0JBQ1YsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsbUJBQW1CO2FBQy9DO1lBQ0QsY0FBYyxFQUFFLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO1lBQzVDLG9CQUFvQixFQUFFLElBQUk7WUFDMUIsY0FBYyxFQUFFO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2Y7WUFDRCxpQkFBaUIsRUFBRSxDQUFDO1lBQ3BCLGlCQUFpQixFQUFFLEdBQUc7WUFDdEIsZUFBZSxFQUFFLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNO1NBQ25ELENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXhIRCw0REF3SEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBlYzIgZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjMic7XG5pbXBvcnQgKiBhcyBlY3MgZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjcyc7XG5pbXBvcnQgKiBhcyBpYW0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5pbXBvcnQgKiBhcyBsb2dzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1sb2dzJztcbmltcG9ydCAqIGFzIHMzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMyc7XG5pbXBvcnQgeyBEdXJhdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IE9wZW5DbGF3QXBwQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgSW1wb3J0ZWRTZWNyZXRzLCB0b0Vjc1NlY3JldHMgfSBmcm9tICcuL3NlY3JldHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE9wZW5DbGF3U2VydmljZUNvbnN0cnVjdFByb3BzIHtcbiAgcmVhZG9ubHkgY29uZmlnOiBPcGVuQ2xhd0FwcENvbmZpZztcbiAgcmVhZG9ubHkgY2x1c3RlcjogZWNzLklDbHVzdGVyO1xuICByZWFkb25seSB2cGM6IGVjMi5JVnBjO1xuICByZWFkb25seSBzZXJ2aWNlU2VjdXJpdHlHcm91cDogZWMyLklTZWN1cml0eUdyb3VwO1xuICByZWFkb25seSBzbmFwc2hvdEJ1Y2tldDogczMuSUJ1Y2tldDtcbiAgcmVhZG9ubHkgaW1wb3J0ZWRTZWNyZXRzOiBJbXBvcnRlZFNlY3JldHM7XG4gIHJlYWRvbmx5IGFwcGxpY2F0aW9uTG9nR3JvdXA6IGxvZ3MuSUxvZ0dyb3VwO1xuICByZWFkb25seSBjaHJvbWl1bUxvZ0dyb3VwOiBsb2dzLklMb2dHcm91cDtcbiAgcmVhZG9ubHkgZXhlY0xvZ0dyb3VwOiBsb2dzLklMb2dHcm91cDtcbn1cblxuZXhwb3J0IGNsYXNzIE9wZW5DbGF3U2VydmljZUNvbnN0cnVjdCBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyByZWFkb25seSB0YXNrRGVmaW5pdGlvbjogZWNzLkZhcmdhdGVUYXNrRGVmaW5pdGlvbjtcbiAgcHVibGljIHJlYWRvbmx5IHNlcnZpY2U6IGVjcy5GYXJnYXRlU2VydmljZTtcbiAgcHVibGljIHJlYWRvbmx5IHRhc2tSb2xlOiBpYW0uSVJvbGU7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IE9wZW5DbGF3U2VydmljZUNvbnN0cnVjdFByb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIHRoaXMudGFza0RlZmluaXRpb24gPSBuZXcgZWNzLkZhcmdhdGVUYXNrRGVmaW5pdGlvbih0aGlzLCAnVGFza0RlZmluaXRpb24nLCB7XG4gICAgICBjcHU6IHByb3BzLmNvbmZpZy50YXNrLmNwdSxcbiAgICAgIG1lbW9yeUxpbWl0TWlCOiBwcm9wcy5jb25maWcudGFzay5tZW1vcnlNaUIsXG4gICAgICBlcGhlbWVyYWxTdG9yYWdlR2lCOiBwcm9wcy5jb25maWcudGFzay5lcGhlbWVyYWxTdG9yYWdlR2lCLFxuICAgICAgcnVudGltZVBsYXRmb3JtOiB7XG4gICAgICAgIG9wZXJhdGluZ1N5c3RlbUZhbWlseTogZWNzLk9wZXJhdGluZ1N5c3RlbUZhbWlseS5MSU5VWCxcbiAgICAgICAgY3B1QXJjaGl0ZWN0dXJlOiBlY3MuQ3B1QXJjaGl0ZWN0dXJlLlg4Nl82NCxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLnRhc2tSb2xlID0gdGhpcy50YXNrRGVmaW5pdGlvbi50YXNrUm9sZTtcbiAgICBjb25zdCBib290c3RyYXBBc3NldFBhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vLi4vaW1hZ2VzL29wZW5jbGF3LWJvb3RzdHJhcCcpO1xuXG4gICAgY29uc3QgbWFpbkNvbnRhaW5lciA9IHRoaXMudGFza0RlZmluaXRpb24uYWRkQ29udGFpbmVyKCdPcGVuQ2xhd01haW4nLCB7XG4gICAgICBjb250YWluZXJOYW1lOiAnbWFpbicsXG4gICAgICBpbWFnZTogZWNzLkNvbnRhaW5lckltYWdlLmZyb21Bc3NldChib290c3RyYXBBc3NldFBhdGgsIHtcbiAgICAgICAgYnVpbGRBcmdzOiB7XG4gICAgICAgICAgT1BFTkNMQVdfSU1BR0U6IHByb3BzLmNvbmZpZy5pbWFnZXMubWFpbkJhc2VJbWFnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgbWVtb3J5UmVzZXJ2YXRpb25NaUI6IDEwMjQsXG4gICAgICBsb2dnaW5nOiBlY3MuTG9nRHJpdmVycy5hd3NMb2dzKHtcbiAgICAgICAgbG9nR3JvdXA6IHByb3BzLmFwcGxpY2F0aW9uTG9nR3JvdXAsXG4gICAgICAgIHN0cmVhbVByZWZpeDogJ21haW4nLFxuICAgICAgfSksXG4gICAgICBlc3NlbnRpYWw6IHRydWUsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBPUEVOQ0xBV19HQVRFV0FZX1BPUlQ6IGAke3Byb3BzLmNvbmZpZy5wb3J0fWAsXG4gICAgICAgIE9QRU5DTEFXX0dBVEVXQVlfQklORDogJ2xhbicsXG4gICAgICAgIE9QRU5DTEFXX0NIUk9NSVVNX0NEUF9VUkw6IGBodHRwOi8vMTI3LjAuMC4xOiR7cHJvcHMuY29uZmlnLmNocm9taXVtUG9ydH1gLFxuICAgICAgICBPUEVOQ0xBV19TVEFURV9ESVI6ICcvaG9tZS9ub2RlLy5vcGVuY2xhdycsXG4gICAgICAgIE9QRU5DTEFXX1NOQVBTSE9UX0JVQ0tFVDogcHJvcHMuc25hcHNob3RCdWNrZXQuYnVja2V0TmFtZSxcbiAgICAgICAgT1BFTkNMQVdfU05BUFNIT1RfS0VZOiBgJHtwcm9wcy5jb25maWcuc25hcHNob3RQcmVmaXh9L2xhdGVzdC50Z3pgLFxuICAgICAgfSxcbiAgICAgIHNlY3JldHM6IHRvRWNzU2VjcmV0cyhwcm9wcy5pbXBvcnRlZFNlY3JldHMpLFxuICAgICAgY29tbWFuZDogW1xuICAgICAgICAnbm9kZScsXG4gICAgICAgICdkaXN0L2luZGV4LmpzJyxcbiAgICAgICAgJ2dhdGV3YXknLFxuICAgICAgICAnLS1iaW5kJyxcbiAgICAgICAgJ2xhbicsXG4gICAgICAgICctLXBvcnQnLFxuICAgICAgICBgJHtwcm9wcy5jb25maWcucG9ydH1gLFxuICAgICAgXSxcbiAgICAgIHBvcnRNYXBwaW5nczogW1xuICAgICAgICB7XG4gICAgICAgICAgY29udGFpbmVyUG9ydDogcHJvcHMuY29uZmlnLnBvcnQsXG4gICAgICAgICAgcHJvdG9jb2w6IGVjcy5Qcm90b2NvbC5UQ1AsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgc3RvcFRpbWVvdXQ6IER1cmF0aW9uLnNlY29uZHMoMTIwKSxcbiAgICB9KTtcblxuICAgIG1haW5Db250YWluZXIuYWRkVWxpbWl0cyh7XG4gICAgICBuYW1lOiBlY3MuVWxpbWl0TmFtZS5OT0ZJTEUsXG4gICAgICBzb2Z0TGltaXQ6IDY1NTM1LFxuICAgICAgaGFyZExpbWl0OiA2NTUzNSxcbiAgICB9KTtcblxuICAgIHRoaXMudGFza0RlZmluaXRpb24uYWRkQ29udGFpbmVyKCdDaHJvbWl1bScsIHtcbiAgICAgIGNvbnRhaW5lck5hbWU6ICdjaHJvbWl1bScsXG4gICAgICBpbWFnZTogZWNzLkNvbnRhaW5lckltYWdlLmZyb21SZWdpc3RyeShwcm9wcy5jb25maWcuaW1hZ2VzLmNocm9taXVtSW1hZ2UpLFxuICAgICAgbWVtb3J5UmVzZXJ2YXRpb25NaUI6IDM4NCxcbiAgICAgIGxvZ2dpbmc6IGVjcy5Mb2dEcml2ZXJzLmF3c0xvZ3Moe1xuICAgICAgICBsb2dHcm91cDogcHJvcHMuY2hyb21pdW1Mb2dHcm91cCxcbiAgICAgICAgc3RyZWFtUHJlZml4OiAnY2hyb21pdW0nLFxuICAgICAgfSksXG4gICAgICBlc3NlbnRpYWw6IHRydWUsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBYREdfQ0FDSEVfSE9NRTogJy90bXAnLFxuICAgICAgfSxcbiAgICAgIHBvcnRNYXBwaW5nczogW1xuICAgICAgICB7XG4gICAgICAgICAgY29udGFpbmVyUG9ydDogcHJvcHMuY29uZmlnLmNocm9taXVtUG9ydCxcbiAgICAgICAgICBwcm90b2NvbDogZWNzLlByb3RvY29sLlRDUCxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLnRhc2tEZWZpbml0aW9uLmFkZENvbnRhaW5lcignRXhlY1R1bm5lbCcsIHtcbiAgICAgIGNvbnRhaW5lck5hbWU6ICdleGVjLXR1bm5lbCcsXG4gICAgICBpbWFnZTogZWNzLkNvbnRhaW5lckltYWdlLmZyb21SZWdpc3RyeShwcm9wcy5jb25maWcuaW1hZ2VzLmV4ZWNUdW5uZWxJbWFnZSksXG4gICAgICBtZW1vcnlSZXNlcnZhdGlvbk1pQjogMTI4LFxuICAgICAgbG9nZ2luZzogZWNzLkxvZ0RyaXZlcnMuYXdzTG9ncyh7XG4gICAgICAgIGxvZ0dyb3VwOiBwcm9wcy5leGVjTG9nR3JvdXAsXG4gICAgICAgIHN0cmVhbVByZWZpeDogJ2V4ZWMtdHVubmVsJyxcbiAgICAgIH0pLFxuICAgICAgZXNzZW50aWFsOiB0cnVlLFxuICAgICAgY29tbWFuZDogW1xuICAgICAgICAnc2xlZXAnLFxuICAgICAgICAnaW5maW5pdHknLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMuc2VydmljZSA9IG5ldyBlY3MuRmFyZ2F0ZVNlcnZpY2UodGhpcywgJ1NlcnZpY2UnLCB7XG4gICAgICBjbHVzdGVyOiBwcm9wcy5jbHVzdGVyLFxuICAgICAgdGFza0RlZmluaXRpb246IHRoaXMudGFza0RlZmluaXRpb24sXG4gICAgICBkZXNpcmVkQ291bnQ6IDEsXG4gICAgICBhc3NpZ25QdWJsaWNJcDogZmFsc2UsXG4gICAgICB2cGNTdWJuZXRzOiB7XG4gICAgICAgIHN1Ym5ldFR5cGU6IGVjMi5TdWJuZXRUeXBlLlBSSVZBVEVfV0lUSF9FR1JFU1MsXG4gICAgICB9LFxuICAgICAgc2VjdXJpdHlHcm91cHM6IFtwcm9wcy5zZXJ2aWNlU2VjdXJpdHlHcm91cF0sXG4gICAgICBlbmFibGVFeGVjdXRlQ29tbWFuZDogdHJ1ZSxcbiAgICAgIGNpcmN1aXRCcmVha2VyOiB7XG4gICAgICAgIHJvbGxiYWNrOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIG1pbkhlYWx0aHlQZXJjZW50OiAwLFxuICAgICAgbWF4SGVhbHRoeVBlcmNlbnQ6IDEwMCxcbiAgICAgIHBsYXRmb3JtVmVyc2lvbjogZWNzLkZhcmdhdGVQbGF0Zm9ybVZlcnNpb24uTEFURVNULFxuICAgIH0pO1xuICB9XG59XG4iXX0=