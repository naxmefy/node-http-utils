import def, {Types} from '../src/def'
import should from 'should';

describe('Utils: def', function () {
  describe('Types', function () {
    describe('defaultFn', function () {
      it('should return the first parameter', function () {
        Types.defaultFn(1).should.be.eql(1);
      });
    });
    describe('notImplemented', function () {
      it('should throw an Error', function () {
        (function () {
          Types.notImplemented();
        }).should.throw();
      });
    });

    describe('callback', function () {
      it('should call callback with error', function () {
        Types.callback(new Error(), function (err) {
          err.should.not.be.undefined();
        });
      });

      it('should call callback without error', function () {
        Types.callback(void 0, function (err) {
          should.not.exists(err);
        });
      });
    });
  });

  it('should return the same object if already defined', function () {
    const x = {ok: 1};
    let o = x;
    o = def(o, []);

    o.should.be.an.Object();
    o.should.not.be.an.Array();
    o.should.be.equal(x);
    o.should.have.property('ok');
    o.ok.should.be.eql(1);
  });

  it('should return the defined definition if object is undefined', function () {
    let o = void 0;
    o = def(o, {});
    o.should.not.be.undefined();
    o.should.be.an.Object();
  });
});
