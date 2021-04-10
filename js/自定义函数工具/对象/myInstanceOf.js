function myInstanceOf(left, right) {
	let proto = right.prototype
	left = left.__proto__
	while(true){
		if(left === null)
			return false
		if(proto === left)
			return true;
		left = left.__proto__
	}
}