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
exports.ComputeStack = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const ecs = __importStar(require("aws-cdk-lib/aws-ecs"));
const ecs_service_1 = require("../constructs/ecs-service");
const exec_access_1 = require("../constructs/exec-access");
class ComputeStack extends cdk.Stack {
    cluster;
    service;
    constructor(scope, id, props) {
        super(scope, id, props);
        const execAccess = new exec_access_1.ExecAccessConstruct(this, 'ExecAccess', {
            executeCommandLogGroup: props.executeCommandLogGroup,
        });
        this.cluster = new ecs.Cluster(this, 'Cluster', {
            vpc: props.vpc,
            containerInsightsV2: ecs.ContainerInsights.ENABLED,
            executeCommandConfiguration: execAccess.executeCommandConfiguration,
        });
        const openclawService = new ecs_service_1.OpenClawServiceConstruct(this, 'OpenClawService', {
            config: props.config,
            cluster: this.cluster,
            vpc: props.vpc,
            serviceSecurityGroup: props.serviceSecurityGroup,
            snapshotBucket: props.snapshotBucket,
            importedSecrets: props.importedSecrets,
            applicationLogGroup: props.applicationLogGroup,
            chromiumLogGroup: props.chromiumLogGroup,
            execLogGroup: props.execLogGroup,
        });
        props.snapshotBucket.grantReadWrite(openclawService.taskRole);
        execAccess.grantTaskRole(openclawService.taskRole);
        this.service = openclawService.service;
        new cdk.CfnOutput(this, 'ClusterName', {
            value: this.cluster.clusterName,
        });
        new cdk.CfnOutput(this, 'ServiceName', {
            value: this.service.serviceName,
        });
        applyTags(this, props.config);
    }
}
exports.ComputeStack = ComputeStack;
function applyTags(stack, config) {
    Object.entries(config.tags).forEach(([key, value]) => {
        cdk.Tags.of(stack).add(key, value);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHV0ZS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdGFja3MvY29tcHV0ZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBbUM7QUFFbkMseURBQTJDO0FBSzNDLDJEQUFxRTtBQUNyRSwyREFBZ0U7QUFlaEUsTUFBYSxZQUFhLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDekIsT0FBTyxDQUFjO0lBQ3JCLE9BQU8sQ0FBcUI7SUFFNUMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUF3QjtRQUNoRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLFVBQVUsR0FBRyxJQUFJLGlDQUFtQixDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDN0Qsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLHNCQUFzQjtTQUNyRCxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQzlDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztZQUNkLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPO1lBQ2xELDJCQUEyQixFQUFFLFVBQVUsQ0FBQywyQkFBMkI7U0FDcEUsQ0FBQyxDQUFDO1FBRUgsTUFBTSxlQUFlLEdBQUcsSUFBSSxzQ0FBd0IsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDNUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO1lBQ3BCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7WUFDZCxvQkFBb0IsRUFBRSxLQUFLLENBQUMsb0JBQW9CO1lBQ2hELGNBQWMsRUFBRSxLQUFLLENBQUMsY0FBYztZQUNwQyxlQUFlLEVBQUUsS0FBSyxDQUFDLGVBQWU7WUFDdEMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLG1CQUFtQjtZQUM5QyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsZ0JBQWdCO1lBQ3hDLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWTtTQUNqQyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUQsVUFBVSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDO1FBRXZDLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3JDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7U0FDaEMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDckMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVztTQUNoQyxDQUFDLENBQUM7UUFFSCxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0Y7QUE1Q0Qsb0NBNENDO0FBRUQsU0FBUyxTQUFTLENBQUMsS0FBZ0IsRUFBRSxNQUF5QjtJQUM1RCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFO1FBQ25ELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGVjMiBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWMyJztcbmltcG9ydCAqIGFzIGVjcyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWNzJztcbmltcG9ydCAqIGFzIGxvZ3MgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxvZ3MnO1xuaW1wb3J0ICogYXMgczMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgT3BlbkNsYXdBcHBDb25maWcgfSBmcm9tICcuLi9jb25maWcvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBPcGVuQ2xhd1NlcnZpY2VDb25zdHJ1Y3QgfSBmcm9tICcuLi9jb25zdHJ1Y3RzL2Vjcy1zZXJ2aWNlJztcbmltcG9ydCB7IEV4ZWNBY2Nlc3NDb25zdHJ1Y3QgfSBmcm9tICcuLi9jb25zdHJ1Y3RzL2V4ZWMtYWNjZXNzJztcbmltcG9ydCB7IEltcG9ydGVkU2VjcmV0cyB9IGZyb20gJy4uL2NvbnN0cnVjdHMvc2VjcmV0cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcHV0ZVN0YWNrUHJvcHMgZXh0ZW5kcyBjZGsuU3RhY2tQcm9wcyB7XG4gIHJlYWRvbmx5IGNvbmZpZzogT3BlbkNsYXdBcHBDb25maWc7XG4gIHJlYWRvbmx5IHZwYzogZWMyLklWcGM7XG4gIHJlYWRvbmx5IHNlcnZpY2VTZWN1cml0eUdyb3VwOiBlYzIuSVNlY3VyaXR5R3JvdXA7XG4gIHJlYWRvbmx5IHNuYXBzaG90QnVja2V0OiBzMy5JQnVja2V0O1xuICByZWFkb25seSBpbXBvcnRlZFNlY3JldHM6IEltcG9ydGVkU2VjcmV0cztcbiAgcmVhZG9ubHkgYXBwbGljYXRpb25Mb2dHcm91cDogbG9ncy5JTG9nR3JvdXA7XG4gIHJlYWRvbmx5IGNocm9taXVtTG9nR3JvdXA6IGxvZ3MuSUxvZ0dyb3VwO1xuICByZWFkb25seSBleGVjTG9nR3JvdXA6IGxvZ3MuSUxvZ0dyb3VwO1xuICByZWFkb25seSBleGVjdXRlQ29tbWFuZExvZ0dyb3VwOiBsb2dzLklMb2dHcm91cDtcbn1cblxuZXhwb3J0IGNsYXNzIENvbXB1dGVTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIHB1YmxpYyByZWFkb25seSBjbHVzdGVyOiBlY3MuQ2x1c3RlcjtcbiAgcHVibGljIHJlYWRvbmx5IHNlcnZpY2U6IGVjcy5GYXJnYXRlU2VydmljZTtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogQ29tcHV0ZVN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGV4ZWNBY2Nlc3MgPSBuZXcgRXhlY0FjY2Vzc0NvbnN0cnVjdCh0aGlzLCAnRXhlY0FjY2VzcycsIHtcbiAgICAgIGV4ZWN1dGVDb21tYW5kTG9nR3JvdXA6IHByb3BzLmV4ZWN1dGVDb21tYW5kTG9nR3JvdXAsXG4gICAgfSk7XG5cbiAgICB0aGlzLmNsdXN0ZXIgPSBuZXcgZWNzLkNsdXN0ZXIodGhpcywgJ0NsdXN0ZXInLCB7XG4gICAgICB2cGM6IHByb3BzLnZwYyxcbiAgICAgIGNvbnRhaW5lckluc2lnaHRzVjI6IGVjcy5Db250YWluZXJJbnNpZ2h0cy5FTkFCTEVELFxuICAgICAgZXhlY3V0ZUNvbW1hbmRDb25maWd1cmF0aW9uOiBleGVjQWNjZXNzLmV4ZWN1dGVDb21tYW5kQ29uZmlndXJhdGlvbixcbiAgICB9KTtcblxuICAgIGNvbnN0IG9wZW5jbGF3U2VydmljZSA9IG5ldyBPcGVuQ2xhd1NlcnZpY2VDb25zdHJ1Y3QodGhpcywgJ09wZW5DbGF3U2VydmljZScsIHtcbiAgICAgIGNvbmZpZzogcHJvcHMuY29uZmlnLFxuICAgICAgY2x1c3RlcjogdGhpcy5jbHVzdGVyLFxuICAgICAgdnBjOiBwcm9wcy52cGMsXG4gICAgICBzZXJ2aWNlU2VjdXJpdHlHcm91cDogcHJvcHMuc2VydmljZVNlY3VyaXR5R3JvdXAsXG4gICAgICBzbmFwc2hvdEJ1Y2tldDogcHJvcHMuc25hcHNob3RCdWNrZXQsXG4gICAgICBpbXBvcnRlZFNlY3JldHM6IHByb3BzLmltcG9ydGVkU2VjcmV0cyxcbiAgICAgIGFwcGxpY2F0aW9uTG9nR3JvdXA6IHByb3BzLmFwcGxpY2F0aW9uTG9nR3JvdXAsXG4gICAgICBjaHJvbWl1bUxvZ0dyb3VwOiBwcm9wcy5jaHJvbWl1bUxvZ0dyb3VwLFxuICAgICAgZXhlY0xvZ0dyb3VwOiBwcm9wcy5leGVjTG9nR3JvdXAsXG4gICAgfSk7XG5cbiAgICBwcm9wcy5zbmFwc2hvdEJ1Y2tldC5ncmFudFJlYWRXcml0ZShvcGVuY2xhd1NlcnZpY2UudGFza1JvbGUpO1xuICAgIGV4ZWNBY2Nlc3MuZ3JhbnRUYXNrUm9sZShvcGVuY2xhd1NlcnZpY2UudGFza1JvbGUpO1xuXG4gICAgdGhpcy5zZXJ2aWNlID0gb3BlbmNsYXdTZXJ2aWNlLnNlcnZpY2U7XG5cbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAnQ2x1c3Rlck5hbWUnLCB7XG4gICAgICB2YWx1ZTogdGhpcy5jbHVzdGVyLmNsdXN0ZXJOYW1lLFxuICAgIH0pO1xuXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ1NlcnZpY2VOYW1lJywge1xuICAgICAgdmFsdWU6IHRoaXMuc2VydmljZS5zZXJ2aWNlTmFtZSxcbiAgICB9KTtcblxuICAgIGFwcGx5VGFncyh0aGlzLCBwcm9wcy5jb25maWcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VGFncyhzdGFjazogY2RrLlN0YWNrLCBjb25maWc6IE9wZW5DbGF3QXBwQ29uZmlnKTogdm9pZCB7XG4gIE9iamVjdC5lbnRyaWVzKGNvbmZpZy50YWdzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBjZGsuVGFncy5vZihzdGFjaykuYWRkKGtleSwgdmFsdWUpO1xuICB9KTtcbn1cblxuIl19