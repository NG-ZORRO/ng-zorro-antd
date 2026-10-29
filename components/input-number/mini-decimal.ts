/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Decimal-safe number handling for `nzStringMode`, ported from
 * https://github.com/react-component/mini-decimal (BigInt implementation only,
 * since every browser NG-ZORRO targets supports `BigInt`).
 */

export type NzInputNumberValueType = string | number;

function isEmpty(value: NzInputNumberValueType | null | undefined): boolean {
  return (!value && value !== 0 && !Number.isNaN(value)) || !String(value).trim();
}

function isE(value: NzInputNumberValueType): boolean {
  const str = String(value);
  return !Number.isNaN(Number(str)) && str.includes('e');
}

interface ParsedScientificNotation {
  decimal: string;
  digits: string;
  exponent: number;
  integer: string;
  negative: boolean;
}

function parseScientificNotation(numStr: string): ParsedScientificNotation {
  const [mantissa, exponent = '0'] = numStr.toLowerCase().split('e');
  const negative = mantissa.startsWith('-');
  const unsignedMantissa = negative ? mantissa.slice(1) : mantissa;
  const [integer = '0', decimal = ''] = unsignedMantissa.split('.');
  const digits = `${integer}${decimal}`.replace(/^0+/, '') || '0';

  return { decimal, digits, exponent: Number(exponent), integer, negative };
}

function expandScientificNotation(parsed: ParsedScientificNotation): string {
  const { decimal, digits, exponent, integer, negative } = parsed;

  if (digits === '0') {
    return '0';
  }

  const integerDigits = integer.replace(/^0+/, '').length;
  const leadingDecimalZeros = (decimal.match(/^0*/) || [''])[0].length;
  const initialDecimalIndex = integerDigits || -leadingDecimalZeros;
  const decimalIndex = initialDecimalIndex + exponent;

  let expanded: string;
  if (decimalIndex <= 0) {
    expanded = `0.${'0'.repeat(-decimalIndex)}${digits}`;
  } else if (decimalIndex >= digits.length) {
    expanded = `${digits}${'0'.repeat(decimalIndex - digits.length)}`;
  } else {
    expanded = `${digits.slice(0, decimalIndex)}.${digits.slice(decimalIndex)}`;
  }

  return `${negative ? '-' : ''}${expanded}`;
}

function getScientificPrecision(parsed: ParsedScientificNotation): number {
  if (parsed.exponent >= 0) {
    return Math.max(0, parsed.decimal.length - parsed.exponent);
  }
  return Math.abs(parsed.exponent) + parsed.decimal.length;
}

/** Convert `1e-9` to `0.000000001`. May lose precision if the exponent is extreme. */
function getNumberPrecision(value: NzInputNumberValueType): number {
  const numStr = String(value);

  if (isE(value)) {
    return getScientificPrecision(parseScientificNotation(numStr));
  }

  return numStr.includes('.') && validateNumber(numStr) ? numStr.length - numStr.indexOf('.') - 1 : 0;
}

export function validateNumber(value: NzInputNumberValueType): boolean {
  if (typeof value === 'number') {
    return !Number.isNaN(value);
  }

  if (!value) {
    return false;
  }

  return (
    /^\s*-?\d+(\.\d+)?\s*$/.test(value) || // 11.28
    /^\s*-?\d+\.\s*$/.test(value) || // 1.
    /^\s*-?\.\d+\s*$/.test(value) // .1
  );
}

/** Format string number to a readable, trimmed number. */
export function trimNumber(numStr: string): {
  fullStr: string;
  negative: boolean;
  negativeStr: string;
  trimStr: string;
} {
  let str = numStr.trim();
  let negative = str.startsWith('-');

  if (negative) {
    str = str.slice(1);
  }

  str = str
    .replace(/(\.\d*[^0])0*$/, '$1') // `1.000` => `1.`, `1.100` => `1.1`
    .replace(/\.0*$/, '') // `1.` => `1`
    .replace(/^0+/, ''); // `0001` => `1`, `000.1` => `.1`

  if (str.startsWith('.')) {
    str = `0${str}`;
  }

  const trimStr = str || '0';
  const [integerStr = '0', decimalStr = '0'] = trimStr.split('.');

  if (integerStr === '0' && decimalStr === '0') {
    negative = false;
  }

  const negativeStr = negative ? '-' : '';

  return { fullStr: `${negativeStr}${trimStr}`, negative, negativeStr, trimStr };
}

function num2str(value: number): string {
  let numStr = String(value);

  if (isE(value)) {
    if (value > Number.MAX_SAFE_INTEGER) {
      return String(BigInt(value));
    }
    if (value < Number.MIN_SAFE_INTEGER) {
      return String(BigInt(value));
    }

    const parsed = parseScientificNotation(numStr);
    const precision = getScientificPrecision(parsed);
    numStr = precision > 100 ? expandScientificNotation(parsed) : value.toFixed(precision);
  }

  return trimNumber(numStr).fullStr;
}

/**
 * Decimal-safe representation of a number, backed by `BigInt` so precision beyond
 * `Number.MAX_SAFE_INTEGER` and floating point rounding errors are avoided.
 */
export class MiniDecimal {
  private origin = '';
  private negative = false;
  private integer = 0n;
  private decimal = 0n;
  /** `BigInt` drops leading zeros, so the original decimal length must be tracked. */
  private decimalLen = 0;
  private empty = false;
  private nan = false;

