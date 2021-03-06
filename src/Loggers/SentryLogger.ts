import {Context, LoggerInterface, TLoggerMethods} from "../LoggerInterface";
import {TErrorLevel} from "../ErrorLevel";

type TSentryLevel = 'fatal'|'critical'|'error'|'warning'|'log'|'info'|'debug'
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
            // @ts-ignore
            scope.setLevel( this._levels[ compLevel ] as Severity )
        }
        return scope
    }

    _setUser ( scope: Scope, context: Context = {} ) {
        if ( Object.keys(context).length !== 0 ) {
            const userFields = [ 'userId', 'username', 'userEmail', 'userIp' ]
                const user = userFields.reduce( ( acc: { [x: string]: any }, val ): any => {
                if ( context[ val ] !== undefined ) acc[ val ] = context[ val ]
                return acc
            }, {} )
            if ( user && Object.keys(user).length !== 0 ) {
                scope.setUser( user )
            }
        }
        return scope
    }

    _setExtra ( scope: Scope, context: Context = {} ) {
        if ( context.extra ) {
            context.extra.forEach( ( extra: { key: string, value: string } ) => scope.setExtra( extra.key, extra.value ) )
        }
        return scope
    }

    _send ( type: TLoggerMethods, message: any ) {
        if ( type === 'message' ) return this._Sentry.captureMessage( message )
        else return this._Sentry.captureException( message )
    }

    /** Logs message to Sentry */
    log (type: TLoggerMethods, message: any, context: Context = {}) {
        const self = this
        if ( Object.keys(context).length === 0 ) {
            return this._send( type, message )
        }

        return self._Sentry.withScope( function ( scope ) {
            self._setLevel( scope, type as any, context )
            self._setExtra( scope, context )
            self._setTag( scope, context )
            self._setUser( scope, context )
            return self._send( type, message )
        } )
    }

    /** Publicly available instance */
    get instance (): Hub {
        return this._Sentry
    }

}

export default SentryLogger
