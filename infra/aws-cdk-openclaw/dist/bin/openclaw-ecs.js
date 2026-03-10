#!/usr/bin/env node
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
const environments_1 = require("../lib/config/environments");
const data_stack_1 = require("../lib/stacks/data-stack");
const compute_stack_1 = require("../lib/stacks/compute-stack");
const network_stack_1 = require("../lib/stacks/network-stack");
const app = new cdk.App();
const config = (0, environments_1.getEnvironmentConfig)(app);
const stackEnv = config.account && config.region
    ? {
        account: config.account,
        region: config.region,
    }
    : undefined;
const networkStack = new network_stack_1.NetworkStack(app, `${config.stackPrefix}-network`, {
    env: stackEnv,
    config,
});
const dataStack = new data_stack_1.DataStack(app, `${config.stackPrefix}-data`, {
    env: stackEnv,
    config,
});
new compute_stack_1.ComputeStack(app, `${config.stackPrefix}-compute`, {
    env: stackEnv,
    config,
    vpc: networkStack.vpc,
    serviceSecurityGroup: networkStack.serviceSecurityGroup,
    snapshotBucket: dataStack.snapshotBucket,
    importedSecrets: dataStack.importedSecrets,
    applicationLogGroup: dataStack.applicationLogGroup,
    chromiumLogGroup: dataStack.chromiumLogGroup,
    execLogGroup: dataStack.execLogGroup,
    executeCommandLogGroup: dataStack.executeCommandLogGroup,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlbmNsYXctZWNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vYmluL29wZW5jbGF3LWVjcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpREFBbUM7QUFDbkMsNkRBQWtFO0FBQ2xFLHlEQUFxRDtBQUNyRCwrREFBMkQ7QUFDM0QsK0RBQTJEO0FBRTNELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLE1BQU0sTUFBTSxHQUFHLElBQUEsbUNBQW9CLEVBQUMsR0FBRyxDQUFDLENBQUM7QUFFekMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsTUFBTTtJQUM5QyxDQUFDLENBQUM7UUFDRSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87UUFDdkIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO0tBQ3RCO0lBQ0gsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUVkLE1BQU0sWUFBWSxHQUFHLElBQUksNEJBQVksQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsV0FBVyxVQUFVLEVBQUU7SUFDMUUsR0FBRyxFQUFFLFFBQVE7SUFDYixNQUFNO0NBQ1AsQ0FBQyxDQUFDO0FBRUgsTUFBTSxTQUFTLEdBQUcsSUFBSSxzQkFBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxXQUFXLE9BQU8sRUFBRTtJQUNqRSxHQUFHLEVBQUUsUUFBUTtJQUNiLE1BQU07Q0FDUCxDQUFDLENBQUM7QUFFSCxJQUFJLDRCQUFZLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLFdBQVcsVUFBVSxFQUFFO0lBQ3JELEdBQUcsRUFBRSxRQUFRO0lBQ2IsTUFBTTtJQUNOLEdBQUcsRUFBRSxZQUFZLENBQUMsR0FBRztJQUNyQixvQkFBb0IsRUFBRSxZQUFZLENBQUMsb0JBQW9CO0lBQ3ZELGNBQWMsRUFBRSxTQUFTLENBQUMsY0FBYztJQUN4QyxlQUFlLEVBQUUsU0FBUyxDQUFDLGVBQWU7SUFDMUMsbUJBQW1CLEVBQUUsU0FBUyxDQUFDLG1CQUFtQjtJQUNsRCxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsZ0JBQWdCO0lBQzVDLFlBQVksRUFBRSxTQUFTLENBQUMsWUFBWTtJQUNwQyxzQkFBc0IsRUFBRSxTQUFTLENBQUMsc0JBQXNCO0NBQ3pELENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBnZXRFbnZpcm9ubWVudENvbmZpZyB9IGZyb20gJy4uL2xpYi9jb25maWcvZW52aXJvbm1lbnRzJztcbmltcG9ydCB7IERhdGFTdGFjayB9IGZyb20gJy4uL2xpYi9zdGFja3MvZGF0YS1zdGFjayc7XG5pbXBvcnQgeyBDb21wdXRlU3RhY2sgfSBmcm9tICcuLi9saWIvc3RhY2tzL2NvbXB1dGUtc3RhY2snO1xuaW1wb3J0IHsgTmV0d29ya1N0YWNrIH0gZnJvbSAnLi4vbGliL3N0YWNrcy9uZXR3b3JrLXN0YWNrJztcblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbmNvbnN0IGNvbmZpZyA9IGdldEVudmlyb25tZW50Q29uZmlnKGFwcCk7XG5cbmNvbnN0IHN0YWNrRW52ID0gY29uZmlnLmFjY291bnQgJiYgY29uZmlnLnJlZ2lvblxuICA/IHtcbiAgICAgIGFjY291bnQ6IGNvbmZpZy5hY2NvdW50LFxuICAgICAgcmVnaW9uOiBjb25maWcucmVnaW9uLFxuICAgIH1cbiAgOiB1bmRlZmluZWQ7XG5cbmNvbnN0IG5ldHdvcmtTdGFjayA9IG5ldyBOZXR3b3JrU3RhY2soYXBwLCBgJHtjb25maWcuc3RhY2tQcmVmaXh9LW5ldHdvcmtgLCB7XG4gIGVudjogc3RhY2tFbnYsXG4gIGNvbmZpZyxcbn0pO1xuXG5jb25zdCBkYXRhU3RhY2sgPSBuZXcgRGF0YVN0YWNrKGFwcCwgYCR7Y29uZmlnLnN0YWNrUHJlZml4fS1kYXRhYCwge1xuICBlbnY6IHN0YWNrRW52LFxuICBjb25maWcsXG59KTtcblxubmV3IENvbXB1dGVTdGFjayhhcHAsIGAke2NvbmZpZy5zdGFja1ByZWZpeH0tY29tcHV0ZWAsIHtcbiAgZW52OiBzdGFja0VudixcbiAgY29uZmlnLFxuICB2cGM6IG5ldHdvcmtTdGFjay52cGMsXG4gIHNlcnZpY2VTZWN1cml0eUdyb3VwOiBuZXR3b3JrU3RhY2suc2VydmljZVNlY3VyaXR5R3JvdXAsXG4gIHNuYXBzaG90QnVja2V0OiBkYXRhU3RhY2suc25hcHNob3RCdWNrZXQsXG4gIGltcG9ydGVkU2VjcmV0czogZGF0YVN0YWNrLmltcG9ydGVkU2VjcmV0cyxcbiAgYXBwbGljYXRpb25Mb2dHcm91cDogZGF0YVN0YWNrLmFwcGxpY2F0aW9uTG9nR3JvdXAsXG4gIGNocm9taXVtTG9nR3JvdXA6IGRhdGFTdGFjay5jaHJvbWl1bUxvZ0dyb3VwLFxuICBleGVjTG9nR3JvdXA6IGRhdGFTdGFjay5leGVjTG9nR3JvdXAsXG4gIGV4ZWN1dGVDb21tYW5kTG9nR3JvdXA6IGRhdGFTdGFjay5leGVjdXRlQ29tbWFuZExvZ0dyb3VwLFxufSk7XG5cbiJdfQ==