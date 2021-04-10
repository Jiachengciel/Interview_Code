/*
深度克隆
1). 大众乞丐版
    问题1: 函数属性会丢失
    问题2: 循环引用会出错
2). 面试基础版本
    解决问题1: 函数属性还没丢失
3). 面试加强版本
    解决问题2: 循环引用正常
4). 面试加强版本2(优化遍历性能)
    数组: while | for | forEach() 优于 for-in | keys()&forEach()
    对象: for-in 与 keys()&forEach() 差不多
*/

// 1). 大众乞丐版
function deepClone1(target) {
	return JSON.parse(JSON.stringify(target));
}

// 2). 面试基础版本
function deepClone2(target) {
	if(target && typeof target === "object"){
		if(target.constructor === RegExp){
			return target;
		}
		let res = Array.isArray(target) ? [] : {};
		for (let key in target) {
			if(target.hasOwnProperty(key)){
				res[key] = deepClone2(target[key]);
			}
		}
		return res;
	}
	return target;
}

// 3). 面试加强版本
function deepClone3(target, map=new Map()) {
	if(target && typeof target === "object"){
		if(target.constructor === RegExp){
			return target;
		}

		let cache = map.get(target);
		if(cache) return cache;

		let res = Array.isArray(target) ? [] : {};
		map.set(target, res);

		for (let key in target) {
			if(target.hasOwnProperty(key)){
				res[key] = deepClone3(target[key], map);
			}
		}
		return res;
	}
	return target;
}

// 4). 面试加强版本2(优化遍历性能)
function deepClone4(target, map=new Map()) {
	if(target && typeof target === "object" && target.constructor !== RegExp){
		let cache = map.get(target);
		if(cache) return cache;

		let isArray = Array.isArray(target);
		let res = isArray ? [] : {};
		map.set(target, res);

		if(isArray){
			target.forEach((item, index) => {
				res[index] = deepClone4(item, map);
			})
		} else {
			Object.keys(target).forEach(key => {
				res[key] = deepClone4(target[key], map);
			})
		}
		return res;
	}

	return target;
}

