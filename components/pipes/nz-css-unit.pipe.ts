/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nzToCssUnit'
})
export class NzToCssUnitPipe implements PipeTransform {
  transform(value: number | string, defaultUnit: string = 'px'): string {
    const absoluteLengthUnit = ['cm', 'mm', 'Q', 'in', 'pc', 'pt', 'px'];
    const relativeLengthUnit = ['em', 'ex', 'ch', 'rem', '1h', 'vw', 'vh', 'vmin', 'vmax'];
    const percentagesUnit = ['%'];
    const listOfUnit = [...absoluteLengthUnit, ...relativeLengthUnit, ...percentagesUnit];
    let unit = 'px';
    if (listOfUnit.some(u => u === defaultUnit)) {
      unit = defaultUnit;
    }
    return typeof value === 'number' ? `${value}${unit}` : `${value}`;
  }
}
