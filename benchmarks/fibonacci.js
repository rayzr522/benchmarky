var fib = max => {
    var arr = [0, 1];
    for (var i = arr.length - 1; i < max; i++) {
        arr[i + 1] = arr[i - 1] + arr[i];
    }
    return arr;
}

module.exports = {
    run: () => fib(1000),
    name: 'fibonacci'
};