/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

import { encodeEntities } from 'ng-zorro-antd/core/util';

@Pipe({
  name: 'nzHighlight'
})
export class NzHighlightPipe implements PipeTransform {
  private UNIQUE_WRAPPERS: [string, string] = ['##==-open_tag-==##', '##==-close_tag-==##'];

  transform(value: string, highlightValue: string, flags?: string, klass?: string): string | null {
    if (!highlightValue) {
      return value;
    }

    // Escapes regex keyword to interpret these characters literally
    const searchValue = new RegExp(highlightValue.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$&'), flags);
    const wrapValue = value.replace(searchValue, `${this.UNIQUE_WRAPPERS[0]}$&${this.UNIQUE_WRAPPERS[1]}`);
    return encodeEntities(wrapValue)
      .replace(new RegExp(this.UNIQUE_WRAPPERS[0], 'g'), klass ? `<span class="${klass}">` : '<span>')
      .replace(new RegExp(this.UNIQUE_WRAPPERS[1], 'g'), '</span>');
  }
}
