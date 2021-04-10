const reactiveHandler = {
	get(target, key){
		if (key==='_is_reactive') return true
		console.log('拦截到了get');
		return Reflect.get(target, key);
	},

	set(target, key, newVal){
		console.log('拦截到了set');
		return Reflect.set(target, key, newVal);
	},

	deleteProperty(target, key) {
		console.log('拦截到了delete');
		return Reflect.deleteProperty(target, key);
	}
}


function shallowReactive(target){
	return new Proxy(target, reactiveHandler)
}

function reactive(target) {
	if(target && typeof target === "object"){
		if(Array.isArray(target)){
			target.forEach((item, index) => {
				target[index] = reactive(item);
			})
		} else {
			Object.keys(target).forEach(key => {
				target[key] = reactive(target[key])
			})
		}
		const proxy = new Proxy(target, reactiveHandler);
		return proxy;
	}
	return target;
}


