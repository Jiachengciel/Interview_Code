function create() {
	let obj = new Object();
	let Construct = [].shift.call(arguments)
	obj.__proto__ = Construct.prototype
	let res = Construct.apply(obj, arguments)
	return res instanceof Object ? res : obj;
}

function myInstance(Fn, ...args) {
	let obj = {};
	obj.__proto__ = Fn.prototype;
	let res = Fn.call(obj, ...args);
	return res instanceof Object ? res : obj;
}