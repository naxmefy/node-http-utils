import koa from 'koa'
import koaRouter from 'koa-router'
import supertest from 'supertest'
import AppController from '../../../src/koa/controllers/app-controller'

class SubController extends AppController {
  init() {
    super.init()
    this.addFilter('test', this.beforeTest)
  }
  
  *beforeTest (next) {
    this.request.testLabel = 'test'
    yield next
  }
  
  *test () {
    this.body = this.request.testLabel
  }
  
  *error () {
    const err = new Error('rofl')
    err.status = 418
    this.body = err
  }
}

const app = koa()
const router = new koaRouter()
const cInstance = new SubController()

router.get('/test', cInstance.run('test'))
router.get('/error', cInstance.run('error'))
app.use(router.routes(), router.allowedMethods())
const request = supertest(app.listen())

describe('Utils: koa controllers: AppController', function () {
  // Most lines covered by koa-router.spec
  
  it('should be able to define a filter with a function', function * () {
    const response = yield request.get('/test')
    response.status.should.be.eql(200)
    response.text.should.be.eql('test')
  })
  
  it('should response 418 error if body contains an error', function * () {
    const response = yield request.get('/error')
    response.status.should.be.eql(418)
  })
})