import { Context, LoggerInterface, TLoggerMethods } from "./LoggerInterface";
/** LoggerManager */
declare class LoggerManager {
    _default: string | undefined;
    _loggers: Map<string, LoggerInterface>;
    constructor();
    /** Add a logger */
    add(name: string, logger: LoggerInterface): void;
    /**
     * Set the default logger
     * @param {string} name
     * @returns true if the name exists, false if it doesn't
     */
    default(name: string): boolean;
    /**
     * Remove a logger by name
     * @returns true if it was removed, false if it didn't exist and not removed
     */
    remove(name: string): boolean;
    /** Clears all loggers */
    clear(): void;
    /**
     * Get a loggers underlying instance
     * This returns any because it is up to the specific transport what it exposes as the 'instance'
     */
    get(loggerInstance: string): any;
    /** Sends a log method to each registered logger */
    log(method: TLoggerMethods, message: any, data: Context, use?: string[]): void;
}
export default LoggerManager;
