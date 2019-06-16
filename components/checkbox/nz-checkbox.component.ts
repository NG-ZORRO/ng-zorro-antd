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
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { isEmpty, InputBoolean } from 'ng-zorro-antd/core';

import { NzCheckboxWrapperComponent } from './nz-checkbox-wrapper.component';

@Component({
  selector: '[nz-checkbox]',
  exportAs: 'nzCheckbox',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './nz-checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzCheckboxComponent),
      multi: true
    }
  ],
  host: {
    '(click)': 'hostClick($event)'
  }
})
export class NzCheckboxComponent implements OnInit, ControlValueAccessor, OnChanges, AfterViewInit, OnDestroy {
  // tslint:disable-next-line:no-any
  onChange: (value: any) => void = () => null;
  // tslint:disable-next-line:no-any
  onTouched: () => any = () => null;
  @ViewChild('inputElement', { static: true }) private inputElement: ElementRef;
  @ViewChild('contentElement', { static: false }) private contentElement: ElementRef;
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();
  @Input() nzValue: string;
  @Input() @InputBoolean() nzAutoFocus = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzIndeterminate = false;
  @Input() @InputBoolean() nzChecked = false;

  hostClick(e: MouseEvent): void {
    e.preventDefault();
    this.focus();
    this.innerCheckedChange(!this.nzChecked);
  }

  innerCheckedChange(checked: boolean): void {
    if (!this.nzDisabled) {
      this.nzChecked = checked;
      this.onChange(this.nzChecked);
      this.nzCheckedChange.emit(this.nzChecked);
      if (this.nzCheckboxWrapperComponent) {
        this.nzCheckboxWrapperComponent.onChange();
      }
    }
  }

  updateAutoFocus(): void {
    if (this.inputElement && this.nzAutoFocus) {
      this.renderer.setAttribute(this.inputElement.nativeElement, 'autofocus', 'autofocus');
    } else {
      this.renderer.removeAttribute(this.inputElement.nativeElement, 'autofocus');
    }
  }

  writeValue(value: boolean): void {
    this.nzChecked = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (_: boolean) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
    this.cdr.markForCheck();
  }

  focus(): void {
    this.focusMonitor.focusVia(this.inputElement, 'keyboard');
  }

  blur(): void {
    this.inputElement.nativeElement.blur();
  }

  checkContent(): void {
    if (isEmpty(this.contentElement.nativeElement)) {
      this.renderer.setStyle(this.contentElement.nativeElement, 'display', 'none');
    } else {
      this.renderer.removeStyle(this.contentElement.nativeElement, 'display');
    }
  }

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Optional() private nzCheckboxWrapperComponent: NzCheckboxWrapperComponent,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-checkbox-wrapper');
  }

  ngOnInit(): void {
    this.focusMonitor.monitor(this.elementRef, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        Promise.resolve().then(() => this.onTouched());
      }
    });
    if (this.nzCheckboxWrapperComponent) {
      this.nzCheckboxWrapperComponent.addCheckbox(this);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzAutoFocus) {
      this.updateAutoFocus();
    }
  }

  ngAfterViewInit(): void {
    this.updateAutoFocus();
    this.checkContent();
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef);
    if (this.nzCheckboxWrapperComponent) {
      this.nzCheckboxWrapperComponent.removeCheckbox(this);
    }
  }
}
