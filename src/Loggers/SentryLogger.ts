import {LoggerInterface, TLoggerMethods} from "../LoggerInterface";
import {TErrorLevel} from "../ErrorLevel";

type TSentryLevel = 'fatal'|'critical'|'error'|'warning'|'log'|'info'|'debug'
type Context = { [x: string]: any }
type Hub = import( '@sentry/types' ).Hub
type Scope = import( '@sentry/types' ).Scope
type Severity = import( '@sentry/types' ).Severity

class SentryLogger implements LoggerInterface {
    _Sentry: Hub
    _levels: { [ key: string ]: TSentryLevel }

    constructor ( sentry: Hub ) {
        this._Sentry = sentry

        this._levels = {
            emergency: 'fatal',
            alert: 'critical',
            critical: 'critical',
            error: 'error',
            warn: 'warning',
            notice: 'log',
            info: 'info',
            debug: 'debug',
        }
    }

    _setTag ( scope: Scope, context: Context = {} ) {
        if ( context.tags ) {
            context.tags.forEach( ( tag: {key: string, value: string } ) => scope.setTag( tag.key, tag.value ) )
        }
        return scope
    }

    _setLevel ( scope: Scope, level: TErrorLevel | undefined, context: Context = {} ) {
        if ( level || context.level ) {
            const compLevel = level || context.level
            scope.setLevel( this._levels[ compLevel ] as Severity )
        }
        return scope
    }

    _setUser ( scope: Scope, context: Context = {} ) {
        if ( context.keys().length !== 0 ) {
            const userFields = [ 'userId', 'username', 'userEmail', 'userIp' ]
                const user = userFields.reduce( ( acc: { [x: string]: any }, val ): any => {
                if ( context[ val ] !== undefined ) acc[ val ] = context[ val ]
            }, {} )
            const keys = user.keys()
            if ( keys.length !== 0 ) {
                scope.setUser( user )
            }
        }
        return scope
    }

    _setExtra ( scope: Scope, context: Context = {} ) {
        if ( context.extras ) {
            context.extras.forEach( ( extra: { key: string, value: string } ) => scope.setExtra( extra.key, extra.value ) )
        }
        return scope
    }

    _send ( type: TLoggerMethods, message: any ) {
        if ( type === 'message' ) this._Sentry.captureMessage( message )
        else this._Sentry.captureException( message )
    }

    /** Logs message to Sentry */
    log (type: TLoggerMethods, message: any, context?: Context) {
        const self = this
        if ( !context || context.keys().length === 0 ) {
            this._send( type, message )
            return
        }

        self._Sentry.withScope( function ( scope ) {
            self._setLevel( scope, type as any, context )
            self._setExtra( scope, context )
            self._setTag( scope, context )
            self._setUser( scope, context )
            self._send( type, message )
        } )
    }

    /** Publicly available instance */
    get instance (): Hub {
        return this._Sentry
    }

}

export default SentryLogger
