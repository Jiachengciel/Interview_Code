// request(url):Promise
// let urls=[url1,url2....]
//要求用promise写,不能用Promise.all方法

let urls=['https://api.apiopen.top/getJoke', 'http://127.0.0.1:8000/server?a=100&b=200']

function makePromise(url) {
	return new Promise(((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		xhr.open("GET", url)
		xhr.send()
		xhr.onreadystatechange = function () {
			if(xhr.readyState === 4){
				if(xhr.status >= 200 && xhr.status < 300){
					resolve(xhr.response)
				}
				else {
					reject(xhr.status)
				}
			}
		}
	}))
}
//
// let res = makePromise(urls[0]).then(
// 	value => {
// 		return makePromise(urls[1]);
// 	}
// ).catch(
// 	reason => console.log(reason)
// )
// console.log(res)

let promises = urls.map((item, index) => {
	return makePromise(item)
})

let myPromises = promises.reduce(
	(total, currentValue) =>
		total.then(
			value => currentValue.then(
				value => {
					console.log(value)
				},
				reason => {
					console.log(reason)
				}
			)
		),
	Promise.resolve()
)
