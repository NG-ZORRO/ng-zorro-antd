/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair
} from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { slideMotion, CandyDate } from 'ng-zorro-antd/core';
import { DateHelperService } from 'ng-zorro-antd/i18n';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-picker',
  exportAs: 'nzPicker',
  templateUrl: './picker.component.html',
  animations: [slideMotion],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzPickerComponent implements AfterViewInit, OnChanges {
  @Input() noAnimation: boolean = false;
  @Input() isRange: boolean = false;
  @Input() open: boolean | undefined = undefined;
  @Input() disabled: boolean;
  @Input() placeholder: string | string[];
  @Input() allowClear: boolean;
  @Input() autoFocus: boolean;
  @Input() className: string;
  @Input() format: string;
  @Input() size: 'large' | 'small';
  @Input() style: object;
  @Input() value: CandyDate | CandyDate[] | null;
  @Output() readonly valueChange = new EventEmitter<CandyDate | CandyDate[] | null>();
  @Output() readonly openChange = new EventEmitter<boolean>(); // Emitted when overlay's open state change

  @ViewChild('origin', { static: false }) origin: CdkOverlayOrigin;
  @ViewChild(CdkConnectedOverlay, { static: false }) cdkConnectedOverlay: CdkConnectedOverlay;
  @ViewChild('pickerInput', { static: false }) pickerInput: ElementRef;

  prefixCls = 'ant-calendar';
  animationOpenState = false;
  overlayOpen: boolean = false; // Available when "open"=undefined
  overlayOffsetY: number = 0;
  overlayOffsetX: number = -2;
  overlayPositions: ConnectionPositionPair[] = [
    {
      // offsetX: -10, // TODO: What a pity, cdk/overlay current not support offset configs even though it already provide these properties
      // offsetY: -10,
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top'
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom'
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top'
    },
    {
      originX: 'end',
      originY: 'bottom',
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

  constructor(private dateHelper: DateHelperService, private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this.autoFocus) {
      this.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.open) {
      this.animationStart();
    }
  }

  focus(): void {
    if (this.isRange) {
      const firstInput = (this.pickerInput.nativeElement as HTMLElement).querySelector(
        'input:first-child'
      ) as HTMLInputElement;
      firstInput.focus(); // Focus on the first input
    } else {
      this.pickerInput.nativeElement.focus();
    }
  }

  // Show overlay content
  showOverlay(): void {
    if (!this.realOpenState) {
      this.overlayOpen = true;
      this.animationStart();
      this.openChange.emit(this.overlayOpen);
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
      this.openChange.emit(this.overlayOpen);
      this.focus();
    }
  }

  onClickInputBox(): void {
    if (!this.disabled && !this.isOpenHandledByUser()) {
      this.showOverlay();
    }
  }

  onClickBackdrop(): void {
    this.hideOverlay();
  }

  onOverlayDetach(): void {
    this.hideOverlay();
  }

  // NOTE: A issue here, the first time position change, the animation will not be triggered.
  // Because the overlay's "positionChange" event is emitted after the content's full shown up.
  // All other components like "nz-dropdown" which depends on overlay also has the same issue.
  // See: https://github.com/NG-ZORRO/ng-zorro-antd/issues/1429
  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.dropdownAnimation = position.connectionPair.originY === 'top' ? 'bottom' : 'top';
    this.currentPositionX = position.connectionPair.originX as 'start' | 'end';
    this.currentPositionY = position.connectionPair.originY as 'top' | 'bottom';
    this.changeDetector.detectChanges(); // Take side-effects to position styles
  }

  onClickClear(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.value = this.isRange ? [] : null;
    this.valueChange.emit(this.value);
  }

  getReadableValue(partType?: RangePartType): string | null {
    let value: CandyDate;
    if (this.isRange) {
      value = (this.value as CandyDate[])[this.getPartTypeIndex(partType as RangePartType)];
    } else {
      value = this.value as CandyDate;
    }
    return value ? this.dateHelper.format(value.nativeDate, this.format) : null;
  }

  getPartTypeIndex(partType: RangePartType): number {
    return { left: 0, right: 1 }[partType];
  }

  getPlaceholder(partType?: RangePartType): string {
    return this.isRange ? this.placeholder[this.getPartTypeIndex(partType!)] : (this.placeholder as string);
  }

  isEmptyValue(value: CandyDate[] | CandyDate | null): boolean {
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
    }
  }
}

export type RangePartType = 'left' | 'right';
