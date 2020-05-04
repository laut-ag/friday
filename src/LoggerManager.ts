import {LoggerInterface, TLoggerMethods} from "./Interfaces/LoggerInterface";

export default class LoggerManager {

    _default: string | undefined
    _loggers: Map<string, LoggerInterface>

    constructor () {
        this._loggers = new Map()
        this._default = undefined
    }

    add ( name: string, logger: LoggerInterface ) {
        this._loggers.set( name, logger )
    }

    default ( name: string ) {
        if ( !this._loggers.has( name ) ) {
            console.warn( name + ' does not exist')
        } else {
            this._default = name
        }
    }

    remove ( name: string ) {
        this._loggers.delete( name )
    }

    clear () {
        this._loggers.clear()
        this._default = undefined
    }

    get ( loggerInstance: string) {
        const logger = this._loggers.get( loggerInstance )
        if ( logger !== undefined ) {
            return logger.instance()
        }
    }

    log ( method: TLoggerMethods, message: any, data?: object ) {
        // @ts-ignore
        this._loggers.forEach( logger =>{
            logger.log( method, message, data )
        })
    }

}
