/**
 * Get the name of the file without the suffix
 * @param {string} name
 * @return {string}
 */
module.exports = function (name) {
  return name.split('.')[0];
}