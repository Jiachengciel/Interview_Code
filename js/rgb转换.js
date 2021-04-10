function rgb2hex(sRGB) {
  function hex(str){
    var num = Number(str).toString(16);
    return ("0" + num).slice(-2);
  }
  var reg = /\d+/g, res;
  sRGB.replace(reg, function($1,$2,$3){
    // console.log("1：", $1)
    console.log($2)
    // console.log($3)
    res = "#" + hex($1) + hex($2) + hex($3);
  })
  return res;
}
rgb2hex('rgb(255,255,100)')