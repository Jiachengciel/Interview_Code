function addEventListener(element, type, fn, selector) {
	if(typeof element === "string"){
		element = document.querySelector(element);
	}
	// 如果没有指定selector, 普通的事件绑定
	if(!selector){
		element.addEventListener(type, fn);
	}
	// 否则是代委托的事件绑定
	else {
		element.addEventListener(type, function(event) {
			let target = event.target;
			if(target.matches(selector)){
				fn.call(target, event);
			}
		})
	}
}