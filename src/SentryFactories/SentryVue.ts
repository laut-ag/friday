import { Vue as VueIntegration } from '@sentry/integrations'
import SentryBrowser from "./SentryBrowser";
import {ISentryConfig} from "./SentryBase";

interface VueOptions {
    Vue?: any;
    attachProps?: boolean;
    logErrors?: boolean;
}

interface IVueSentryConfig extends ISentryConfig {
    Vue?: any
}

export default class SentryVue extends SentryBrowser {
    _attachProps: boolean;
    _logErrors: boolean;
    _vue: any

    constructor ( config: IVueSentryConfig = {} ) {
        super( config )
        if ( config.Vue === undefined ) {
            this._vue = undefined
        } else {
            this._vue = config.Vue
        }
        this._attachProps = true
        this._logErrors = true
    }

    /** Do not attach props to error report */
    noProps () {
        this._attachProps = false
        return this
    }

    /** Do not call Vue's internal error handeler */
    noVueErrors () {
        this._logErrors = false
        return this
    }

    _makeIntegrationOptions (): { [x: string]: any } {
        const options: VueOptions = {
            attachProps: this._attachProps,
            logErrors: this._logErrors,
        }
        if ( this._vue !== undefined ) {
            options.Vue = this._vue
        }
        return options
    }

    /** Adds integrations and makes Browser Client */
    make () {
        const vueIntegration = new VueIntegration( this._makeIntegrationOptions() )
        this.addIntegration( vueIntegration )
        return super.make()
    }

}
