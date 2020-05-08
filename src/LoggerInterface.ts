import { TErrorLevel } from "./ErrorLevel";

export type TLoggerMethods = TErrorLevel | 'message' | 'log'

export interface LoggerInterface {
    log(type: TLoggerMethods, message: any, context?: any): void
    instance: any | import( '@sentry/types' ).Hub
}
