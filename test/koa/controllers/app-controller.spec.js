import koa from 'koa'
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
}

const app = koa()
const cInstance = new SubController()

app.use(cInstance.run('test'))
const request = supertest(app.listen())

describe('Utils: koa controllers: AppController', function () {
  // Most lines covered by koa-router.spec
  
  it('should be able to define a filter with a function', function * () {
    const response = yield request.get('/')
    response.status.should.be.eql(200)
    response.text.should.be.eql('test')
  })
})