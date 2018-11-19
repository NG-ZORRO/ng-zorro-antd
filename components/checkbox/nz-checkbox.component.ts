import { FocusMonitor } from '@angular/cdk/a11y';
import {
  forwardRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NgClassType } from '../core/types/ng-class';

import { isEmpty } from '../core/util/check';
import { toBoolean } from '../core/util/convert';

import { NzCheckboxWrapperComponent } from './nz-checkbox-wrapper.component';

@Component({
  selector           : '[nz-checkbox]',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  templateUrl        : './nz-checkbox.component.html',
  providers          : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzCheckboxComponent),
      multi      : true
    }
  ],
  host               : {
    '[class.ant-checkbox-wrapper]': 'true'
  }
})
export class NzCheckboxComponent implements OnInit, ControlValueAccessor, OnChanges, AfterViewInit, OnDestroy {
  private _disabled = false;
  private _indeterminate = false;
  private _autoFocus = false;
  private _checked = false;
  private isInit = false;
  private prefixCls = 'ant-checkbox';
  // tslint:disable-next-line:no-any
  private onChange: (value: any) => void = () => {};
  // tslint:disable-next-line:no-any
  private onTouched: () => any = () => {};
  classMap: NgClassType = {};
  @ViewChild('inputElement') private inputElement: ElementRef;
  @ViewChild('contentElement') private contentElement: ElementRef;
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();
  @Input() nzValue: string;

  @Input()
  set nzAutoFocus(value: boolean) {
    this._autoFocus = toBoolean(value);
    this.updateAutoFocus();
  }

  get nzAutoFocus(): boolean {
    return this._autoFocus;
  }

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.cdr.markForCheck();
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  set nzIndeterminate(value: boolean) {
    this._indeterminate = toBoolean(value);
  }

  get nzIndeterminate(): boolean {
    return this._indeterminate;
  }

  @Input()
  set nzChecked(value: boolean) {
    this._checked = value;
    this.updateClassMap();
    this.cdr.markForCheck();
  }

  get nzChecked(): boolean {
    return this._checked;
  }

  @HostListener('click', [ '$event' ])
  onClick(e: MouseEvent): void {
    e.preventDefault();
    this.focus();
    if (!this.nzDisabled) {
      this.updateValue(!this.nzChecked);
    }
  }

  updateAutoFocus(): void {
    if (this.isInit) {
      if (this.nzAutoFocus) {
        this.renderer.setAttribute(this.inputElement.nativeElement, 'autofocus', 'autofocus');
      } else {
        this.renderer.removeAttribute(this.inputElement.nativeElement, 'autofocus');
      }
    }
  }

  updateValue(value: boolean): void {
    this.onChange(value);
    this.nzCheckedChange.emit(value);
    this.nzChecked = value;
    if (this.nzCheckboxWrapperComponent) {
      this.nzCheckboxWrapperComponent.onChange();
    }
  }

  writeValue(value: boolean): void {
    this.nzChecked = value;
  }

  registerOnChange(fn: (_: boolean) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

  updateClassMap(): void {
    this.classMap = {
      [ this.prefixCls ]                   : true,
      [ `${this.prefixCls}-checked` ]      : this.nzChecked && (!this.nzIndeterminate),
      [ `${this.prefixCls}-disabled` ]     : this.nzDisabled,
      [ `${this.prefixCls}-indeterminate` ]: this.nzIndeterminate
    };
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

  constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2, @Optional() private nzCheckboxWrapperComponent: NzCheckboxWrapperComponent, private cdr: ChangeDetectorRef, private focusMonitor: FocusMonitor) {
  }

  ngOnInit(): void {
    this.focusMonitor.monitor(this.elementRef, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        // When a focused element becomes disabled, the browser *immediately* fires a blur event.
        // Angular does not expect events to be raised during change detection, so any state change
        // (such as a form control's 'ng-touched') will cause a changed-after-checked error.
        // See https://github.com/angular/angular/issues/17793. To work around this, we defer
        // telling the form control it has been touched until the next tick.
        Promise.resolve().then(() => this.onTouched());
      }
    });
    this.updateClassMap();
    if (this.nzCheckboxWrapperComponent) {
      this.nzCheckboxWrapperComponent.addCheckbox(this);
    }
  }

  ngOnChanges(): void {
    this.updateClassMap();
  }

  ngAfterViewInit(): void {
    this.isInit = true;
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
