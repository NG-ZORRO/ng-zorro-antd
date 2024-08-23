/**
 * Capitalize the first letter of a string
 * @param string
 * @return {string}
 */
module.exports = function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
