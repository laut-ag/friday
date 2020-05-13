import { TErrorLevel } from "./ErrorLevel";
export declare type Tusername = undefined | null | string;
export declare type TuserEmail = undefined | null | string;
export declare type TuserId = undefined | null | string | number;
export declare type TuserIp = undefined | null | string;
export interface Ttag {
    key: string;
    value: string;
}
export interface Textra {
    key: string;
    value: string;
}
export interface TLoggerData {
    username: Tusername;
    userEmail: TuserEmail;
    userId: TuserId;
    userIp: TuserIp;
    level: TErrorLevel | undefined;
    extra: Textra[];
    tag: Ttag[];
    [x: string]: any;
}
declare class LoggerFacadeData {
    _username: Tusername;
    _userEmail: TuserEmail;
    _userId: TuserId;
    _userIp: TuserIp;
    _level: TErrorLevel | undefined;
    _extra: Textra[];
    _tag: Ttag[];
    constructor();
    /**
     * Get a fresh version of data
     */
    data(): TLoggerData;
}
export default LoggerFacadeData;
