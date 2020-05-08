import {assert} from 'chai'
import Logger from '../src/index'

describe( 'test', function () {
  it( 'returns things', function () {
    let logger = new Logger.LoggerFacade()
    assert.instanceOf(logger, Logger.LoggerFacade)
  })
})
