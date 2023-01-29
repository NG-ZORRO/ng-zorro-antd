/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput, NzSizeDSType, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'switch';

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
      [attr.id]="nzId"
      [disabled]="nzDisabled"
      [class.ant-switch-checked]="isChecked"
      [class.ant-switch-loading]="nzLoading"
      [class.ant-switch-disabled]="nzDisabled"
      [class.ant-switch-small]="nzSize === 'small'"
      [class.ant-switch-rtl]="dir === 'rtl'"
      [nzWaveExtraNode]="true"
    >
      <span class="ant-switch-handle">
        <span *ngIf="nzLoading" nz-icon nzType="loading" class="ant-switch-loading-icon"></span>
      </span>
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
  `
})
export class NzSwitchComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, OnInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  static ngAcceptInputType_nzLoading: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzControl: BooleanInput;

  isChecked = false;
  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  @ViewChild('switchElement', { static: true }) switchElement!: ElementRef<HTMLElement>;
  @Input() @InputBoolean() nzLoading = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzControl = false;
  @Input() nzCheckedChildren: string | TemplateRef<void> | null = null;
  @Input() nzUnCheckedChildren: string | TemplateRef<void> | null = null;
  @Input() @WithConfig() nzSize: NzSizeDSType = 'default';
  @Input() nzId: string | null = null;

  dir: Direction = 'ltr';

  private destroy$ = new Subject<void>();
  private isNzDisableFirstChange = true;

  updateValue(value: boolean): void {
    if (this.isChecked !== value) {
      this.isChecked = value;
      this.onChange(this.isChecked);
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
    private host: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor,
    @Optional() private directionality: Directionality
  ) {}

  ngOnInit(): void {
    this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;

    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.host.nativeElement, 'click')
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          event.preventDefault();

          if (this.nzControl || this.nzDisabled || this.nzLoading) {
            return;
          }

          this.ngZone.run(() => {
            this.updateValue(!this.isChecked);
            this.cdr.markForCheck();
          });
        });

      fromEvent<KeyboardEvent>(this.switchElement.nativeElement, 'keydown')
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          if (this.nzControl || this.nzDisabled || this.nzLoading) {
            return;
          }

          const { keyCode } = event;
          if (keyCode !== LEFT_ARROW && keyCode !== RIGHT_ARROW && keyCode !== SPACE && keyCode !== ENTER) {
            return;
          }

          event.preventDefault();

          this.ngZone.run(() => {
            if (keyCode === LEFT_ARROW) {
              this.updateValue(false);
            } else if (keyCode === RIGHT_ARROW) {
              this.updateValue(true);
            } else if (keyCode === SPACE || keyCode === ENTER) {
              this.updateValue(!this.isChecked);
            }

            this.cdr.markForCheck();
          });
        });
    });
  }

  ngAfterViewInit(): void {
    this.focusMonitor
      .monitor(this.switchElement!.nativeElement, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe(focusOrigin => {
        if (!focusOrigin) {
          /** https://github.com/angular/angular/issues/17793 **/
          Promise.resolve().then(() => this.onTouched());
        }
      });
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.switchElement!.nativeElement);
    this.destroy$.next();
    this.destroy$.complete();
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
    this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || disabled;
    this.isNzDisableFirstChange = false;
    this.cdr.markForCheck();
  }
}
