function shallowRef(target) {
	return {
		_value: target,
		_is_ref: true,
		get value(){
			console.log("拦截到了get")
			return this._value;
		},
		set value(newVal){
			console.log("拦截到了set")
			this._value = newVal;
		}
	}
}

function ref(target) {
	if(target && typeof target === "object"){
		target = reactive(target)
	}
	return {
		_value: target,
		_is_ref: true,
		get value(){
			console.log("拦截到了get")
			return this._value;
		},
		set value(newVal){
			console.log("拦截到了set")
			this._value = newVal;
		}
	}
}