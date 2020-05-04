import SentryBase from "./SentryBase";
import {BrowserClient} from "@sentry/browser";
import type {Hub} from "@sentry/browser"

export default class SentryBrowser extends SentryBase {

    constructor () {
        super()
    }

    _makeBrowserClient (): BrowserClient {
        return new BrowserClient( this._makeClientOptions() )
    }

    make (): Hub {
        return this._makeHub( this._makeBrowserClient() )
    }

}
