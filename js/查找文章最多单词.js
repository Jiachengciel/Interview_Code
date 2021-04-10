function search(paper){
	let res = 0
	let resobj = {}
	let paper2 = paper.split(" ")
	let tmp = {}
	for(let i = 0; i < paper2.length; i++){
		if(tmp[paper2[i]]){
			tmp[paper2[i]]++;
		}
		else {
			tmp[paper2[i]] = 1
		}

		if(tmp[paper2[i]] > res){
			resobj = {}
			resobj[paper2[i]] = tmp[paper2[i]]
			res = tmp[paper2[i]]
		}
		else if(res === tmp[paper2[i]] && res !== 0){
			resobj[paper2[i]] = res
		}
	}

	return resobj
}

function counts(article) {
	let newArticle = article.trim().toLowerCase();
	let array = newArticle.match(/[a-z]+/g);
	let wordLength, word, max = 0, maxWord = [];

	for (let i = 0; i < array.length; i++) {
		word = new RegExp("\\b" + array[i] + "\\b", 'g');

		wordLength = newArticle.match(word).length
		if(wordLength === max){
			maxWord.push(array[i]);
		} else if (wordLength > max){
			max = wordLength;
			maxWord = []
			maxWord[0] = array[i];
		}
	}
	maxWord = [...new Set([...maxWord])];
	return {words:maxWord, max:max}
}

function counts2(article){
	let newArticle = article.trim().toLowerCase();
	let wordLength, words={}, max = 0, maxWord = [];

	newArticle.replace(/[a-z]+/g, function($1){
		words[$1] = words[$1] === void 0 ? 1 : words[$1]+1;
	})
	for(let key in words){
		if(words[key] === max){
			maxWord.push(key);
		} else if(words[key] > max){
			max = words[key];
			maxWord = [];
			maxWord.push(key);
		}
	}
	return {words: maxWord, max: max};
}

let article = "Age has reached the end of the beginning of a word. May be guilty in his seems to passing a lot of different life became the appearance of the same day;"
let obj = counts(article)
console.log(obj.words)
console.log(obj.max)