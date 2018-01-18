var randomObject = { x: 'y', z: 42 };

module.exports = [
    {
        run: () => Object.keys(randomObject),
        name: 'object-keys'
    },
    {
        run: () => Object.values(randomObject),
        name: 'object-values'
    }
];