  constructor(value: NzInputNumberValueType | null | undefined) {
    if (isEmpty(value)) {
      this.empty = true;
      return;
    }

    this.origin = String(value);

    if (value === '-' || Number.isNaN(value)) {
      this.nan = true;
      return;
    }

    let mergedValue: NzInputNumberValueType = value!;
    if (isE(mergedValue)) {
      mergedValue = Number(mergedValue);
    }
    mergedValue = typeof mergedValue === 'string' ? mergedValue : num2str(mergedValue);

    if (validateNumber(mergedValue)) {
      const { negative, trimStr } = trimNumber(mergedValue);
      const [integerPart, decimalPart] = trimStr.split('.');
      this.negative = negative;
      this.integer = BigInt(integerPart);
      const decimalStr = decimalPart || '0';
      this.decimal = BigInt(decimalStr);
      this.decimalLen = decimalStr.length;
    } else {
      this.nan = true;
    }
  }

  private getMark(): string {
    return this.negative ? '-' : '';
  }

  private getIntegerStr(): string {
    return this.integer.toString();
  }

  private getDecimalStr(): string {
    return this.decimal.toString().padStart(this.decimalLen, '0');
  }

  /** Align two decimals to the same decimal length. e.g. `12.3` + len `5` => `1230000` */
  private alignDecimal(decimalLength: number): bigint {
    const str = `${this.getMark()}${this.getIntegerStr()}${this.getDecimalStr().padEnd(decimalLength, '0')}`;
    return BigInt(str);
  }

  private cal(
    offset: MiniDecimal,
    calculator: (a: bigint, b: bigint) => bigint,
    calDecimalLen: (maxDecimalLength: number) => number
  ): MiniDecimal {
    const maxDecimalLength = Math.max(this.getDecimalStr().length, offset.getDecimalStr().length);
    const myAligned = this.alignDecimal(maxDecimalLength);
    const offsetAligned = offset.alignDecimal(maxDecimalLength);

    const valueStr = calculator(myAligned, offsetAligned).toString();
    const nextDecimalLength = calDecimalLen(maxDecimalLength);

    const { negativeStr, trimStr } = trimNumber(valueStr);
    const hydrated = `${negativeStr}${trimStr.padStart(nextDecimalLength + 1, '0')}`;

    return new MiniDecimal(`${hydrated.slice(0, -nextDecimalLength)}.${hydrated.slice(-nextDecimalLength)}`);
  }

  negate(): MiniDecimal {
    const clone = new MiniDecimal(this.toString());
    clone.negative = !clone.negative;
    return clone;
  }

  add(value: NzInputNumberValueType): MiniDecimal {
    if (this.isInvalidate()) {
      return new MiniDecimal(value);
    }

    const offset = new MiniDecimal(value);
    if (offset.isInvalidate()) {
      return this;
    }

    return this.cal(
      offset,
      (a, b) => a + b,
      len => len
    );
  }

  multi(value: NzInputNumberValueType): MiniDecimal {
    const target = new MiniDecimal(value);

    if (this.isInvalidate() || target.isInvalidate()) {
      return new MiniDecimal(NaN);
    }

    return this.cal(
      target,
      (a, b) => a * b,
      len => len * 2
    );
  }

  isEmpty(): boolean {
    return this.empty;
  }

  isNaN(): boolean {
    return this.nan;
  }

  isInvalidate(): boolean {
    return this.isEmpty() || this.isNaN();
  }

  equals(target: MiniDecimal | null | undefined): boolean {
    return this.toString() === target?.toString();
  }

  lessEquals(target: MiniDecimal): boolean {
    return this.add(target.negate().toString()).toNumber() <= 0;
  }

  toNumber(): number {
    return this.isNaN() ? NaN : Number(this.toString());
  }

  toString(safe: boolean = true): string {
    if (!safe) {
      return this.origin;
    }
    if (this.isInvalidate()) {
      return '';
    }
    return trimNumber(`${this.getMark()}${this.getIntegerStr()}.${this.getDecimalStr()}`).fullStr;
  }
}

export function getMiniDecimal(value: NzInputNumberValueType | null | undefined): MiniDecimal {
  return new MiniDecimal(value);
}

/**
 * Align the logic of `toFixed` to round like `1.5 => 2`.
 * If `cutOnly` is set, the excess decimal part is only removed, never rounded up.
 */
export function toFixed(numStr: string, precision?: number | null, cutOnly = false): string {
  if (numStr === '') {
    return '';
  }

  const { negativeStr, integerStr, decimalStr } = trimNumberParts(numStr);
  const numberWithoutDecimal = `${negativeStr}${integerStr}`;

  if (precision === null || precision === undefined) {
    return decimalStr === '0' ? numberWithoutDecimal : `${numberWithoutDecimal}.${decimalStr}`;
  }

  const advancedNum = Number(decimalStr[precision]);

  if (advancedNum >= 5 && !cutOnly) {
    const advancedDecimal = getMiniDecimal(numStr).add(`${negativeStr}0.${'0'.repeat(precision)}${10 - advancedNum}`);
    return toFixed(advancedDecimal.toString(), precision, cutOnly);
  }

  if (precision === 0) {
    return numberWithoutDecimal;
  }

  return `${numberWithoutDecimal}.${decimalStr.padEnd(precision, '0').slice(0, precision)}`;
}

function trimNumberParts(numStr: string): { decimalStr: string; integerStr: string; negativeStr: string } {
  const { negativeStr, trimStr } = trimNumber(numStr);
  const [integerStr = '0', decimalStr = '0'] = trimStr.split('.');
  return { decimalStr, integerStr, negativeStr };
}

export { getNumberPrecision };
