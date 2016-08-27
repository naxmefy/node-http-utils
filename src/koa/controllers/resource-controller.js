import * as _ from 'lodash'
import AppController from './app-controller'

export default class ResourceController extends AppController {
  constructor (Model) {
    super()
    this.Model = Model
  }

  init () {
    super.init()
    this.addFilter(['show', 'update', 'destroy'], 'setDocument')
  }

  *index () {
    this.state = yield this.controller.Model.find()
  }

  *create () {
    const document = new this.controller.Model(this.request.body)
    this.state = yield document.save()
            .catch(error => {
              error.status = 400
              return error
            })
  }

  *show () {
    this.state = this.request.document
  }

  *update () {
    // TODO: maybe we need here another update procedure
    _.merge(this.request.document, this.request.body)
    this.state = yield this.request.document.save()
            .catch(error => {
              error.status = 400
              return error
            })
  }

  *destroy () {
    this.state = yield this.request.document.remove()
  }

  *setDocument (next) {
    this.request.document = yield this.controller.Model
      .findOne({_id: this.params.id})
    if (this.request.document) yield next
  }
}
