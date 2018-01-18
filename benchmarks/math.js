var mathTests = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => a / b,
    mod: (a, b) => a % b,
    and: (a, b) => a & b,
    or: (a, b) => a | b,
    xor: (a, b) => a ^ b,
    bsl: (a, b) => a << b,
    bsr: (a, b) => a >> b
};

module.exports = Object.keys(mathTests).map(key => ({
    run: mathTests[key],
    name: `math ${key}`
}));