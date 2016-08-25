import def from '../src/def'

describe('Utils: def', function () {
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
