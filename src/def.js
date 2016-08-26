import * as _ from 'lodash'

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
