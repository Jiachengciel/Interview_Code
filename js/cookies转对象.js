var a = "a=1;b=2;c=1";
var cookies = a.split(';'), key, val;
console.log(cookies)
var cookieObj = cookies.reduce((pre, next) => {
  key = next.split('=')[0];
  val = next.split('=')[1];
  pre[key] = val;
  return pre;
}, {})

console.log(cookieObj)