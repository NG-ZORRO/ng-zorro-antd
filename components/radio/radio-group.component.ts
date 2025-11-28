/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
  booleanAttribute,
  forwardRef,
  inject,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NzSafeAny, NzSizeLDSType, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';

import { NzRadioService } from './radio.service';

export type NzRadioButtonStyle = 'outline' | 'solid';

@Component({
  selector: 'nz-radio-group',
  exportAs: 'nzRadioGroup',
  template: `<ng-content></ng-content>`,
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
    class: 'ant-radio-group',
    '[class.ant-radio-group-large]': `nzSize === 'large'`,
    '[class.ant-radio-group-small]': `nzSize === 'small'`,
    '[class.ant-radio-group-solid]': `nzButtonStyle === 'solid'`,
    '[class.ant-radio-group-rtl]': `dir === 'rtl'`
  }
})
export class NzRadioGroupComponent implements OnInit, ControlValueAccessor, OnChanges {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly nzRadioService = inject(NzRadioService);
  private readonly directionality = inject(Directionality);
  private readonly destroyRef = inject(DestroyRef);

  private value: NzSafeAny | null = null;
  private isNzDisableFirstChange: boolean = true;
  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input() nzButtonStyle: NzRadioButtonStyle = 'outline';
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzName: string | null = null;

  dir: Direction = 'ltr';

  ngOnInit(): void {
    this.nzRadioService.selected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
      if (this.value !== value) {
        this.value = value;
        this.onChange(this.value);
      }
    });
    this.nzRadioService.touched$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      Promise.resolve().then(() => this.onTouched());
    });

    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
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
    this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || isDisabled;
    this.isNzDisableFirstChange = false;
    this.nzRadioService.setDisabled(this.nzDisabled);
    this.cdr.markForCheck();
  }
}
