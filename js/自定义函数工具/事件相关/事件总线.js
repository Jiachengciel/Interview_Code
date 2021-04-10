function myEventBus(){
	this._events = [];
}

// 注册事件和处理函数
myEventBus.prototype.on = function (event, fn) {
	if(Array.isArray(event)){
		event.forEach(item => {
			this.on(event);
		})
	} else {
		(this._events[event] || (this._events[event] = [])).push(fn);
	}
}

// 销毁事件和处理函数
myEventBus.prototype.off = function (event, fn) {
	// 不传参数表示清空所有
	if(!arguments.length) this._events = [];

	// 数组循环清空
	if(Array.isArray(event)){
		event.forEach(item => {
			this.off(item, fn);
		})
	}
	else {
		// 事件是否存在
		let callbacks = this._events[event]

		if(!callbacks) return;
		else {
			//不传第二参表示清空某事件所有监听函数
			if(arguments.length === 1) this._events[event] = null;
			let index = callbacks.indexOf(fn);
			callbacks.splice(index, 1);
		}
	}
}

// 注册事件和处理函数，触发一次后销毁
myEventBus.prototype.once = function (event, fn) {
	let self = this;
	function handler() {
		fn.apply(null, arguments);
		self.off(event, handler);
	}
	this.on(event, handler);
}

// 触发某事件所有回调并带参数
myEventBus.prototype.emit = function (event) {
	let callbacks = this._events[event];
	if(callbacks && callbacks.length > 0){
		callbacks.forEach(cb => {
			cb.apply(null, [...arguments].slice(1));
		})
	}
}