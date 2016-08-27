const defaultOpts = {
  debug: false,
  onNotFound () {
    this.throw(404)
  },
  
  onError (err, opts) {
    // set status
    this.status = err.status || err.statusCode || 500
    
    // verify existing error logger
    if (this.error) {
      this.error(err)
    }
    
    // create err response
    const errRes = {
      message: err.message,
      status: this.status
    }
    
    // debug true
    if (opts.debug) {
      errRes.error = err
      errRes.stack = err.stack.split('\n')
    }
    
    // render json error
    this.body = errRes
  }
}

export default function (opts) {
  opts = Object.assign({}, defaultOpts, opts)
  return function *error (next) {
    try {
      yield next
      if (this.status === 404 || !this.body) {
        opts.onNotFound.call(this)
      }
    } catch (err) {
      opts.onError.call(this, err, opts)
    }
  }
}