import LoggerFacadeData, {TLoggerData, TuserEmail, TuserId, Tusername} from "./LoggerFacadeData";
import LoggerManager from "./LoggerManager";
import {TErrorLevel} from "./ErrorLevel";
import {LoggerInterface} from "./LoggerInterface";

enum ToSend {
    USERNAME = 'username',
    USER_EMAIL = 'userEmail',
    USER_ID = 'userId',
    USER_IP = 'userIp',
    LEVEL = 'level',
    EXTRA = 'extra',
    TAG = 'tag',
}

type TtoSendString = keyof typeof ToSend

/**
 * Provides the main way to interact with different logger objects
 */
class LoggerFacade {
    _data: LoggerFacadeData
    _toSend: ToSend[]
    _manager: LoggerManager
    _useLoggers: string[]

    constructor ( manager?: LoggerManager ) {
        this._manager = manager ? manager : new LoggerManager()
        this._data = new LoggerFacadeData()
        this._toSend = []
        this._useLoggers = []
    }

    /** Add the username */
    username ( username: Tusername ) {
        this._data._username = username
        this._pushToSend( 'USERNAME' )
        return this
    }

    /** Add the user email */
    userEmail ( email: TuserEmail ) {
        this._data._userEmail = email
        this._pushToSend( 'USER_EMAIL' )
        return this
    }

    /** Adds the user id */
    userId ( id: TuserId ) {
        this._data._userId = id
        this._pushToSend( 'USER_ID' )
        return this
    }

    /** Adds the users ip address */
    userIp ( ipAddress: string ) {
        this._data._userIp = ipAddress
        this._pushToSend( 'USER_IP' )
        return this
    }

    /** Adds a tag as a key-value pair in the data object */
    tag ( key: string, value: string ) {
        const index = this._data._tag.findIndex( tag => tag.key === key )
        if ( index === -1 ) {
            this._data._tag.push( { key, value } )
        } else {
            this._data._tag[ index ].value = value
        }
        this._pushToSend( 'TAG' )
        return this
    }

    /** Sets the message level */
    level ( level: TErrorLevel ) {
        this._data._level = level
        this._pushToSend( 'LEVEL' )
        return this
    }

    /** Adds extra values as a key-value pair to the data object */
    extra ( key: string, value: string ) {
        const index = this._data._extra.findIndex( ex => ex.key === key )
        if ( index === -1 ) {
            this._data._extra.push( { key, value } )
        } else {
            this._data._extra[ index ].value = value
        }
        this._pushToSend( 'EXTRA' )
        return this
    }

    /** Adds a new logger */
    addLogger ( name: string, logger: LoggerInterface ) {
        this._manager.add( name, logger )
    }

    /** Remove a logger */
    removeLogger ( name: string ): boolean {
        return this._manager.remove( name )
    }

    /** Removes all loggers */
    removeAllLoggers () {
        this._manager.clear()
    }

    /** Sets the default logger to use */
    setDefaultLogger ( name: string ): boolean {
        return this._manager.default( name )
    }

    /**
     * Gets a logger instance by name
     * This returns any because it is up to the specific transport what it exposes as the 'instance'
     */
    getLogger ( loggerInstance: string ): any {
        return this._manager.get( loggerInstance )
    }

    /**
     * Indicates whether the passed logger is available
     */
    hasLogger( loggerInstance: string ): boolean {
        return this._manager.has( loggerInstance )
    }

    _pushToSend ( value: TtoSendString ) {
        const exists = this._toSend.indexOf( ToSend[ value ] ) !== -1
        if ( !exists ) {
            this._toSend.push( ToSend[ value ] )
        }
    }

    // TODO: fingerprint
    // see https://docs.sentry.io/platforms/javascript/#setting-the-fingerprint

    _transportable (): Partial<TLoggerData> {
        const data = this._data.data()
        const rdata: { [x: string]: any } = {}
        for ( const key in data ) {
            // @ts-ignore
            if ( this._toSend.indexOf( key ) !== -1 ) rdata[ key ] = data[ key ]
        }
        return rdata
    }

    _call ( method: any, message: any ): Promise<boolean> {
        return new Promise( res => {
            const data = this._transportable()
            this._manager.log( method, message, data, this._useLoggers )
            this._resetData()
            res( true )
        } )
    }

    _resetData () {
        this._data = new LoggerFacadeData()
        this._useLoggers = []
        this._toSend = []
    }

    /** Specify which logger to use for this call */
    use( name: string ) {
        const exists = this._useLoggers.indexOf( name ) !== -1
        if ( !exists ) this._useLoggers.push( name )
        return this
    }

    // LoggerInterface
    /**
     * Sends the message and any set data with level `emergency`
     * NB: Overrides `level` on data object
     */
    emergency ( message: any ): Promise<boolean> {
        return this._call( 'emergency', message )
    }

    /**
     * Sends the message and any set data with level `alert`
     * NB: Overrides `level` on data object
     */
    alert ( message: any ): Promise<boolean> {
        return this._call( 'alert', message )
    }

    /**
     * Sends the message and any set data with level `critical`
     * NB: Overrides `level` on data object
     */
    critical ( message: any ): Promise<boolean> {
        return this._call( 'critical', message )
    }

    /**
     * Sends the message and any set data with level `error`
     * NB: Overrides `level` on data object
     */
    error ( message: any ): Promise<boolean> {
        return this._call( 'error', message )
    }

    /**
     * Sends the message and any set data with level `warning`
     * NB: Overrides `level` on data object
     */
    warning ( message: any ): Promise<boolean> {
        return this._call( 'warning', message )
    }

    /**
     * Sends the message and any set data with level `notice`
     * NB: Overrides `level` on data object
     */
    notice ( message: any ): Promise<boolean> {
        return this._call( 'notice', message )
    }

    /**
     * Sends the message and any set data with level `info`
     * NB: Overrides `level` on data object
     */
    info ( message: any ): Promise<boolean> {
        return this._call( 'info', message )
    }

    /**
     * Sends the message and any set data with level `debug`
     * NB: Overrides `level` on data object
     */
    debug ( message: any ): Promise<boolean> {
        return this._call( 'debug', message )
    }

    /**
     * Sends the message and any set data with level `log`
     * NB: Overrides `level` on data object
     */
    log ( message: any ): Promise<boolean> {
        return this._call( 'log', message )
    }

    /**
     * Sends the message and any set data with level `message`
     * NB: Overrides `level` on data object
     */
    message ( message: any ): Promise<boolean> {
        return this._call( 'message', message )
    }

}

export default LoggerFacade
