import { Context, LoggerInterface, TLoggerMethods, FormatFn } from "../LoggerInterface";
import { TErrorLevel } from "../ErrorLevel";
declare type TConsoleLevel = 'debug' | 'log' | 'info' | 'warn' | 'error';
interface IConsoleOptions {
    formatFn?: FormatFn;
}
declare class ConsoleLogger implements LoggerInterface {
    _stdErrLevels: TConsoleLevel[];
    _levels: {
        [key: string]: TConsoleLevel;
    };
    _defaultLevels: {
        log: TErrorLevel;
        message: TErrorLevel;
    };
    _formatFn: FormatFn | undefined;
    constructor(options?: IConsoleOptions);
    _stdOut(level: TConsoleLevel, message: any): void;
    _stdError(level: TConsoleLevel, message: any): void;
    _formatMessage(level: TErrorLevel, message: any, context: Context): any;
    /** Log to the console or process */
    log(method: TLoggerMethods, message: any, context?: Context): void;
    /** Publicly available instance */
    get instance(): any;
}
export default ConsoleLogger;
