import fs from 'fs'
import path from 'path'
import {LoggerInterface, TLoggerMethods} from "../Interfaces/LoggerInterface";

interface FileLoggerOptions {
    filepath?: string,
}

export default class FileLogger implements LoggerInterface {

    _filepath: string

    constructor ( options: FileLoggerOptions = {} ) {
        this._filepath = options.filepath || __dirname
    }

    _formatMessage ( message: any, data: object = {} ) {
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

    log ( type: TLoggerMethods, message: any, data?: object ) {
        const formattedMessage = this._formatMessage( message, data )
        this._write( formattedMessage )
    }

    get instance (): any {
        return this
    }



}
