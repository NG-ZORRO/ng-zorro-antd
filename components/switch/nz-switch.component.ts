import { FocusMonitor } from '@angular/cdk/a11y';
import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import {
  forwardRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSizeDSType } from '../core/types/size';

import { InputBoolean } from '../core/util/convert';

@Component({
  selector: 'nz-switch',
  preserveWhitespaces: false,
  templateUrl: './nz-switch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzSwitchComponent),
      multi: true
    }
  ],
  host: {
    '(click)': 'hostClick($event)'
  },
  styles: [
    `
      nz-switch {
        display: inline-block;
      }
    `
  ]
})
export class NzSwitchComponent implements ControlValueAccessor, AfterViewInit {
  checked = false;
  onChange: (value: boolean) => void = () => null;
  onTouched: () => void = () => null;
  @ViewChild('switchElement') private switchElement: ElementRef;
  @Input() @InputBoolean() nzLoading = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzControl = false;
  @Input() nzCheckedChildren: string | TemplateRef<void>;
  @Input() nzUnCheckedChildren: string | TemplateRef<void>;
  @Input() nzSize: NzSizeDSType;

  hostClick(e: MouseEvent): void {
    e.preventDefault();
    if (!this.nzDisabled && !this.nzLoading && !this.nzControl) {
      this.updateValue(!this.checked);
    }
  }

  updateValue(value: boolean): void {
    if (this.checked !== value) {
      this.checked = value;
      this.onChange(this.checked);
    }
  }

  onKeyDown(e: KeyboardEvent): void {
    if (!this.nzControl && !this.nzDisabled && !this.nzLoading) {
      if (e.keyCode === LEFT_ARROW) {
        this.updateValue(false);
        e.preventDefault();
      } else if (e.keyCode === RIGHT_ARROW) {
        this.updateValue(true);
        e.preventDefault();
      } else if (e.keyCode === SPACE || e.keyCode === ENTER) {
        this.updateValue(!this.checked);
        e.preventDefault();
      }
    }
  }

  focus(): void {
    this.focusMonitor.focusVia(this.switchElement.nativeElement, 'keyboard');
  }

  blur(): void {
    this.switchElement.nativeElement.blur();
  }

  constructor(private cdr: ChangeDetectorRef, private focusMonitor: FocusMonitor) {}

  ngAfterViewInit(): void {
    this.focusMonitor.monitor(this.switchElement.nativeElement, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        // When a focused element becomes disabled, the browser *immediately* fires a blur event.
        // Angular does not expect events to be raised during change detection, so any state change
        // (such as a form control's 'ng-touched') will cause a changed-after-checked error.
        // See https://github.com/angular/angular/issues/17793. To work around this, we defer
        // telling the form control it has been touched until the next tick.
        Promise.resolve().then(() => this.onTouched());
      }
    });
  }

  writeValue(value: boolean): void {
    this.checked = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (_: boolean) => void): void {
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
