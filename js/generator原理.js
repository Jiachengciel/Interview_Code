function generator(cb){
  return (function () {
    var obj = {
      next: 0,
      stop: function () {

      }
    }
    return {
      next: function () {
        var ret = cb(obj);
        if(ret === undefined) return {value: undefined, done: true};
        return{
          value: ret,
          done: false
        }
      }
    }
  })()
}

function* test() {
  let a = 1 + 2;
  yield 3
  yield 4

}

var b = generator(test)
console.log(b.next())
console.log(b.next())
