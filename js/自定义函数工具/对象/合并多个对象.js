function mergeObject(...objs) {
	let res = {};
	objs.forEach(obj => {
		Object.keys(obj).forEach(key => {
			if(obj.hasOwnProperty(key)){
				res[key] = [].concat(res[key], obj[key]);
			} else {
				res[key] = obj[key];
			}
		})
	})
	return res;
}