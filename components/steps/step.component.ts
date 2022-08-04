/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { BooleanInput, NgClassType, NzSizeDSType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzProgressFormatter } from 'ng-zorro-antd/progress';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-step',
  exportAs: 'nzStep',
  preserveWhitespaces: false,
  template: `
    <div
      #itemContainer
      class="ant-steps-item-container"
      [attr.role]="clickable && !nzDisabled ? 'button' : null"
      [tabindex]="clickable && !nzDisabled ? 0 : null"
    >
      <div class="ant-steps-item-tail" *ngIf="last !== true"></div>
      <div class="ant-steps-item-icon">
        <ng-template [ngIf]="!showProcessDot">
          <div *ngIf="showProgress" class="ant-steps-progress-icon">
            <nz-progress
              [nzPercent]="nzPercentage"
              nzType="circle"
              [nzWidth]="nzSize === 'small' ? 32 : 40"
              [nzFormat]="nullProcessFormat"
              [nzStrokeWidth]="4"
            ></nz-progress>
          </div>
          <span class="ant-steps-icon" *ngIf="nzStatus === 'finish' && !nzIcon"
            ><span nz-icon nzType="check"></span
          ></span>
          <span class="ant-steps-icon" *ngIf="nzStatus === 'error'"><span nz-icon nzType="close"></span></span>
          <span class="ant-steps-icon" *ngIf="(nzStatus === 'process' || nzStatus === 'wait') && !nzIcon">
            {{ index + 1 }}
          </span>
          <span class="ant-steps-icon" *ngIf="nzIcon">
            <ng-container *nzStringTemplateOutlet="nzIcon; let icon">
              <span nz-icon [nzType]="!oldAPIIcon && icon" [ngClass]="oldAPIIcon && icon"></span>
            </ng-container>
          </span>
        </ng-template>
        <ng-template [ngIf]="showProcessDot">
          <span class="ant-steps-icon">
            <ng-template #processDotTemplate>
              <span class="ant-steps-icon-dot"></span>
            </ng-template>
            <ng-template
              [ngTemplateOutlet]="customProcessTemplate || processDotTemplate"
              [ngTemplateOutletContext]="{
                $implicit: processDotTemplate,
                status: nzStatus,
                index: index
              }"
            ></ng-template>
          </span>
        </ng-template>
      </div>
      <div class="ant-steps-item-content">
        <div class="ant-steps-item-title">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          <div *ngIf="nzSubtitle" class="ant-steps-item-subtitle">
            <ng-container *nzStringTemplateOutlet="nzSubtitle">{{ nzSubtitle }}</ng-container>
          </div>
        </div>
        <div class="ant-steps-item-description">
          <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'ant-steps-item',
    '[class.ant-steps-item-wait]': 'nzStatus === "wait"',
    '[class.ant-steps-item-process]': 'nzStatus === "process"',
    '[class.ant-steps-item-finish]': 'nzStatus === "finish"',
    '[class.ant-steps-item-error]': 'nzStatus === "error"',
    '[class.ant-steps-item-active]': 'currentIndex === index',
    '[class.ant-steps-item-disabled]': 'nzDisabled',
    '[class.ant-steps-item-custom]': '!!nzIcon',
    '[class.ant-steps-next-error]': '(outStatus === "error") && (currentIndex === index + 1)'
  },
  providers: [NzDestroyService]
})
export class NzStepComponent implements OnInit {
  static ngAcceptInputType_nzDisabled: BooleanInput;

  @ViewChild('processDotTemplate', { static: false }) processDotTemplate?: TemplateRef<void>;
  @ViewChild('itemContainer', { static: true }) itemContainer!: ElementRef<HTMLElement>;

  @Input() nzTitle?: string | TemplateRef<void>;
  @Input() nzSubtitle?: string | TemplateRef<void>;
  @Input() nzDescription?: string | TemplateRef<void>;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() nzPercentage: number | null = null;
  @Input() nzSize: NzSizeDSType = 'default';

  @Input()
  get nzStatus(): string {
    return this._status;
  }

  set nzStatus(status: string) {
    this._status = status;
    this.isCustomStatus = true;
  }

  isCustomStatus = false;
  private _status = 'wait';

  @Input()
  get nzIcon(): NgClassType | TemplateRef<void> | undefined {
    return this._icon;
  }

  set nzIcon(value: NgClassType | TemplateRef<void> | undefined) {
    if (!(value instanceof TemplateRef)) {
      this.oldAPIIcon = typeof value === 'string' && value.indexOf('anticon') > -1;
    } else {
    }
    this._icon = value;
  }

  oldAPIIcon = true;
  private _icon?: NgClassType | TemplateRef<void>;

  customProcessTemplate?: TemplateRef<{ $implicit: TemplateRef<void>; status: string; index: number }>; // Set by parent.
  direction = 'horizontal';
  index = 0;
  last = false;
  outStatus = 'process';
  showProcessDot = false;
  clickable = false;

  clickOutsideAngular$ = new Subject<number>();

  readonly nullProcessFormat: NzProgressFormatter = () => null;

  get showProgress(): boolean {
    return (
      this.nzPercentage !== null &&
      !this.nzIcon &&
      this.nzStatus === 'process' &&
      this.nzPercentage >= 0 &&
      this.nzPercentage <= 100
    );
  }

  get currentIndex(): number {
    return this._currentIndex;
  }

  set currentIndex(current: number) {
    this._currentIndex = current;
    if (!this.isCustomStatus) {
      this._status = current > this.index ? 'finish' : current === this.index ? this.outStatus || '' : 'wait';
    }
  }

  private _currentIndex = 0;

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone, private destroy$: NzDestroyService) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() =>
      fromEvent(this.itemContainer.nativeElement, 'click')
        .pipe(
          filter(() => this.clickable && this.currentIndex !== this.index && !this.nzDisabled),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.clickOutsideAngular$.next(this.index);
        })
    );
  }

  enable(): void {
    this.nzDisabled = false;
    this.cdr.markForCheck();
  }

  disable(): void {
    this.nzDisabled = true;
    this.cdr.markForCheck();
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }
}
