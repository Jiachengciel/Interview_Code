// 冒泡排序
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                var tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    return arr;
}

// 快速排序
function quickSort(arr, left, right){
    if(left >= right) return;
    let pivot = partition(arr, left, right);
    quickSort(arr, left, pivot-1);
    quickSort(arr, pivot+1, right);
}
function partition(arr, left, right) {
    let pivot = arr[left];
    while(left < right){
        while(left < right && arr[right] >= pivot) right--;
        arr[left] = arr[right];
        while(left < right && arr[left] <= pivot) left++;
        arr[right] = arr[left];
    }
    arr[left] = pivot;
    return left;
}

// 归并排序
function mergeSort(arr) {
    if(arr.length < 2) return arr;
    var middle = Math.floor(arr.length / 2);
    var left = arr.slice(0, middle);
    var right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var res = [];
    while(left.length && right.length){
        if(left[0] <= right[0]){
            res.push(left.shift());
        } else {
            res.push(right.shift());
        }
    }
    if(left.length) res = res.concat(...left);
    if(right.length) res = res.concat(...right);

    return res;
}

function solution(arr){
    console.log(arr);
    // quickSort(arr, 0, arr.length-1);
    arr = mergeSort(arr)
    console.log(arr);
}

var arr = [5, 3, 6, 1, 3, 8, 4];
solution(arr)

