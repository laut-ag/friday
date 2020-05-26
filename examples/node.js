const er = require( 'error-reporting' )

const cl = new er.ConsoleLogger()
const fl = new er.FileLogger( { filepath: '.' } )

const logger = new er.LoggerFacade()
logger.addLogger( 'console', cl )
logger.addLogger( 'file', fl )

logger.username('boby').error( 'string error' )
logger.notice({})
logger.info('{}')
logger.log(JSON.stringify({foo: { bar: { baz: [ "bing", "bang" ] } }}, null, 2 ))
logger.log({foo: { bar: { baz: [ "bing", "bang" ] } }})
logger.userId(2).error( new Error( 'captured error' ) )

setTimeout( () => process.exit(), 2000)
