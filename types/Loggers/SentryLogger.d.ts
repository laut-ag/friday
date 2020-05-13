import { Context, LoggerInterface, TLoggerMethods } from "../LoggerInterface";
import { TErrorLevel } from "../ErrorLevel";
declare type TSentryLevel = 'fatal' | 'critical' | 'error' | 'warning' | 'log' | 'info' | 'debug';
declare type Hub = import('@sentry/types').Hub;
declare type Scope = import('@sentry/types').Scope;
declare class SentryLogger implements LoggerInterface {
    _Sentry: Hub;
    _levels: {
        [key: string]: TSentryLevel;
    };
    constructor(sentry: Hub);
    _setTag(scope: Scope, context?: Context): import("@sentry/types").Scope;
    _setLevel(scope: Scope, level: TErrorLevel | undefined, context?: Context): import("@sentry/types").Scope;
    _setUser(scope: Scope, context?: Context): import("@sentry/types").Scope;
    _setExtra(scope: Scope, context?: Context): import("@sentry/types").Scope;
    _send(type: TLoggerMethods, message: any): string;
    /** Logs message to Sentry */
    log(type: TLoggerMethods, message: any, context?: Context): string | void;
    /** Publicly available instance */
    get instance(): Hub;
}
export default SentryLogger;
