import LoggerFacade from './LoggerFacade'
import ConsoleLogger from './Loggers/ConsoleLogger'
import SentryLogger from "./Loggers/SentryLogger";
import SentryBase from "./SentryFactories/SentryBase";
import SentryVue from "./SentryFactories/SentryVue";
import SentryBrowser from "./SentryFactories/SentryBrowser";
import FridayVue from "./VuePlugin/Friday"

export {
    LoggerFacade,
    ConsoleLogger,
    SentryLogger,
    SentryBase,
    SentryBrowser,
    SentryVue,
    FridayVue,
}

export default {
    LoggerFacade,
    ConsoleLogger,
    SentryLogger,
    SentryBase,
    SentryBrowser,
    SentryVue,
    FridayVue
}
