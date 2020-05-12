import SentryBase, {ISentryConfig} from "./SentryBase";
import * as Sentry from "@sentry/browser"
import type {Hub} from "@sentry/browser"

export default class SentryBrowser extends SentryBase {

    constructor ( config: ISentryConfig = {} ) {
        super( config )
    }

    /** Creates a Sentry Hub with a Browser Client */
    make (): Hub {
        Sentry.init( this._config )
        return Sentry.getCurrentHub()
    }

}
