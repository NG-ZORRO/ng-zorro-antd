/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ESCAPE } from '@angular/cdk/keycodes';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair,
  HorizontalConnectionPos,
  VerticalConnectionPos
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { slideMotion } from 'ng-zorro-antd/core/animation';
import { NzResizeObserver } from 'ng-zorro-antd/core/resize-observers';

import { Direction } from '@angular/cdk/bidi';
import { CandyDate, CompatibleValue, wrongSortOrder } from 'ng-zorro-antd/core/time';
import { NgStyleInterface, NzSafeAny } from 'ng-zorro-antd/core/types';
import { DateHelperService } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePickerService } from './date-picker.service';
import { DateRangePopupComponent } from './date-range-popup.component';
import { RangePartType } from './standard-types';
import { PREFIX_CLASS } from './util';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: '[nz-picker]',
  exportAs: 'nzPicker',
  template: `
    <!-- Content of single picker -->
    <div *ngIf="!isRange" class="{{ prefixCls }}-input">
      <input
        #pickerInput
        [attr.id]="id"
        [class.ant-input-disabled]="disabled"
        [disabled]="disabled"
        [readOnly]="inputReadOnly"
        [(ngModel)]="inputValue"
        placeholder="{{ getPlaceholder() }}"
        [size]="inputSize"
        (focus)="onFocus($event)"
        (blur)="onBlur($event)"
        (ngModelChange)="onInputChange($event)"
        (keyup.enter)="onKeyupEnter($event)"
      />
      <ng-container *ngTemplateOutlet="tplRightRest"></ng-container>
    </div>

    <!-- Content of range picker -->
    <ng-container *ngIf="isRange">
      <div class="{{ prefixCls }}-input">
        <ng-container *ngTemplateOutlet="tplRangeInput; context: { partType: 'left' }"></ng-container>
      </div>
      <div #separatorElement class="{{ prefixCls }}-range-separator">
        <span class="{{ prefixCls }}-separator">
          <ng-container *ngIf="separator; else defaultSeparator">{{ separator }}</ng-container>
        </span>
        <ng-template #defaultSeparator>
          <i nz-icon nzType="swap-right" nzTheme="outline"></i>
        </ng-template>
      </div>
      <div class="{{ prefixCls }}-input">
        <ng-container *ngTemplateOutlet="tplRangeInput; context: { partType: 'right' }"></ng-container>
      </div>
      <ng-container *ngTemplateOutlet="tplRightRest"></ng-container>
    </ng-container>
    <!-- Input for Range ONLY -->
    <ng-template #tplRangeInput let-partType="partType">
      <input
        #rangePickerInput
        [disabled]="disabled"
        [readOnly]="inputReadOnly"
        [size]="inputSize"
        (click)="onClickInputBox($event)"
        (blur)="onBlur($event)"
        (focus)="onFocus($event, partType)"
        (keyup.enter)="onKeyupEnter($event)"
        [(ngModel)]="inputValue[datePickerService.getActiveIndex(partType)]"
        (ngModelChange)="onInputChange($event)"
        placeholder="{{ getPlaceholder(partType) }}"
      />
    </ng-template>

    <!-- Right operator icons -->
    <ng-template #tplRightRest>
      <div class="{{ prefixCls }}-active-bar" [ngStyle]="activeBarStyle"></div>
      <span *ngIf="showClear()" class="{{ prefixCls }}-clear" (click)="onClickClear($event)">
        <i nz-icon nzType="close-circle" nzTheme="fill"></i>
      </span>
      <span class="{{ prefixCls }}-suffix">
        <ng-container *nzStringTemplateOutlet="suffixIcon; let suffixIcon">
          <i nz-icon [nzType]="suffixIcon"></i>
        </ng-container>
      </span>
    </ng-template>

    <!-- Overlay -->
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="realOpenState"
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-picker-wrapper'"
      (positionChange)="onPositionChange($event)"
      (detach)="onOverlayDetach()"
      (overlayKeydown)="onOverlayKeydown($event)"
      (overlayOutsideClick)="onClickOutside($event)"
    >
      <div class="ant-picker-wrapper" [nzNoAnimation]="noAnimation" [@slideMotion]="'enter'" style="position: relative;">
        <div
          class="{{ prefixCls }}-dropdown {{ dropdownClassName }}"
          [class.ant-picker-dropdown-rtl]="dir === 'rtl'"
          [class.ant-picker-dropdown-placement-bottomLeft]="currentPositionY === 'bottom' && currentPositionX === 'start'"
          [class.ant-picker-dropdown-placement-topLeft]="currentPositionY === 'top' && currentPositionX === 'start'"
          [class.ant-picker-dropdown-placement-bottomRight]="currentPositionY === 'bottom' && currentPositionX === 'end'"
          [class.ant-picker-dropdown-placement-topRight]="currentPositionY === 'top' && currentPositionX === 'end'"
          [class.ant-picker-dropdown-range]="isRange"
          [ngStyle]="popupStyle"
        >
          <!-- Compatible for overlay that not support offset dynamically and immediately -->
          <ng-content></ng-content>
        </div>
      </div>
    </ng-template>
  `,
  animations: [slideMotion],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzPickerComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() noAnimation: boolean = false;
  @Input() isRange: boolean = false;
  @Input() open: boolean | undefined = undefined;
  @Input() disabled: boolean = false;
  @Input() inputReadOnly: boolean = false;
  @Input() placeholder!: string | string[];
  @Input() allowClear?: boolean;
  @Input() autoFocus?: boolean;
  @Input() format!: string;
  @Input() separator?: string;
  @Input() popupStyle: NgStyleInterface | null = null;
  @Input() dropdownClassName?: string;
  @Input() suffixIcon?: string | TemplateRef<NzSafeAny>;
  @Input() dir: Direction = 'ltr';
  @Input() id: string | null = null;

  @Output() readonly focusChange = new EventEmitter<boolean>();
  @Output() readonly valueChange = new EventEmitter<CandyDate | CandyDate[] | null>();
  @Output() readonly openChange = new EventEmitter<boolean>(); // Emitted when overlay's open state change

  @ViewChild(CdkConnectedOverlay, { static: false }) cdkConnectedOverlay?: CdkConnectedOverlay;
  @ViewChild('separatorElement', { static: false }) separatorElement?: ElementRef;
  @ViewChild('pickerInput', { static: false }) pickerInput?: ElementRef<HTMLInputElement>;
  @ViewChildren('rangePickerInput') rangePickerInputs?: QueryList<ElementRef<HTMLInputElement>>;
  @ContentChild(DateRangePopupComponent) panel!: DateRangePopupComponent;

  origin: CdkOverlayOrigin;
  document: Document;
  inputSize: number = 12;
  inputWidth?: number;
  destroy$ = new Subject();
  prefixCls = PREFIX_CLASS;
  inputValue!: NzSafeAny;
  activeBarStyle: object = {};
  overlayOpen: boolean = false; // Available when "open"=undefined
  overlayPositions: ConnectionPositionPair[] = [
    {
      offsetX: -12,
      offsetY: 8,
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top'
    },
    {
      offsetX: -12,
      offsetY: -8,
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom'
    },
    {
      offsetX: 12,
      offsetY: 8,
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top'
    },
    {
      offsetX: 12,
      offsetY: -8,
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom'
    }
  ] as ConnectionPositionPair[];
  currentPositionX: HorizontalConnectionPos = 'start';
  currentPositionY: VerticalConnectionPos = 'bottom';

  get realOpenState(): boolean {
    // The value that really decide the open state of overlay
    return this.isOpenHandledByUser() ? !!this.open : this.overlayOpen;
  }

  constructor(
    private elementRef: ElementRef,
    private dateHelper: DateHelperService,
    private cdr: ChangeDetectorRef,
    private platform: Platform,
    private nzResizeObserver: NzResizeObserver,
    public datePickerService: DatePickerService,
    @Inject(DOCUMENT) doc: NzSafeAny
  ) {
    this.document = doc;
    this.origin = new CdkOverlayOrigin(this.elementRef);
  }

  ngOnInit(): void {
    this.inputValue = this.isRange ? ['', ''] : '';
    this.datePickerService.valueChange$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateInputValue();
    });
  }

  ngAfterViewInit(): void {
    if (this.autoFocus) {
      this.focus();
    }

    if (this.isRange && this.platform.isBrowser) {
      this.nzResizeObserver
        .observe(this.elementRef)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.updateInputWidthAndArrowLeft();
        });
    }

    this.datePickerService.inputPartChange$.pipe(takeUntil(this.destroy$)).subscribe(partType => {
      if (partType) {
        this.datePickerService.activeInput = partType;
      }
      this.focus();
      this.updateInputWidthAndArrowLeft();
      this.panel?.updateActiveDate();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.format?.currentValue !== changes.format?.previousValue) {
      this.inputSize = Math.max(10, this.format.length) + 2;
      this.updateInputValue();
    }
  }

  updateInputWidthAndArrowLeft(): void {
    this.inputWidth = this.rangePickerInputs?.first?.nativeElement.offsetWidth || 0;

    const baseStyle = { position: 'absolute', width: `${this.inputWidth}px` };
    this.datePickerService.arrowLeft =
      this.datePickerService.activeInput === 'left' ? 0 : this.inputWidth + this.separatorElement?.nativeElement.offsetWidth || 0;

    if (this.dir === 'rtl') {
      this.activeBarStyle = { ...baseStyle, right: `${this.datePickerService.arrowLeft}px` };
    } else {
      this.activeBarStyle = { ...baseStyle, left: `${this.datePickerService.arrowLeft}px` };
    }

    this.panel.cdr.markForCheck();
    this.cdr.markForCheck();
  }

  getInput(partType?: RangePartType): HTMLInputElement | undefined {
    return this.isRange
      ? partType === 'left'
        ? this.rangePickerInputs?.first.nativeElement
        : this.rangePickerInputs?.last.nativeElement
      : this.pickerInput!.nativeElement;
  }

  focus(): void {
    const activeInputElement = this.getInput(this.datePickerService.activeInput);
    if (this.document.activeElement !== activeInputElement) {
      activeInputElement?.focus();
    }
  }

  onFocus(event: FocusEvent, partType?: RangePartType): void {
    event.preventDefault();
    this.focusChange.emit(true);
    if (partType) {
      this.datePickerService.inputPartChange$.next(partType);
    }
  }

  onBlur(event: FocusEvent): void {
    event.preventDefault();
    this.focusChange.emit(false);
  }

  // Show overlay content
  showOverlay(): void {
    if (!this.realOpenState && !this.disabled) {
      this.updateInputWidthAndArrowLeft();
      this.overlayOpen = true;
      this.focus();
      this.panel.init();
      this.openChange.emit(true);
      this.cdr.markForCheck();
    }
  }

  hideOverlay(): void {
    if (this.realOpenState) {
      this.overlayOpen = false;
      this.openChange.emit(false);
    }
  }

  showClear(): boolean {
    return !this.disabled && !this.isEmptyValue(this.datePickerService.value) && !!this.allowClear;
  }

  onClickInputBox(event: MouseEvent): void {
    event.stopPropagation();
    this.focus();
    if (!this.isOpenHandledByUser()) {
      this.showOverlay();
    }
  }

  onClickOutside(event: MouseEvent): void {
    if (this.elementRef.nativeElement.contains(event.target)) {
      return;
    }

    if (this.panel.isAllowed(this.datePickerService.value!, true)) {
      if (Array.isArray(this.datePickerService.value) && wrongSortOrder(this.datePickerService.value)) {
        const index = this.datePickerService.getActiveIndex(this.datePickerService.activeInput);
        const value = this.datePickerService.value[index];
        this.panel.changeValueFromSelect(value!, true);
        return;
      }
      this.updateInputValue();
      this.datePickerService.emitValue$.next();
    } else {
      this.datePickerService.setValue(this.datePickerService.initialValue!);
      this.hideOverlay();
    }
  }

  onOverlayDetach(): void {
    this.hideOverlay();
  }

  onOverlayKeydown(event: KeyboardEvent): void {
    if (event.keyCode === ESCAPE) {
      this.datePickerService.setValue(this.datePickerService.initialValue!);
    }
  }

  // NOTE: A issue here, the first time position change, the animation will not be triggered.
  // Because the overlay's "positionChange" event is emitted after the content's full shown up.
  // All other components like "nz-dropdown" which depends on overlay also has the same issue.
  // See: https://github.com/NG-ZORRO/ng-zorro-antd/issues/1429
  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.currentPositionX = position.connectionPair.originX;
    this.currentPositionY = position.connectionPair.originY;
    this.cdr.detectChanges(); // Take side-effects to position styles
  }

  onClickClear(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.datePickerService.setValue(this.isRange ? [] : null);
    this.datePickerService.emitValue$.next();
  }

  updateInputValue(): void {
    const newValue = this.datePickerService.value;
    if (this.isRange) {
      this.inputValue = newValue ? (newValue as CandyDate[]).map(v => this.formatValue(v)) : ['', ''];
    } else {
      this.inputValue = this.formatValue(newValue as CandyDate);
    }
    this.cdr.markForCheck();
  }

  formatValue(value: CandyDate): string {
    return this.dateHelper.format(value && (value as CandyDate).nativeDate, this.format);
  }

  onInputChange(value: string, isEnter: boolean = false): void {
    /**
     * in IE11 focus/blur will trigger ngModelChange if has placeholder
     * so we forbidden IE11 to open panel through input change
     */
    if (
      !this.platform.TRIDENT &&
      this.document.activeElement === this.getInput(this.datePickerService.activeInput) &&
      !this.realOpenState
    ) {
      this.showOverlay();
      return;
    }

    const date = this.checkValidDate(value);
    if (date) {
      this.panel.changeValueFromSelect(date, isEnter);
    }
  }

  onKeyupEnter(event: Event): void {
    this.onInputChange((event.target as HTMLInputElement).value, true);
  }

  private checkValidDate(value: string): CandyDate | null {
    const date = new CandyDate(this.dateHelper.parseDate(value, this.format));

    if (!date.isValid() || value !== this.dateHelper.format(date.nativeDate, this.format)) {
      return null;
    }

    return date;
  }

  getPlaceholder(partType?: RangePartType): string {
    return this.isRange ? this.placeholder[this.datePickerService.getActiveIndex(partType!)] : (this.placeholder as string);
  }

  isEmptyValue(value: CompatibleValue): boolean {
    if (value === null) {
      return true;
    } else if (this.isRange) {
      return !value || !Array.isArray(value) || value.every(val => !val);
    } else {
      return !value;
    }
  }

  // Whether open state is permanently controlled by user himself
  isOpenHandledByUser(): boolean {
    return this.open !== undefined;
  }
}
