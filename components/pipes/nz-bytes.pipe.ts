/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { isNumberFinite, toDecimal } from 'ng-zorro-antd/core/util';

export type ByteUnit = 'B' | 'kB' | 'KB' | 'MB' | 'GB' | 'TB';

@Pipe({
  name: 'nzBytes'
})
export class NzBytesPipe implements PipeTransform {
  static formats: Record<ByteUnit, { max: number; prev?: ByteUnit }> = {
    B: { max: 1024 },
    kB: { max: Math.pow(1024, 2), prev: 'B' },
    KB: { max: Math.pow(1024, 2), prev: 'B' },
    MB: { max: Math.pow(1024, 3), prev: 'kB' },
    GB: { max: Math.pow(1024, 4), prev: 'MB' },
    TB: { max: Number.MAX_SAFE_INTEGER, prev: 'GB' }
  };

  transform(input: NzSafeAny, decimal: number = 0, from: ByteUnit = 'B', to?: ByteUnit): NzSafeAny {
    if (!(isNumberFinite(input) && isNumberFinite(decimal) && decimal % 1 === 0 && decimal >= 0)) {
      return input;
    }

    let bytes = input;
    let unit = from;
    while (unit !== 'B') {
      bytes *= 1024;
      unit = NzBytesPipe.formats[unit].prev!;
    }

    if (to) {
      const format = NzBytesPipe.formats[to];

      const result = toDecimal(NzBytesPipe.calculateResult(format, bytes), decimal);

      return NzBytesPipe.formatResult(result, to);
    }

    for (const key in NzBytesPipe.formats) {
      if (NzBytesPipe.formats.hasOwnProperty(key)) {
        const format = NzBytesPipe.formats[key as ByteUnit];
        if (bytes < format.max) {
          const result = toDecimal(NzBytesPipe.calculateResult(format, bytes), decimal);

          return NzBytesPipe.formatResult(result, key);
        }
      }
    }
  }

  static formatResult(result: number, unit: string): string {
    return `${result} ${unit}`;
  }

  static calculateResult(format: { max: number; prev?: ByteUnit }, bytes: number): number {
    const prev = format.prev ? NzBytesPipe.formats[format.prev] : undefined;
    return prev ? bytes / prev.max : bytes;
  }
}
