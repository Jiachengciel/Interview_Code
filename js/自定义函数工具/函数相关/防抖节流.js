function showTop() {
	let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	console.log('滚动条位置：' + scrollTop);
}

function debounce(func, delay = 100) {
	let timer = 0
	return function (...args) {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, delay)
	}
}

function throttle(func, delay = 1000) {
	let prev = Date.now()
	return function (...args) {
		let _now = Date.now()
		if (_now - prev < delay) return false
		func.apply(this, args)
		prev = Date.now()
	}
}

// 使用代理调用防抖节流
function debounceProxy(func, delay = 100) {
	let timer = null;
	return new Proxy(func, {
		apply(target, thisArg, argArray) {
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				Reflect.apply(target, thisArg, argArray);
			}, delay)
		}
	})
}

function throttleProxy(func, delay = 100) {
	let prev = Date.now();
	return new Proxy(func, {
		apply(target, thisArg, argArray) {
			let _now = Date.now();
			if (_now - prev < delay) return;
			prev = Date.now();
			return Reflect(target, thisArg, argArray);
		}
	})
}


function debounce2(func, delay = 1000, immediate = true) {
	let timer, context, args
	const later = () => setTimeout(() => {
		timer = null
		if (!immediate) {
			func.apply(context, args)
			context = args = null
		}
	}, delay)

	return function (...params) {
		if (!timer) {
			timer = later()
			if (immediate) {
				func.apply(this, params)
			} else {
				context = this
				args = params
			}
		}
		else {
			clearTimeout(timer)
			timer = later()
		}
	}
}

function throttle2(func, wait, options) {
	var context, args, result;
	var timeout = null;
	var previous = 0;
	if (!options) options = {};
	// 定时器回调函数
	var later = function () {
		previous = options.leading === false ? 0 : Date.now();
		// 置空一是为了防止内存泄漏，二是为了下面的定时器判断
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};
	return function () {
		var now = Date.now();
		if (!previous && options.leading === false) previous = now;
		// 计算剩余时间
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			// 如果存在定时器就清理掉否则会调用二次回调
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
}