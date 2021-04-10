function myCall(fn, obj, ...args) {
	obj = obj || window;
	obj.fn = fn;
	let result = obj.fn(...args);
	delete obj.fn;
	return result;
}

function myApply(fn, obj, args) {
	obj = obj || window;
	obj.fn = fn;
	let result = obj.fn(...args);
	delete obj.fn;
	return result;
}

function myBind(fn, obj, ...args) {
  obj = obj || window;
  return function (...args2) {
	return myCall(fn, obj, ...args, ...args2)
  }
}