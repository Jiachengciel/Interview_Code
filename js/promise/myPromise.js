// 三种状态
const PENDING = "pending";
const RESOLVED = "fullfilled";
const REJECTED = "rejected";
// promise 接收一个函数参数，该函数会立即执行
function myPromise(excutor){
  const self = this;
  self.PromiseState = PENDING; // 给promise对象指定PromiseState属性, 初始值为pending
  self.PromiseResult = undefined; // 给promise对象指定一个用于存储结果数据的属性
  self.callbacks = []   // 每个元素的结构: { onResolved() {}, onRejected() {}}

  function resolve(value){
    // 如果当前状态不是pending, 直接结束(保证只能改变一次状态)
    if(self.PromiseState !== PENDING) return;
    self.PromiseState = RESOLVED;
    self.PromiseResult = value;

    if(self.callbacks.length > 0){
      setTimeout(() => {
        self.callbacks.forEach(callBackObj => {
          callBackObj.onResolved(self.PromiseResult)
        })
      })
    }
  }

  function reject(reason) {
    if(self.PromiseState !== PENDING) return;
    self.PromiseState = REJECTED;
    self.PromiseResult = reason;

    if(self.callbacks.length > 0){
      setTimeout(() => {
        self.callbacks.forEach(callBackObj => {
          callBackObj.onRejected(self.PromiseResult)
        })
      })
    }
  }

  try{
    excutor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

myPromise.prototype.then = function (onResolved, onRejected) {
  onResolved = typeof onResolved === "function" ? onResolved : value => value;
  onRejected = typeof onRejected === "function" ? onRejected : reason => {throw reason};
  const self = this;

  return new myPromise((resolve, reject) => {

    function handle(callback){
      try{
        let result = callback(self.PromiseResult);
        if(result instanceof myPromise){
          result.then(
            v => resolve(v),
            r => reject(r)
          )
        } else {
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    }
    // 当前状态还是pending状态, 将回调函数保存起来
    if(self.PromiseState === PENDING){
      self.callbacks.push({
        onResolved: function(){
          handle(onResolved);
        },
        onRejected: function () {
          handle(onRejected);
        }
      })
    }
    // 如果当前是resolved状态, 异步执行onResolved并改变return的promise状态
    else if(self.PromiseState === RESOLVED){
      setTimeout(() => {
        handle(onResolved);
      })
    }
    // 如果当前是rejected状态, 异步执行onRejected并改变return的promise状态
    else {
      setTimeout(() => {
        handle(onRejected);
      })
    }
  })
}

myPromise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
}

myPromise.resolve = function (value) {
  return new myPromise((resolve, reject) => {
    if(value instanceof myPromise){
      value.then(resolve, reject);
    } else {
      resolve(value);
    }
  })
}

myPromise.reject = function (reason) {
  return new myPromise((resolve, reject) => {
    reject(reason);
  })
}

myPromise.all = function (promises) {
  const valueArr = new Array(promises.length);
  let count = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((p, index) => {
      myPromise.resolve(p).then(
        value => {
          count++;
          valueArr[index] = value;
          if(count === promises.length){
            resolve(valueArr);
          }
        },
        reason => reject(reason)
      )
    })
  })
}

myPromise.race = function (promises) {
  return new myPromise((resolve, reject) => {
    promises.forEach(p => {
      myPromise.resolve(p).then(
        value => resolve(value),
        reason => reject(reason)
      )
    })
  })
}