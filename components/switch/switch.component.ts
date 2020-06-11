/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput, NzSizeDSType, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

const NZ_CONFIG_COMPONENT_NAME = 'switch';

@Component({
  selector: 'nz-switch',
  exportAs: 'nzSwitch',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzSwitchComponent),
      multi: true
    }
  ],
  template: `
    <button
      nz-wave
      type="button"
      class="ant-switch"
      #switchElement
      [disabled]="nzDisabled"
      [class.ant-switch-checked]="isChecked"
      [class.ant-switch-loading]="nzLoading"
      [class.ant-switch-disabled]="nzDisabled"
      [class.ant-switch-small]="nzSize === 'small'"
      [nzWaveExtraNode]="true"
      (keydown)="onKeyDown($event)"
    >
      <i *ngIf="nzLoading" nz-icon nzType="loading" class="ant-switch-loading-icon"></i>
      <span class="ant-switch-inner">
        <ng-container *ngIf="isChecked; else uncheckTemplate">
          <ng-container *nzStringTemplateOutlet="nzCheckedChildren">{{ nzCheckedChildren }}</ng-container>
        </ng-container>
        <ng-template #uncheckTemplate>
          <ng-container *nzStringTemplateOutlet="nzUnCheckedChildren">{{ nzUnCheckedChildren }}</ng-container>
        </ng-template>
      </span>
      <div class="ant-click-animating-node"></div>
    </button>
  `,
  host: {
    '(click)': 'onHostClick($event)'
  }
})
export class NzSwitchComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  static ngAcceptInputType_nzLoading: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzControl: BooleanInput;

  isChecked = false;
  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  @ViewChild('switchElement', { static: true }) private switchElement?: ElementRef;
  @Input() @InputBoolean() nzLoading = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzControl = false;
  @Input() nzCheckedChildren: string | TemplateRef<void> | null = null;
  @Input() nzUnCheckedChildren: string | TemplateRef<void> | null = null;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzSize: NzSizeDSType = 'default';

  onHostClick(e: MouseEvent): void {
    e.preventDefault();
    if (!this.nzDisabled && !this.nzLoading && !this.nzControl) {
      this.updateValue(!this.isChecked);
    }
  }

  updateValue(value: boolean): void {
    if (this.isChecked !== value) {
      this.isChecked = value;
      this.onChange(this.isChecked);
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
        this.updateValue(!this.isChecked);
        e.preventDefault();
      }
    }
  }

  focus(): void {
    this.focusMonitor.focusVia(this.switchElement?.nativeElement, 'keyboard');
  }

  blur(): void {
    this.switchElement?.nativeElement.blur();
  }

  constructor(public nzConfigService: NzConfigService, private cdr: ChangeDetectorRef, private focusMonitor: FocusMonitor) {}

  ngAfterViewInit(): void {
    this.focusMonitor.monitor(this.switchElement!.nativeElement, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        /** https://github.com/angular/angular/issues/17793 **/
        Promise.resolve().then(() => this.onTouched());
      }
    });
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.switchElement!.nativeElement);
  }

  writeValue(value: boolean): void {
    this.isChecked = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.nzDisabled = disabled;
    this.cdr.markForCheck();
  }
}
