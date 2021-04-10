function flatten1(arr) {
	return arr.reduce((result, item) => {
		return result.concat(Array.isArray(item) ? flatten(item) : item)
	}, [])
}

function flatten2(arr) {
	while(arr.some(item => Array.isArray(item))){
		arr = [].concat(...arr)
	}
	return arr
}

arr = [1,[2,3],[[[[4]]],5],9]
console.log(arr.flat(Infinity))

console.log(flatten2(arr))