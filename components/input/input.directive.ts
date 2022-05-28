/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  Self,
  SimpleChanges
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { BooleanInput, NgClassInterface, NzSizeLDSType, NzStatus } from 'ng-zorro-antd/core/types';
import { getStatusClassNames, InputBoolean } from 'ng-zorro-antd/core/util';

@Directive({
  selector: 'input[nz-input],textarea[nz-input]',
  exportAs: 'nzInput',
  host: {
    '[class.ant-input-disabled]': 'disabled',
    '[class.ant-input-borderless]': 'nzBorderless',
    '[class.ant-input-lg]': `nzSize === 'large'`,
    '[class.ant-input-sm]': `nzSize === 'small'`,
    '[attr.disabled]': 'disabled || null',
    '[class.ant-input-rtl]': `dir=== 'rtl'`
  }
})
export class NzInputDirective implements OnChanges, OnInit, OnDestroy {
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_nzBorderless: BooleanInput;
  @Input() @InputBoolean() nzBorderless = false;
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzStatus?: NzStatus;
  @Input()
  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value != null && `${value}` !== 'false';
  }
  _disabled = false;
  disabled$ = new Subject<boolean>();
  dir: Direction = 'ltr';
  // status
  prefixCls: string = 'ant-input';
  statusCls: NgClassInterface = {};
  hasFeedback: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-input');
  }

  ngOnInit(): void {
    if (this.ngControl) {
      this.ngControl.statusChanges
        ?.pipe(
          filter(() => this.ngControl.disabled !== null),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.disabled$.next(this.ngControl.disabled!);
        });
    }

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { disabled, nzStatus } = changes;
    if (disabled) {
      this.disabled$.next(this.disabled);
    }
    if (nzStatus) {
      this.setStatusStyles();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setStatusStyles(): void {
    // render status if nzStatus is set
    this.statusCls = getStatusClassNames(this.prefixCls, this.nzStatus, this.hasFeedback);
    Object.keys(this.statusCls).forEach(status => {
      if (this.statusCls[status]) {
        this.renderer.addClass(this.elementRef.nativeElement, status);
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, status);
      }
    });
  }
}
