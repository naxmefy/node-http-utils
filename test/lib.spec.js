import * as lib from '../src'

describe('Utils', function () {
  const libexp = [
    'def',
    'env',
    'types',
    'mongoose',
    'koa',
    'extend'
  ]
  
  libexp.forEach(e => {
    it(`should have property ${e}`, function () {
      lib.should.have.property(e)
    })
  })
  
  describe('extend', function () {
    const extendexp = [
      'KoaRouter'
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
  
  describe('koa', function () {
    const koaexp = [
      'controllers',
      'middlewares'
    ]
    
    koaexp.forEach(e => {
      it(`should have property ${e}`, function () {
        lib.koa.should.have.property(e)
      })
    })
    
    describe('controllers', function () {
      const koacontrollersexp = [
        'AppController',
        'ResourceController'
      ]
      
      koacontrollersexp.forEach(e => {
        it(`should have property ${e}`, function () {
          lib.koa.controllers.should.have.property(e)
        })
      })
    })
    
    describe('middlewares', function () {
      const koamiddlewaresexp = [
        'error'
      ]
      
      koamiddlewaresexp.forEach(e => {
        it(`should have property ${e}`, function () {
          lib.koa.middlewares.should.have.property(e)
        })
      })
    })
  })
})