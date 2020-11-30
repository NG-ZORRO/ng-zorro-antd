/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: 'button[nz-row-expand-button]',
  host: {
    '[type]': `'button'`,
    '[class.ant-table-row-expand-icon-expanded]': `!spaceMode && expand === true`,
    '[class.ant-table-row-expand-icon-collapsed]': `!spaceMode && expand === false`,
    '[class.ant-table-row-expand-icon-spaced]': 'spaceMode',
    '(click)': 'onHostClick()'
  }
})
export class NzRowExpandButtonDirective {
  @Input() expand = false;
  @Input() spaceMode = false;
  @Output() readonly expandChange = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('ant-table-row-expand-icon');
  }

  onHostClick(): void {
    if (!this.spaceMode) {
      this.expand = !this.expand;
      this.expandChange.next(this.expand);
    }
  }
}
