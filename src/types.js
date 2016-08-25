export default {
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
