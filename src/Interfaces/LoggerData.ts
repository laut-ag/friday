import { TErrorLevel } from "./ErrorLevel";

export type Tusername = undefined | null | string
export type TuserEmail = undefined | null | string
export type TuserId = undefined | null | string | number
export type TuserIp = undefined | null | string

export interface Ttag { key: string, value: string }
export interface Textra { key: string, value: string}

export interface TLoggerData {
    username: Tusername,
    userEmail: TuserEmail,
    userId: TuserId,
    userIp: TuserIp,
    level: TErrorLevel | undefined,
    extra: Textra[],
    tag: Ttag[],
    [x: string]: any,
}

