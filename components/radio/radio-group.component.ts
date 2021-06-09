/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanInput, NzSafeAny, NzSizeLDSType, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzRadioService } from './radio.service';

export type NzRadioButtonStyle = 'outline' | 'solid';

@Component({
  selector: 'nz-radio-group',
  exportAs: 'nzRadioGroup',
  preserveWhitespaces: false,
  template: ` <ng-content></ng-content> `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    NzRadioService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzRadioGroupComponent),
      multi: true
    }
  ],
  host: {
    '[class.ant-radio-group-large]': `nzSize === 'large'`,
    '[class.ant-radio-group-small]': `nzSize === 'small'`,
    '[class.ant-radio-group-solid]': `nzButtonStyle === 'solid'`,
    '[class.ant-radio-group-rtl]': `dir === 'rtl'`
  }
})
export class NzRadioGroupComponent implements OnInit, ControlValueAccessor, OnDestroy, OnChanges {
  static ngAcceptInputType_nzDisabled: BooleanInput;

  private value: NzSafeAny | null = null;
  private destroy$ = new Subject();
  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  @Input() @InputBoolean() nzDisabled = false;
  @Input() nzButtonStyle: NzRadioButtonStyle = 'outline';
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzName: string | null = null;

  dir: Direction = 'ltr';

  constructor(
    private cdr: ChangeDetectorRef,
    private nzRadioService: NzRadioService,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('ant-radio-group');
  }

  ngOnInit(): void {
    this.nzRadioService.selected$.pipe(takeUntil(this.destroy$)).subscribe(value => {
      if (this.value !== value) {
        this.value = value;
        this.onChange(this.value);
      }
    });
    this.nzRadioService.touched$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      Promise.resolve().then(() => this.onTouched());
    });

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzDisabled, nzName } = changes;
    if (nzDisabled) {
      this.nzRadioService.setDisabled(this.nzDisabled);
    }
    if (nzName) {
      this.nzRadioService.setName(this.nzName!);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: NzSafeAny): void {
    this.value = value;
    this.nzRadioService.select(value);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
    this.nzRadioService.setDisabled(isDisabled);
    this.cdr.markForCheck();
  }
}
