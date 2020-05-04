import { Vue as VueIntegration } from '@sentry/integrations'
import SentryBrowser from "./SentryBrowser";

type VueOptions = {
    Vue?: any;
    attachProps?: boolean;
    logErrors?: boolean;
}

export default class VueSentry extends SentryBrowser {
    _attachProps: boolean;
    _logErrors: boolean;
    _vue: any

    constructor ( Vue?: any ) {
        super()
        if ( Vue === undefined ) {
            this._vue = undefined
        } else {
            this._vue = Vue
        }
        this._attachProps = true
        this._logErrors = true
    }

    noProps () {
        this._attachProps = false
        return this
    }

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

    make () {
        const vueIntegration = new VueIntegration( this._makeIntegrationOptions() )
        this.addIntegration( vueIntegration )
        return super.make()
    }

}