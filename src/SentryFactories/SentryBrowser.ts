import SentryBase, {ISentryConfig} from "./SentryBase";
import {BrowserClient} from "@sentry/browser";
import type {Hub} from "@sentry/browser"

export default class SentryBrowser extends SentryBase {

    constructor ( config: ISentryConfig = {} ) {
        super( config )
    }

    _makeBrowserClient (): BrowserClient {
        return new BrowserClient( this._config )
    }

    /** Creates a Sentry Hub with a Browser Client */
    make (): Hub {
        return this._makeHub( this._makeBrowserClient() )
    }

}
