import { assert } from 'chai'
import sinon from 'sinon'
import LoggerManager from "../src/LoggerManager";

describe( '--LoggerManager--', function () {
    describe( 'public functions', function () {
        let manager: LoggerManager
        beforeEach( function () {
            manager = new LoggerManager()
        } )

        it( '#add -- adds a logger', function () {
            manager.add( 'console', {} )
            assert.hasAllKeys( manager._loggers, 'console' )
        } )

        it( '#default -- sets default logger -- true', function () {
            manager.add( 'console', {} )
            const res = manager.default( 'console' )
            assert.equal( manager._default, 'console' )
            assert.isTrue( res )
        } )

        it( '#default -- sets default logger -- false', function () {
            const res = manager.default( 'console' )
            assert.isFalse( res )
        } )

        it( '#remove -- removes a logger -- true', function () {
            manager.add( 'console', {} )
            const res = manager.remove( 'console' )
            assert.doesNotHaveAllKeys( manager._loggers, 'console' )
            assert.isTrue( res )
        } )

        it( '#remove -- removes a logger -- false', function () {
            const res = manager.remove( 'console' )
            assert.doesNotHaveAllKeys( manager._loggers, 'console' )
            assert.isFalse( res )
        } )

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

        it( '#get -- gets logger instance', function () {
            const logger = {
                instance: 'loggerInstance'
            }
            manager.add( 'logger', logger )
            const res = manager.get( 'logger' )
            assert.equal( res, 'loggerInstance' )
        })
    })
})
