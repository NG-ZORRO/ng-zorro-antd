/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { BooleanInput, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';

@Directive({
  selector: 'input[nz-input],textarea[nz-input]',
  exportAs: 'nzInput',
  host: {
    '[class.ant-input-disabled]': 'disabled',
    '[class.ant-input-lg]': `nzSize === 'large'`,
    '[class.ant-input-sm]': `nzSize === 'small'`,
    '[attr.disabled]': 'disabled || null'
  }
})
export class NzInputDirective implements OnChanges {
  static ngAcceptInputType_disabled: BooleanInput;

  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() @InputBoolean() disabled = false;
  disabled$ = new Subject<boolean>();

  constructor(renderer: Renderer2, elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-input');
  }
  ngOnChanges(changes: SimpleChanges): void {
    const { disabled } = changes;
    if (disabled) {
      this.disabled$.next(this.disabled);
    }
  }
}
