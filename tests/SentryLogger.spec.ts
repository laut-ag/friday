import { assert } from 'chai'
import waitForExpect from "wait-for-expect";
import SentryLogger from '../src/Loggers/SentryLogger'
import NodeSentry from "../src/SentryFactories/NodeSentry";
import sentryTestkit from "sentry-testkit";

const { testkit, sentryTransport } = sentryTestkit()

describe( '--SentryLogger via NodeSentry--', function () {
    testkit.reset()
    let transport = sentryTransport
    const sentryBuilder = new NodeSentry( { transport } )
    const Sentry = sentryBuilder.dsn( 'http://bogo@bogo.com/cat' )
        .env( 'testing' )
        .release( 'bogus-release' )
        .make()
    const logger = new SentryLogger( Sentry )
    beforeEach( function () {
        testkit.reset()
    } )
    it( 'sends an execption', async function () {
        const err = new Error('foo')
        logger.log( 'error', err )
        await waitForExpect( () => assert.lengthOf( testkit.reports(), 1 ) )
        assert.isTrue( testkit.isExist( err ) )
        const report = testkit.reports()[0]
        assert.isUndefined( report.message )
        assert.equal( testkit.getExceptionAt(0).message, err.message )
    } )
    it( 'sends a message', async function () {
        const message = 'new message'
        logger.log( 'message', message )
        await waitForExpect( () => assert.lengthOf( testkit.reports(), 1))
        const report = testkit.reports()[0]
        assert.isUndefined( report.error )
        assert.equal( report.message, message )
    } )
    it( 'sets user scope', async function () {
        const err = new Error('foo')
        const userData = { userId: 1, username: 'foo name', userIp: '127.0.0.1', userEmail: 'foo@bar.email' }
        logger.log( 'error', err, userData )
        await waitForExpect( () => assert.lengthOf( testkit.reports(), 1 ) )
        const report = testkit.reports()[0]
        for ( const key in userData ) {
            // @ts-ignore
            assert.equal( report.user[ key ], userData[ key ])
        }
    } )
    it( 'sets user scope -- subset', async function () {
        const err = new Error('foo')
        const userData = { userId: 1 }
        logger.log( 'error', err, userData )
        await waitForExpect( () => assert.lengthOf( testkit.reports(), 1 ) )
        const report = testkit.reports()[0]
        for ( const key in userData ) {
            // @ts-ignore
            assert.equal( report.user[ key ], userData[ key ])
        }
    } )
    it( 'sets tags', async function () {
        const err = new Error( 'foo' )
        const context = { tags: [ { key: 'foo', value: 'bar' }, { key: 'bar', value: 'baz' } ] }
        logger.log( 'error', err, context )
        await waitForExpect( () => assert.lengthOf( testkit.reports(), 1 ) )
        const report = testkit.reports()[0]
        assert.deepEqual( report.tags, { foo: 'bar', bar: 'baz'} )
    } )
    it( 'sets extra', async function () {
        const err = new Error( 'foo' )
        const context = { extra: [ { key: 'foo', value: 'bar' }, { key: 'bar', value: 'baz' } ] }
        logger.log( 'error', err, context )
        await waitForExpect( () => assert.lengthOf( testkit.reports(), 1 ) )
        const report = testkit.reports()[0]
        assert.deepEqual( report.tags, { foo: 'bar', bar: 'baz'} )
    } )
    describe( 'log methods', function () {
        const testCases = [
            { args: [ 'emergency', new Error('foo'), { level: 'info' } ], expected: 'fatal' },
            { args: [ 'alert', new Error('foo'), { level: 'info' } ], expected: 'critical' },
            { args: [ 'critical', new Error('foo'), { level: 'info' } ], expected: 'critical' },
            { args: [ 'error', new Error('foo'), { level: 'info' } ], expected: 'error' },
            { args: [ 'warn', new Error('foo'), { level: 'info' } ], expected: 'warning' },
            { args: [ 'notice', new Error('foo'), { level: 'error' } ], expected: 'log' },
            { args: [ 'info', new Error('foo'), { level: 'error' } ], expected: 'info' },
            { args: [ 'debug', new Error('foo'), { level: 'error' } ], expected: 'debug' },
            { args: [ 'log', new Error('foo'), { level: 'error' } ], expected: 'error' },
            { args: [ 'message', 'foo', { level: 'debug' } ], expected: 'info' },
        ]
        testCases.forEach( c => {
            it( 'overrides level from context', async function () {
                // @ts-ignore
                logger.log( ...c.args )
                await waitForExpect( () => assert.lengthOf( testkit.reports(), 1 ) )
                const report = testkit.reports()[0]
                assert.equal( report.level, c.expected )
            } )
        } )
    })
} )
