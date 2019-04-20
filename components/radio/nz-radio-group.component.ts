/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  forwardRef,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, Subject, Subscription } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { isNotNil, InputBoolean, NzSizeLDSType } from 'ng-zorro-antd/core';

import { NzRadioComponent } from './nz-radio.component';

export type NzRadioButtonStyle = 'outline' | 'solid';

@Component({
  selector: 'nz-radio-group',
  exportAs: 'nzRadioGroup',
  preserveWhitespaces: false,
  templateUrl: './nz-radio-group.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzRadioGroupComponent),
      multi: true
    }
  ],
  host: {
    '[class.ant-radio-group-large]': `nzSize === 'large'`,
    '[class.ant-radio-group-small]': `nzSize === 'small'`,
    '[class.ant-radio-group-solid]': `nzButtonStyle === 'solid'`
  }
})
export class NzRadioGroupComponent implements AfterContentInit, ControlValueAccessor, OnDestroy, OnChanges {
  /* tslint:disable-next-line:no-any */
  private value: any;
  private destroy$ = new Subject();
  private selectSubscription: Subscription;
  private touchedSubscription: Subscription;
  onChange: (_: string) => void = () => null;
  onTouched: () => void = () => null;
  @ContentChildren(forwardRef(() => NzRadioComponent), { descendants: true }) radios: QueryList<NzRadioComponent>;
  @Input() @InputBoolean() nzDisabled: boolean;
  @Input() nzButtonStyle: NzRadioButtonStyle = 'outline';
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzName: string;

  updateChildrenStatus(): void {
    if (this.radios) {
      Promise.resolve().then(() => {
        this.radios.forEach(radio => {
          radio.checked = radio.nzValue === this.value;
          if (isNotNil(this.nzDisabled)) {
            radio.nzDisabled = this.nzDisabled;
          }
          if (this.nzName) {
            radio.name = this.nzName;
          }
          radio.markForCheck();
        });
      });
    }
  }

  constructor(private cdr: ChangeDetectorRef, renderer: Renderer2, elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-radio-group');
  }

  ngAfterContentInit(): void {
    this.radios.changes
      .pipe(
        startWith(null),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.updateChildrenStatus();
        if (this.selectSubscription) {
          this.selectSubscription.unsubscribe();
        }
        this.selectSubscription = merge(...this.radios.map(radio => radio.select$))
          .pipe(takeUntil(this.destroy$))
          .subscribe(radio => {
            if (this.value !== radio.nzValue) {
              this.value = radio.nzValue;
              this.updateChildrenStatus();
              this.onChange(this.value);
            }
          });
        if (this.touchedSubscription) {
          this.touchedSubscription.unsubscribe();
        }
        this.touchedSubscription = merge(...this.radios.map(radio => radio.touched$))
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            Promise.resolve().then(() => this.onTouched());
          });
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzDisabled || changes.nzName) {
      this.updateChildrenStatus();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /* tslint:disable-next-line:no-any */
  writeValue(value: any): void {
    this.value = value;
    this.updateChildrenStatus();
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
    this.cdr.markForCheck();
  }
}
