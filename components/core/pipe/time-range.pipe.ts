/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

import { timeUnits } from 'ng-zorro-antd/core/time';
import { padStart } from 'ng-zorro-antd/core/util';

@Pipe({
  name: 'nzTimeRange',
  pure: true
})
export class NzTimeRangePipe implements PipeTransform {
  transform(value: string | number, format: string = 'HH:mm:ss'): string {
    let duration = Number(value || 0);

    const escapeRegex = /\[[^\]]*]/g;
    const keepList: string[] = (format.match(escapeRegex) || []).map(str => str.slice(1, -1));
    const templateText = format.replace(escapeRegex, '[]');

    const replacedText = timeUnits.reduce((current, [name, unit]) => {
      if (current.indexOf(name) !== -1) {
        const v = Math.floor(duration / unit);
        duration -= v * unit;
        return current.replace(new RegExp(`${name}+`, 'g'), (match: string) =>
          padStart(v.toString(), match.length, '0')
        );
      }
      return current;
    }, templateText);

    let index = 0;
    return replacedText.replace(escapeRegex, () => {
      const match = keepList[index];
      index += 1;
      return match;
    });
  }
}
