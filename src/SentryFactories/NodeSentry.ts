import SentryBase, {ISentryConfig} from "./SentryBase";
import * as Sentry from "@sentry/node";
import type {Hub} from "@sentry/node";

export default class NodeSentry extends SentryBase {

    constructor ( config: ISentryConfig = {} ) {
        super( config )
    }

    /** Creates a Sentry Hub with a Node Client */
    make (): Hub {
        Sentry.init( this._config )
        return Sentry.getCurrentHub()
    }

}
