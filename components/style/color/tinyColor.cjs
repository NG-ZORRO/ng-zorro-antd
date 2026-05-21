const tinycolor = require('./tinycolor2.cjs');

module.exports = {
  install: function (less, pluginManager, functions) {
    functions.add('tinycolor', function (...args) {
      return tinycolor(...args.map(ref => ref.value));
    });
  }
};
