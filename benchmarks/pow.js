var pow = (num, pow) => {
    var out = num;
    for (var i = 1; i < pow; i++) {
        out *= num;
    }
    return out;
};

module.exports = [
    {
        run: () => pow(2, 100),
        name: 'pow #1'
    },
    {
        run: () => Math.pow(2, 100),
        name: 'pow #2'
    }
];