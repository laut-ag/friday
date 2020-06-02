import LoggerFacade from './LoggerFacade'
import ConsoleLogger from './Loggers/ConsoleLogger'
import SentryLogger from "./Loggers/SentryLogger";
import SentryBase from "./SentryFactories/SentryBase";
import VueSentry from "./SentryFactories/VueSentry";
import SentryBrowser from "./SentryFactories/SentryBrowser";
import FridayVue from "./VuePlugin/Friday"

export {
    LoggerFacade,
    ConsoleLogger,
    SentryLogger,
    SentryBase,
    SentryBrowser,
    VueSentry,
    FridayVue,
}

export default {
    LoggerFacade,
    ConsoleLogger,
    SentryLogger,
    SentryBase,
    SentryBrowser,
    VueSentry,
    FridayVue
}
