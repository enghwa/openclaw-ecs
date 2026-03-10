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
exports.LoggingConstruct = void 0;
const logs = __importStar(require("aws-cdk-lib/aws-logs"));
const constructs_1 = require("constructs");
class LoggingConstruct extends constructs_1.Construct {
    applicationLogGroup;
    chromiumLogGroup;
    execLogGroup;
    executeCommandLogGroup;
    constructor(scope, id, props) {
        super(scope, id);
        this.applicationLogGroup = this.createGroup('ApplicationLogGroup', '/aws/ecs/openclaw/main', props.config.logRetention);
        this.chromiumLogGroup = this.createGroup('ChromiumLogGroup', '/aws/ecs/openclaw/chromium', props.config.logRetention);
        this.execLogGroup = this.createGroup('ExecTunnelLogGroup', '/aws/ecs/openclaw/exec-tunnel', props.config.logRetention);
        this.executeCommandLogGroup = this.createGroup('ExecuteCommandLogGroup', '/aws/ecs/openclaw/execute-command', props.config.logRetention);
    }
    createGroup(id, name, retention) {
        return new logs.LogGroup(this, id, {
            logGroupName: name,
            retention,
        });
    }
}
exports.LoggingConstruct = LoggingConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb25zdHJ1Y3RzL2xvZ2dpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQTZDO0FBQzdDLDJDQUF1QztBQU92QyxNQUFhLGdCQUFpQixTQUFRLHNCQUFTO0lBQzdCLG1CQUFtQixDQUFnQjtJQUNuQyxnQkFBZ0IsQ0FBZ0I7SUFDaEMsWUFBWSxDQUFnQjtJQUM1QixzQkFBc0IsQ0FBZ0I7SUFFdEQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUE0QjtRQUNwRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEgsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0SCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsb0JBQW9CLEVBQUUsK0JBQStCLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN2SCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsRUFBRSxtQ0FBbUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzNJLENBQUM7SUFFTyxXQUFXLENBQUMsRUFBVSxFQUFFLElBQVksRUFBRSxTQUE2QjtRQUN6RSxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ2pDLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFNBQVM7U0FDVixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFyQkQsNENBcUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbG9ncyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbG9ncyc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IE9wZW5DbGF3QXBwQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2FwcC1jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvZ2dpbmdDb25zdHJ1Y3RQcm9wcyB7XG4gIHJlYWRvbmx5IGNvbmZpZzogT3BlbkNsYXdBcHBDb25maWc7XG59XG5cbmV4cG9ydCBjbGFzcyBMb2dnaW5nQ29uc3RydWN0IGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIHJlYWRvbmx5IGFwcGxpY2F0aW9uTG9nR3JvdXA6IGxvZ3MuTG9nR3JvdXA7XG4gIHB1YmxpYyByZWFkb25seSBjaHJvbWl1bUxvZ0dyb3VwOiBsb2dzLkxvZ0dyb3VwO1xuICBwdWJsaWMgcmVhZG9ubHkgZXhlY0xvZ0dyb3VwOiBsb2dzLkxvZ0dyb3VwO1xuICBwdWJsaWMgcmVhZG9ubHkgZXhlY3V0ZUNvbW1hbmRMb2dHcm91cDogbG9ncy5Mb2dHcm91cDtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogTG9nZ2luZ0NvbnN0cnVjdFByb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIHRoaXMuYXBwbGljYXRpb25Mb2dHcm91cCA9IHRoaXMuY3JlYXRlR3JvdXAoJ0FwcGxpY2F0aW9uTG9nR3JvdXAnLCAnL2F3cy9lY3Mvb3BlbmNsYXcvbWFpbicsIHByb3BzLmNvbmZpZy5sb2dSZXRlbnRpb24pO1xuICAgIHRoaXMuY2hyb21pdW1Mb2dHcm91cCA9IHRoaXMuY3JlYXRlR3JvdXAoJ0Nocm9taXVtTG9nR3JvdXAnLCAnL2F3cy9lY3Mvb3BlbmNsYXcvY2hyb21pdW0nLCBwcm9wcy5jb25maWcubG9nUmV0ZW50aW9uKTtcbiAgICB0aGlzLmV4ZWNMb2dHcm91cCA9IHRoaXMuY3JlYXRlR3JvdXAoJ0V4ZWNUdW5uZWxMb2dHcm91cCcsICcvYXdzL2Vjcy9vcGVuY2xhdy9leGVjLXR1bm5lbCcsIHByb3BzLmNvbmZpZy5sb2dSZXRlbnRpb24pO1xuICAgIHRoaXMuZXhlY3V0ZUNvbW1hbmRMb2dHcm91cCA9IHRoaXMuY3JlYXRlR3JvdXAoJ0V4ZWN1dGVDb21tYW5kTG9nR3JvdXAnLCAnL2F3cy9lY3Mvb3BlbmNsYXcvZXhlY3V0ZS1jb21tYW5kJywgcHJvcHMuY29uZmlnLmxvZ1JldGVudGlvbik7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUdyb3VwKGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgcmV0ZW50aW9uOiBsb2dzLlJldGVudGlvbkRheXMpOiBsb2dzLkxvZ0dyb3VwIHtcbiAgICByZXR1cm4gbmV3IGxvZ3MuTG9nR3JvdXAodGhpcywgaWQsIHtcbiAgICAgIGxvZ0dyb3VwTmFtZTogbmFtZSxcbiAgICAgIHJldGVudGlvbixcbiAgICB9KTtcbiAgfVxufVxuXG4iXX0=