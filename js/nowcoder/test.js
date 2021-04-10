function huiwen(arr){
  let res = [];
  let len = arr.length-1;
  for(let i = 0, end = Math.floor(len / 2); i < end; i++){
    if(arr[i] != arr[len-i])
      res.push(i);
  }
  return res;
}


let arr = "11210"
arr = arr.split("")
console.log("real")
console.log(huiwen(arr))

let arr = ""
arr = read_line().split("");
let c = c1 >= c2 ? c2 : c1;
let Farr = [];

let count = 0;
for(let i = 0; i < n; i++){
  if(arr[i] == "T"){
    if(count >= 3){
      Farr.push(count);
    }
    count = 0;
  }
  else {
    count++;
  }
}
if(count >= 3) Farr.push(count);

let res = 0;
for(let i = 0, len = Farr.length; i < len; i++){
  if(Farr[i] >= 3){
    res += Math.floor(Farr[i] / 3);
  }
}
console.log(res*c)