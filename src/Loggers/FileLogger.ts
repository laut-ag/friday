import fs, {WriteStream} from 'fs'
import path from 'path'
import util from 'util'
import {Context, LoggerInterface, TLoggerMethods, FormatFn} from "../LoggerInterface";
import {PassThrough} from "stream";
import {TErrorLevel} from "../ErrorLevel";

interface FileLoggerOptions {
    filepath?: string,
    formatFn?: FormatFn
}

class FileLogger implements LoggerInterface {

    _filepath: string
    _file: string
    _fileStream: WriteStream
    _passThrough: PassThrough
    _isDrained: boolean
    _formatFn: FormatFn | undefined

    constructor ( options: FileLoggerOptions = {} ) {
        this._filepath = options.filepath || __dirname
        this._file = this._getFileName()
        this._fileStream = this._makeFileStream()
        this._passThrough = this._makePassThrough()
        this._isDrained = true
        this._passThrough.pipe( this._fileStream )
        if ( options.formatFn ) {
            this._formatFn = options.formatFn
        } else {
            this._formatFn = undefined
        }
    }

    _formatMessage ( level: TErrorLevel, message: any, data: Context ): string {
        if ( this._formatFn !== undefined ) {
            return this._formatFn( level, message, data )
        } else {
            function printKeys () {
                let dataString = ''
                for (const key in data) {
                    dataString += `${key}: ${data[key]}, `
                }
                return dataString.length ? ', '+dataString.slice( 0, -2 ) : dataString
            }
            function makeMessage () {
                if ( typeof message === 'string' || typeof message === 'number' ) return message
                else if ( typeof message === 'object' ) return util.inspect( message, false, 7 )
            }
            return `** Timestamp: ${new Date().toDateString()}, message: ${makeMessage()}${printKeys()}\n`
        }
    }

    _makeFileStream () {
        return fs.createWriteStream( this._file, { flags: 'a', emitClose: true } )
    }

    _makePassThrough () {
        return new PassThrough()
    }

    _writeToPassThrough ( data: string ) {
        if ( this._isDrained ) {
            this._isDrained = this._passThrough.write( data )
        } else {
            this._passThrough.once( 'drain', () => {
                this._isDrained = this._passThrough.write( data )
            } )
        }
    }

    _getFileName () {
        const date = new Date()
        const filename = `${date.getFullYear()}_${date.getMonth() + 1 }_${date.getDate()}`
        return path.resolve( this._filepath, filename )
    }

    /** Log message to file */
    log ( method: TLoggerMethods, message: any, context: Context = {}) {
        let level: TErrorLevel
        if ( method === 'message' || method === 'log' ) {
            if ( context.level ) level = context.level
            else level = 'info'
        } else {
            level = method
        }
        const formattedMessage = this._formatMessage( level, message, context)
        this._writeToPassThrough( formattedMessage )
    }

    /** Publicly available instance */
    get instance (): this {
        return this
    }

}

export default FileLogger
