/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input } from '@angular/core';

import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

@Directive({
  selector: '[nz-card-grid]',
  exportAs: 'nzCardGrid',
  host: {
    '[class.ant-card-hoverable]': 'nzHoverable'
  }
})
export class NzCardGridDirective {
  static ngAcceptInputType_nzHoverable: BooleanInput;
  @Input() @InputBoolean() nzHoverable = true;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('ant-card-grid');
  }
}
