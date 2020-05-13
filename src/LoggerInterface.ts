import { TErrorLevel } from "./ErrorLevel";
import {TLoggerData} from "./LoggerFacadeData";
import type { Hub } from '@sentry/types'

export type TLoggerMethods = TErrorLevel | 'message' | 'log'

export type Context = Partial<TLoggerData>

export interface LoggerInterface {
    log(type: TLoggerMethods, message: any, context: Partial<TLoggerData>): void
    instance: any | Hub
}
