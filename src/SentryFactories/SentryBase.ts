import {Hub} from "@sentry/browser";
import type {Integration} from "@sentry/types";
import type {NodeClient} from "@sentry/node";
import type {BrowserClient} from "@sentry/browser"

export default class SentryBase {
    _dsn: string;
    _environment: string | undefined;
    _release: string;
    _integrations: Integration[];

    constructor () {
        this._dsn = ''
        this._environment = undefined
        this._release = ''
        this._integrations = []
    }

    dsn ( dsn:string ) {
        this._dsn = dsn
        return this
    }

    env ( environment: string ) {
        this._environment = environment
        return this
    }

    release ( release: string ) {
        this._release = release
        return this
    }

   _makeClientOptions (): { [x: string]: any } {
        return {
            dsn: this._dsn,
            environment: this._environment,
            release: this._release,
            integrations: this._integrations,
        }
   }

    _makeHub ( client: BrowserClient | NodeClient ): Hub {
        return new Hub( client )
    }

    addIntegration ( integration: Integration ) {
        this._integrations.push( integration )
        return this
    }

}
