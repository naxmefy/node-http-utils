import koaCompose from 'koa-compose'
import * as _ from 'lodash'

export default class AppController {
  constructor () {
    this._actionFilters = {}
    this.autoStateResponse = true

    if (_.isFunction(this.init)) {
      this.init()
    }
  }

  init () {
  }

  get middleware () {
    const instance = this
    return function *(next) {
      this.controller = instance
      yield next
    }
  }

  get actionFilters () {
    return this._actionFilters
  }

  addFilter (actions, methods) {
    actions = _.isArray(actions) ? actions : [actions]
    methods = _.isArray(methods) ? methods : [methods]

    actions.forEach(action => {
      if (_.isArray(this.actionFilters[action]) === false) {
        this.actionFilters[action] = []
      }

      methods.forEach(method => {
        if (_.isString(method) === false) {
          this.actionFilters[action].push(method)
        } else {
          this.actionFilters[action].push(this[method])
        }
      })
    })
  }

  get automaticResponseOfState () {
    return function *(next) {
      yield next
      
      if(this.body instanceof Error) {
        this.throw(this.body)
      }
      
      if (this.controller.autoStateResponse && !this.body) {
        if(this.state instanceof Error) {
          this.throw(this.state)
        }
        
        // we send empty arrays, but not empty objects or null or undefined
        if (_.isArray(this.state) === false && (_.isEmpty(this.state) || !this.state)) {
          this.throw(404)
        }

        this.body = this.state
      }
    }
  }

  run (action) {
    action = _.isFunction(action) ? action.name : action
    return koaCompose([
      this.middleware,
      function *(next) {
        this.action = action
        this.actionName = `${_.findKey(this.app.context.controllers, this.controller)}.${action}`
        yield next
      },
      this.automaticResponseOfState,
      koaCompose(this.actionFilters[action] || []),
      this[action]
    ])
  }
}
