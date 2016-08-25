import {cleanObject, schemaFromObject} from '../src/mongoose'
import mongoose, {Schema} from 'mongoose'

import schemaObject from './fixtures/schema-object'

const DummyModel = mongoose.model('Dummy', new Schema())

describe('Utils: mongoose', function () {
  describe('cleanObject', function () {
    it('should clean a mongoose document', function () {
      let doc = new DummyModel();

      doc = cleanObject(doc)
      doc.should.not.have.property('_id')
      doc.should.not.have.property('id')
      doc.should.not.have.property('__v')
      doc.should.not.have.property('createdAt')
      doc.should.not.have.property('updatedAt')
    });
  });

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
