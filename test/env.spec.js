import should from 'should'
import env from '../src/env'

describe('Utils: env', function () {
  it('should return env if defined', function () {
    process.env.ENV_TEST_ENV = 1;
    env('ENV_TEST_ENV').should.be.eql('1');
    should(env('ANOTHER_TEST_ENV')).be.undefined();
  });

  it('should return default value if env is not defined', function () {
    env('ANOTHER_TEST_ENV', 2).should.be.eql(2);
  });
});

