const fib = count => new Array(count).fill(0).reduce((out, _, i) => out.concat(i < 2 ? 1 : out[i - 1]  + out[i - 2]), []);

module.exports = {
    run: () => fib(1000),
    name: 'fibonacci'
};
