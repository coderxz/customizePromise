(function (w) {
  function Promise(executor) {
    const _this = this //缓存this,代表Promise实例对象
    const PENDING = 'pending'//未确定状态
    const RESOLVED = 'resolved'//成功状态
    const REJECTED = 'rejected'//失败状态


    _this.status = PENDING //状态属性,初始值为pending,代表初始未确定的状态
    _this.data = undefined //用来存储结果数据的属性,初始值为undefined
    _this.callbacks = []   //存放.then回调函数的结构

    //将promise的状态改变为成功,指定成功的value
    function resolve(value) {
      if (_this.status !== PENDING) return//如果当前不是pending状态则return,结束
      _this.status = RESOLVED //将promise的状态改变为成功
      _this.data = value //指定成功的value
      //异步调用所有缓存的待执行成功的回调函数
      if (_this.callbacks.length) {
        //异步执行成功的回调
        setTimeout(() => {
          _this.callbacks.forEach(cbsObj => {
            cbsObj.onResolved(value)
          })
        })
      }

    }

    //将promise的状态改变为失败,指定失败的reason
    function reject(reason) {
      if (_this.status !== PENDING) return//如果当前不是pending状态则return,结束
      _this.status = REJECTED //将promise的状态改变为失败
      _this.data = reason //指定失败的reason
      //异步调用所有缓存的待执行失败的回调函数
      if (_this.callbacks.length) {
        //异步执行失败的回调
        setTimeout(() => {
          _this.callbacks.forEach(cbsObj => {
            cbsObj.onRejected(reason)
          })
        })
      }
    }

    // 调用executor启动异步任务
    try {
      executor(resolve, reject)
    } catch (error) {
      _this.status = REJECTED
      reject(error)
    }

    //用来指定成功或失败回调的方法
    Promise.prototype.then = function (onResolved, onRejected) {
      //保存回调函数
      this.callbacks.push({
        onResolved,
        onRejected
      })

    }
    //用来指定失败回调的方法
    Promise.prototype.catch = function (onRejected) {

    }
    // 用来指定一个指定value的成功的Promise
    Promise.resolve = function (value) {

    }
    // 用来指定一个指定reason的失败的Promise
    Promise.reject = function (reason) {

    }
    //返回一个Promise,只有数组中的Promise都成功才成功,只要有一个失败就失败
    Promise.all = function (promises) {

    }
    //返回一个Promise,由第一个完成Promise决定(成功或失败)
    Promise.race = function (promises) {

    }
    w.Promise = Promise
  }
})(window)