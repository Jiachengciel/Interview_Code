function isRef(obj) {
	return obj && obj._is_ref;
}

function isReactive(obj) {
	return obj && obj._is_reactive;
}

function isReadOnly(obj) {
	return obj && obj._is_readonly;
}

function isProxy(obj) {
	return isReactive(obj) || isReadOnly(obj);
}