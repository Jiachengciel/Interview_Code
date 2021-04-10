function Watcher(vm, exp, cb){
  this.vm = vm;
  this.cb = cb;
  this.exp = exp;
  this.depIds = {};
  this.value = this.get();
}

Watcher.prototype = {
  update: function(){
    this.run();
  },

  run: function(){
    var value = this.get();
    var oldValue = this.value;
    if(value !== oldValue){
      this.cb.call(this.vm, value, oldValue);
    }
  },

  addDep: function(dep){
    if(!this.depIds.hasOwnProperty(dep.id)){
      dep.addSub(this);
      this.depIds[dep.id] = dep;
    }
  },

  get: function () {
    Dep.target = this;
    var value = this.getVMVal();
    Dep.target = null;
    return value;
  },

  getVMVal: function (){
    var exp = this.exp.split('.');
    var val = this.vm._data;
    exp.forEach(function (k) {
      val = val[k];
    });
    return val;
  }
}