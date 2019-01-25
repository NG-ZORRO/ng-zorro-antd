/**
 * @module number
 *
 * Provides utils dealing with numbers.
 */

/**
 * Ensure that a `num` is within the range given by `min` and `max`.
 *
 * @export
 * @param {number} num
 * @param {[ number, number]} range
 * @returns {number}
 */
export function enusreNumberInRange(num: number, min: number, max: number): number {
  if (isNaN(num)) { return num; }
  if (num < min) { return min; }
  if (num > max) { return max; }
  return num;
}

export function getPercent(num: number, min: number = 0, max: number = 100): number {
  return (num - min) / (max - min) * 100;
}

export function getPrecision(num: number): number {
  const numStr = num.toString();
  const dotIndex = numStr.indexOf('.');
  return dotIndex >= 0 ? numStr.length - dotIndex - 1 : 0;
}
