/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  forwardRef,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NZ_FORM_SIZE } from 'ng-zorro-antd/core/form';
import { NzSafeAny, NzSizeLDSType, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';

import { NzRadioService } from './radio.service';

export type NzRadioButtonStyle = 'outline' | 'solid';

@Component({
  selector: 'nz-radio-group',
  exportAs: 'nzRadioGroup',
  template: `<ng-content />`,
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
    '[class.ant-radio-group-large]': `finalSize() === 'large'`,
    '[class.ant-radio-group-small]': `finalSize() === 'small'`,
    '[class.ant-radio-group-solid]': `nzButtonStyle === 'solid'`,
    '[class.ant-radio-group-rtl]': `dir() === 'rtl'`
  }
})
export class NzRadioGroupComponent implements OnInit, ControlValueAccessor, OnChanges {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly nzRadioService = inject(NzRadioService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly nzFormSize = inject(NZ_FORM_SIZE, { optional: true });

  private value: NzSafeAny | null = null;
  private isNzDisableFirstChange: boolean = true;
  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input() nzButtonStyle: NzRadioButtonStyle = 'outline';
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzName: string | null = null;

  dir = inject(Directionality).valueSignal;

  private readonly size = signal(this.nzSize);

  protected readonly finalSize = computed(() => this.nzFormSize?.() || this.size());

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
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzDisabled, nzName, nzSize } = changes;
    if (nzDisabled) {
      this.nzRadioService.setDisabled(this.nzDisabled);
    }
    if (nzName) {
      this.nzRadioService.setName(this.nzName!);
    }
    if (nzSize) {
      this.size.set(this.nzSize);
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
