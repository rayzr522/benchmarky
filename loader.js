const path = require('path');
const fs = require('fs');
const { div, readRecursive } = require('./utils');

class Loader {
    constructor(dir) {
        this.dir = dir;

        this.load();
    }

    load() {
        let benchmarks = [];

        readRecursive(this.dir).filter(file => file.endsWith('.js')).forEach(file => {
            let required;

            try {
                required = require(file);
            } catch (err) {
                div();
                console.error(`Failed to load file '${file}': ${err}`);
                div();
                return;
            }

            if (!required || typeof required !== 'object') {
                throw new TypeError(`Expected object or array from exports of '${file}', got ${typeof required}`);
            }

            let tests;
            if (required instanceof Array) {
                tests = required;
            } else {
                tests = [required];
            }

            benchmarks = benchmarks.concat(tests);
        });

        this.benchmarks = benchmarks;
    }

    getBenchmarks() {
        return this.benchmarks;
    }
}

module.exports = function (dir) {
    return new Loader(dir);
}