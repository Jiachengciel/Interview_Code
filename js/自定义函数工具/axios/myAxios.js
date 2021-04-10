function myAxios({
	url,
	method="POST",
	params = {},
	data = {}
}) {
	return new Promise((resolve, reject) => {
		method = method.toUpperCase();

		let queryString = '';
		Object.keys(params).forEach(key => {
			queryString += `${key}=${params[key]}&`
		})
		if(queryString){
			queryString = queryString.substring(0, queryString.length-1);
			url += "?" + queryString;
		}

		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		if(method === "GET"){
			xhr.send();
		} else if(method==='POST' || method==='PUT' || method==='DELETE'){
			xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
			xhr.send(JSON.stringify(data));
		}
		xhr.onreadystatechange = function () {
			if(xhr.readyState === 4){
				if(xhr.status >= 200 && xhr.status < 300){
					let response = {
						status: xhr.status,
						message: xhr.readyState,
						body: xhr.response
					}
					resolve(response);
				} else {
					reject(new Error('request error status is ' + status))
				}
			}
		}
	})
}

myAxios.get = function (url, options) {
	return myAxios(Object.assign(options, {url, method:'GET'}));
}

myAxios.post = function (url, options) {
	return myAxios(Object.assign(options, {url, method:'POST'}))
}

myAxios.put = function (url, options) {
	return myAxios(Object.assign(options, {url, method:'PUT'}))
}

myAxios.delete = function (url, options) {
	return myAxios(Object.assign(options, {url, method:'DELETE'}))
}