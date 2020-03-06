/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
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
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { CandyDate, CompatibleValue, SingleValue, slideMotion, sortRangeValue } from 'ng-zorro-antd/core';
import { DateHelperService } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DatePickerService } from './date-picker.service';
import { PREFIX_CLASS } from './name';
import { RangePartType } from './standard-types';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: '[nz-picker]',
  exportAs: 'nzPicker',
  template: `
    <div cdkOverlayOrigin #origin="cdkOverlayOrigin" style="display: inherit; width: 100%">
      <!-- Content of single picker -->
      <div *ngIf="!isRange" class="{{ prefixCls }}-input">
        <input
          #pickerInput
          [class.ant-input-disabled]="disabled"
          [disabled]="disabled"
          [(ngModel)]="inputValue"
          placeholder="{{ getPlaceholder() }}"
          (click)="onClickInputBox()"
          (focus)="onFocus()"
          (blur)="onBlur()"
          (input)="onInputKeyup($event)"
          (keyup.enter)="onInputKeyup($event, true)"
        />
        <ng-container *ngTemplateOutlet="tplRightRest"></ng-container>
      </div>

      <!-- Content of range picker -->
      <ng-container *ngIf="isRange">
        <div class="{{ prefixCls }}-input">
          <ng-container *ngTemplateOutlet="tplRangeInput; context: { partType: 'left' }"></ng-container>
        </div>
        <div class="{{ prefixCls }}-range-separator">
          <span class="{{ prefixCls }}-separator"> ~ </span>
        </div>
        <div class="{{ prefixCls }}-input">
          <ng-container *ngTemplateOutlet="tplRangeInput; context: { partType: 'right' }"></ng-container>
        </div>
        <ng-container *ngTemplateOutlet="tplRightRest"></ng-container>
      </ng-container>
    </div>
    <!-- Input for Range ONLY -->
    <ng-template #tplRangeInput let-partType="partType">
      <input
        [disabled]="disabled"
        (click)="onClickInputBox(partType)"
        (blur)="onBlur()"
        (input)="onInputKeyup($event, false)"
        (focus)="onFocus(partType)"
        (keyup.enter)="onInputKeyup($event, true)"
        [(ngModel)]="inputValue[datePickerService?.getActiveIndex(partType)]"
        placeholder="{{ getPlaceholder(partType) }}"
      />
    </ng-template>

    <!-- Right operator icons -->
    <ng-template #tplRightRest>
      <div class="{{ prefixCls }}-active-bar" [style]="activeBarStyle"></div>
      <span *ngIf="showClear()" class="{{ prefixCls }}-clear" (click)="onClickClear($event)">
        <i nz-icon nzType="close-circle" nzTheme="fill"></i>
      </span>
      <span class="{{ prefixCls }}-suffix">
        <i nz-icon nzType="calendar"></i>
      </span>
    </ng-template>

    <!-- Overlay -->
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="realOpenState"
      [cdkConnectedOverlayHasBackdrop]="!isOpenHandledByUser()"
      [cdkConnectedOverlayPositions]="overlayPositions"
      (positionChange)="onPositionChange($event)"
      (backdropClick)="onClickBackdrop()"
      (detach)="onOverlayDetach()"
      (overlayKeydown)="onOverlayKeydown($event)"
    >
      <div
        [nzNoAnimation]="noAnimation"
        [@slideMotion]="dropdownAnimation"
        (@slideMotion.done)="animationDone()"
        style="position: relative;"
        [style.left]="currentPositionX === 'start' ? '-12px' : '12px'"
        [style.top]="currentPositionY === 'top' ? '-7px' : '7px'"
      >
        <!-- Compatible for overlay that not support offset dynamically and immediately -->
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  animations: [slideMotion],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzPickerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() noAnimation: boolean = false;
  @Input() isRange: boolean = false;
  @Input() open: boolean | undefined = undefined;
  @Input() disabled: boolean;
  @Input() disabledDate: (current: Date) => boolean;
  @Input() placeholder: string | string[];
  @Input() allowClear: boolean;
  @Input() autoFocus: boolean;
  @Input() format: string;

  @Output() readonly focusChange = new EventEmitter<boolean>();
  @Output() readonly valueChange = new EventEmitter<CandyDate | CandyDate[] | null>();
  @Output() readonly openChange = new EventEmitter<boolean>(); // Emitted when overlay's open state change

  @ViewChild('origin', { static: false }) origin: CdkOverlayOrigin;
  @ViewChild(CdkConnectedOverlay, { static: false }) cdkConnectedOverlay: CdkConnectedOverlay;

  destroy$ = new Subject();
  prefixCls = PREFIX_CLASS;
  // tslint:disable-next-line:no-any
  inputValue: any;
  activeBarStyle = {};
  animationOpenState = false;
  overlayOpen: boolean = false; // Available when "open"=undefined
  overlayPositions: ConnectionPositionPair[] = [
    {
      // offsetX: -10, // TODO: What a pity, cdk/overlay current not support offset configs even though it already provide these properties
      // offsetY: -10,
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top'
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom'
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top'
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom'
    }
  ] as ConnectionPositionPair[];
  dropdownAnimation: 'top' | 'bottom' = 'bottom';
  currentPositionX: 'start' | 'end' = 'start';
  currentPositionY: 'top' | 'bottom' = 'top';

  get realOpenState(): boolean {
    // The value that really decide the open state of overlay
    return this.isOpenHandledByUser() ? !!this.open : this.overlayOpen;
  }

  constructor(
    private elementRef: ElementRef,
    private dateHelper: DateHelperService,
    private changeDetector: ChangeDetectorRef,
    public datePickerService: DatePickerService
  ) {
    this.updateInputValue();
  }

  ngAfterViewInit(): void {
    if (this.autoFocus) {
      this.focus();
    }
    this.datePickerService.valueChange$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateInputValue();
      this.changeDetector.markForCheck();
    });
    if (this.isRange) {
      const inputWidth = (this.elementRef.nativeElement as HTMLElement).querySelector('input')!.offsetWidth;
      const arrowLeft =
        inputWidth +
        ((this.elementRef.nativeElement as HTMLElement).querySelector('.ant-picker-range-separator') as HTMLElement).offsetWidth;

      this.datePickerService.inputPartChange$.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(partType => {
        this.datePickerService.activeInput = partType;
        this.focus();
        this.datePickerService.arrowPositionStyle = { left: this.datePickerService.activeInput === 'left' ? '0px' : `${arrowLeft}px` };
        this.activeBarStyle = { ...this.datePickerService.arrowPositionStyle, width: `${inputWidth}px`, position: 'absolute' };
        this.changeDetector.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.open) {
      this.animationStart();
    }
  }

  getInput(partType?: RangePartType): HTMLInputElement {
    const index = partType === 'left' ? 0 : 1;
    return this.isRange
      ? (this.elementRef.nativeElement as HTMLElement).querySelectorAll('input')[index]!
      : (this.elementRef.nativeElement as HTMLElement).querySelector('input')!;
  }

  focus(): void {
    this.getInput(this.datePickerService.activeInput).focus(); // Focus on the first input
  }

  onFocus(partType?: RangePartType): void {
    if (partType) {
      this.datePickerService.inputPartChange$.next(partType);
    }
    this.focusChange.emit(true);
  }

  onBlur(): void {
    this.focusChange.emit(false);
  }

  // Show overlay content
  showOverlay(): void {
    if (!this.realOpenState) {
      this.overlayOpen = true;
      this.animationStart();
      this.focus();
      this.openChange.emit(true);
      setTimeout(() => {
        if (this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef) {
          this.cdkConnectedOverlay.overlayRef.updatePosition();
        }
      });
    }
  }

  hideOverlay(): void {
    if (this.realOpenState) {
      this.overlayOpen = false;
      this.openChange.emit(false);
      this.focus();
    }
  }

  showClear(): boolean {
    return !this.disabled && !this.isEmptyValue(this.datePickerService.value) && this.allowClear;
  }

  onClickInputBox(partType?: RangePartType): void {
    if (!this.disabled && !this.isOpenHandledByUser()) {
      this.showOverlay();
    }
    this.onFocus(partType);
  }

  onClickBackdrop(): void {
    if (this.isRange) {
      if (this.isValidRange(this.datePickerService.value as CandyDate[])) {
        this.datePickerService.emitValue$.next();
      } else {
        this.datePickerService.setValue(this.datePickerService.initialValue);
        this.hideOverlay();
      }
    } else {
      this.datePickerService.emitValue$.next();
    }
  }

  onOverlayDetach(): void {
    this.hideOverlay();
  }

  onOverlayKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.updateInputValue(true);
      this.datePickerService.setValue(this.datePickerService.initialValue);
    }
  }

  // NOTE: A issue here, the first time position change, the animation will not be triggered.
  // Because the overlay's "positionChange" event is emitted after the content's full shown up.
  // All other components like "nz-dropdown" which depends on overlay also has the same issue.
  // See: https://github.com/NG-ZORRO/ng-zorro-antd/issues/1429
  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.dropdownAnimation = position.connectionPair.originY === 'top' ? 'top' : 'bottom';
    this.currentPositionX = position.connectionPair.originX as 'start' | 'end';
    this.currentPositionY = position.connectionPair.originY as 'top' | 'bottom';
    this.changeDetector.detectChanges(); // Take side-effects to position styles
  }

  onClickClear(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.datePickerService.setValue(this.isRange ? [] : null);
    this.datePickerService.emitValue$.next();
  }

  updateInputValue(returnToInit: boolean = false): void {
    const newValue = returnToInit ? this.datePickerService.initialValue : this.datePickerService.value;
    if (this.isRange) {
      this.inputValue = newValue ? (newValue as CandyDate[]).map(v => this.formatValue(v)) : ['', ''];
    } else {
      this.inputValue = this.formatValue(newValue as CandyDate);
    }
  }

  formatValue(value: CandyDate): string {
    return this.dateHelper.format(value && (value as CandyDate).nativeDate, this.format);
  }

  isDisabledDate(date: null | CandyDate): boolean {
    return !date || (this.disabledDate && this.disabledDate(date.nativeDate));
  }

  // Check if it's a valid range value
  private isValidRange(value: SingleValue[]): boolean {
    if (Array.isArray(value)) {
      const [start, end] = value;
      return !!(start && end);
    }
    return false;
  }

  onInputKeyup(event: Event, isEnter: boolean = false): void {
    if (isEnter && !this.realOpenState) {
      this.showOverlay();
      return;
    }

    const date = this.checkValidInputDate((event as KeyboardEvent).target!);
    if (!date || (this.disabledDate && this.disabledDate(date.nativeDate))) {
      return;
    }
    if (this.isRange) {
      let newValue: CompatibleValue;
      const leftDate = this.checkValidInputDate(this.getInput('left'));
      const rightDate = this.checkValidInputDate(this.getInput('right'));
      if (this.isDisabledDate(leftDate) || this.isDisabledDate(rightDate)) {
        return;
      }
      newValue = [leftDate, rightDate];
      if (this.isValidRange(newValue)) {
        newValue = sortRangeValue(newValue);
        this.datePickerService.setValue(newValue);
      }
    } else {
      this.datePickerService.setValue(date);
    }
    if (isEnter) {
      this.datePickerService.emitValue$.next();
    }
  }

  private checkValidInputDate(inputTarget: EventTarget): CandyDate | null {
    const input = (inputTarget as HTMLInputElement).value;
    const date = new CandyDate(input);

    if (!date.isValid() || input !== this.dateHelper.format(date.nativeDate, this.format)) {
      // Should also match the input format exactly
      // this.invalidInputClass = `${this.prefixCls}-input-invalid`;
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

  animationStart(): void {
    if (this.realOpenState) {
      this.animationOpenState = true;
    }
  }

  animationDone(): void {
    if (!this.realOpenState) {
      this.animationOpenState = false;
      this.changeDetector.markForCheck();
    }
  }
}
