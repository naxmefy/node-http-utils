import koa from 'koa'
import koaRouter from 'koa-router'
import supertest from 'supertest'
import error from '../../../src/koa/middlewares/error'

const app = koa()
const router = new koaRouter()
let called = null

app.context.error = err => {
  called = err
}

app.use(error({
  debug: true
}))

router.get('/500', function * (next) {
  throw new Error('test error')
})

router.get('/404', function * (next) {
  this.status = 404
})

router.get('/', function * (next) {
  this.body = void 0
})

app.use(router.routes(), router.allowedMethods())

const request = supertest(app.listen())

describe.only('Utils: koa middlewares: error', function () {
  let response = null
  
  beforeEach(function () {
    called = null
  })
  
  describe('for error', function () {
    before(function * () {
      response = yield request.get('/500')
    })
    
    it('should response error', function () {
      response.status.should.be.eql(500)
      response.body.should.have.property('message')
      response.body.should.have.property('status')
      response.body.should.have.property('error')
      response.body.should.have.property('stack')
    })
  })
  
  describe('for not found', function () {
    before(function * () {
      response = yield request.get('/404')
    })
    
    it('should response not found', function () {
      response.status.should.be.eql(404)
      response.body.should.have.property('message')
      response.body.should.have.property('status')
      response.body.should.have.property('error')
      response.body.should.have.property('stack')
    })
  })
  
  describe('for no body', function () {
    before(function * () {
      response = yield request.get('/')
    })
    
    it('should response not found', function () {
      response.status.should.be.eql(404)
      response.body.should.have.property('message')
      response.body.should.have.property('status')
      response.body.should.have.property('error')
      response.body.should.have.property('stack')
    })
  })
})