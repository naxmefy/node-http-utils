import * as lib from '../src'

describe('Utils', function () {
  const libexp = [
    'def',
    'env',
    'types',
    'mongoose',
    'extend',

    'AppController',
    'ResourceController',
    'ErrorMiddleware'
  ]

  libexp.forEach(e => {
    it(`should have property ${e}`, function () {
      lib.should.have.property(e)
    })
  })

  describe('extend', function () {
    const extendexp = [
      'koaRouter'
    ]

    extendexp.forEach(e => {
      it(`should have property ${e}`, function () {
        lib.extend.should.have.property(e)
      })
    })
  })

  describe('mongoose', function () {
    const mongooseexp = [
      'cleanObject',
      'schemaFromObject'
    ]

    mongooseexp.forEach(e => {
      it(`should have property ${e}`, function () {
        lib.mongoose.should.have.property(e)
      })
    })
  })
})
