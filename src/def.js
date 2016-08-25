import * as _ from 'lodash'

export const Types = {
  noop () {
  },
  defaultFn (arg) {
    return arg
  },
  callback (err, done) {
    return err ? done(err) : done()
  },
  notImplemented () {
    throw new Error('not implemented')
  }
}

/**
 * If object is undefined or force is true then object becomes def
 * 
 * @param {*} object The object to proof
 * @param {*} def The definition to set to object if object is not defined
 * @param {Boolean} [force] A indicator to force the override of object
 * @returns {*}
 */
export default function def (object, def, force) {
  return _.isUndefined(object) || _.isNull(object) || force ? def : object
}
