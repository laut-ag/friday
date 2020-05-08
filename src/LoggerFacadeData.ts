import {TErrorLevel} from "./ErrorLevel";

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

class LoggerFacadeData{

    _username: Tusername
    _userEmail: TuserEmail
    _userId: TuserId
    _userIp: TuserIp
    _level: TErrorLevel | undefined
    _extra: Textra[]
    _tag: Ttag[]

    constructor () {
        this._username = undefined
        this._userEmail = undefined
        this._userId = undefined
        this._userIp = undefined
        this._level = undefined
        this._extra = []
        this._tag = []
    }

    /**
     * Get a fresh version of data
     */
    data (): TLoggerData {
        return {
            username: this._username,
            userEmail: this._userEmail,
            userId: this._userId,
            userIp: this._userIp,
            level: this._level,
            extra: this._extra,
            tag: this._tag,
        }
    }

}

export default LoggerFacadeData
