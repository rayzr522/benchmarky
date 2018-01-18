const path = require('path');
const utils = require('./utils');
const benchmarker = require('./benchmarker');
const loader = require('./loader')(path.join(__dirname, 'benchmarks'));

loader.getBenchmarks().forEach(benchmarker.test);