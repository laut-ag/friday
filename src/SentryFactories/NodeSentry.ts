import SentryBase from "./SentryBase";
import {NodeClient} from "@sentry/node";
import type {Hub} from "@sentry/node";

export default class NodeSentry extends SentryBase {

    constructor () {
        super()
    }

    _makeNodeClient (): NodeClient {
        return new NodeClient( this._makeClientOptions() )
    }

    make () : Hub {
        return this._makeHub( this._makeNodeClient() )
    }

}
