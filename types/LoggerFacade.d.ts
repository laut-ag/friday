import LoggerFacadeData, { TLoggerData, TuserEmail, TuserId, Tusername } from "./LoggerFacadeData";
import LoggerManager from "./LoggerManager";
import { TErrorLevel } from "./ErrorLevel";
import { LoggerInterface } from "./LoggerInterface";
declare enum ToSend {
    USERNAME = "username",
    USER_EMAIL = "userEmail",
    USER_ID = "userId",
    USER_IP = "userIp",
    LEVEL = "level",
    EXTRA = "extra",
    TAG = "tag"
}
declare type TtoSendString = keyof typeof ToSend;
/**
 * Provides the main way to interact with different logger objects
 */
declare class LoggerFacade {
    _data: LoggerFacadeData;
    _toSend: ToSend[];
    _manager: LoggerManager;
    _useLoggers: string[];
    constructor(manager?: LoggerManager);
    /** Add the username */
    username(username: Tusername): this;
    /** Add the user email */
    userEmail(email: TuserEmail): this;
    /** Adds the user id */
    userId(id: TuserId): this;
    /** Adds the users ip address */
    userIp(ipAddress: string): this;
    /** Adds a tag as a key-value pair in the data object */
    tag(key: string, value: string): this;
    /** Sets the message level */
    level(level: TErrorLevel): this;
    /** Adds extra values as a key-value pair to the data object */
    extra(key: string, value: string): this;
    /** Adds a new logger */
    addLogger(name: string, logger: LoggerInterface): void;
    /** Remove a logger */
    removeLogger(name: string): boolean;
    /** Removes all loggers */
    removeAllLoggers(): void;
    /** Sets the default logger to use */
    setDefaultLogger(name: string): boolean;
    /**
     * Gets a logger instance by name
     * This returns any because it is up to the specific transport what it exposes as the 'instance'
     */
    getLogger(loggerInstance: string): any;
    _pushToSend(value: TtoSendString): void;
    _transportable(): Partial<TLoggerData>;
    _call(method: any, message: any): Promise<boolean>;
    _resetData(): void;
    /** Specify which logger to use for this call */
    use(name: string): this;
    /**
     * Sends the message and any set data with level `emergency`
     * NB: Overrides `level` on data object
     */
    emergency(message: any): Promise<boolean>;
    /**
     * Sends the message and any set data with level `alert`
     * NB: Overrides `level` on data object
     */
    alert(message: any): Promise<boolean>;
    /**
     * Sends the message and any set data with level `critical`
     * NB: Overrides `level` on data object
     */
    critical(message: any): Promise<boolean>;
    /**
     * Sends the message and any set data with level `error`
     * NB: Overrides `level` on data object
     */
    error(message: any): Promise<boolean>;
    /**
     * Sends the message and any set data with level `warning`
     * NB: Overrides `level` on data object
     */
    warning(message: any): Promise<boolean>;
    /**
     * Sends the message and any set data with level `notice`
     * NB: Overrides `level` on data object
     */
    notice(message: any): Promise<boolean>;
    /**
     * Sends the message and any set data with level `info`
     * NB: Overrides `level` on data object
     */
    info(message: any): Promise<boolean>;
    /**
     * Sends the message and any set data with level `debug`
     * NB: Overrides `level` on data object
     */
    debug(message: any): Promise<boolean>;
    /**
     * Sends the message and any set data with level `log`
     * NB: Overrides `level` on data object
     */
    log(message: any): Promise<boolean>;
    /**
     * Sends the message and any set data with level `message`
     * NB: Overrides `level` on data object
     */
    message(message: any): Promise<boolean>;
}
export default LoggerFacade;
