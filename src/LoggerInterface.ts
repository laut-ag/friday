import { TErrorLevel } from "./ErrorLevel";
import {TLoggerData} from "./LoggerFacadeData";

export type TLoggerMethods = TErrorLevel | 'message' | 'log'

export type Context = Partial<TLoggerData>

export interface LoggerInterface {
    log(type: TLoggerMethods, message: any, context: Partial<TLoggerData>): void
    instance: any | import( '@sentry/types' ).Hub
}
