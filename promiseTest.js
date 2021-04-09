(function(w){
  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'
  function Promise(executor){
    const _this = this
    _this.data = undefined
    _this.status = PENDING
    _this.callbacks = []
    function resolve(value){
      _this.status = RESOLVED
      _this.data = value
      _this.callbacks.forEach(cbObj=>{
        cbObj.onResolved(value)
      })
    }
    function reject(reason){
      _this.status = REJECTED
      _this.data = reason
      _this.callbacks.forEach(cbObj=>{
        cbObj.onResolved(reason)
      })
    }
    executor(resolve,reject)
    Promise.prototype.then = function(onResolved,onRejected){
      const _this = this
      return new Promise((resolve,reject) => {
        function handle(callback){
          try{
            const result = callback(_this.data)
            if (result instanceof Promise){
              result.then(resolve,reject)
            }else{
              resolve(result)
            }
          }catch(error){
            reject(error)
          }
        }
        if (_this.status === RESOLVED){
          setTimeout(() => {
            handle(onResolved)
          })
        }else if (_this.status === REJECTED){
          setTimeout(() => {
            handle(onRejected)
          })
        }else{
          _this.callbacks.push({
            onResolved(){
              handle(onResolved)
            },
            onRejected(){
              handle(onRejected)
            }
          })
        }
      })
    }
  }
  w.Promise = Promise
})(window)