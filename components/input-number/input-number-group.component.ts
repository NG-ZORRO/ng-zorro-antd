/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { distinctUntilChanged, map, mergeMap, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { NzFormNoStatusService, NzFormStatusService } from 'ng-zorro-antd/core/form';
import { BooleanInput, NgClassInterface, NzSizeLDSType, NzStatus, NzValidateStatus } from 'ng-zorro-antd/core/types';
import { getStatusClassNames, InputBoolean } from 'ng-zorro-antd/core/util';

import { NzInputNumberComponent } from './input-number.component';

@Directive({
  selector: `nz-input-number-group[nzSuffix], nz-input-number-group[nzPrefix]`
})
export class NzInputNumberGroupWhitSuffixOrPrefixDirective {
  constructor(public elementRef: ElementRef) {}
}

@Component({
  selector: 'nz-input-number-group',
  exportAs: 'nzInputNumberGroup',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NzFormNoStatusService],
  template: `
    <span class="ant-input-number-wrapper ant-input-number-group" *ngIf="isAddOn; else noAddOnTemplate">
      <div
        *ngIf="nzAddOnBefore || nzAddOnBeforeIcon"
        nz-input-number-group-slot
        type="addon"
        [icon]="nzAddOnBeforeIcon"
        [template]="nzAddOnBefore"
      ></div>
      <div
        *ngIf="isAffix || hasFeedback; else contentTemplate"
        class="ant-input-number-affix-wrapper"
        [class.ant-input-number-affix-wrapper-disabled]="disabled"
        [class.ant-input-number-affix-wrapper-sm]="isSmall"
        [class.ant-input-number-affix-wrapper-lg]="isLarge"
        [class.ant-input-number-affix-wrapper-focused]="focused"
        [ngClass]="affixInGroupStatusCls"
      >
        <ng-template [ngTemplateOutlet]="affixTemplate"></ng-template>
      </div>
      <span
        *ngIf="nzAddOnAfter || nzAddOnAfterIcon"
        nz-input-number-group-slot
        type="addon"
        [icon]="nzAddOnAfterIcon"
        [template]="nzAddOnAfter"
      ></span>
    </span>
    <ng-template #noAddOnTemplate>
      <ng-template [ngIf]="isAffix" [ngIfElse]="contentTemplate">
        <ng-template [ngTemplateOutlet]="affixTemplate"></ng-template>
      </ng-template>
    </ng-template>
    <ng-template #affixTemplate>
      <span
        *ngIf="nzPrefix || nzPrefixIcon"
        nz-input-number-group-slot
        type="prefix"
        [icon]="nzPrefixIcon"
        [template]="nzPrefix"
      ></span>
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      <span
        *ngIf="nzSuffix || nzSuffixIcon || isFeedback"
        nz-input-number-group-slot
        type="suffix"
        [icon]="nzSuffixIcon"
        [template]="nzSuffix"
      >
        <nz-form-item-feedback-icon *ngIf="isFeedback" [status]="status"></nz-form-item-feedback-icon>
      </span>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
      <span *ngIf="!isAddOn && !isAffix && isFeedback" nz-input-number-group-slot type="suffix">
        <nz-form-item-feedback-icon *ngIf="isFeedback" [status]="status"></nz-form-item-feedback-icon>
      </span>
    </ng-template>
  `,
  host: {
    '[class.ant-input-number-group]': 'nzCompact',
    '[class.ant-input-number-group-compact]': 'nzCompact',
    '[class.ant-input-number-group-wrapper]': `isAddOn`,
    '[class.ant-input-number-group-wrapper-rtl]': `isAddOn && dir === 'rtl'`,
    '[class.ant-input-number-group-wrapper-lg]': `isAddOn && isLarge`,
    '[class.ant-input-number-group-wrapper-sm]': `isAddOn && isSmall`,
    '[class.ant-input-number-affix-wrapper]': `!isAddOn && isAffix`,
    '[class.ant-input-number-affix-wrapper-rtl]': `!isAddOn && dir === 'rtl'`,
    '[class.ant-input-number-affix-wrapper-focused]': `!isAddOn && isAffix && focused`,
    '[class.ant-input-number-affix-wrapper-disabled]': `!isAddOn && isAffix && disabled`,
    '[class.ant-input-number-affix-wrapper-lg]': `!isAddOn && isAffix && isLarge`,
    '[class.ant-input-number-affix-wrapper-sm]': `!isAddOn && isAffix && isSmall`
  }
})
export class NzInputNumberGroupComponent implements AfterContentInit, OnChanges, OnInit, OnDestroy {
  static ngAcceptInputType_nzCompact: BooleanInput;

