import koa from 'koa'
import KoaRouter from 'koa-router'
import koaBodyparser from 'koa-bodyparser'
import mongoose, {Schema} from 'mongoose'
import bluebird from 'bluebird'
import supertest from 'supertest'

import * as extend from '../../src/extend'
import ResourceController from '../../src/koa/controllers/resource-controller'
import error from '../../src/koa/middlewares/error'

mongoose.Promise = bluebird

const app = koa()
const Model = mongoose.model('KoaRouterResourceDummyModel', new Schema({
  test: Number
}))

app.use(error({debug: true}))
app.use(koaBodyparser())

describe('Utils: extend KoaRouter', function () {
  before(function * () {
    yield mongoose
      .connect(process.env.MONGODB_URI || 'mongodb://localhost/test')
  })
  
  after(function * () {
    yield mongoose.connection.db.dropDatabase()
    yield mongoose.connection.close()
  })
  
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
      .resource('/dummy', Model, ResourceController, {})
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
    
    it('should response 200 for GET /dummy', function * () {
      const response = yield request.get('/dummy')
      response.status.should.be.eql(200)
      response.body.should.be.an.Array()
    })
    
    it('should response 200 for POST /dummy', function * () {
      const response = yield request.post('/dummy')
        .send({test: 1})
      response.status.should.be.eql(200)
      response.body.should.have.property('_id')
      response.body.should.have.property('test')
      response.body.test.should.be.eql(1)
    })
    
    it('should response 200 for GET /dummy/:id', function * () {
      const doc = yield Model.create({test: 2})
      const response = yield request.get(`/dummy/${doc._id}`)
      response.status.should.be.eql(200)
      response.body.should.have.property('_id')
      response.body.should.have.property('test')
      response.body.test.should.be.eql(2)
    })
    
    it('should response 200 for PUT /dummy/:id', function * () {
      const doc = yield Model.create({test: 3})
      const response = yield request.put(`/dummy/${doc._id}`)
        .send({test: 4})
      response.status.should.be.eql(200)
      response.body.should.have.property('_id')
      response.body.should.have.property('test')
      response.body.test.should.be.eql(4)
    })
    
    it('should response 200 for DELETE /dummy/:id', function * () {
      const doc = yield Model.create({test: 5})
      const response = yield request.delete(`/dummy/${doc._id}`)
      response.status.should.be.eql(200)
      response.body.should.have.property('_id')
      response.body.should.have.property('test')
      response.body.test.should.be.eql(5)
      
      // refetch should return 404
      const refetch = yield request.get(`/dummy/${doc._id}`)
      refetch.status.should.be.eql(404)
    })
  })
})