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
exports.SecretsConstruct = void 0;
exports.toEcsSecrets = toEcsSecrets;
const ecs = __importStar(require("aws-cdk-lib/aws-ecs"));
const secretsmanager = __importStar(require("aws-cdk-lib/aws-secretsmanager"));
const constructs_1 = require("constructs");
class SecretsConstruct extends constructs_1.Construct {
    importedSecrets;
    constructor(scope, id, props) {
        super(scope, id);
        this.importedSecrets = {
            anthropicApiKey: importByName(this, 'AnthropicApiKey', props.config.secretNames.anthropicApiKey),
            openclawGatewayToken: importByName(this, 'OpenClawGatewayToken', props.config.secretNames.openclawGatewayToken),
            openaiApiKey: importByName(this, 'OpenAiApiKey', props.config.secretNames.openaiApiKey),
            slackBotToken: importByName(this, 'SlackBotToken', props.config.secretNames.slackBotToken),
            slackAppToken: importByName(this, 'SlackAppToken', props.config.secretNames.slackAppToken),
            telegramBotToken: importByName(this, 'TelegramBotToken', props.config.secretNames.telegramBotToken),
            discordBotToken: importByName(this, 'DiscordBotToken', props.config.secretNames.discordBotToken),
        };
    }
}
exports.SecretsConstruct = SecretsConstruct;
function toEcsSecrets(importedSecrets) {
    const result = {};
    addSecret(result, 'ANTHROPIC_API_KEY', importedSecrets.anthropicApiKey);
    addSecret(result, 'OPENCLAW_GATEWAY_TOKEN', importedSecrets.openclawGatewayToken);
    addSecret(result, 'OPENAI_API_KEY', importedSecrets.openaiApiKey);
    addSecret(result, 'SLACK_BOT_TOKEN', importedSecrets.slackBotToken);
    addSecret(result, 'SLACK_APP_TOKEN', importedSecrets.slackAppToken);
    addSecret(result, 'TELEGRAM_BOT_TOKEN', importedSecrets.telegramBotToken);
    addSecret(result, 'DISCORD_BOT_TOKEN', importedSecrets.discordBotToken);
    return result;
}
function importByName(scope, id, secretName) {
    if (!secretName) {
        return undefined;
    }
    return secretsmanager.Secret.fromSecretNameV2(scope, id, secretName);
}
function addSecret(target, envName, secret) {
    if (secret) {
        target[envName] = ecs.Secret.fromSecretsManager(secret);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjcmV0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb25zdHJ1Y3RzL3NlY3JldHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUNBLG9DQVlDO0FBakRELHlEQUEyQztBQUMzQywrRUFBaUU7QUFDakUsMkNBQXVDO0FBaUJ2QyxNQUFhLGdCQUFpQixTQUFRLHNCQUFTO0lBQzdCLGVBQWUsQ0FBa0I7SUFFakQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUE0QjtRQUNwRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLElBQUksQ0FBQyxlQUFlLEdBQUc7WUFDckIsZUFBZSxFQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDO1lBQ2hHLG9CQUFvQixFQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUM7WUFDL0csWUFBWSxFQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztZQUN2RixhQUFhLEVBQUUsWUFBWSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO1lBQzFGLGFBQWEsRUFBRSxZQUFZLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7WUFDMUYsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNuRyxlQUFlLEVBQUUsWUFBWSxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUM7U0FDakcsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWhCRCw0Q0FnQkM7QUFFRCxTQUFnQixZQUFZLENBQUMsZUFBZ0M7SUFDM0QsTUFBTSxNQUFNLEdBQStCLEVBQUUsQ0FBQztJQUU5QyxTQUFTLENBQUMsTUFBTSxFQUFFLG1CQUFtQixFQUFFLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN4RSxTQUFTLENBQUMsTUFBTSxFQUFFLHdCQUF3QixFQUFFLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2xGLFNBQVMsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2xFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3BFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3BFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDMUUsU0FBUyxDQUFDLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFeEUsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLEtBQWdCLEVBQUUsRUFBVSxFQUFFLFVBQW1CO0lBQ3JFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsT0FBTyxjQUFjLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkUsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLE1BQWtDLEVBQUUsT0FBZSxFQUFFLE1BQStCO0lBQ3JHLElBQUksTUFBTSxFQUFFLENBQUM7UUFDWCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRCxDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGVjcyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWNzJztcbmltcG9ydCAqIGFzIHNlY3JldHNtYW5hZ2VyIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zZWNyZXRzbWFuYWdlcic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IE9wZW5DbGF3QXBwQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2FwcC1jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEltcG9ydGVkU2VjcmV0cyB7XG4gIHJlYWRvbmx5IGFudGhyb3BpY0FwaUtleT86IHNlY3JldHNtYW5hZ2VyLklTZWNyZXQ7XG4gIHJlYWRvbmx5IG9wZW5jbGF3R2F0ZXdheVRva2VuPzogc2VjcmV0c21hbmFnZXIuSVNlY3JldDtcbiAgcmVhZG9ubHkgb3BlbmFpQXBpS2V5Pzogc2VjcmV0c21hbmFnZXIuSVNlY3JldDtcbiAgcmVhZG9ubHkgc2xhY2tCb3RUb2tlbj86IHNlY3JldHNtYW5hZ2VyLklTZWNyZXQ7XG4gIHJlYWRvbmx5IHNsYWNrQXBwVG9rZW4/OiBzZWNyZXRzbWFuYWdlci5JU2VjcmV0O1xuICByZWFkb25seSB0ZWxlZ3JhbUJvdFRva2VuPzogc2VjcmV0c21hbmFnZXIuSVNlY3JldDtcbiAgcmVhZG9ubHkgZGlzY29yZEJvdFRva2VuPzogc2VjcmV0c21hbmFnZXIuSVNlY3JldDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZWNyZXRzQ29uc3RydWN0UHJvcHMge1xuICByZWFkb25seSBjb25maWc6IE9wZW5DbGF3QXBwQ29uZmlnO1xufVxuXG5leHBvcnQgY2xhc3MgU2VjcmV0c0NvbnN0cnVjdCBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyByZWFkb25seSBpbXBvcnRlZFNlY3JldHM6IEltcG9ydGVkU2VjcmV0cztcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogU2VjcmV0c0NvbnN0cnVjdFByb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIHRoaXMuaW1wb3J0ZWRTZWNyZXRzID0ge1xuICAgICAgYW50aHJvcGljQXBpS2V5OiBpbXBvcnRCeU5hbWUodGhpcywgJ0FudGhyb3BpY0FwaUtleScsIHByb3BzLmNvbmZpZy5zZWNyZXROYW1lcy5hbnRocm9waWNBcGlLZXkpLFxuICAgICAgb3BlbmNsYXdHYXRld2F5VG9rZW46IGltcG9ydEJ5TmFtZSh0aGlzLCAnT3BlbkNsYXdHYXRld2F5VG9rZW4nLCBwcm9wcy5jb25maWcuc2VjcmV0TmFtZXMub3BlbmNsYXdHYXRld2F5VG9rZW4pLFxuICAgICAgb3BlbmFpQXBpS2V5OiBpbXBvcnRCeU5hbWUodGhpcywgJ09wZW5BaUFwaUtleScsIHByb3BzLmNvbmZpZy5zZWNyZXROYW1lcy5vcGVuYWlBcGlLZXkpLFxuICAgICAgc2xhY2tCb3RUb2tlbjogaW1wb3J0QnlOYW1lKHRoaXMsICdTbGFja0JvdFRva2VuJywgcHJvcHMuY29uZmlnLnNlY3JldE5hbWVzLnNsYWNrQm90VG9rZW4pLFxuICAgICAgc2xhY2tBcHBUb2tlbjogaW1wb3J0QnlOYW1lKHRoaXMsICdTbGFja0FwcFRva2VuJywgcHJvcHMuY29uZmlnLnNlY3JldE5hbWVzLnNsYWNrQXBwVG9rZW4pLFxuICAgICAgdGVsZWdyYW1Cb3RUb2tlbjogaW1wb3J0QnlOYW1lKHRoaXMsICdUZWxlZ3JhbUJvdFRva2VuJywgcHJvcHMuY29uZmlnLnNlY3JldE5hbWVzLnRlbGVncmFtQm90VG9rZW4pLFxuICAgICAgZGlzY29yZEJvdFRva2VuOiBpbXBvcnRCeU5hbWUodGhpcywgJ0Rpc2NvcmRCb3RUb2tlbicsIHByb3BzLmNvbmZpZy5zZWNyZXROYW1lcy5kaXNjb3JkQm90VG9rZW4pLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRWNzU2VjcmV0cyhpbXBvcnRlZFNlY3JldHM6IEltcG9ydGVkU2VjcmV0cyk6IFJlY29yZDxzdHJpbmcsIGVjcy5TZWNyZXQ+IHtcbiAgY29uc3QgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBlY3MuU2VjcmV0PiA9IHt9O1xuXG4gIGFkZFNlY3JldChyZXN1bHQsICdBTlRIUk9QSUNfQVBJX0tFWScsIGltcG9ydGVkU2VjcmV0cy5hbnRocm9waWNBcGlLZXkpO1xuICBhZGRTZWNyZXQocmVzdWx0LCAnT1BFTkNMQVdfR0FURVdBWV9UT0tFTicsIGltcG9ydGVkU2VjcmV0cy5vcGVuY2xhd0dhdGV3YXlUb2tlbik7XG4gIGFkZFNlY3JldChyZXN1bHQsICdPUEVOQUlfQVBJX0tFWScsIGltcG9ydGVkU2VjcmV0cy5vcGVuYWlBcGlLZXkpO1xuICBhZGRTZWNyZXQocmVzdWx0LCAnU0xBQ0tfQk9UX1RPS0VOJywgaW1wb3J0ZWRTZWNyZXRzLnNsYWNrQm90VG9rZW4pO1xuICBhZGRTZWNyZXQocmVzdWx0LCAnU0xBQ0tfQVBQX1RPS0VOJywgaW1wb3J0ZWRTZWNyZXRzLnNsYWNrQXBwVG9rZW4pO1xuICBhZGRTZWNyZXQocmVzdWx0LCAnVEVMRUdSQU1fQk9UX1RPS0VOJywgaW1wb3J0ZWRTZWNyZXRzLnRlbGVncmFtQm90VG9rZW4pO1xuICBhZGRTZWNyZXQocmVzdWx0LCAnRElTQ09SRF9CT1RfVE9LRU4nLCBpbXBvcnRlZFNlY3JldHMuZGlzY29yZEJvdFRva2VuKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBpbXBvcnRCeU5hbWUoc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgc2VjcmV0TmFtZT86IHN0cmluZyk6IHNlY3JldHNtYW5hZ2VyLklTZWNyZXQgfCB1bmRlZmluZWQge1xuICBpZiAoIXNlY3JldE5hbWUpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIHNlY3JldHNtYW5hZ2VyLlNlY3JldC5mcm9tU2VjcmV0TmFtZVYyKHNjb3BlLCBpZCwgc2VjcmV0TmFtZSk7XG59XG5cbmZ1bmN0aW9uIGFkZFNlY3JldCh0YXJnZXQ6IFJlY29yZDxzdHJpbmcsIGVjcy5TZWNyZXQ+LCBlbnZOYW1lOiBzdHJpbmcsIHNlY3JldD86IHNlY3JldHNtYW5hZ2VyLklTZWNyZXQpOiB2b2lkIHtcbiAgaWYgKHNlY3JldCkge1xuICAgIHRhcmdldFtlbnZOYW1lXSA9IGVjcy5TZWNyZXQuZnJvbVNlY3JldHNNYW5hZ2VyKHNlY3JldCk7XG4gIH1cbn1cblxuIl19