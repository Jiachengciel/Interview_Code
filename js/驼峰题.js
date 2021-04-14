function solution(str) {
  return str.replace(/-\w/g, (word, index) => { // 捕获-和后面的字母
    console.log(word);
    console.log(index);
    if (index === 0) return word[1];
    return word[1].toUpperCase()          // 返回后面的字母的大写形式
  })
}

function solution2(string) {
  var str = string.split('-');
  for (let i = 1; i < str.length; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substring(1)
  }
  return str.join('')
}

function count(str) {
  var res = {};
  str.replace(/[a-z]/ig, function ($1) {
    res[$1] = res[$1] === undefined ? 1 : res[$1] + 1;
  })
  return res;
}


console.log(solution("border-bottom-color"));
console.log(solution("-webkit-bottom-color"));