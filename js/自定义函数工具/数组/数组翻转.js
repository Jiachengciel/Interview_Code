function reverseArray(arr){
	var len = arr.length;
	for(var i = 0; i <len/2; i++){
		var tmp = arr[i];
		arr[i] = arr[len-1-i];
		arr[len-1-i] = tmp;
	}
	return arr;
}


arr = [1,2,3,4,5,6,7,8]
console.log(reverseArray(arr))