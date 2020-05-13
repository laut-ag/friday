import type { Integration } from "@sentry/types";
export interface ISentryConfig {
    dsn?: string;
    environment?: string;
    release?: string;
    integrations?: Integration[];
    transport?: any;
}
declare class SentryBase {
    _config: ISentryConfig;
    constructor(config?: ISentryConfig);
    /** Sets the dsn */
    dsn(dsn: string): this;
    /** Sets the environment */
    env(environment: string): this;
    /** Sets the Sentry release */
    release(release: string): this;
    _extractBaseConfig(config: {
        [key: string]: any;
    }): ISentryConfig;
    addIntegration(integration: Integration): this;
}
export default SentryBase;
