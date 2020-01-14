/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
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
export class NzInputDirective implements OnChanges {
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() @InputBoolean() disabled = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-input');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { disabled } = changes;
    if (disabled) {
      this.updateDisabledState();
    }
  }

  private updateDisabledState(): void {
    if (this.disabled) {
      this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', '');
    } else {
      this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
    }
  }
}
