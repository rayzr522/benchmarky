const { cols, div } = require('./utils');

function printHeader() {
    console.log(cols('NAME REP TOTAL AVG LOW HIGH'.split(' ')));
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

    let total = 0;
    let lowest = 1e9;
    let lowestIndex = -1;
    let highest = -1e9;
    let highestIndex = -1;

    for (let i = 0; i < repeats; i++) {
        try {
            const start = Date.now();
            opts.run();
            const end = Date.now();

            const diff = end - start;

            total += diff;

            if (diff < lowest) {
                lowest = diff;
                lowestIndex = i;
            }

            if (diff > highest) {
                highest = diff;
                highestIndex = i;
            }
        } catch (err) {
            div();
            console.error(`[ERROR] Test '${name}' failed on iteration ${i + 1} with the following error:`);
            console.error(err);
            div();
            return;
        }
    }

    let avgTime = total / repeats;

    console.log(cols([name, repeats, `${total.toFixed(8)}ms`, `${avgTime.toFixed(8)}ms`, `${lowest} (${lowestIndex})`, `${highest} (${highestIndex})`]));
}
