/// <reference types="node" />
import fs, { WriteStream } from 'fs';
import { Context, LoggerInterface, TLoggerMethods, FormatFn } from "../LoggerInterface";
import { PassThrough } from "stream";
import { TErrorLevel } from "../ErrorLevel";
interface FileLoggerOptions {
    filepath?: string;
    formatFn?: FormatFn;
}
declare class FileLogger implements LoggerInterface {
    _filepath: string;
    _file: string;
    _fileStream: WriteStream;
    _passThrough: PassThrough;
    _isDrained: boolean;
    _formatFn: FormatFn | undefined;
    constructor(options?: FileLoggerOptions);
    _formatMessage(level: TErrorLevel, message: any, data: Context): string;
    _makeFileStream(): fs.WriteStream;
    _makePassThrough(): PassThrough;
    _writeToPassThrough(data: string): void;
    _getFileName(): string;
    /** Log message to file */
    log(method: TLoggerMethods, message: any, context?: Context): void;
    /** Publicly available instance */
    get instance(): this;
}
export default FileLogger;
