import { assert } from 'chai'
import sinon, {SinonSpy, SinonStub} from 'sinon'
import ConsoleLogger from '../src/Loggers/ConsoleLogger'

describe( '#log', function () {
    const testCases = [
        { args: [ 'emergency', 'foo'], expected: { method: 'error', output: 'emergency -- foo' } },
        { args: [ 'alert', 'foo'], expected: { method: 'error', output: 'alert -- foo' } },
        { args: [ 'critical', 'foo'], expected: { method: 'error', output: 'critical -- foo' } },
        { args: [ 'error', 'foo'], expected: { method: 'error', output: 'error -- foo' } },
        { args: [ 'warn', 'foo'], expected: { method: 'warn', output: 'warn -- foo' } },
        { args: [ 'notice', 'foo'], expected: { method: 'log', output: 'notice -- foo' } },
        { args: [ 'info', 'foo'], expected: { method: 'info', output: 'info -- foo' } },
        { args: [ 'debug', 'foo'], expected: { method: 'debug', output: 'debug -- foo' } },
        { args: [ 'log', 'foo'], expected: { method: 'log', output: 'notice -- foo' } },
        { args: [ 'message', 'foo'], expected: { method: 'info', output: 'info -- foo' } },
    ]
    describe( 'stdErrorMessages', function () {
        let logger: ConsoleLogger
        let errorSpy: SinonStub
        let outSpy: SinonStub
        beforeEach( function () {
            logger = new ConsoleLogger()
            errorSpy = sinon.stub( logger, '_stdError' )
            outSpy = sinon.stub( logger, '_stdOut' )
        } )
        testCases.forEach( tc => {
            it( `calls ${tc.args[0]}`, function () {
                // @ts-ignore
                logger.log( ...tc.args )
                if ( tc.expected.method === 'error' ) {
                    assert.isTrue( errorSpy.calledOnceWithExactly(  tc.expected.method, tc.expected.output ) )
                    assert.isTrue( outSpy.notCalled )
                }
                if ( tc.expected.method === 'out' ) {
                    assert.isTrue( outSpy.calledOnceWithExactly(  tc.expected.method, tc.expected.output ) )
                    assert.isTrue( errorSpy.notCalled )
                }
            })
        } )
    } )
} )
