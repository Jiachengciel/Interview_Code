// 返回一个由回调函数的返回值组成的新数组
Array.prototype.myMap = function (fn) {
	let arr = []
	let context = this;
	for (let i = 0; i < context.length; i++) {
		arr.push(fn(context[i], i))
	}
	return arr;
}

// 从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值
Array.prototype.myReduce = function (fn, initValue){
	let res = initValue;
	let array = this;
	for (let i = 0; i < array.length; i++) {
		res = fn(res, array[i], i);
	}
	return res;
}

// 将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回
Array.prototype.myFilter = function (fn) {
	let arr = [];
	let array = this;
	for (let i = 0; i < array.length; i++) {
		if(fn(array[i], i)){
			arr.push(array[i]);
		}
	}
	return arr;
}

// 找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。
Array.prototype.myFind = function (fn) {
	let array = this;
	for (let i = 0; i < array.length; i++) {
		if(fn(array[i], i)){
			return array[i];
		}
	}
	return undefined;
}

// 找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 -1。
Array.prototype.myFindIndex = function (fn) {
	let array = this;
	for (let i = 0; i < array.length; i++) {
		if(fn(array[i], i)){
			return i;
		}
	}
	return -1;
}

// 如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。
Array.prototype.myEvery = function (fn) {
	let array = this;
	for (let i = 0; i < array.length; i++) {
		if(!fn(array[i], i)){
			return false;
		}
	}
	return true;
}

// 如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。
Array.prototype.mySome = function (fn) {
	let array = this;
	for (let i = 0; i < array.length; i++) {
		if(fn(array[i], i)){
			return true;
		}
	}
	return false;
}

// 将n个数组或值与当前数组合并生成一个新数组, 原始数组不会被改变
Array.prototype.myConcat = function (...arrays) {
	let array = [...this];
	arrays.forEach(item => {
		if(Array.isArray(item)){
			array.push(...item);
		} else {
			array.push(item);
		}
	})
	return array;
}

// 返回一个由 begin 和 end 决定的原数组的浅拷贝, 原始数组不会被改变
Array.prototype.mySlice = function (begin, end) {
	let array = this, res = [];
	if(array.length === 0) return [];
	begin = begin || 0;
	end = end || array.length;

	if(begin >= array.length || end <= begin){
		return [];
	}
	if(end > array.length) end = array.length;

	for (let i = begin; i < end; i++) {
		res.push(array[i]);
	}
	return res;
}