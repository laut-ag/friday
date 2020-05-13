import SentryBase, { ISentryConfig } from "./SentryBase";
import type { Hub } from "@sentry/node";
export default class NodeSentry extends SentryBase {
    constructor(config?: ISentryConfig);
    /** Creates a Sentry Hub with a Node Client */
    make(): Hub;
}
