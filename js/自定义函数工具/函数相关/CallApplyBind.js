let a = {
	value: 1
}
function getValue(name, age) {
	console.log(name)
	console.log(age)
}
getValue.call(a, 'ljc', '24')    // 接收一个参数列表
getValue.apply(a, ['ljc', '24']) // 接受一个参数数组
getValue.bind(a, 'ljc', '24')()  // 接收一个参数列表，返回函数

// call
Function.prototype.myCall = function (context) {
	console.log(context);
	var context = context || window
	context.fn = this

	var args = [...arguments].slice(1)
	var res = context.fn(...args)

	delete context.fn
	return res
}

getValue.myCall(a, 'ljc', '24')

// apply
Function.prototype.myApply = function (context) {
	var context = context || window
	context.fn = this

	var result
	if (arguments[1]) {
		res = context.fn(...arguments[1])
	} else {
		res = context.fn()
	}

	delete context.fn
	return res
}
getValue.myApply(a, ['ljc', '24'])

// bind
Function.prototype.myBind = function (context) {
	var _this = this
	var args = [...arguments].slice(1)
	// 返回函数
	return function F() {
		if (this instanceof F) {
			return new _this(...args, ...arguments)
		}
		return _this.apply(context, args.concat(...arguments))
	}
}

Function.prototype.myBind = function (context) {
	if (typeof this !== 'function') {
		throw new TypeError("Error!")
	}
	var context = context || window
	context.fn = this
	var args = [...arguments].slice(1)
	var res

	return function () {
		res = context.fn(...args, ...arguments)
		delete context.fn
		return res
	}
}
getValue.myBind(a, 'ljc', '24')()