import * as _ from 'lodash'
import def from '../def'
import ResourceController from '../koa/controllers/resource-controller'
import urlJoin from 'url-join'

export default function koaRouter (KoaRouter) {
  /**
   *
   * @param {String} route The route for the resource
   * @param {Object} resourceControllerInstance An instance of ResourceController
   * Must be subclass of ResourceController
   * @param {Object} [options]
   * @return {Object} The KoaRouter instance
   */
  KoaRouter.prototype.resource = function (route, resourceControllerInstance, options) {
    options = def(options, {})
    if(_.isEmpty(route) || _.first(route) !== '/') route = `/${route}`
    if (resourceControllerInstance instanceof ResourceController === false) {
      throw new Error('IllegalArgumentException')
    }

    const only = _.get(options, 'only', [
      'index',
      'create',
      'show',
      'update',
      'destroy'
    ])

    const is = o => _.includes(only, o)

    if (is('index')) {
      this.get(urlJoin(route), resourceControllerInstance.run(options.index || 'index'))
    }
    if (is('create')) {
      this.post(urlJoin(route), resourceControllerInstance.run(options.create || 'create'))
    }
    if (is('show')) {
      this.get(urlJoin(route, ':id'), resourceControllerInstance.run(options.show || 'show'))
    }
    if (is('update')) {
      this.put(urlJoin(route, ':id'), resourceControllerInstance.run(options.update || 'update'))
    }
    if (is('destroy')) {
      this.delete(urlJoin(route, ':id'), resourceControllerInstance.run(options.destroy || 'destroy'))
    }

    return this
  }

  /**
   *
   * @param {String} scope The scope route
   * @param {Function} fn The function that get called for the scope
   * @returns {Object} Returns the instance of the KoaRouter
   */
  KoaRouter.prototype.scope = function (scope, fn) {
    const router = new KoaRouter({prefix: scope})
    fn.call(router, router)
    this.use(router.routes())
    return this
  }
}
