function deleteArray(arr){
	arr.sort();
	var newArr = [];
	for(var i = 0; i < arr.length; i++){
		if(arr[i] !== newArr[newArr.length-1]){
			newArr.push(arr[i]);
		}
	}
	return newArr;
}

arr = [1,3,2,3,1,2,5,5,4,2,7,2]
console.log(deleteArray(arr))