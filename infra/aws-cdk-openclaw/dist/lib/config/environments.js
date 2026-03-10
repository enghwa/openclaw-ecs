"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentConfig = getEnvironmentConfig;
const app_config_1 = require("./app-config");
const environmentOverrides = {
    dev: {
        envName: 'dev',
        stackPrefix: 'openclaw-dev',
        snapshotPrefix: 'state/dev',
    },
    prod: {
        envName: 'prod',
        stackPrefix: 'openclaw-prod',
        snapshotPrefix: 'state/prod',
    },
};
function getEnvironmentConfig(app) {
    const envName = app.node.tryGetContext('env') ?? process.env.OPENCLAW_ENV ?? app_config_1.defaultConfig.envName;
    const override = environmentOverrides[envName] ?? {};
    return {
        ...app_config_1.defaultConfig,
        ...override,
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
        images: {
            ...app_config_1.defaultConfig.images,
            ...(override.images ?? {}),
        },
        network: {
            ...app_config_1.defaultConfig.network,
            ...(override.network ?? {}),
        },
        task: {
            ...app_config_1.defaultConfig.task,
            ...(override.task ?? {}),
        },
        secretNames: {
            ...app_config_1.defaultConfig.secretNames,
            ...(override.secretNames ?? {}),
        },
        tags: {
            ...app_config_1.defaultConfig.tags,
            ...(override.tags ?? {}),
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2NvbmZpZy9lbnZpcm9ubWVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFnQkEsb0RBOEJDO0FBN0NELDZDQUFnRTtBQUVoRSxNQUFNLG9CQUFvQixHQUErQztJQUN2RSxHQUFHLEVBQUU7UUFDSCxPQUFPLEVBQUUsS0FBSztRQUNkLFdBQVcsRUFBRSxjQUFjO1FBQzNCLGNBQWMsRUFBRSxXQUFXO0tBQzVCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFLE1BQU07UUFDZixXQUFXLEVBQUUsZUFBZTtRQUM1QixjQUFjLEVBQUUsWUFBWTtLQUM3QjtDQUNGLENBQUM7QUFFRixTQUFnQixvQkFBb0IsQ0FBQyxHQUFZO0lBQy9DLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLDBCQUFhLENBQUMsT0FBTyxDQUFDO0lBQ25HLE1BQU0sUUFBUSxHQUFHLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVyRCxPQUFPO1FBQ0wsR0FBRywwQkFBYTtRQUNoQixHQUFHLFFBQVE7UUFDWCxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUI7UUFDeEMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCO1FBQ3RDLE1BQU0sRUFBRTtZQUNOLEdBQUcsMEJBQWEsQ0FBQyxNQUFNO1lBQ3ZCLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztTQUMzQjtRQUNELE9BQU8sRUFBRTtZQUNQLEdBQUcsMEJBQWEsQ0FBQyxPQUFPO1lBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztTQUM1QjtRQUNELElBQUksRUFBRTtZQUNKLEdBQUcsMEJBQWEsQ0FBQyxJQUFJO1lBQ3JCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELFdBQVcsRUFBRTtZQUNYLEdBQUcsMEJBQWEsQ0FBQyxXQUFXO1lBQzVCLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztTQUNoQztRQUNELElBQUksRUFBRTtZQUNKLEdBQUcsMEJBQWEsQ0FBQyxJQUFJO1lBQ3JCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUN6QjtLQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IGRlZmF1bHRDb25maWcsIE9wZW5DbGF3QXBwQ29uZmlnIH0gZnJvbSAnLi9hcHAtY29uZmlnJztcblxuY29uc3QgZW52aXJvbm1lbnRPdmVycmlkZXM6IFJlY29yZDxzdHJpbmcsIFBhcnRpYWw8T3BlbkNsYXdBcHBDb25maWc+PiA9IHtcbiAgZGV2OiB7XG4gICAgZW52TmFtZTogJ2RldicsXG4gICAgc3RhY2tQcmVmaXg6ICdvcGVuY2xhdy1kZXYnLFxuICAgIHNuYXBzaG90UHJlZml4OiAnc3RhdGUvZGV2JyxcbiAgfSxcbiAgcHJvZDoge1xuICAgIGVudk5hbWU6ICdwcm9kJyxcbiAgICBzdGFja1ByZWZpeDogJ29wZW5jbGF3LXByb2QnLFxuICAgIHNuYXBzaG90UHJlZml4OiAnc3RhdGUvcHJvZCcsXG4gIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW52aXJvbm1lbnRDb25maWcoYXBwOiBjZGsuQXBwKTogT3BlbkNsYXdBcHBDb25maWcge1xuICBjb25zdCBlbnZOYW1lID0gYXBwLm5vZGUudHJ5R2V0Q29udGV4dCgnZW52JykgPz8gcHJvY2Vzcy5lbnYuT1BFTkNMQVdfRU5WID8/IGRlZmF1bHRDb25maWcuZW52TmFtZTtcbiAgY29uc3Qgb3ZlcnJpZGUgPSBlbnZpcm9ubWVudE92ZXJyaWRlc1tlbnZOYW1lXSA/PyB7fTtcblxuICByZXR1cm4ge1xuICAgIC4uLmRlZmF1bHRDb25maWcsXG4gICAgLi4ub3ZlcnJpZGUsXG4gICAgYWNjb3VudDogcHJvY2Vzcy5lbnYuQ0RLX0RFRkFVTFRfQUNDT1VOVCxcbiAgICByZWdpb246IHByb2Nlc3MuZW52LkNES19ERUZBVUxUX1JFR0lPTixcbiAgICBpbWFnZXM6IHtcbiAgICAgIC4uLmRlZmF1bHRDb25maWcuaW1hZ2VzLFxuICAgICAgLi4uKG92ZXJyaWRlLmltYWdlcyA/PyB7fSksXG4gICAgfSxcbiAgICBuZXR3b3JrOiB7XG4gICAgICAuLi5kZWZhdWx0Q29uZmlnLm5ldHdvcmssXG4gICAgICAuLi4ob3ZlcnJpZGUubmV0d29yayA/PyB7fSksXG4gICAgfSxcbiAgICB0YXNrOiB7XG4gICAgICAuLi5kZWZhdWx0Q29uZmlnLnRhc2ssXG4gICAgICAuLi4ob3ZlcnJpZGUudGFzayA/PyB7fSksXG4gICAgfSxcbiAgICBzZWNyZXROYW1lczoge1xuICAgICAgLi4uZGVmYXVsdENvbmZpZy5zZWNyZXROYW1lcyxcbiAgICAgIC4uLihvdmVycmlkZS5zZWNyZXROYW1lcyA/PyB7fSksXG4gICAgfSxcbiAgICB0YWdzOiB7XG4gICAgICAuLi5kZWZhdWx0Q29uZmlnLnRhZ3MsXG4gICAgICAuLi4ob3ZlcnJpZGUudGFncyA/PyB7fSksXG4gICAgfSxcbiAgfTtcbn1cblxuIl19