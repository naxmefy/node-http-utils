import * as _ from 'lodash'

/**
 * Creates an mongoose schema with a object in a special format.
 *
 * object.attributes => schema attributes {}
 * object.options => schema options {}
 * object.virtuals => schema virtuals
 *    virtuals: { example: { get () {}, set (value) { this.value = value }
 * object.paths => schema paths
 *    paths: {
 *      examplepath: {
 *        validate': [
 *          [function (value) {}, 'my message'],
 *          [function (value) {}, 'my other message']
 *        ]
 *      }
 *    }
 * object.hooks => schema hooks (pre/post)
 *    hooks: {
 *      pre: {
 *        save: [
 *          function(next) {next()},
 *          function(next) {next()}
 *        ]
 *      }
 *    }
 * object.methods => schema methods
 *    methods: { myMethod() {} }
 * object.statics => schema statics
 *    statics: { myStatic() {} }
 * object.plugins => schema plugins
 *    plugins: [
 *      [plugin1, options],
 *      [plugin2, options]
 *    ]
 * object.indexes => schema indexes
 *    indexes: [
 *      [fields, expires, options],
 *      [fields, expires, options]
 *    ]
 *
 * @param {Object} object the schema information object
 * @param {Class} Schema the mongoose schema class
 * @returns {Class} The generated schema class
 */
export default function schemaFromObject (object, Schema) {
  const attrs = _.get(object, 'attributes', {})
  const opts = _.get(object, 'options', {})
  const schema = new Schema(attrs, opts)

  _.forEach(_.get(object, 'virtuals', {}), (v, k) => {
    schema.virtual(k)
      .get(v.get)
      .set(v.set)
  })

  _.forEach(_.get(object, 'paths', {}), (methods, path) => {
    _.forEach(methods, (args, method) => {
      args.forEach(arg => schema.path(path)[method].apply(schema.path(path), arg))
    })
  })

  _.forEach(_.get(object, 'hooks', {}), (events, hook) => {
    _.forEach(events, (actions, event) => {
      actions.forEach(action => schema[hook](event, action))
    })
  })

  _.forEach(_.get(object, 'methods', {}), (v, k) => {
    schema.methods[k] = v
  })

  _.forEach(_.get(object, 'statics', {}), (v, k) => {
    schema.statics[k] = v
  })

  _.forEach(_.get(object, 'plugins', []), (o) => {
    const [plugin, options] = _.isArray(o) ? o : [o]
    schema.plugin(plugin, options)
  })

  _.forEach(_.get(object, 'indexes', []), ([fields, expires, options]) => {
    schema.index(fields, expires, options)
  })

  return schema
}
