/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import {
  forwardRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

import { InputBoolean } from 'ng-zorro-antd/core';

@Component({
  selector: '[nz-radio]',
  exportAs: 'nzRadio',
  preserveWhitespaces: false,
  templateUrl: './nz-radio.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzRadioComponent),
      multi: true
    }
  ],
  host: {
    '[class.ant-radio-wrapper-checked]': 'checked',
    '[class.ant-radio-wrapper-disabled]': 'nzDisabled'
  }
})
export class NzRadioComponent implements ControlValueAccessor, AfterViewInit, OnChanges, OnDestroy {
  select$ = new Subject<NzRadioComponent>();
  touched$ = new Subject<void>();
  checked = false;
  name: string;
  isNgModel = false;
  onChange: (_: boolean) => void = () => null;
  onTouched: () => void = () => null;
  @ViewChild('inputElement', { static: false }) inputElement: ElementRef;
  /* tslint:disable-next-line:no-any */
  @Input() nzValue: any;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzAutoFocus = false;

  updateAutoFocus(): void {
    if (this.inputElement) {
      if (this.nzAutoFocus) {
        this.renderer.setAttribute(this.inputElement.nativeElement, 'autofocus', 'autofocus');
      } else {
        this.renderer.removeAttribute(this.inputElement.nativeElement, 'autofocus');
      }
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    // Prevent label click triggered twice.
    event.stopPropagation();
    event.preventDefault();
    if (!this.nzDisabled && !this.checked) {
      this.select$.next(this);
      if (this.isNgModel) {
        this.checked = true;
        this.onChange(true);
      }
    }
  }

  focus(): void {
    this.focusMonitor.focusVia(this.inputElement, 'keyboard');
  }

  blur(): void {
    this.inputElement.nativeElement.blur();
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  /* tslint:disable-next-line:no-any */
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor
  ) {
    this.renderer.addClass(elementRef.nativeElement, 'ant-radio-wrapper');
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
    this.cdr.markForCheck();
  }

  writeValue(value: boolean): void {
    this.checked = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (_: boolean) => {}): void {
    this.isNgModel = true;
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  ngAfterViewInit(): void {
    this.focusMonitor.monitor(this.elementRef, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        Promise.resolve().then(() => this.onTouched());
        this.touched$.next();
      }
    });
    this.updateAutoFocus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzAutoFocus) {
      this.updateAutoFocus();
    }
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef);
  }
}
