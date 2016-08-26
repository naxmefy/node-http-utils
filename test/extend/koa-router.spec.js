import KoaRouter from 'koa-router'
import koa from 'koa'
import mongoose, {Schema} from 'mongoose'
import supertest from 'supertest'
import * as extend from '../../src/extend'

const app = koa()

describe('Utils: extend KoaRouter', function () {
  let router = null
  let request = null
  before(function () {
    extend.KoaRouter(KoaRouter)
    router = new KoaRouter()
    router
      .scope('/foo', scopeRouter => {
        scopeRouter.get('/bar', function * () {
          this.body = "foobar"
        })
      })
    app.use(router.routes(), router.allowedMethods())
    request = supertest(app.listen())
  })
  
  describe('prototype scope', function () {
    it('should exists and a function', function () {
      KoaRouter.prototype.should.have.a.property('scope')
      KoaRouter.prototype.scope.should.be.a.Function()
    })
    
    it('should return 200 scope /foo and GET /bar as /foo/bar', function * () {
      const resp = yield request.get('/foo/bar')
      resp.text.should.be.eql('foobar')
    })
  })
  
  describe('prototype resource', function () {
    it('should exists and a function', function () {
      KoaRouter.prototype.should.have.a.property('resource')
      KoaRouter.prototype.resource.should.be.a.Function()
    })
  })
})