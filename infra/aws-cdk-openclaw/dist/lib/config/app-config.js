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
exports.defaultConfig = void 0;
const logs = __importStar(require("aws-cdk-lib/aws-logs"));
exports.defaultConfig = {
    stackPrefix: 'openclaw',
    envName: 'dev',
    images: {
        mainBaseImage: 'ghcr.io/openclaw/openclaw:2026.3.7',
        chromiumImage: 'chromedp/headless-shell:146.0.7680.31',
        execTunnelImage: 'public.ecr.aws/amazonlinux/amazonlinux:2023',
    },
    network: {
        vpcCidr: '10.42.0.0/16',
        maxAzs: 2,
        natGateways: 1,
    },
    task: {
        cpu: 1024,
        memoryMiB: 2048,
        ephemeralStorageGiB: 50,
        platformVersion: 'LATEST',
    },
    port: 18789,
    chromiumPort: 9222,
    snapshotPrefix: 'state/dev',
    logRetention: logs.RetentionDays.ONE_MONTH,
    secretNames: {
        anthropicApiKey: 'openclaw/anthropic-api-key',
        openclawGatewayToken: 'openclaw/gateway-token',
    },
    tags: {
        Application: 'openclaw',
        ManagedBy: 'aws-cdk',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb25maWcvYXBwLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBNkM7QUFnRGhDLFFBQUEsYUFBYSxHQUFzQjtJQUM5QyxXQUFXLEVBQUUsVUFBVTtJQUN2QixPQUFPLEVBQUUsS0FBSztJQUNkLE1BQU0sRUFBRTtRQUNOLGFBQWEsRUFBRSxvQ0FBb0M7UUFDbkQsYUFBYSxFQUFFLHVDQUF1QztRQUN0RCxlQUFlLEVBQUUsNkNBQTZDO0tBQy9EO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsT0FBTyxFQUFFLGNBQWM7UUFDdkIsTUFBTSxFQUFFLENBQUM7UUFDVCxXQUFXLEVBQUUsQ0FBQztLQUNmO0lBQ0QsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLElBQUk7UUFDVCxTQUFTLEVBQUUsSUFBSTtRQUNmLG1CQUFtQixFQUFFLEVBQUU7UUFDdkIsZUFBZSxFQUFFLFFBQVE7S0FDMUI7SUFDRCxJQUFJLEVBQUUsS0FBSztJQUNYLFlBQVksRUFBRSxJQUFJO0lBQ2xCLGNBQWMsRUFBRSxXQUFXO0lBQzNCLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVM7SUFDMUMsV0FBVyxFQUFFO1FBQ1gsZUFBZSxFQUFFLDRCQUE0QjtRQUM3QyxvQkFBb0IsRUFBRSx3QkFBd0I7S0FDL0M7SUFDRCxJQUFJLEVBQUU7UUFDSixXQUFXLEVBQUUsVUFBVTtRQUN2QixTQUFTLEVBQUUsU0FBUztLQUNyQjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBsb2dzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1sb2dzJztcblxuZXhwb3J0IGludGVyZmFjZSBPcGVuQ2xhd0ltYWdlQ29uZmlnIHtcbiAgcmVhZG9ubHkgbWFpbkJhc2VJbWFnZTogc3RyaW5nO1xuICByZWFkb25seSBjaHJvbWl1bUltYWdlOiBzdHJpbmc7XG4gIHJlYWRvbmx5IGV4ZWNUdW5uZWxJbWFnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wZW5DbGF3U2VjcmV0TmFtZXMge1xuICByZWFkb25seSBhbnRocm9waWNBcGlLZXk/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IG9wZW5jbGF3R2F0ZXdheVRva2VuPzogc3RyaW5nO1xuICByZWFkb25seSBvcGVuYWlBcGlLZXk/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHNsYWNrQm90VG9rZW4/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHNsYWNrQXBwVG9rZW4/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHRlbGVncmFtQm90VG9rZW4/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGRpc2NvcmRCb3RUb2tlbj86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcGVuQ2xhd05ldHdvcmtDb25maWcge1xuICByZWFkb25seSB2cGNDaWRyOiBzdHJpbmc7XG4gIHJlYWRvbmx5IG1heEF6czogbnVtYmVyO1xuICByZWFkb25seSBuYXRHYXRld2F5czogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wZW5DbGF3VGFza0NvbmZpZyB7XG4gIHJlYWRvbmx5IGNwdTogbnVtYmVyO1xuICByZWFkb25seSBtZW1vcnlNaUI6IG51bWJlcjtcbiAgcmVhZG9ubHkgZXBoZW1lcmFsU3RvcmFnZUdpQjogbnVtYmVyO1xuICByZWFkb25seSBwbGF0Zm9ybVZlcnNpb246IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcGVuQ2xhd0FwcENvbmZpZyB7XG4gIHJlYWRvbmx5IHN0YWNrUHJlZml4OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGVudk5hbWU6IHN0cmluZztcbiAgcmVhZG9ubHkgYWNjb3VudD86IHN0cmluZztcbiAgcmVhZG9ubHkgcmVnaW9uPzogc3RyaW5nO1xuICByZWFkb25seSBpbWFnZXM6IE9wZW5DbGF3SW1hZ2VDb25maWc7XG4gIHJlYWRvbmx5IG5ldHdvcms6IE9wZW5DbGF3TmV0d29ya0NvbmZpZztcbiAgcmVhZG9ubHkgdGFzazogT3BlbkNsYXdUYXNrQ29uZmlnO1xuICByZWFkb25seSBwb3J0OiBudW1iZXI7XG4gIHJlYWRvbmx5IGNocm9taXVtUG9ydDogbnVtYmVyO1xuICByZWFkb25seSBzbmFwc2hvdEJ1Y2tldE5hbWU/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHNuYXBzaG90UHJlZml4OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGxvZ1JldGVudGlvbjogbG9ncy5SZXRlbnRpb25EYXlzO1xuICByZWFkb25seSBzZWNyZXROYW1lczogT3BlbkNsYXdTZWNyZXROYW1lcztcbiAgcmVhZG9ubHkgdGFnczogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDb25maWc6IE9wZW5DbGF3QXBwQ29uZmlnID0ge1xuICBzdGFja1ByZWZpeDogJ29wZW5jbGF3JyxcbiAgZW52TmFtZTogJ2RldicsXG4gIGltYWdlczoge1xuICAgIG1haW5CYXNlSW1hZ2U6ICdnaGNyLmlvL29wZW5jbGF3L29wZW5jbGF3OjIwMjYuMy43JyxcbiAgICBjaHJvbWl1bUltYWdlOiAnY2hyb21lZHAvaGVhZGxlc3Mtc2hlbGw6MTQ2LjAuNzY4MC4zMScsXG4gICAgZXhlY1R1bm5lbEltYWdlOiAncHVibGljLmVjci5hd3MvYW1hem9ubGludXgvYW1hem9ubGludXg6MjAyMycsXG4gIH0sXG4gIG5ldHdvcms6IHtcbiAgICB2cGNDaWRyOiAnMTAuNDIuMC4wLzE2JyxcbiAgICBtYXhBenM6IDIsXG4gICAgbmF0R2F0ZXdheXM6IDEsXG4gIH0sXG4gIHRhc2s6IHtcbiAgICBjcHU6IDEwMjQsXG4gICAgbWVtb3J5TWlCOiAyMDQ4LFxuICAgIGVwaGVtZXJhbFN0b3JhZ2VHaUI6IDUwLFxuICAgIHBsYXRmb3JtVmVyc2lvbjogJ0xBVEVTVCcsXG4gIH0sXG4gIHBvcnQ6IDE4Nzg5LFxuICBjaHJvbWl1bVBvcnQ6IDkyMjIsXG4gIHNuYXBzaG90UHJlZml4OiAnc3RhdGUvZGV2JyxcbiAgbG9nUmV0ZW50aW9uOiBsb2dzLlJldGVudGlvbkRheXMuT05FX01PTlRILFxuICBzZWNyZXROYW1lczoge1xuICAgIGFudGhyb3BpY0FwaUtleTogJ29wZW5jbGF3L2FudGhyb3BpYy1hcGkta2V5JyxcbiAgICBvcGVuY2xhd0dhdGV3YXlUb2tlbjogJ29wZW5jbGF3L2dhdGV3YXktdG9rZW4nLFxuICB9LFxuICB0YWdzOiB7XG4gICAgQXBwbGljYXRpb246ICdvcGVuY2xhdycsXG4gICAgTWFuYWdlZEJ5OiAnYXdzLWNkaycsXG4gIH0sXG59O1xuIl19