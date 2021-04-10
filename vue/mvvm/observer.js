function Observer(data) {
  this.data = data
  this.walk(data)
}

function observe(data, vm) {
  if(!data || typeof data !== 'object') return;
  return new Observer(data);
}

Observer.prototype = {
  walk: function (obj) {
    var me = this;
    Object.keys(obj).forEach(key => {
      me.convert(key, obj[key]);
    })
  },

  convert: function (key, val) {
    this.defineReactive(this.data, key, val);
  },

  defineReactive: function (obj, key, val) {
    var childObj = observe(obj);
    var dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get: function reactiveGetter() {
        if(Dep.target){
          dep.depend()
        }
        return val;
      },
      set: function reactivaeSetter(newVal) {
        if(newVal === val) return;
        val = newVal;
        childObj = observe(newVal)
        dep.notify()
      }
    })
  }
}

var uid = 0;

function Dep() {
  this.subs = []
  this.id = uid++;
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },

  depend: function(){
    Dep.target.addDep(this);
  },

  removeSub: function(sub){
    var index = this.subs.indexOf(sub);
    if(index !== -1){
      this.subs.splice(index, 1);
    }
  },

  notify: function () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
Dep.target = null