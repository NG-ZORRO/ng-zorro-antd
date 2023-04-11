/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { CdkOverlayOrigin, ConnectionPositionPair } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import {
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
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, withLatestFrom } from 'rxjs/operators';

import { isValid } from 'date-fns';

import { slideMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzFormNoStatusService, NzFormStatusService } from 'ng-zorro-antd/core/form';
import { warn } from 'ng-zorro-antd/core/logger';
import { BooleanInput, NgClassInterface, NzSafeAny, NzStatus, NzValidateStatus } from 'ng-zorro-antd/core/types';
import { getStatusClassNames, InputBoolean, isNil } from 'ng-zorro-antd/core/util';
import { DateHelperService, NzI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'timePicker';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-time-picker',
  exportAs: 'nzTimePicker',
  template: `
    <div class="ant-picker-input">
      <input
        #inputElement
        [attr.id]="nzId"
        type="text"
        [size]="inputSize"
        autocomplete="off"
        [placeholder]="nzPlaceHolder || (i18nPlaceHolder$ | async)"
        [(ngModel)]="inputValue"
        [disabled]="nzDisabled"
        [readOnly]="nzInputReadOnly"
        (focus)="onFocus(true)"
        (blur)="onFocus(false)"
        (keyup.enter)="onKeyupEnter()"
        (keyup.escape)="onKeyupEsc()"
        (ngModelChange)="onInputChange($event)"
      />
      <span class="ant-picker-suffix">
        <ng-container *nzStringTemplateOutlet="nzSuffixIcon; let suffixIcon">
          <span nz-icon [nzType]="suffixIcon"></span>
        </ng-container>
        <nz-form-item-feedback-icon *ngIf="hasFeedback && !!status" [status]="status"></nz-form-item-feedback-icon>
      </span>
      <span *ngIf="nzAllowEmpty && !nzDisabled && value" class="ant-picker-clear" (click)="onClickClearBtn($event)">
        <span
          nz-icon
          nzType="close-circle"
          nzTheme="fill"
          [attr.aria-label]="nzClearText"
          [attr.title]="nzClearText"
        ></span>
      </span>
    </div>

    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="nzOpen"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-picker-dropdown'"
      (detach)="close()"
      (overlayOutsideClick)="onClickOutside($event)"
    >
      <div [@slideMotion]="'enter'" class="ant-picker-dropdown" style="position: relative">
        <div class="ant-picker-panel-container">
          <div tabindex="-1" class="ant-picker-panel">
            <nz-time-picker-panel
              [ngClass]="nzPopupClassName"
              [format]="nzFormat"
              [nzHourStep]="nzHourStep"
              [nzMinuteStep]="nzMinuteStep"
              [nzSecondStep]="nzSecondStep"
              [nzDisabledHours]="nzDisabledHours"
              [nzDisabledMinutes]="nzDisabledMinutes"
              [nzDisabledSeconds]="nzDisabledSeconds"
              [nzPlaceHolder]="nzPlaceHolder || (i18nPlaceHolder$ | async)"
              [nzHideDisabledOptions]="nzHideDisabledOptions"
              [nzUse12Hours]="nzUse12Hours"
              [nzDefaultOpenValue]="nzDefaultOpenValue"
              [nzAddOn]="nzAddOn"
              [nzClearText]="nzClearText"
              [nzNowText]="nzNowText"
              [nzOkText]="nzOkText"
              [nzAllowEmpty]="nzAllowEmpty"
              [(ngModel)]="value"
              (ngModelChange)="onPanelValueChange($event)"
              (closePanel)="setCurrentValueAndClose()"
            ></nz-time-picker-panel>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  host: {
    class: 'ant-picker',
    '[class.ant-picker-large]': `nzSize === 'large'`,
    '[class.ant-picker-small]': `nzSize === 'small'`,
    '[class.ant-picker-disabled]': `nzDisabled`,
    '[class.ant-picker-focused]': `focused`,
    '[class.ant-picker-rtl]': `dir === 'rtl'`,
    '[class.ant-picker-borderless]': `nzBorderless`,
    '(click)': 'open()'
  },
  animations: [slideMotion],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NzTimePickerComponent, multi: true }]
})
export class NzTimePickerComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges, OnDestroy {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  static ngAcceptInputType_nzUse12Hours: BooleanInput;
  static ngAcceptInputType_nzHideDisabledOptions: BooleanInput;
  static ngAcceptInputType_nzAllowEmpty: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzAutoFocus: BooleanInput;
  static ngAcceptInputType_nzBorderless: BooleanInput;
  static ngAcceptInputType_nzInputReadOnly: BooleanInput;

  private _onChange?: (value: Date | null) => void;
  private _onTouched?: () => void;
  private destroy$ = new Subject<void>();
  private isNzDisableFirstChange: boolean = true;
  isInit = false;
  focused = false;
  inputValue: string = '';
  value: Date | null = null;
  preValue: Date | null = null;
  origin!: CdkOverlayOrigin;
  inputSize?: number;
  i18nPlaceHolder$: Observable<string | undefined> = of(undefined);
  overlayPositions: ConnectionPositionPair[] = [
    {
      offsetY: 3,
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top'
    },
    {
      offsetY: -3,
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom'
    },
    {
      offsetY: 3,
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top'
    },
    {
      offsetY: -3,
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom'
    }
  ] as ConnectionPositionPair[];
  dir: Direction = 'ltr';
  // status
  prefixCls: string = 'ant-picker';
  statusCls: NgClassInterface = {};
  status: NzValidateStatus = '';
  hasFeedback: boolean = false;

  @ViewChild('inputElement', { static: true }) inputRef!: ElementRef<HTMLInputElement>;
  @Input() nzId: string | null = null;
  @Input() nzSize: string | null = null;
  @Input() nzStatus: NzStatus = '';
  @Input() @WithConfig() nzHourStep: number = 1;
  @Input() @WithConfig() nzMinuteStep: number = 1;
  @Input() @WithConfig() nzSecondStep: number = 1;
  @Input() @WithConfig() nzClearText: string = 'clear';
  @Input() @WithConfig() nzNowText: string = '';
  @Input() @WithConfig() nzOkText: string = '';
  @Input() @WithConfig() nzPopupClassName: string = '';
  @Input() nzPlaceHolder = '';
  @Input() nzAddOn?: TemplateRef<void>;
  @Input() nzDefaultOpenValue?: Date;
  @Input() nzDisabledHours?: () => number[];
  @Input() nzDisabledMinutes?: (hour: number) => number[];
  @Input() nzDisabledSeconds?: (hour: number, minute: number) => number[];
  @Input() @WithConfig() nzFormat: string = 'HH:mm:ss';
  @Input() nzOpen = false;
  @Input() @WithConfig() @InputBoolean() nzUse12Hours: boolean = false;
  @Input() @WithConfig() nzSuffixIcon: string | TemplateRef<NzSafeAny> = 'clock-circle';

  @Output() readonly nzOpenChange = new EventEmitter<boolean>();

  @Input() @InputBoolean() nzHideDisabledOptions = false;
  @Input() @WithConfig() @InputBoolean() nzAllowEmpty: boolean = true;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzAutoFocus = false;
  @Input() @WithConfig() nzBackdrop = false;
  @Input() @InputBoolean() nzBorderless: boolean = false;
  @Input() @InputBoolean() nzInputReadOnly: boolean = false;

  emitValue(value: Date | null): void {
    this.setValue(value, true);

    if (this._onChange) {
      this._onChange(this.value);
    }

    if (this._onTouched) {
      this._onTouched();
    }
  }

  setValue(value: Date | null, syncPreValue: boolean = false): void {
    if (syncPreValue) {
      this.preValue = isValid(value) ? new Date(value!) : null;
    }
    this.value = isValid(value) ? new Date(value!) : null;
    this.inputValue = this.dateHelper.format(value, this.nzFormat);
    this.cdr.markForCheck();
  }

  open(): void {
    if (this.nzDisabled || this.nzOpen) {
      return;
    }
    this.focus();
    this.nzOpen = true;
    this.nzOpenChange.emit(this.nzOpen);
  }

  close(): void {
    this.nzOpen = false;
    this.cdr.markForCheck();
    this.nzOpenChange.emit(this.nzOpen);
  }

  updateAutoFocus(): void {
    if (this.isInit && !this.nzDisabled) {
      if (this.nzAutoFocus) {
        this.renderer.setAttribute(this.inputRef.nativeElement, 'autofocus', 'autofocus');
      } else {
        this.renderer.removeAttribute(this.inputRef.nativeElement, 'autofocus');
      }
    }
  }

  onClickClearBtn(event: MouseEvent): void {
    event.stopPropagation();
    this.emitValue(null);
  }

  onClickOutside(event: MouseEvent): void {
    if (!this.element.nativeElement.contains(event.target)) {
      this.setCurrentValueAndClose();
    }
  }

  onFocus(value: boolean): void {
    this.focused = value;
    if (!value) {
      if (this.checkTimeValid(this.value)) {
        this.setCurrentValueAndClose();
      } else {
        this.setValue(this.preValue);
        this.close();
      }
    }
  }

  focus(): void {
    if (this.inputRef.nativeElement) {
      this.inputRef.nativeElement.focus();
    }
  }

  blur(): void {
    if (this.inputRef.nativeElement) {
      this.inputRef.nativeElement.blur();
    }
  }

  onKeyupEsc(): void {
    this.setValue(this.preValue);
  }

  onKeyupEnter(): void {
    if (this.nzOpen && isValid(this.value)) {
      this.setCurrentValueAndClose();
    } else if (!this.nzOpen) {
      this.open();
    }
  }

  onInputChange(str: string): void {
    if (!this.platform.TRIDENT && document.activeElement === this.inputRef.nativeElement) {
      this.open();
      this.parseTimeString(str);
    }
  }

  onPanelValueChange(value: Date): void {
    this.setValue(value);
    this.focus();
  }

  setCurrentValueAndClose(): void {
    this.emitValue(this.value);
    this.close();
  }

  constructor(
    public nzConfigService: NzConfigService,
    protected i18n: NzI18nService,
    private element: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private dateHelper: DateHelperService,
    private platform: Platform,
    @Optional() private directionality: Directionality,
    @Optional() private nzFormStatusService?: NzFormStatusService,
    @Optional() private nzFormNoStatusService?: NzFormNoStatusService
  ) {}

  ngOnInit(): void {
    this.nzFormStatusService?.formStatusChanges
      .pipe(
        distinctUntilChanged((pre, cur) => {
          return pre.status === cur.status && pre.hasFeedback === cur.hasFeedback;
        }),
        withLatestFrom(this.nzFormNoStatusService ? this.nzFormNoStatusService.noFormStatus : of(false)),
        map(([{ status, hasFeedback }, noStatus]) => ({ status: noStatus ? '' : status, hasFeedback })),
        takeUntil(this.destroy$)
      )
      .subscribe(({ status, hasFeedback }) => {
        this.setStatusStyles(status, hasFeedback);
      });

    this.inputSize = Math.max(8, this.nzFormat.length) + 2;
    this.origin = new CdkOverlayOrigin(this.element);

    this.i18nPlaceHolder$ = this.i18n.localeChange.pipe(
      map((nzLocale: NzI18nInterface) => nzLocale.TimePicker.placeholder)
    );

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzUse12Hours, nzFormat, nzDisabled, nzAutoFocus, nzStatus } = changes;
    if (nzUse12Hours && !nzUse12Hours.previousValue && nzUse12Hours.currentValue && !nzFormat) {
      this.nzFormat = 'h:mm:ss a';
    }
    if (nzDisabled) {
      const value = nzDisabled.currentValue;
      const input = this.inputRef.nativeElement as HTMLInputElement;
      if (value) {
        this.renderer.setAttribute(input, 'disabled', '');
      } else {
        this.renderer.removeAttribute(input, 'disabled');
      }
    }
    if (nzAutoFocus) {
      this.updateAutoFocus();
    }
    if (nzStatus) {
      this.setStatusStyles(this.nzStatus, this.hasFeedback);
    }
  }

  parseTimeString(str: string): void {
    const value = this.dateHelper.parseTime(str, this.nzFormat) || null;
    if (isValid(value)) {
      this.value = value;
      this.cdr.markForCheck();
    }
  }

  ngAfterViewInit(): void {
    this.isInit = true;
    this.updateAutoFocus();
  }

  writeValue(time: Date | null | undefined): void {
    let result: Date | null;

    if (time instanceof Date) {
      result = time;
    } else if (isNil(time)) {
      result = null;
    } else {
      warn('Non-Date type is not recommended for time-picker, use "Date" type.');
      result = new Date(time);
    }

    this.setValue(result, true);
  }

  registerOnChange(fn: (time: Date | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || isDisabled;
    this.isNzDisableFirstChange = false;
    this.cdr.markForCheck();
  }

  private checkTimeValid(value: Date | null): boolean {
    if (!value) {
      return true;
    }

    const disabledHours = this.nzDisabledHours?.();
    const disabledMinutes = this.nzDisabledMinutes?.(value.getHours());
    const disabledSeconds = this.nzDisabledSeconds?.(value.getHours(), value.getMinutes());

    return !(
      disabledHours?.includes(value.getHours()) ||
      disabledMinutes?.includes(value.getMinutes()) ||
      disabledSeconds?.includes(value.getSeconds())
    );
  }

  private setStatusStyles(status: NzValidateStatus, hasFeedback: boolean): void {
    // set inner status
    this.status = status;
    this.hasFeedback = hasFeedback;
    this.cdr.markForCheck();
    // render status if nzStatus is set
    this.statusCls = getStatusClassNames(this.prefixCls, status, hasFeedback);
    Object.keys(this.statusCls).forEach(status => {
      if (this.statusCls[status]) {
        this.renderer.addClass(this.element.nativeElement, status);
      } else {
        this.renderer.removeClass(this.element.nativeElement, status);
      }
    });
  }
}
