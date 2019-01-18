export function getPercent(min: number, max: number, value: number): number {
  return (value - min) / (max - min) * 100;
}

export function getPrecision(num: number): number {
  const numStr = num.toString();
  const dotIndex = numStr.indexOf('.');
  return dotIndex >= 0 ? numStr.length - dotIndex - 1 : 0;
}

export function ensureNumberInRange(num: number, min: number, max: number): number {
  if (isNaN(num) || num < min) {
    return min;
  } else if (num > max) {
    return max;
  } else {
    return num;
  }
}
