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
exports.DataStack = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const logging_1 = require("../constructs/logging");
const secrets_1 = require("../constructs/secrets");
const s3_snapshot_1 = require("../constructs/s3-snapshot");
class DataStack extends cdk.Stack {
    snapshotBucket;
    importedSecrets;
    applicationLogGroup;
    chromiumLogGroup;
    execLogGroup;
    executeCommandLogGroup;
    constructor(scope, id, props) {
        super(scope, id, props);
        const snapshot = new s3_snapshot_1.SnapshotBucketConstruct(this, 'SnapshotBucket', {
            config: props.config,
        });
        const logging = new logging_1.LoggingConstruct(this, 'Logging', {
            config: props.config,
        });
        const secrets = new secrets_1.SecretsConstruct(this, 'Secrets', {
            config: props.config,
        });
        this.snapshotBucket = snapshot.bucket;
        this.importedSecrets = secrets.importedSecrets;
        this.applicationLogGroup = logging.applicationLogGroup;
        this.chromiumLogGroup = logging.chromiumLogGroup;
        this.execLogGroup = logging.execLogGroup;
        this.executeCommandLogGroup = logging.executeCommandLogGroup;
        applyTags(this, props.config);
    }
}
exports.DataStack = DataStack;
function applyTags(stack, config) {
    Object.entries(config.tags).forEach(([key, value]) => {
        cdk.Tags.of(stack).add(key, value);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdGFja3MvZGF0YS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBbUM7QUFLbkMsbURBQXlEO0FBQ3pELG1EQUEwRTtBQUMxRSwyREFBb0U7QUFNcEUsTUFBYSxTQUFVLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDdEIsY0FBYyxDQUFhO0lBQzNCLGVBQWUsQ0FBa0I7SUFDakMsbUJBQW1CLENBQWlCO0lBQ3BDLGdCQUFnQixDQUFpQjtJQUNqQyxZQUFZLENBQWlCO0lBQzdCLHNCQUFzQixDQUFpQjtJQUV2RCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXFCO1FBQzdELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sUUFBUSxHQUFHLElBQUkscUNBQXVCLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ25FLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtTQUNyQixDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBRyxJQUFJLDBCQUFnQixDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDcEQsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO1NBQ3JCLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxHQUFHLElBQUksMEJBQWdCLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNwRCxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07U0FDckIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQztRQUMvQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDO1FBQ3ZELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDakQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUM7UUFFN0QsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNGO0FBaENELDhCQWdDQztBQUVELFNBQVMsU0FBUyxDQUFDLEtBQWdCLEVBQUUsTUFBeUI7SUFDNUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtRQUNuRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBsb2dzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1sb2dzJztcbmltcG9ydCAqIGFzIHMzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMyc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IE9wZW5DbGF3QXBwQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgTG9nZ2luZ0NvbnN0cnVjdCB9IGZyb20gJy4uL2NvbnN0cnVjdHMvbG9nZ2luZyc7XG5pbXBvcnQgeyBJbXBvcnRlZFNlY3JldHMsIFNlY3JldHNDb25zdHJ1Y3QgfSBmcm9tICcuLi9jb25zdHJ1Y3RzL3NlY3JldHMnO1xuaW1wb3J0IHsgU25hcHNob3RCdWNrZXRDb25zdHJ1Y3QgfSBmcm9tICcuLi9jb25zdHJ1Y3RzL3MzLXNuYXBzaG90JztcblxuZXhwb3J0IGludGVyZmFjZSBEYXRhU3RhY2tQcm9wcyBleHRlbmRzIGNkay5TdGFja1Byb3BzIHtcbiAgcmVhZG9ubHkgY29uZmlnOiBPcGVuQ2xhd0FwcENvbmZpZztcbn1cblxuZXhwb3J0IGNsYXNzIERhdGFTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIHB1YmxpYyByZWFkb25seSBzbmFwc2hvdEJ1Y2tldDogczMuSUJ1Y2tldDtcbiAgcHVibGljIHJlYWRvbmx5IGltcG9ydGVkU2VjcmV0czogSW1wb3J0ZWRTZWNyZXRzO1xuICBwdWJsaWMgcmVhZG9ubHkgYXBwbGljYXRpb25Mb2dHcm91cDogbG9ncy5JTG9nR3JvdXA7XG4gIHB1YmxpYyByZWFkb25seSBjaHJvbWl1bUxvZ0dyb3VwOiBsb2dzLklMb2dHcm91cDtcbiAgcHVibGljIHJlYWRvbmx5IGV4ZWNMb2dHcm91cDogbG9ncy5JTG9nR3JvdXA7XG4gIHB1YmxpYyByZWFkb25seSBleGVjdXRlQ29tbWFuZExvZ0dyb3VwOiBsb2dzLklMb2dHcm91cDtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogRGF0YVN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHNuYXBzaG90ID0gbmV3IFNuYXBzaG90QnVja2V0Q29uc3RydWN0KHRoaXMsICdTbmFwc2hvdEJ1Y2tldCcsIHtcbiAgICAgIGNvbmZpZzogcHJvcHMuY29uZmlnLFxuICAgIH0pO1xuXG4gICAgY29uc3QgbG9nZ2luZyA9IG5ldyBMb2dnaW5nQ29uc3RydWN0KHRoaXMsICdMb2dnaW5nJywge1xuICAgICAgY29uZmlnOiBwcm9wcy5jb25maWcsXG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWNyZXRzID0gbmV3IFNlY3JldHNDb25zdHJ1Y3QodGhpcywgJ1NlY3JldHMnLCB7XG4gICAgICBjb25maWc6IHByb3BzLmNvbmZpZyxcbiAgICB9KTtcblxuICAgIHRoaXMuc25hcHNob3RCdWNrZXQgPSBzbmFwc2hvdC5idWNrZXQ7XG4gICAgdGhpcy5pbXBvcnRlZFNlY3JldHMgPSBzZWNyZXRzLmltcG9ydGVkU2VjcmV0cztcbiAgICB0aGlzLmFwcGxpY2F0aW9uTG9nR3JvdXAgPSBsb2dnaW5nLmFwcGxpY2F0aW9uTG9nR3JvdXA7XG4gICAgdGhpcy5jaHJvbWl1bUxvZ0dyb3VwID0gbG9nZ2luZy5jaHJvbWl1bUxvZ0dyb3VwO1xuICAgIHRoaXMuZXhlY0xvZ0dyb3VwID0gbG9nZ2luZy5leGVjTG9nR3JvdXA7XG4gICAgdGhpcy5leGVjdXRlQ29tbWFuZExvZ0dyb3VwID0gbG9nZ2luZy5leGVjdXRlQ29tbWFuZExvZ0dyb3VwO1xuXG4gICAgYXBwbHlUYWdzKHRoaXMsIHByb3BzLmNvbmZpZyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUYWdzKHN0YWNrOiBjZGsuU3RhY2ssIGNvbmZpZzogT3BlbkNsYXdBcHBDb25maWcpOiB2b2lkIHtcbiAgT2JqZWN0LmVudHJpZXMoY29uZmlnLnRhZ3MpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIGNkay5UYWdzLm9mKHN0YWNrKS5hZGQoa2V5LCB2YWx1ZSk7XG4gIH0pO1xufVxuXG4iXX0=