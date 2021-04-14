function debounce(func, wait = 100, immediate = true) {
    let timer, context, args;

    let later = () => setTimeout(() => {
        timer = null;
        if (!immediate) {
            func.apply(context, args);
            context = args = null;
        }
    }, wait)


    return function (...params) {
        if (timer) {
            clearTimeout(timer);
            timer = later();
        } else {
            context = this;
            args = params;

            if (immediate) {
                func.apply(context, args);
                context = args = null;
            } else {
                timer = later();
            }
        }
    }
}

// a 分割3等分， 每部分的和加起来相等， true 分割位置, false
function chunkArray(array) {
    if (!Array.isArray(array)) {
        throw new Error("Must be array!");
    }
    if (array.length < 3) return false;

    let first = 0, last = array.length - 1;
    let sum1 = array[first],
        sum2 = array[last];
    let total = array.reduce((total, item) => {
        return total + item;
    }, 0)
    total -= sum1 + sum2;

    while (first < last) {
        if (sum1 == sum2 && sum1 == total) {
            return [first, last];
        }
        if (sum1 < sum2) {
            sum1 += array[++first];
            total -= array[first];
        }
        else {
            sum2 += array[--last];
            total -= array[last];
        }
    }

    if (first == last) return false;
}