/*
1. pull(array, ...values):
  删除数组中与value相同的元素, 返回所有删除元素的数组
  说明: 数组发生了改变
  如: pull([1,3,5,3,7], 2, 7, 3, 7) ===> 数组变为[1, 5], 返回值为[3,3,7]
2. pullAll(array, values):
  功能与pull一致, 只是参数变为数组
  如: pullAll([1,3,5,3,7], [2, 7, 3, 7]) ===> 数组变为[1, 5], 返回值为[3,3,7]
*/
function pull(array, ...args) {
	if(!array || array.length === 0 || args.length === 0)
		return [];

	let res = [];
	for (let i = 0; i < array.length; i++) {
		let item = array[i];
		if(args.indexOf(item) !== -1){
			array.splice(i, 1);
			res.push(item);
			i--;
		}
	}
	return res;
}

function pullAll(array, args) {
	if(!args || !Array.isArray(args)) return [];
	return pull(array, ...args);
}