const readonlyHandler = {
	get(target, key){
		if (key==='_is_readonly') return true
		console.log("拦截到了读取数据", target)
		return Reflect.get(target, key);
	},
	set(target, key, newVal){
		console.warn("只能读，不能set")
	},
	deleteProperty(target, key) {
		console.warn("只能读，不能delete")
	}
}

function shallowReadonly(target) {
	return new Proxy(target, readonlyHandler);
}

function readonly(target) {
	if(target && typeof target === "object"){
		if(Array.isArray(target)){
			target.forEach((item, index) => {
				target[index] = readonly(item);
			})
		} else {
			Object.keys(target).forEach(key => {
				target[key] = readonly(target[key])
			})
		}
		return new Proxy(target, readonlyHandler);
	}
	return target;
}