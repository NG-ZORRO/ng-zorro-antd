/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { Directive, ElementRef, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { BooleanInput, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'input[nz-input],textarea[nz-input]',
  exportAs: 'nzInput',
  host: {
    '[class.ant-input-disabled]': 'disabled',
    '[class.ant-input-lg]': `nzSize === 'large'`,
    '[class.ant-input-sm]': `nzSize === 'small'`,
    '[class.ant-input-rtl]': `dir=== 'rtl'`
  }
})
export class NzInputDirective implements OnChanges, OnDestroy {
  static ngAcceptInputType_disabled: BooleanInput;

  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() @InputBoolean() disabled = false;
  disabled$ = new Subject<boolean>();
  dir: Direction;

  private destroy$ = new Subject<void>();

  constructor(renderer: Renderer2, elementRef: ElementRef, directionality: Directionality) {
    renderer.addClass(elementRef.nativeElement, 'ant-input');
    this.dir = directionality.value;
    directionality.change.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dir = directionality.value;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    const { disabled } = changes;
    if (disabled) {
      this.disabled$.next(this.disabled);
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
