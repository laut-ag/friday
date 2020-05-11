import fs from 'fs'
import path from 'path'
import {Context, LoggerInterface, TLoggerMethods} from "../LoggerInterface";

interface FileLoggerOptions {
    filepath?: string,
}

class FileLogger implements LoggerInterface {

    _filepath: string

    constructor ( options: FileLoggerOptions = {} ) {
        this._filepath = options.filepath || __dirname
    }

    _formatMessage ( message: any, data: Context ) {
        return JSON.stringify( {
            date: new Date(),
            message,
            ...data
        } )
    }

    _write ( data: string ) {
        const date = new Date()
        const filename = `${date.getFullYear()}_${date.getMonth() + 1 }_${date.getDate()}`
        const file = path.resolve( this._filepath, filename )
        fs.appendFile( file, data, err => { process.stderr.write( JSON.stringify( err, null, 2 ) ) } )
    }

    /** Log message to file */
    log ( type: TLoggerMethods, message: any, context: Context = {}) {
        const formattedMessage = this._formatMessage( message, context)
        this._write( formattedMessage )
    }

    /** Publicly available instance */
    get instance (): this {
        return this
    }

}

export default FileLogger
