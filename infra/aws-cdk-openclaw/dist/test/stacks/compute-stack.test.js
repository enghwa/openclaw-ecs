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
const cdk = __importStar(require("aws-cdk-lib"));
const assertions_1 = require("aws-cdk-lib/assertions");
const app_config_1 = require("../../lib/config/app-config");
const compute_stack_1 = require("../../lib/stacks/compute-stack");
const data_stack_1 = require("../../lib/stacks/data-stack");
const network_stack_1 = require("../../lib/stacks/network-stack");
describe('ComputeStack', () => {
    test('creates a single-instance Fargate service with ECS Exec enabled', () => {
        const app = new cdk.App();
        const network = new network_stack_1.NetworkStack(app, 'TestNetwork', {
            config: app_config_1.defaultConfig,
        });
        const data = new data_stack_1.DataStack(app, 'TestData', {
            config: app_config_1.defaultConfig,
        });
        const stack = new compute_stack_1.ComputeStack(app, 'TestCompute', {
            config: app_config_1.defaultConfig,
            vpc: network.vpc,
            serviceSecurityGroup: network.serviceSecurityGroup,
            snapshotBucket: data.snapshotBucket,
            importedSecrets: data.importedSecrets,
            applicationLogGroup: data.applicationLogGroup,
            chromiumLogGroup: data.chromiumLogGroup,
            execLogGroup: data.execLogGroup,
            executeCommandLogGroup: data.executeCommandLogGroup,
        });
        const template = assertions_1.Template.fromStack(stack);
        template.hasResourceProperties('AWS::ECS::TaskDefinition', {
            Cpu: `${app_config_1.defaultConfig.task.cpu}`,
            Memory: `${app_config_1.defaultConfig.task.memoryMiB}`,
            EphemeralStorage: {
                SizeInGiB: app_config_1.defaultConfig.task.ephemeralStorageGiB,
            },
            ContainerDefinitions: assertions_1.Match.arrayWith([
                assertions_1.Match.objectLike({
                    Name: 'main',
                    PortMappings: assertions_1.Match.arrayWith([
                        assertions_1.Match.objectLike({
                            ContainerPort: app_config_1.defaultConfig.port,
                        }),
                    ]),
                }),
                assertions_1.Match.objectLike({
                    Name: 'chromium',
                }),
                assertions_1.Match.objectLike({
                    Name: 'exec-tunnel',
                }),
            ]),
        });
        template.hasResourceProperties('AWS::ECS::Service', {
            DesiredCount: 1,
            EnableExecuteCommand: true,
            DeploymentConfiguration: assertions_1.Match.objectLike({
                MaximumPercent: 100,
                MinimumHealthyPercent: 0,
            }),
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHV0ZS1zdGFjay50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdC9zdGFja3MvY29tcHV0ZS1zdGFjay50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQW1DO0FBQ25DLHVEQUF5RDtBQUN6RCw0REFBNEQ7QUFDNUQsa0VBQThEO0FBQzlELDREQUF3RDtBQUN4RCxrRUFBOEQ7QUFFOUQsUUFBUSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUU7SUFDNUIsSUFBSSxDQUFDLGlFQUFpRSxFQUFFLEdBQUcsRUFBRTtRQUMzRSxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQixNQUFNLE9BQU8sR0FBRyxJQUFJLDRCQUFZLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRTtZQUNuRCxNQUFNLEVBQUUsMEJBQWE7U0FDdEIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsSUFBSSxzQkFBUyxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUU7WUFDMUMsTUFBTSxFQUFFLDBCQUFhO1NBQ3RCLENBQUMsQ0FBQztRQUNILE1BQU0sS0FBSyxHQUFHLElBQUksNEJBQVksQ0FBQyxHQUFHLEVBQUUsYUFBYSxFQUFFO1lBQ2pELE1BQU0sRUFBRSwwQkFBYTtZQUNyQixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7WUFDaEIsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLG9CQUFvQjtZQUNsRCxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDbkMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUI7WUFDN0MsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUN2QyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDL0Isc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQjtTQUNwRCxDQUFDLENBQUM7UUFFSCxNQUFNLFFBQVEsR0FBRyxxQkFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQyxRQUFRLENBQUMscUJBQXFCLENBQUMsMEJBQTBCLEVBQUU7WUFDekQsR0FBRyxFQUFFLEdBQUcsMEJBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2hDLE1BQU0sRUFBRSxHQUFHLDBCQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN6QyxnQkFBZ0IsRUFBRTtnQkFDaEIsU0FBUyxFQUFFLDBCQUFhLENBQUMsSUFBSSxDQUFDLG1CQUFtQjthQUNsRDtZQUNELG9CQUFvQixFQUFFLGtCQUFLLENBQUMsU0FBUyxDQUFDO2dCQUNwQyxrQkFBSyxDQUFDLFVBQVUsQ0FBQztvQkFDZixJQUFJLEVBQUUsTUFBTTtvQkFDWixZQUFZLEVBQUUsa0JBQUssQ0FBQyxTQUFTLENBQUM7d0JBQzVCLGtCQUFLLENBQUMsVUFBVSxDQUFDOzRCQUNmLGFBQWEsRUFBRSwwQkFBYSxDQUFDLElBQUk7eUJBQ2xDLENBQUM7cUJBQ0gsQ0FBQztpQkFDSCxDQUFDO2dCQUNGLGtCQUFLLENBQUMsVUFBVSxDQUFDO29CQUNmLElBQUksRUFBRSxVQUFVO2lCQUNqQixDQUFDO2dCQUNGLGtCQUFLLENBQUMsVUFBVSxDQUFDO29CQUNmLElBQUksRUFBRSxhQUFhO2lCQUNwQixDQUFDO2FBQ0gsQ0FBQztTQUNILENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsRUFBRTtZQUNsRCxZQUFZLEVBQUUsQ0FBQztZQUNmLG9CQUFvQixFQUFFLElBQUk7WUFDMUIsdUJBQXVCLEVBQUUsa0JBQUssQ0FBQyxVQUFVLENBQUM7Z0JBQ3hDLGNBQWMsRUFBRSxHQUFHO2dCQUNuQixxQkFBcUIsRUFBRSxDQUFDO2FBQ3pCLENBQUM7U0FDSCxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IE1hdGNoLCBUZW1wbGF0ZSB9IGZyb20gJ2F3cy1jZGstbGliL2Fzc2VydGlvbnMnO1xuaW1wb3J0IHsgZGVmYXVsdENvbmZpZyB9IGZyb20gJy4uLy4uL2xpYi9jb25maWcvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBDb21wdXRlU3RhY2sgfSBmcm9tICcuLi8uLi9saWIvc3RhY2tzL2NvbXB1dGUtc3RhY2snO1xuaW1wb3J0IHsgRGF0YVN0YWNrIH0gZnJvbSAnLi4vLi4vbGliL3N0YWNrcy9kYXRhLXN0YWNrJztcbmltcG9ydCB7IE5ldHdvcmtTdGFjayB9IGZyb20gJy4uLy4uL2xpYi9zdGFja3MvbmV0d29yay1zdGFjayc7XG5cbmRlc2NyaWJlKCdDb21wdXRlU3RhY2snLCAoKSA9PiB7XG4gIHRlc3QoJ2NyZWF0ZXMgYSBzaW5nbGUtaW5zdGFuY2UgRmFyZ2F0ZSBzZXJ2aWNlIHdpdGggRUNTIEV4ZWMgZW5hYmxlZCcsICgpID0+IHtcbiAgICBjb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuICAgIGNvbnN0IG5ldHdvcmsgPSBuZXcgTmV0d29ya1N0YWNrKGFwcCwgJ1Rlc3ROZXR3b3JrJywge1xuICAgICAgY29uZmlnOiBkZWZhdWx0Q29uZmlnLFxuICAgIH0pO1xuICAgIGNvbnN0IGRhdGEgPSBuZXcgRGF0YVN0YWNrKGFwcCwgJ1Rlc3REYXRhJywge1xuICAgICAgY29uZmlnOiBkZWZhdWx0Q29uZmlnLFxuICAgIH0pO1xuICAgIGNvbnN0IHN0YWNrID0gbmV3IENvbXB1dGVTdGFjayhhcHAsICdUZXN0Q29tcHV0ZScsIHtcbiAgICAgIGNvbmZpZzogZGVmYXVsdENvbmZpZyxcbiAgICAgIHZwYzogbmV0d29yay52cGMsXG4gICAgICBzZXJ2aWNlU2VjdXJpdHlHcm91cDogbmV0d29yay5zZXJ2aWNlU2VjdXJpdHlHcm91cCxcbiAgICAgIHNuYXBzaG90QnVja2V0OiBkYXRhLnNuYXBzaG90QnVja2V0LFxuICAgICAgaW1wb3J0ZWRTZWNyZXRzOiBkYXRhLmltcG9ydGVkU2VjcmV0cyxcbiAgICAgIGFwcGxpY2F0aW9uTG9nR3JvdXA6IGRhdGEuYXBwbGljYXRpb25Mb2dHcm91cCxcbiAgICAgIGNocm9taXVtTG9nR3JvdXA6IGRhdGEuY2hyb21pdW1Mb2dHcm91cCxcbiAgICAgIGV4ZWNMb2dHcm91cDogZGF0YS5leGVjTG9nR3JvdXAsXG4gICAgICBleGVjdXRlQ29tbWFuZExvZ0dyb3VwOiBkYXRhLmV4ZWN1dGVDb21tYW5kTG9nR3JvdXAsXG4gICAgfSk7XG5cbiAgICBjb25zdCB0ZW1wbGF0ZSA9IFRlbXBsYXRlLmZyb21TdGFjayhzdGFjayk7XG5cbiAgICB0ZW1wbGF0ZS5oYXNSZXNvdXJjZVByb3BlcnRpZXMoJ0FXUzo6RUNTOjpUYXNrRGVmaW5pdGlvbicsIHtcbiAgICAgIENwdTogYCR7ZGVmYXVsdENvbmZpZy50YXNrLmNwdX1gLFxuICAgICAgTWVtb3J5OiBgJHtkZWZhdWx0Q29uZmlnLnRhc2subWVtb3J5TWlCfWAsXG4gICAgICBFcGhlbWVyYWxTdG9yYWdlOiB7XG4gICAgICAgIFNpemVJbkdpQjogZGVmYXVsdENvbmZpZy50YXNrLmVwaGVtZXJhbFN0b3JhZ2VHaUIsXG4gICAgICB9LFxuICAgICAgQ29udGFpbmVyRGVmaW5pdGlvbnM6IE1hdGNoLmFycmF5V2l0aChbXG4gICAgICAgIE1hdGNoLm9iamVjdExpa2Uoe1xuICAgICAgICAgIE5hbWU6ICdtYWluJyxcbiAgICAgICAgICBQb3J0TWFwcGluZ3M6IE1hdGNoLmFycmF5V2l0aChbXG4gICAgICAgICAgICBNYXRjaC5vYmplY3RMaWtlKHtcbiAgICAgICAgICAgICAgQ29udGFpbmVyUG9ydDogZGVmYXVsdENvbmZpZy5wb3J0LFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgXSksXG4gICAgICAgIH0pLFxuICAgICAgICBNYXRjaC5vYmplY3RMaWtlKHtcbiAgICAgICAgICBOYW1lOiAnY2hyb21pdW0nLFxuICAgICAgICB9KSxcbiAgICAgICAgTWF0Y2gub2JqZWN0TGlrZSh7XG4gICAgICAgICAgTmFtZTogJ2V4ZWMtdHVubmVsJyxcbiAgICAgICAgfSksXG4gICAgICBdKSxcbiAgICB9KTtcblxuICAgIHRlbXBsYXRlLmhhc1Jlc291cmNlUHJvcGVydGllcygnQVdTOjpFQ1M6OlNlcnZpY2UnLCB7XG4gICAgICBEZXNpcmVkQ291bnQ6IDEsXG4gICAgICBFbmFibGVFeGVjdXRlQ29tbWFuZDogdHJ1ZSxcbiAgICAgIERlcGxveW1lbnRDb25maWd1cmF0aW9uOiBNYXRjaC5vYmplY3RMaWtlKHtcbiAgICAgICAgTWF4aW11bVBlcmNlbnQ6IDEwMCxcbiAgICAgICAgTWluaW11bUhlYWx0aHlQZXJjZW50OiAwLFxuICAgICAgfSksXG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbiJdfQ==