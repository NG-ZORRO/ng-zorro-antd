/**
 * @description Replace `{`, `}`, `@` to html entities
 * @param {string} content
 * @return {string}
 */
module.exports = function angularNonBindAble(content) {
  return content.replace(/{/g, '&#123;').replace(/}/g, '&#125;').replace(/@/g, '&#64;')
};