import { assert } from 'chai'
import sinon from 'sinon'
import LoggerManager from "../src/LoggerManager";

describe( 'public functions', function () {
    let manager: LoggerManager
    beforeEach( function () {
       manager = new LoggerManager()
    } )

    it( '#add -- adds a logger', function () {
        manager.add( 'console', {} )
        assert.hasAllKeys( manager._loggers, 'console' )
    } )

    it( '#default -- sets default logger', function () {
        manager.add( 'console', {} )
        manager.default( 'console' )
        assert.equal( manager._default, 'console' )
    } )

    it( '#remove -- removes a logger', function () {
        manager.add( 'console', {} )
        manager.remove( 'console' )
        assert.doesNotHaveAllKeys( manager._loggers, 'console' )
    } )

    it( '#remove -- doesnt throw when removing non existant logger', function () {
        const fn = function () { manager.remove( 'console' ) }
        assert.doesNotThrow( fn, Error )
    })

    it( '#clear -- clears loggers', function () {
        manager.add( 'console', {} )
        manager.clear()
        assert.isEmpty( manager._loggers )
    })

    it('#log -- calls logger message correctly(1)', function () {
        const logger1 = {
            log: sinon.stub()
        }
        const [ method, message, data ] = [ 'log', 'message 1', { foo: 'bar' } ]
        manager.add( 'logger1', logger1 )
        manager.log( method, message, data )
        assert.isTrue( logger1.log.calledOnceWithExactly( method, message, data ) )
    } )

    it('#log -- calls logger message correctly(2)', function () {
        const logger1 = {
            log: sinon.stub()
        }
        const logger2 = {
            log: sinon.stub()
        }
        const [ method, message, data ] = [ 'log', 'message 1', { foo: 'bar' } ]
        manager.add( 'logger1', logger1 )
        manager.add( 'logger2', logger2 )
        manager.log( method, message, data )
        assert.isTrue( logger1.log.calledOnceWithExactly( method, message, data ) )
        assert.isTrue( logger2.log.calledOnceWithExactly( method, message, data ) )
    } )
})
