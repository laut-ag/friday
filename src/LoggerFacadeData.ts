import {Textra, TLoggerData, Ttag, TuserEmail, TuserId, TuserIp, Tusername} from "./Interfaces/LoggerData";
import {TErrorLevel} from "./Interfaces/ErrorLevel";

export default class LoggerFacadeData{

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
