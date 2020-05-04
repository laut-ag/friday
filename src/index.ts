import LoggerFacade from './LoggerFacade'
import ConsoleLogger from './Loggers/ConsoleLogger'
import FileLogger from "./Loggers/FileLogger";
import SentryLogger from "./Loggers/SentryLogger";
import SentryBase from "./SentryFactories/SentryBase";
import VueSentry from "./SentryFactories/VueSentry";
import SentryBrowser from "./SentryFactories/SentryBrowser";
import NodeSentry from "./SentryFactories/NodeSentry";

export default {
    LoggerFacade,
    ConsoleLogger,
    FileLogger,
    SentryLogger,
    SentryBase,
    SentryBrowser,
    NodeSentry,
    VueSentry,
}
