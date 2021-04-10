function PubSub() {
	this.callbacks = {}
	this.id = 0
}

PubSub.prototype.subscribe = function (channel, callback) {
	let token = "token_" + ++this.id;
	let cbs = this.callbacks[channel];
	if(cbs){
		cbs[token] = callback;
	}
	else {
		this.callbacks[channel] = {
			[token]: callback
		}
	}
	return token;
}

PubSub.prototype.publish = function (channel, data) {
	let cbs = this.callbacks[channel];
	if(cbs){
		setTimeout(() => {
			Object.values(cbs).forEach(cb => {
				cb(data);
			},0)
		})
	}
}

PubSub.prototype.publishAsync = function (channel, data) {
	let cbs = this.callbacks[channel];
	if(cbs){
		Object.values(cbs).forEach(cb => {
			cb(data);
		})
	}
}

/*
4. 取消消息订阅
  1). 没有传值, flag为undefined
  2). 传入token字符串
  3). msgName字符串
*/
PubSub.prototype.unsubscribe = function (flag) {
	if(!flag){
		this.callbacks = {};
	} else if(typeof flag === "string"){
		if(/token_/.test(flag)){
			let cbObj = Object.values(this.callbacks).find(callback => callback.hasOwnProperty(flag))
			if(cbObj)
				delete cbObj[flag];
		} else {
			delete this.callbacks[flag];
		}
	} else {
		throw new TypeError("如果传入参数, 必须是字符串类型")
	}
}