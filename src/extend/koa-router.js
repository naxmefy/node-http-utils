import * as _ from 'lodash'

export default function koaRouter (KoaRouter) {
  /**
   *
   * @param {Class} Model The model class for the controller instance
   * @param {Class} Controller The controller class which get instantiated
   * @param {Object} [options]
   * @return {Object} The KoaRouter instance
   */
  KoaRouter.prototype.resource = function (route, Model, Controller, options) {
    const instance = new Controller(Model)
    const only = _.get(options, 'only', [
      'index',
      'create',
      'show',
      'update',
      'destroy'
    ])

    const is = o => only.includes(o)

    if (is('index')) {
      this.get(route, instance.run(options.index || 'index'))
    }
    if (is('create')) {
      this.post(route, instance.run(options.create || 'create'))
    }
    if (is('show')) {
      this.get(`${route}/:id`, instance.run(options.show || 'show'))
    }
    if (is('update')) {
      this.put(`${route}/:id`, instance.run(options.update || 'update'))
    }
    if (is('destroy')) {
      this.delete(`${route}/:id`, instance.run(options.destroy || 'destroy'))
    }

    return this
  }

  KoaRouter.prototype.scope = function (scope, fn) {
    const router = new KoaRouter({prefix: scope})
    fn.call(router, router)
    this.use(router.routes())
    return this
  }
}
