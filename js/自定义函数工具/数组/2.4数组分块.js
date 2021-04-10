/*
将数组拆分成多个 size 长度的区块，每个区块组成小数组,整体组成一个二维数组
*/
function chunk(array, size) {
	if(array.length === 0){
		return [];
	}
	size = size || 1;

	let res = [];
	let tmp = [];
	array.forEach((item) => {
		if(tmp.length === 0){
			res.push(tmp);
		}
		tmp.push(item);
		if(tmp.length === size){
			tmp = [];
		}
	})
	return res;
}