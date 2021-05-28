const { join } = require('path');

const cwd = (...path) => join(process.cwd(), ...path);

module.exports = { cwd };
