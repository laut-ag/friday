import SentryBase, { ISentryConfig } from "./SentryBase";
import type { Hub } from "@sentry/browser";
export default class SentryBrowser extends SentryBase {
    constructor(config?: ISentryConfig);
    /** Creates a Sentry Hub with a Browser Client */
    make(): Hub;
}
