import { FocusMonitor } from '@angular/cdk/a11y';
import {
  forwardRef,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean } from '../core/util/convert';

export interface NzCheckBoxOptionInterface {
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'nz-checkbox-group',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './nz-checkbox-group.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzCheckboxGroupComponent),
      multi: true
    }
  ]
})
export class NzCheckboxGroupComponent implements ControlValueAccessor, OnInit {
  // tslint:disable-next-line:no-any
  onChange: (value: any) => void = () => null;
  // tslint:disable-next-line:no-any
  onTouched: () => any = () => null;
  options: NzCheckBoxOptionInterface[] = [];
  @Input() @InputBoolean() nzDisabled = false;

  onOptionChange(): void {
    this.onChange(this.options);
  }

  trackByOption(_index: number, option: NzCheckBoxOptionInterface): string {
    return option.value;
  }

  constructor(
    private elementRef: ElementRef,
    private focusMonitor: FocusMonitor,
    private cdr: ChangeDetectorRef,
    renderer: Renderer2
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-checkbox-group');
  }

  ngOnInit(): void {
    this.focusMonitor.monitor(this.elementRef, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        Promise.resolve().then(() => this.onTouched());
      }
    });
  }

  writeValue(value: NzCheckBoxOptionInterface[]): void {
    this.options = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (_: NzCheckBoxOptionInterface[]) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
    this.cdr.markForCheck();
  }
}
