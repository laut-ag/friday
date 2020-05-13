/// <reference types="node" />
import fs, { WriteStream } from 'fs';
import { Context, LoggerInterface, TLoggerMethods } from "../LoggerInterface";
import { PassThrough } from "stream";
interface FileLoggerOptions {
    filepath?: string;
}
declare class FileLogger implements LoggerInterface {
    _filepath: string;
    _file: string;
    _fileStream: WriteStream;
    _passThrough: PassThrough;
    _isDrained: boolean;
    constructor(options?: FileLoggerOptions);
    _formatMessage(message: any, data: Context): string;
    _makeFileStream(): fs.WriteStream;
    _makePassThrough(): PassThrough;
    _writeToPassThrough(data: string): void;
    _getFileName(): string;
    /** Log message to file */
    log(type: TLoggerMethods, message: any, context?: Context): void;
    /** Publicly available instance */
    get instance(): this;
}
export default FileLogger;
