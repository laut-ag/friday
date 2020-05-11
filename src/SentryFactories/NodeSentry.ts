import SentryBase, {ISentryConfig} from "./SentryBase";
import {NodeClient} from "@sentry/node";
import type {Hub} from "@sentry/node";

export default class NodeSentry extends SentryBase {

    constructor ( config: ISentryConfig = {} ) {
        super( config )
    }

    _makeNodeClient (): NodeClient {
        return new NodeClient( this._config )
    }

    /** Creates a Sentry Hub with a Node Client */
    make (): Hub {
        return this._makeHub( this._makeNodeClient() )
    }

}
