function compareVersion(version1, version2){
  if(!version1 || !version2){
    throw new Error("Version is null!");
  }
  if(typeof version1 !== "string" || typeof version2 !== "string"){
    throw new Error("Version is null!");
  }
  let arr1 = version1.trim().split(".");
  let arr2 = version2.trim().split(".");

  let diff = arr1.length - arr2.length;
  function getZero(diff, arr){
    for(let j = 0; j < diff; j++){
      arr.push("0");
    }
  }
  diff > 0 ? getZero(diff, arr2) : getZero(diff,arr1);

  for(var i = 0; i < arr1.length; i++){
    if(Number(arr1[i]) > Number(arr2[i])) return 1;
    else if(Number(arr1[i]) < Number(arr2[i])) return -1;
    else continue;
  }
  return 0;
}

console.log(compareVersion('1.1', '1.1.0'))
console.log(compareVersion('13.37', '1.2 '))
console.log(compareVersion('0.1', '1.1.1'))