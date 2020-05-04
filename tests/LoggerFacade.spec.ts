import { assert } from 'chai'
import sinon, {SinonStub} from 'sinon'
import LoggerFacade from '../src/LoggerFacade'
import LoggerManager from "../src/LoggerManager";
import LoggerFacadeData from "../src/LoggerFacadeData";

describe( 'constructor', function () {
    it( 'uses the default LoggerManager', function () {
        let logger = new LoggerFacade()
        assert.instanceOf( logger._manager, LoggerManager )
    })

    it( 'assigns a passed manager to the LoggerManager', function () {
        // @ts-ignore
        let logger = new LoggerFacade( {} )
        assert.notInstanceOf( logger._manager, LoggerManager )
    })
})

describe( 'data methods', function () {
    it( 'sets data', function() {
        const logger = new LoggerFacade()
        logger
            .username( 'foo' )
            .userEmail( 'foo@foo.com' )
            .userId( '1234' )
            .userIp( '123.123.12.12' )
            .tag( 'foo', 'bar' )
            .tag( 'baz', 'bang' )
            .level(  'debug' )
            .extra( 'extra', 'stuff' )
            .extra( 'more', 'stuff' )

        assert.deepEqual( logger._data, {
            _username: 'foo',
            _userEmail: 'foo@foo.com',
            _userId: '1234',
            _userIp: '123.123.12.12',
            _tag: [ { key: 'foo', value: 'bar' }, { key: 'baz', value: 'bang' } ],
            _level: 'debug',
            _extra: [ { key: 'extra', value: 'stuff' }, { key: 'more', value: 'stuff' } ],
        } as LoggerFacadeData)

        assert.sameMembers( logger._toSend, [ 'username', 'userEmail', 'userId', 'userIp', 'tag', 'level', 'extra' ] )
    } )

} )

describe( 'calls all logging methods', function () {
    let logger: LoggerFacade
    let spy: SinonStub
    beforeEach( function () {
        logger = new LoggerFacade()
        logger.userId(1)
        spy = sinon.stub( logger._manager, "log" )
    } )

    it( 'calls emergency', function () {
        logger.emergency( 'foo' )
        assert.isTrue( spy.calledOnceWith( 'emergency', 'foo', { userId: 1 } ) )
    } )
    it( 'calls alert', function () {
        logger.alert( 'foo' )
        assert.isTrue( spy.calledOnceWith( 'alert', 'foo', { userId: 1 } ) )
    } )
    it( 'calls critical', function () {
        logger.critical( 'foo' )
        assert.isTrue( spy.calledOnceWith( 'critical', 'foo', { userId: 1 } ) )
    } )
    it( 'calls error', function () {
        logger.error( 'foo' )
        assert.isTrue( spy.calledOnceWith( 'error', 'foo', { userId: 1 } ) )
    } )
    it( 'calls warning', function () {
        logger.warning( 'foo' )
        assert.isTrue( spy.calledOnceWith( 'warning', 'foo', { userId: 1 } ) )
    } )
    it( 'calls notice', function () {
        logger.notice( 'foo' )
        assert.isTrue( spy.calledOnceWith( 'notice', 'foo', { userId: 1 } ) )
    } )
    it( 'calls info', function () {
        logger.info( 'foo' )
        assert.isTrue( spy.calledOnceWith( 'info', 'foo', { userId: 1 } ) )
    } )
    it( 'calls debug', function () {
        logger.debug( 'foo' )
        assert.isTrue( spy.calledOnceWith( 'debug', 'foo', { userId: 1 } ) )
    } )
    it( 'calls log', function () {
        logger.log( 'foo' )
        assert.isTrue( spy.calledOnceWith( 'log', 'foo', { userId: 1 } ) )
    } )
    it( 'calls message', function () {
        logger.message( 'foo' )
        assert.isTrue( spy.calledOnceWith( 'message', 'foo', { userId: 1 } ) )
    } )
} )

describe( 'interfaces with default logging manager', function () {
    const logger = new LoggerFacade()
    it( 'adds a logger', function () {
        const spy = sinon.stub(logger._manager, "add")
        const res = logger.add( 'console', {} )
        assert.isTrue( spy.calledOnceWith( 'console', {} ) )
        assert.strictEqual( res, logger )
    } )

    it( 'removes a logger', function () {
        const spy = sinon.stub(logger._manager, "remove")
        const res = logger.remove( 'console' )
        assert.isTrue( spy.calledOnceWith( 'console' ) )
        assert.strictEqual( res, logger )
    } )

    it( 'clears loggers', function () {
        const spy = sinon.stub(logger._manager, "clear")
        const res = logger.clear()
        assert.equal( spy.callCount, 1 )
        assert.strictEqual( res, logger )
    } )

    it( 'calls default method', function () {
        const spy = sinon.stub(logger._manager, "default")
        const res = logger.default( 'console' )
        assert.isTrue( spy.calledOnceWith( 'console' ) )
        assert.strictEqual( res, logger )
    } )
} )
