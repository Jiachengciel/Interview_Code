function reverseString(str) {
	// return str.split('').reverse().join('');
	// return [...str].reverse().join('');
	return Array.from(str).reverse().join('');
}

/*
2. 字符串是否是回文: palindrome(str) 如果给定的字符串是回文，则返回 true ；否则返回 false
*/
function palindrome(str) {
	return str === reverseString(str);
}

/*
3. 截取字符串: truncate(str, num) 如果字符串的长度超过了num, 截取前面num长度部分, 并以...结束
*/
function truncate(str, num) {
	return str.length > num ? str.slice(0, num) + "..." : str;
}