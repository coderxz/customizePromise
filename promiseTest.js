(function (w) {
  function Promise(executor) {
    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'
    _this = this
    this.status = PENDING
    this.data = undefined
    this.callbacks = []

    function resolve(value) {
      if (_this.status !== PENDING) return
      _this.status = RESOLVED
      _this.data = value
      _this.callbacks.forEach(cbObj => {
        cbObj.onResolved(value)
      })
    }

    function reject(reason) {
      if (_this.status !== PENDING) return
      _this.status = REJECTED
      _this.data = reason
      _this.callbacks.forEach(cbObj => {
        cbObj.onRejected(reason)
      })
    }

    executor(resolve, reject)
    Promise.prototype.then = function (onResolved, onRejected) {
      this.callbacks.push({
        onResolved,
        onRejected
      })
    }
  }

  w.Promise = Promise
})(window)