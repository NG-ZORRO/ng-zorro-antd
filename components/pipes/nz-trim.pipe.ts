/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nzTrim'
})
export class NzTrimPipe implements PipeTransform {
  // TODO(chensimeng) trimEnd, trimStart
  transform(text: string): string {
    return text.trim();
  }
}
