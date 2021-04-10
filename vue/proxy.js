let handler = {
  get(target, key, receiver){
    console.log('get', key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, newVal, receiver){
    console.log('set', key, newVal);
    return Reflect.set(target, key, newVal, receiver);
  }
}

let obj = {
  name:'jiacheng',
  age:25
}

let proxy = new Proxy(obj, handler);
console.log(proxy.name)
proxy.name = 'tt'
console.log(proxy.name)


