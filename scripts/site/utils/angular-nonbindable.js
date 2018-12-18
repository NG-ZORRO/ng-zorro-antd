module.exports = function angularNonBindAble(content) {
  return content.replace(/{/g, '&#123;').replace(/}/g, '&#125;')
};