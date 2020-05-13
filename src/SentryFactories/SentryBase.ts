import type {Integration} from "@sentry/types";
import type {NodeClient} from "@sentry/node";
import type {BrowserClient} from "@sentry/browser"

export interface ISentryConfig {
   dsn?: string,
   environment?: string,
   release?: string,
   integrations?: Integration[],
   transport?: any,
}

class SentryBase {
    _config: ISentryConfig;

    constructor ( config: ISentryConfig = {} ) {
        this._config = this._extractBaseConfig( config )
    }

    /** Sets the dsn */
    dsn ( dsn:string ) {
        this._config.dsn = dsn
        return this
    }

    /** Sets the environment */
    env ( environment: string ) {
        this._config.environment = environment
        return this
    }

    /** Sets the Sentry release */
    release ( release: string ) {
        this._config.release = release
        return this
    }

   _extractBaseConfig ( config: { [key: string]: any } ) {
        let { dsn, environment, release, integrations, transport, ...rest } = config
        let interConfig: { [x: string]: any } = { dsn, environment, release, integrations, transport }
        let baseConfig: ISentryConfig = Object.keys( interConfig )
            .filter( key => {
                return interConfig[ key ] !== undefined
            } )
            .reduce( ( acc, key ) => {
                acc[ key ] = interConfig[ key ]
                return acc
            }, {} as { [x:string]: any } )
        return baseConfig
    }

    addIntegration ( integration: Integration ) {
        if ( !this._config.integrations || !Array.isArray( this._config.integrations ) ) {
            this._config.integrations = []
        }
        this._config.integrations.push( integration )
        return this
    }

}

export default SentryBase
