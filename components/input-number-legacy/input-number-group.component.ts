/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
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
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
  inject
} from '@angular/core';
import { Subject, merge } from 'rxjs';
import { distinctUntilChanged, map, mergeMap, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { NzFormItemFeedbackIconComponent, NzFormNoStatusService, NzFormStatusService } from 'ng-zorro-antd/core/form';
import { NgClassInterface, NzSizeLDSType, NzStatus, NzValidateStatus } from 'ng-zorro-antd/core/types';
import { getStatusClassNames } from 'ng-zorro-antd/core/util';
import { NZ_SPACE_COMPACT_ITEM_TYPE, NzSpaceCompactItemDirective } from 'ng-zorro-antd/space';

import { NzInputNumberGroupSlotComponent } from './input-number-group-slot.component';
import { NzInputNumberLegacyComponent } from './input-number.component';

/**
 * @deprecated Will be removed in v21. It is recommended to use the new version `<nz-input-number>`.
 */
@Directive({
  selector: `nz-input-number-group[nzSuffix], nz-input-number-group[nzPrefix]`
})
export class NzInputNumberGroupWhitSuffixOrPrefixDirective {
  constructor(public elementRef: ElementRef) {}
}

/**
 * @deprecated Will be removed in v21. It is recommended to use the new version `<nz-input-number>`.
 */
@Component({
  selector: 'nz-input-number-group',
  exportAs: 'nzInputNumberGroup',
  imports: [NzInputNumberGroupSlotComponent, NgTemplateOutlet, NzFormItemFeedbackIconComponent],
  template: `
    @if (isAddOn) {
      <span class="ant-input-number-wrapper ant-input-number-group">
        @if (nzAddOnBefore || nzAddOnBeforeIcon) {
          <div nz-input-number-group-slot type="addon" [icon]="nzAddOnBeforeIcon" [template]="nzAddOnBefore"></div>
        }

        @if (isAffix || hasFeedback) {
          <div
            class="ant-input-number-affix-wrapper"
            [class.ant-input-number-affix-wrapper-disabled]="disabled"
            [class.ant-input-number-affix-wrapper-sm]="isSmall"
            [class.ant-input-number-affix-wrapper-lg]="isLarge"
            [class.ant-input-number-affix-wrapper-focused]="focused"
            [class]="affixInGroupStatusCls"
          >
            <ng-template [ngTemplateOutlet]="affixTemplate"></ng-template>
          </div>
        } @else {
          <ng-template [ngTemplateOutlet]="contentTemplate" />
        }

        @if (nzAddOnAfter || nzAddOnAfterIcon) {
          <span nz-input-number-group-slot type="addon" [icon]="nzAddOnAfterIcon" [template]="nzAddOnAfter"></span>
        }
      </span>
    } @else {
      @if (isAffix) {
        <ng-template [ngTemplateOutlet]="affixTemplate" />
      } @else {
        <ng-template [ngTemplateOutlet]="contentTemplate" />
      }
    }

    <!-- Affix Template -->
    <ng-template #affixTemplate>
      @if (nzPrefix || nzPrefixIcon) {
        <span nz-input-number-group-slot type="prefix" [icon]="nzPrefixIcon" [template]="nzPrefix"></span>
      }
      <ng-template [ngTemplateOutlet]="contentTemplate" />
      @if (nzSuffix || nzSuffixIcon || isFeedback) {
        <span nz-input-number-group-slot type="suffix" [icon]="nzSuffixIcon" [template]="nzSuffix">
          @if (isFeedback) {
            <nz-form-item-feedback-icon [status]="status" />
          }
        </span>
      }
    </ng-template>

    <!-- Content Template -->
    <ng-template #contentTemplate>
      <ng-content />
      @if (!isAddOn && !isAffix && isFeedback) {
        <span nz-input-number-group-slot type="suffix">
          @if (isFeedback) {
            <nz-form-item-feedback-icon [status]="status" />
          }
        </span>
      }
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NzFormNoStatusService, { provide: NZ_SPACE_COMPACT_ITEM_TYPE, useValue: 'input-number' }],
  host: {
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
  },
  hostDirectives: [NzSpaceCompactItemDirective]
})
export class NzInputNumberGroupComponent implements AfterContentInit, OnChanges, OnInit, OnDestroy {
  @ContentChildren(NzInputNumberLegacyComponent, { descendants: true })
  listOfNzInputNumberComponent!: QueryList<NzInputNumberLegacyComponent>;
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
  private nzFormStatusService = inject(NzFormStatusService, { optional: true });
  private nzFormNoStatusService = inject(NzFormNoStatusService, { optional: true });

  constructor(
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private directionality: Directionality
  ) {}

  updateChildrenInputSize(): void {
    if (this.listOfNzInputNumberComponent) {
      this.listOfNzInputNumberComponent.forEach(item => item['size'].set(this.nzSize));
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
          merge(...[listOfInputChange$, ...list.map((input: NzInputNumberLegacyComponent) => input.disabled$)])
        ),
        mergeMap(() => listOfInputChange$),
        map(list => list.some((input: NzInputNumberLegacyComponent) => input.nzDisabled)),
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
