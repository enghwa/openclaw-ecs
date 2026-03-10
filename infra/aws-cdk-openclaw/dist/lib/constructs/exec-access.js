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
exports.ExecAccessConstruct = void 0;
const ecs = __importStar(require("aws-cdk-lib/aws-ecs"));
const iam = __importStar(require("aws-cdk-lib/aws-iam"));
const constructs_1 = require("constructs");
class ExecAccessConstruct extends constructs_1.Construct {
    executeCommandConfiguration;
    constructor(scope, id, props) {
        super(scope, id);
        this.executeCommandConfiguration = {
            logging: ecs.ExecuteCommandLogging.OVERRIDE,
            logConfiguration: {
                cloudWatchLogGroup: props.executeCommandLogGroup,
                cloudWatchEncryptionEnabled: false,
            },
        };
    }
    grantTaskRole(role) {
        role.addToPrincipalPolicy(new iam.PolicyStatement({
            actions: [
                'ssmmessages:CreateControlChannel',
                'ssmmessages:CreateDataChannel',
                'ssmmessages:OpenControlChannel',
                'ssmmessages:OpenDataChannel',
            ],
            resources: ['*'],
        }));
    }
}
exports.ExecAccessConstruct = ExecAccessConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlYy1hY2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvY29uc3RydWN0cy9leGVjLWFjY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBMkM7QUFDM0MseURBQTJDO0FBRTNDLDJDQUF1QztBQU12QyxNQUFhLG1CQUFvQixTQUFRLHNCQUFTO0lBQ2hDLDJCQUEyQixDQUFrQztJQUU3RSxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQStCO1FBQ3ZFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLDJCQUEyQixHQUFHO1lBQ2pDLE9BQU8sRUFBRSxHQUFHLENBQUMscUJBQXFCLENBQUMsUUFBUTtZQUMzQyxnQkFBZ0IsRUFBRTtnQkFDaEIsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLHNCQUFzQjtnQkFDaEQsMkJBQTJCLEVBQUUsS0FBSzthQUNuQztTQUNGLENBQUM7SUFDSixDQUFDO0lBRU0sYUFBYSxDQUFDLElBQWU7UUFDbEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQztZQUNoRCxPQUFPLEVBQUU7Z0JBQ1Asa0NBQWtDO2dCQUNsQywrQkFBK0I7Z0JBQy9CLGdDQUFnQztnQkFDaEMsNkJBQTZCO2FBQzlCO1lBQ0QsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDO1NBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUNGO0FBMUJELGtEQTBCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGVjcyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWNzJztcbmltcG9ydCAqIGFzIGlhbSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcbmltcG9ydCAqIGFzIGxvZ3MgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxvZ3MnO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXhlY0FjY2Vzc0NvbnN0cnVjdFByb3BzIHtcbiAgcmVhZG9ubHkgZXhlY3V0ZUNvbW1hbmRMb2dHcm91cDogbG9ncy5JTG9nR3JvdXA7XG59XG5cbmV4cG9ydCBjbGFzcyBFeGVjQWNjZXNzQ29uc3RydWN0IGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIHJlYWRvbmx5IGV4ZWN1dGVDb21tYW5kQ29uZmlndXJhdGlvbjogZWNzLkV4ZWN1dGVDb21tYW5kQ29uZmlndXJhdGlvbjtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogRXhlY0FjY2Vzc0NvbnN0cnVjdFByb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIHRoaXMuZXhlY3V0ZUNvbW1hbmRDb25maWd1cmF0aW9uID0ge1xuICAgICAgbG9nZ2luZzogZWNzLkV4ZWN1dGVDb21tYW5kTG9nZ2luZy5PVkVSUklERSxcbiAgICAgIGxvZ0NvbmZpZ3VyYXRpb246IHtcbiAgICAgICAgY2xvdWRXYXRjaExvZ0dyb3VwOiBwcm9wcy5leGVjdXRlQ29tbWFuZExvZ0dyb3VwLFxuICAgICAgICBjbG91ZFdhdGNoRW5jcnlwdGlvbkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGdyYW50VGFza1JvbGUocm9sZTogaWFtLklSb2xlKTogdm9pZCB7XG4gICAgcm9sZS5hZGRUb1ByaW5jaXBhbFBvbGljeShuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbXG4gICAgICAgICdzc21tZXNzYWdlczpDcmVhdGVDb250cm9sQ2hhbm5lbCcsXG4gICAgICAgICdzc21tZXNzYWdlczpDcmVhdGVEYXRhQ2hhbm5lbCcsXG4gICAgICAgICdzc21tZXNzYWdlczpPcGVuQ29udHJvbENoYW5uZWwnLFxuICAgICAgICAnc3NtbWVzc2FnZXM6T3BlbkRhdGFDaGFubmVsJyxcbiAgICAgIF0sXG4gICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgIH0pKTtcbiAgfVxufVxuXG4iXX0=