import LoggerFacadeData from "./LoggerFacadeData";
import LoggerManager from "./LoggerManager";
import {TuserEmail, TuserId, Tusername} from "./Interfaces/LoggerData";
import {TErrorLevel} from "./Interfaces/ErrorLevel";
import {LoggerInterface} from "./Interfaces/LoggerInterface";

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

export default class LoggerFacade {
    _data: LoggerFacadeData
    _toSend: ToSend[]
    _manager: LoggerManager

    constructor ( manager?: LoggerManager ) {
        this._manager = manager ? manager : new LoggerManager()
        this._data = new LoggerFacadeData()
        this._toSend = []
    }

    username ( username: Tusername ) {
        this._data._username = username
        this._pushToSend( 'USERNAME' )
        return this
    }

    userEmail ( email: TuserEmail ) {
        this._data._userEmail = email
        this._pushToSend( 'USER_EMAIL' )
        return this
    }

    userId ( id: TuserId ) {
        this._data._userId = id
        this._pushToSend( 'USER_ID' )
        return this
    }

    userIp ( ipAddress: string ) {
        this._data._userIp = ipAddress
        this._pushToSend( 'USER_IP' )
        return this
    }

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

    level ( level: TErrorLevel ) {
        this._data._level = level
        this._pushToSend( 'LEVEL' )
        return this
    }

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

    add ( name: string, logger: LoggerInterface ) {
        this._manager.add( name, logger )
        return this
    }

    remove ( name: string ) {
        this._manager.remove( name )
        return this
    }

    clear () {
        this._manager.clear()
        return this
    }

    default ( name: string ) {
        this._manager.default( name )
        return this
    }

    get ( loggerInstance: string ) {
        return this._manager.get( loggerInstance )
    }

    _pushToSend ( value: TtoSendString ) {
        const exists = this._toSend.indexOf( ToSend[ value ] ) !== -1
        if ( !exists ) {
            this._toSend.push( ToSend[ value ] )
        }
    }

    // TODO: fingerprint
    // see https://docs.sentry.io/platforms/javascript/#setting-the-fingerprint

    _transportable () {
        const data = this._data.data()
        const rdata: { [x: string]: any } = {}
        for ( const key in data ) {
            // @ts-ignore
            if ( this._toSend.indexOf( key ) !== -1 ) rdata[ key ] = data[ key ]
        }
        return rdata
    }

    _call ( method: any, message: any ) {
        const data = this._transportable()
        this._manager.log( method, message, data )
    }

    // LoggerInterface
    emergency ( message: any ) {
        this._call( 'emergency', message )
    }

    alert ( message: any ) {
        this._call( 'alert', message )
    }

    critical ( message: any ) {
        this._call( 'critical', message )
    }

    error ( message: any ) {
        this._call( 'error', message )
    }

    warning ( message: any ) {
        this._call( 'warning', message )
    }

    notice ( message: any ) {
        this._call( 'notice', message )
    }

    info ( message: any ) {
        this._call( 'info', message )
    }

    debug ( message: any ) {
        this._call( 'debug', message )
    }

    log ( message: any ) {
        this._call( 'log', message )
    }

    message ( message: any ) {
        this._call( 'message', message )
    }

}
