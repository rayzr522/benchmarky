const path = require('path');
const fs = require('fs');

exports.formatNumber = num => num.toLocaleString();
exports.longestLine = lines => lines.slice(0).sort((a, b) => b.length - a.length)[0].length;

exports.alignRight = input => {
    var lines = input.split('\n');
    var longest = longestLine(lines);
    return lines.map(line => ' '.repeat(longest - line.length) + line).join('\n');
};

exports.boxify = input => {
    var lines = input.split('\n');
    var longest = longestLine(lines);
    var width = longest + 4;
    var bar = '-'.repeat(width);
    return `${bar}\n${lines.map(line => `| ${line}${' '.repeat(longest - line.length)} |`).join('\n')}\n${bar}`;
};

exports.wrapTo = (input, length) => {
    var lines = [];
    var line = '';

    input.split(' ').forEach(word => {
        if (line.length + word.length > length) {
            lines.push(line);
            line = '';
        }

        line = `${line} ${word}`.trim();
    });

    if (line) {
        lines.push(line);
    }

    return lines.join('\n');
}

exports.screenBox = input => boxify(wrapTo(input, process.stdout.columns - 5));

const colWidth = (process.stdout.columns / 4) - 1;
exports.pad = str => ` ${str}${' '.repeat(Math.max(0, colWidth - 2 - `${str}`.length))} `;
exports.cols = cols => cols.map(this.pad).join('|');

exports.div = () => console.log('-'.repeat(process.stdout.columns));

exports.readRecursive = (dir) => {
    if (!fs.statSync(dir).isDirectory()) {
        return [];
    }

    let results = [];

    fs.readdirSync(dir).forEach(item => {
        const relativePath = path.join(dir, item);
        const stats = fs.statSync(relativePath);

        if (stats.isDirectory()) {
            results = results.concat(this.readRecursive(relativePath));
        } else {
            results.push(relativePath);
        }
    });

    return results;
};