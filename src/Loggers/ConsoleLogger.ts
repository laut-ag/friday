import {LoggerInterface, TLoggerMethods} from "../LoggerInterface";
import {TErrorLevel} from "../ErrorLevel";

type TConsoleLevel = 'debug' | 'log' | 'info' | 'warn' | 'error'
type Context = { [x: string]: any }

class ConsoleLogger implements LoggerInterface {
    _stdErrLevels: TConsoleLevel[]
	_levels: { [ key: string ]: TConsoleLevel }
	_defaultLevels: { log: TErrorLevel, message: TErrorLevel }

	constructor () {
		this._levels = {
			emergency: 'error',
			alert: 'error',
			critical: 'error',
			error: 'error',
			warn: 'warn',
			notice: 'log',
			info: 'info',
            debug: 'debug',
		}

		this._defaultLevels = {
			log: 'notice',
			message: 'info'
		}

		this._stdErrLevels = [ 'error', 'warn' ]

	}

	_stdOut ( level: TConsoleLevel, message: string ) {
		// @ts-ignore
		if ( console._stdout ) {
			// @ts-ignore
			console._stdout.write( `${message}\n` )
		} else {
			console[ level ]( message )
		}
	}

	_stdError ( level: TConsoleLevel, message: string ) {
		// @ts-ignore
		if ( console._stderr ) {
			// @ts-ignore
			console._stderr.write( `${message}\n` )
		} else {
			console[ level ]( message )
		}
	}

	_formatMessage( level: TErrorLevel, message: any, context: any ): string {
		return `${level} -- ${message}`
	}

	/** Log to the console or process */
	log ( method: TLoggerMethods, message: any, context?: Context ) {
    	let level: TErrorLevel
		if ( method === 'message' || method === 'log' ) {
            if ( context && context.level ) level = context.level
            else level = this._defaultLevels[ method ]
		} else {
			level = method
		}
		let mappedLevel = this._levels[ level ]
        const formattedMessage = this._formatMessage( level, message, context )
        if ( this._stdErrLevels.indexOf( mappedLevel ) !== -1 ) this._stdError( mappedLevel, formattedMessage )
		else this._stdOut( mappedLevel, formattedMessage )
	}

	/** Publicly available instance */
	get instance (): any {
    	return this
	}

}

export default ConsoleLogger
