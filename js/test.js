function add() {
	let _args = Array.prototype.slice.call(arguments);

	// 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
	var _adder = function() {
		_args.push(...arguments);
		return _adder;
	};

	// 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
	_adder.toString = function () {
		return _args.reduce(function (a, b) {
			return a + b;
		});
	}
	return _adder;
}

add(1)(2)(3)
add(1, 2, 3)(4)
add(1)(2)(3)(4)(5)

// let arr = "1 2 4";
// nums = arr.split(" ")
// let a = 1000000000;
//
// console.log(Math.floor(4/3))
//
// let k = 2, n = nums.length;
// let dp = nums, tmp1, tmp2;
// let res = Math.max(...nums);
// console.log(dp)
//
// for(let i = 1; i < k; i++){
// 	tmp1 = dp[i-1];
// 	for(let j = i; j < n; j++){
// 		tmp2 = tmp1 ^ nums[j];
// 		tmp1 = dp[j];
// 		dp[j] = tmp2;
// 		res = Math.max(dp[j], res);
// 	}
// }
// console.log(res)


// function exchange(number){
// 	let res = 0;
// 	while(number){
// 		res++;
// 		if(number%3 === 0){
// 			number /= 3;
// 		} else if(number % 2 === 0){
// 			number /= 2;
// 		} else {
// 			number -= 1;
// 		}
// 	}
// 	return res;
// }
//
// function go(str){
// 	let reg = /[+*-]/g;
// 	let nums = str.split("");
// 	console.log(nums)
// }
//
// let ch2Num1 = {
// 	零:0, 一:1 ,二:2 ,三:3 ,四:4,五:5,六:6,七:7,八:8,九:9
// }
// let ch2Num2 = {
// 	十:10, 百:100,千:1000, 万:10000
// }
// function ch2Num(numString){
// 	let str = numString.split("");
// 	let number = 0;
// 	let sec = 0;
// 	let res = 0;
//
// 	for(let i = 0; i < str.length; i++){
// 		let ch = ch2Num1[str[i]];
// 		if(ch){
// 			number = ch;
// 			if(i === str.length - 1){
// 				sec += number;
// 			}
// 		} else {
// 			let unit = ch2Num2[str[i]];
// 			if(unit === 10000){
// 				sec = (sec + number) * unit;
// 				res += sec;
// 				sec = 0;
// 			}
// 			else {
// 				sec += (number * unit);
// 			}
// 			number = 0;
// 		}
// 	}
// 	res += sec;
// 	return res;
// }
//
// console.log(ch2Num("十二"))