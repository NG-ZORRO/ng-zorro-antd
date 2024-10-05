/**
 * Convert string to camelCase
 * @param {string} value
 * @return {string}
 */
module.exports = function camelCase(value) {
  return value.replace(/-\w/g, (r, i) => {
    return value.charAt(i + 1).toUpperCase();
  })
}