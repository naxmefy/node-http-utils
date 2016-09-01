import * as _ from 'lodash'

/**
 * Clean an mongoose document object from mongoose standard attributes. It uses the toObject method
 * under the hood.
 *
 * @param {Object} object The mongoose document that should be cleared from some fields
 * @returns {Object}
 */
export default function cleanObject (object) {
  return _.omit(object.toObject(), ['_id', 'id', '__v', 'createdAt', 'updatedAt'])
}
