import {Schema} from 'mongoose'

import schemaFromObject from '../../src/mongoose/schema-from-object'
import schemaObject from '../fixtures/schema-object'

describe('Utils: mongoose', function () {
  describe('schemaFromObject', function () {
    it('should create a Mongoose Schema from a object', function () {
      let schema = schemaFromObject(schemaObject, Schema)

      // attributes
      schema.constructor.name.should.be.eql('Schema')
      schema.paths.should.have.property('name')
      schema.paths.should.have.property('isJane')

      // options
      schema.options.timestamps.should.be.true();

      // virutals
      schema.virtuals.should.have.property('hello')

      // paths
      schema.paths.name.validators[0].message
        .should.be.eql('we hate john')

      // methods
      schema.methods.should.have.property('greet')

      // statics
      schema.statics.should.have.property('test')
    });
  });
});
