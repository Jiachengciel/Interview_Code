
const PENDING = 'pending'
const RESOLVED = 'fullfilled'
const REJECTED = 'rejected'
/*
Promise构造函数
excutor: 执行器函数(同步执行)
*/
function myPromise(excutor) {
  // 将当前promise对象保存起来
  const self = this
  self.PromiseState = PENDING // 给promise对象指定PromiseState属性, 初始值为pending
  self.PromiseResult = undefined // 给promise对象指定一个用于存储结果数据的属性
  self.callbacks = [] // 每个元素的结构: { onResolved() {}, onRejected() {}}

  function resolve(value){
    // 如果当前状态不是pending, 直接结束
    if (self.PromiseState!==PENDING) {
      return
    }
    // 将状态改为resolved
    self.PromiseState = RESOLVED
    // 保存value数据
    self.PromiseResult = value
    // 如果有待执行callback函数, 立即异步执行回调函数onResolved
    if(self.callbacks.length > 0){
      setTimeout(() => {
        self.callbacks.forEach(callBackObj => {
          callBackObj.onResolved(value);
        })
      })
    }
  }

  function reject(reason) {
    // 如果当前状态不是pending, 直接结束
    if(self.PromiseState !== PENDING){
      return
    }

    self.PromiseState = REJECTED;
    self.PromiseResult = reason;
    // 如果有待执行callback函数, 立即异步执行回调函数onResolved
    if(self.callbacks.length > 0){
      setTimeout(() => {
        self.callbacks.forEach(callBackObj => {
          callBackObj.onRejected(reason);
        })
      })
    }
  }

  // 立即同步执行excutor
  try{
    excutor(resolve, reject);
  } catch (error) {
    // 如果执行器抛出异常, promise对象变为rejected状态
    reject(error);
  }

}

/*
Promise原型对象的then()
指定成功和失败的回调函数
返回一个新的promise对象
*/
myPromise.prototype.then = function (onResolved, onRejected) {
  onResolved = typeof onResolved==='function' ? onResolved : value => value // 向后传递成功的value
  // 指定默认的失败的回调(实现错误/异常传透的关键点)
  onRejected = typeof onRejected==='function' ? onRejected : reason => {throw reason} // 抽后传递失败的reason

  const self = this

  return new myPromise((resolve, reject) => {
    /*
      调用指定回调函数处理, 根据执行结果, 改变return的promise的状态
     */
    function handle(callback) {
      /*
        1. 如果抛出异常, return的promise就会失败, reason就是error
        2. 如果回调函数返回不是promise, return的promise就会成功, value就是返回的值
        3. 如果回调函数返回是promise, return的promise结果就是这个promise的结果
       */
      try{
        const result = callback(self.PromiseResult)
        // 3. 如果回调函数返回是promise, return的promise结果就是这个promise的结果
        if(result instanceof myPromise){
          result.then(
            value => resolve(value), // 当result成功时, 让 return的promise也成功
            reason => reject(reason) // 当result失败时, 让 return的promise也失败
          )
        }
        // 3. 如果回调函数返回不是promise, return的promise就会成功, value就是返回的值
        else {
          resolve(result)
        }
      }catch (error) {
        // 1. 如果抛出异常, return的promise就会失败, reason就是error
        reject(error);
      }
    }

    // 当前状态还是pending状态, 将回调函数保存起来
    if(self.PromiseState === PENDING){
      self.callbacks.push({
        onResolved(value){
          handle(onResolved)
        },
        onRejected(reason){
          handle(onRejected)
        }
      })
    }
    // 如果当前是resolved状态, 异步执行onResolved并改变return的promise状态
    else if(self.PromiseState === RESOLVED){
      setTimeout(() => {
        handle(onResolved)
      })
    }
    // 如果当前是rejected状态, 异步执行onRejected并改变return的promise状态
    else{
      setTimeout(()=>{
        handle(onRejected)
      })
    }

  })
}

/*
Promise原型对象的catch()
指定失败的回调函数
返回一个新的promise对象
*/
myPromise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

/*
Promise函数对象的resolve方法
返回一个指定结果的成功的promise
*/
myPromise.resolve = function (value) {
  // 返回一个成功/失败的promise
  return new myPromise((resolve, reject) => {
    if(value instanceof myPromise){
      value.then(resolve, reject)
    }
    else{
      resolve(value)
    }
  })
}

/*
Promise函数对象的reject方法
返回一个指定reason的失败的promise
*/
myPromise.reject = function (reason) {
  // 返回一个失败的promise
  return new myPromise((resolve, reject) => {
    reject(reason)
  })
}

/*
Promise函数对象的all方法
返回一个promise, 只有当所有proimse都成功时才成功, 否则只要有一个失败的就失败
*/
myPromise.all = function (promises) {
  // 用来保存所有成功value的数组
  const values = new Array(promises.length)
  // 用来保存成功promise的数量
  let countSuccessPromise = 0;
  // 返回一个新的promise
  return new myPromise((resolve, reject) => {
    // 遍历promises获取每个promise的结果
    promises.forEach((p, index) => {
      myPromise.resolve(p).then(
        value =>{
          // 成功的数量加1
          countSuccessPromise++;
          // p成功, 将成功的value保存values
          values[index] = value
          // 如果全部成功了, 将return的promise改变成功
          if(countSuccessPromise === promises.length){
            resolve(values)
          }
        },
        reason => {
          // 只要一个失败了, return的promise就失败
          reject(reason)
        }
      )
    })
  })
}

/*
Promise函数对象的race方法
返回一个promise, 其结果由第一个完成的promise决定
*/
myPromise.race = function (promises) {
  // 返回一个promise
  return new myPromise((resolve, reject) => {
    // 遍历promises获取每个promise的结果
    promises.forEach((p, index) => {
      myPromise.resolve(p).then(
        value => {// 一旦有成功了, 将return变为成功
          resolve(value)
        },
        reason => { // 一旦有失败了, 将return变为失败
          reject(reason)
        }
      )
    })
  })
}

myPromise.defer = myPromise.deferred = function () {
  let dfd = {}
  dfd.promise = new myPromise((resolve,reject)=>{
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}
module.exports = myPromise;