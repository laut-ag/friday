import {Context, LoggerInterface, TLoggerMethods} from "./LoggerInterface";

/** LoggerManager */
class LoggerManager {

    _default: string | undefined
    _loggers: Map<string, LoggerInterface>

    constructor () {
        this._loggers = new Map()
        this._default = undefined
    }

    /** Add a logger */
    add ( name: string, logger: LoggerInterface ) {
        this._loggers.set( name, logger )
    }

    /**
     * Set the default logger
     * @param {string} name
     * @returns true if the name exists, false if it doesn't
     */
    default ( name: string ): boolean {
        if ( !this._loggers.has( name ) ) {
            console.warn( name + ' does not exist')
            return false
        } else {
            this._default = name
            return true
        }
    }

    /**
     * Remove a logger by name
     * @returns true if it was removed, false if it didn't exist and not removed
     */
    remove ( name: string ): boolean {
        return this._loggers.delete( name )
    }

    /** Clears all loggers */
    clear () {
        this._loggers.clear()
        this._default = undefined
    }

    /**
     * Get a loggers underlying instance
     * This returns any because it is up to the specific transport what it exposes as the 'instance'
     */
    get ( loggerInstance: string): any {
        const logger = this._loggers.get( loggerInstance )
        if ( logger !== undefined ) {
            return logger.instance
        }
    }

    /**
     * Indicates whether the passed logger is present in the manager
     */
    has ( loggerInstance: string): boolean {
        return this._loggers.has( loggerInstance )
    }

    /** Sends a log method to each registered logger */
    log ( method: TLoggerMethods, message: any, data: Context, use: string[] = [] ) {
        if ( use.length ) use.forEach( name => {
           if ( this._loggers.has(name) ) {
               // @ts-ignore
               this._loggers.get(name).log( method, message, data )
           }
        } )
        else this._loggers.forEach( logger =>{
            logger.log( method, message, data )
        })
    }

}

export default LoggerManager
