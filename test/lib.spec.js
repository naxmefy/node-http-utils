import * as lib from '../src'

describe('Utils', function () {
  const tests = [
    'def',
    'env',
    'types',
    'mongoose',
    'extend'
  ]
  
  tests.forEach( test => {
    it(`should have property ${test}`, function () {
      lib.should.have.property(test)
    })
  })
})