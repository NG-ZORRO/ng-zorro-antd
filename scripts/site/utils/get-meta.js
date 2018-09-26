const YFM = require('yaml-front-matter');

module.exports = function getMeta(file) {
  return YFM.loadFront(file);
};