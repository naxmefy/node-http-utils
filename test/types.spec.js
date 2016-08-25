import types from '../src/types'
import should from 'should';

describe('Utils: types', function () {
  describe('defaultFn', function () {
    it('should return the first parameter', function () {
      types.defaultFn(1).should.be.eql(1);
    });
  });
  describe('notImplemented', function () {
    it('should throw an Error', function () {
      (function () {
        types.notImplemented();
      }).should.throw();
    });
  });

  describe('callback', function () {
    it('should call callback with error', function () {
      types.callback(new Error(), function (err) {
        err.should.not.be.undefined();
      });
    });

    it('should call callback without error', function () {
      types.callback(void 0, function (err) {
        should.not.exists(err);
      });
    });
  });
});
