(function (w) {
  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'

  function Promise(executor) {
    const _this = this
    _this.data = undefined
    _this.status = PENDING
    _this.callbacks = []

    function resolved(value) {
      _this.data = value
      _this.callbacks.forEach(cbObj=>{
        cbObj.onResolved(value)
      })
    }

    function reject(reason) {
      _this.data = reason
      _this.callbacks.forEach(cbObj=>{
        cbObj.onRejected(reason)
      })
    }

    executor(resolved, reject)
  }

  Promise.prototype.then = function (onResolved, onRejected) {
    const _this = this
    return new Promise((resolve, reject) => {
      if (_this.status === RESOLVED) {
        //执行成功的回调
        setTimeout(() => {
          try {
            const result = onResolved(_this.data)
            if (result instanceof Promise) {
              //onResolved返回的是Promise
              result.then(resolve, reject)
            } else {
              resolve(result)
            }
          } catch (error) {
            reject(error)
          }
        })
      } else if (_this.status === REJECTED) {
        //执行失败的回调
        setTimeout(() => {
          try {
            const result = onRejected(_this.data)
            if (result instanceof Promise) {
              //onResolved返回的是Promise
              result.then(resolve, reject)
            } else {
              resolve(result)
            }
          } catch (error) {
            reject(error)
          }
        })
      } else {
        _this.callbacks.push({
          onResolved,
          onRejected
        })
      }
    })
  }
  w.Promise = Promise
})(window)