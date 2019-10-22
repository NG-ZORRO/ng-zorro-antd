/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputBoolean, NzConfigService, NzSizeDSType, WithConfig } from 'ng-zorro-antd/core';

const NZ_CONFIG_COMPONENT_NAME = 'switch';

@Component({
  selector: 'nz-switch',
  exportAs: 'nzSwitch',
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
export class NzSwitchComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  checked = false;
  onChange: (value: boolean) => void = () => null;
  onTouched: () => void = () => null;
  @ViewChild('switchElement', { static: true }) private switchElement: ElementRef;
  @Input() @InputBoolean() nzLoading = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzControl = false;
  @Input() nzCheckedChildren: string | TemplateRef<void>;
  @Input() nzUnCheckedChildren: string | TemplateRef<void>;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'default') nzSize: NzSizeDSType;

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

  constructor(
    public nzConfigService: NzConfigService,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor
  ) {}

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

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.switchElement.nativeElement);
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
