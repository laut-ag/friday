import SentryBrowser from "./SentryBrowser";
import { ISentryConfig } from "./SentryBase";
interface IVueSentryConfig extends ISentryConfig {
    Vue?: any;
}
export default class VueSentry extends SentryBrowser {
    _attachProps: boolean;
    _logErrors: boolean;
    _vue: any;
    constructor(config?: IVueSentryConfig);
    /** Do not attach props to error report */
    noProps(): this;
    /** Do not call Vue's internal error handeler */
    noVueErrors(): this;
    _makeIntegrationOptions(): {
        [x: string]: any;
    };
    /** Adds integrations and makes Browser Client */
    make(): import("@sentry/hub").Hub;
}
export {};
