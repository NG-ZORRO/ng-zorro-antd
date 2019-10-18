/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

// Regular Expressions for parsing tags and attributes
const SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
// ! to ~ is the ASCII range.
const NON_ALPHANUMERIC_REGEXP = /([^\#-~ |!])/g;

/**
 * Escapes all potentially dangerous characters, so that the
 * resulting string can be safely inserted into attribute or
 * element text.
 */
function encodeEntities(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(SURROGATE_PAIR_REGEXP, (match: string) => {
      const hi = match.charCodeAt(0);
      const low = match.charCodeAt(1);
      return `&#${(hi - 0xD800) * 0x400 + (low - 0xDC00) + 0x10000};`;
    })
    .replace(NON_ALPHANUMERIC_REGEXP, (match: string) => `&#${match.charCodeAt(0)};`)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

@Pipe({
  name: 'nzHighlight',
  pure: true
})
export class NzHighlightPipe implements PipeTransform {
  private UNIQUE_WRAPPERS: [string, string] = ['##==-open_tag-==##', '##==-close_tag-==##'];

  transform(value: string, highlightValue: string, flags?: string, klass?: string): string | null {
    if (!highlightValue) {
      return value;
    }

    // Escapes regex keyword to interpret these characters literally
    const searchValue = new RegExp(highlightValue.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$&'), flags);
    const wrapValue = value.replace(searchValue, `${this.UNIQUE_WRAPPERS[0]}$&${this.UNIQUE_WRAPPERS[1]}`);
    return encodeEntities(wrapValue)
      .replace(new RegExp(this.UNIQUE_WRAPPERS[0], 'g'), klass ? `<span class="${klass}">` : '<span>')
      .replace(new RegExp(this.UNIQUE_WRAPPERS[1], 'g'), '</span>');
  }
}
