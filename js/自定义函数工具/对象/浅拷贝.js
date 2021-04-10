function clone1(target) {
	if(target && typeof target === "object"){
		if(Array.isArray(target)){
			return [...target];
		} else {
			return {...target};
		}
	}
	return target;
}

function clone2(target) {
	if(target && typeof target === "object"){
		let res = Array.isArray(target) ? [] : {};
		for (let key in target) {
			if(target.hasOwnProperty(key)){
				res[key] = target[key];
			}
		}
		return res;
	}
	return target;
}