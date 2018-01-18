const { cols, div } = require('./utils');

function printHeader() {
    console.log(cols('NAME REPEATS AVERAGE TOTAL'.split(' ')));
    div();
}

exports.test = opts => {
    if (!this.first) {
        this.first = true;

        printHeader();
    }

    if (typeof opts !== 'object') {
        throw new TypeError(`Expected opts to be an object, but it was ${typeof opts}`);
    }

    if (typeof opts.name !== 'string') {
        throw new TypeError(`Expected opts.name to be a string, but it was ${typeof opts.name}`);
    }

    if (typeof opts.run !== 'function') {
        throw new TypeError(`Expected opts.run to be a function, but it was ${typeof opts.run}`);
    }

    const name = opts.name || '<nameless>';
    const repeats = opts.repeats || 10000;

    const now = process.hrtime();

    for (var i = 0; i < repeats; i++) {
        try {
            opts.run();
        } catch (err) {
            div();
            console.error(`[ERROR] Test '${name}' failed on iteration ${i + 1} with the following error:`);
            console.error(err);
            div();
            return;
        }
    }

    var diff = process.hrtime(now);

    var timeMillis = diff[0] * 1e3 + diff[1] / 1e6;
    var avgTime = timeMillis / repeats;

    console.log(cols([name, repeats, `${avgTime.toFixed(8)}ms`, `${timeMillis.toFixed(8)}ms`]));
}