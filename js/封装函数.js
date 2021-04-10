function toNewString(s) {
    var arr = s.split('-');
    var len = arr.length;
    for (var i = 1; i < len; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substr(1, arr[i].length);
    }
    return arr.join('');
}
console.log(toNewString('get-element-by-id'));
