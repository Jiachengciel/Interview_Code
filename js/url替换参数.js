/*
  url替换参数
*/
function test(url){
  return function (obj) {
    var res = url;
    Object.keys(obj).forEach(key => {
      var reg = new RegExp("(?<="+key+"\=)"+"\\w+")
      res = res.replace(reg, obj[key])
    })
    return res;
  }
}

var str = "https://twitter.com/search?q=t&&src=typed_query&&value=me"
var obj = {q:"test", src:"nihao", value:"ni"}
console.log(test(str)(obj))

/*
* 获取 url 中的参数
1. 指定参数名称，返回该参数的值 或者 空字符串
2. 不指定参数名称，返回全部的参数对象 或者 {}
3. 如果存在多个同名参数，则返回数组
*/
function getUrlParam(sUrl, sKey) {
  var reg = /[\?&](\w+)=(\w+)/g;
  var res = [], sObj = {};
  sUrl.replace(reg, function($1,$2,$3){
    sObj[$2] = sObj[$2] === undefined ? $3 : [...sObj[$2], $3];
  })
  return sKey === undefined || "" ? sObj : sObj[sKey] || "";
}
var sUrl = "http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe"
var sKey = "key";
var obj = getUrlParam(sUrl, sKey)
console.log(obj)
