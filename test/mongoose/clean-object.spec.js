import mongoose, {Schema} from 'mongoose'

import cleanObject from '../../src/mongoose/clean-object'

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
});