  @ContentChildren(NzInputNumberComponent, { descendants: true })
  listOfNzInputNumberComponent!: QueryList<NzInputNumberComponent>;
  @Input() nzAddOnBeforeIcon?: string | null = null;
  @Input() nzAddOnAfterIcon?: string | null = null;
  @Input() nzPrefixIcon?: string | null = null;
  @Input() nzSuffixIcon?: string | null = null;
  @Input() nzAddOnBefore?: string | TemplateRef<void>;
  @Input() nzAddOnAfter?: string | TemplateRef<void>;
  @Input() nzPrefix?: string | TemplateRef<void>;
  @Input() nzStatus: NzStatus = '';
  @Input() nzSuffix?: string | TemplateRef<void>;
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() @InputBoolean() nzCompact = false;
  isLarge = false;
  isSmall = false;
  isAffix = false;
  isAddOn = false;
  isFeedback = false;
  focused = false;
  disabled = false;
  dir: Direction = 'ltr';
  // status
  prefixCls: string = 'ant-input-number';
  affixStatusCls: NgClassInterface = {};
  groupStatusCls: NgClassInterface = {};
  affixInGroupStatusCls: NgClassInterface = {};
  status: NzValidateStatus = '';
  hasFeedback: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality,
    @Optional() private nzFormStatusService?: NzFormStatusService,
    @Optional() private nzFormNoStatusService?: NzFormNoStatusService
  ) {}

  updateChildrenInputSize(): void {
    if (this.listOfNzInputNumberComponent) {
      this.listOfNzInputNumberComponent.forEach(item => (item.nzSize = this.nzSize));
    }
  }

  ngOnInit(): void {
    this.nzFormStatusService?.formStatusChanges
      .pipe(
        distinctUntilChanged((pre, cur) => {
          return pre.status === cur.status && pre.hasFeedback === cur.hasFeedback;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(({ status, hasFeedback }) => {
        this.setStatusStyles(status, hasFeedback);
      });

    this.focusMonitor
      .monitor(this.elementRef, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe(focusOrigin => {
        this.focused = !!focusOrigin;
        this.cdr.markForCheck();
      });

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  ngAfterContentInit(): void {
    this.updateChildrenInputSize();
    const listOfInputChange$ = this.listOfNzInputNumberComponent.changes.pipe(
      startWith(this.listOfNzInputNumberComponent)
    );
    listOfInputChange$
      .pipe(
        switchMap(list =>
          merge(...[listOfInputChange$, ...list.map((input: NzInputNumberComponent) => input.disabled$)])
        ),
        mergeMap(() => listOfInputChange$),
        map(list => list.some((input: NzInputNumberComponent) => input.nzDisabled)),
        takeUntil(this.destroy$)
      )
      .subscribe(disabled => {
        this.disabled = disabled;
        this.cdr.markForCheck();
      });
  }
  ngOnChanges(changes: SimpleChanges): void {
    const {
      nzSize,
      nzSuffix,
      nzPrefix,
      nzPrefixIcon,
      nzSuffixIcon,
      nzAddOnAfter,
      nzAddOnBefore,
      nzAddOnAfterIcon,
      nzAddOnBeforeIcon,
      nzStatus
    } = changes;
    if (nzSize) {
      this.updateChildrenInputSize();
      this.isLarge = this.nzSize === 'large';
      this.isSmall = this.nzSize === 'small';
    }
    if (nzSuffix || nzPrefix || nzPrefixIcon || nzSuffixIcon) {
      this.isAffix = !!(this.nzSuffix || this.nzPrefix || this.nzPrefixIcon || this.nzSuffixIcon);
    }
    if (nzAddOnAfter || nzAddOnBefore || nzAddOnAfterIcon || nzAddOnBeforeIcon) {
      this.isAddOn = !!(this.nzAddOnAfter || this.nzAddOnBefore || this.nzAddOnAfterIcon || this.nzAddOnBeforeIcon);
      this.nzFormNoStatusService?.noFormStatus?.next(this.isAddOn);
    }
    if (nzStatus) {
      this.setStatusStyles(this.nzStatus, this.hasFeedback);
    }
  }
  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef);
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setStatusStyles(status: NzValidateStatus, hasFeedback: boolean): void {
    // set inner status
    this.status = status;
    this.hasFeedback = hasFeedback;
    this.isFeedback = !!status && hasFeedback;
    const baseAffix = !!(this.nzSuffix || this.nzPrefix || this.nzPrefixIcon || this.nzSuffixIcon);
    this.isAffix = baseAffix || (!this.isAddOn && hasFeedback);
    this.affixInGroupStatusCls =
      this.isAffix || this.isFeedback
        ? (this.affixStatusCls = getStatusClassNames(`${this.prefixCls}-affix-wrapper`, status, hasFeedback))
        : {};
    this.cdr.markForCheck();
    // render status if nzStatus is set
    this.affixStatusCls = getStatusClassNames(
      `${this.prefixCls}-affix-wrapper`,
      this.isAddOn ? '' : status,
      this.isAddOn ? false : hasFeedback
    );
    this.groupStatusCls = getStatusClassNames(
      `${this.prefixCls}-group-wrapper`,
      this.isAddOn ? status : '',
      this.isAddOn ? hasFeedback : false
    );
    const statusCls = {
      ...this.affixStatusCls,
      ...this.groupStatusCls
    };
    Object.keys(statusCls).forEach(status => {
      if (statusCls[status]) {
        this.renderer.addClass(this.elementRef.nativeElement, status);
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, status);
      }
    });
  }
}
