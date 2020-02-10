/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { InputBoolean, NzSizeLDSType } from 'ng-zorro-antd/core';

@Directive({
  selector: '[nz-input]',
  exportAs: 'nzInput',
  host: {
    '[class.ant-input-disabled]': 'disabled',
    '[class.ant-input-lg]': `nzSize === 'large'`,
    '[class.ant-input-sm]': `nzSize === 'small'`
  }
})
export class NzInputDirective {
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() @InputBoolean() disabled = false;

  constructor(renderer: Renderer2, elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-input');
  }
}
