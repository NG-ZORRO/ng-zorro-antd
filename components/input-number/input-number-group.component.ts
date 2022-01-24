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
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { map, mergeMap, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

import { NzInputNumberComponent } from './input-number.component';

@Component({
  selector: 'nz-input-number-group',
  exportAs: 'nzInputNumberGroup',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ant-input-number-wrapper ant-input-number-group" *ngIf="isAddOn; else noAddOnTemplate">
      <div
        *ngIf="nzAddOnBefore || nzAddOnBeforeIcon"
        nz-input-number-group-slot
        type="addon"
        [icon]="nzAddOnBeforeIcon"
        [template]="nzAddOnBefore"
      >
      </div>
      <div
        *ngIf="isAffix; else contentTemplate"
        class="ant-input-number-affix-wrapper"
        [class.class.ant-input-number-group-wrapper-rtl]="dir === 'rtl'"
        [class.ant-input-number-affix-wrapper-disabled]="disabled"
        [class.ant-input-number-affix-wrapper-focused]="focused"
      >
        <ng-template [ngTemplateOutlet]="affixTemplate"></ng-template>
      </div>
      <div
        *ngIf="nzAddOnAfter || nzAddOnAfterIcon"
        nz-input-number-group-slot
        type="addon"
        [icon]="nzAddOnAfterIcon"
        [template]="nzAddOnAfter"
      >
      </div>
    </div>
    <ng-template #noAddOnTemplate>
      <ng-template [ngIf]="isAffix" [ngIfElse]="contentTemplate">
        <ng-template [ngTemplateOutlet]="affixTemplate"></ng-template>
      </ng-template>
    </ng-template>
    <ng-template #affixTemplate>
      <div
        *ngIf="nzPrefix || nzPrefixIcon"
        nz-input-number-group-slot
        type="prefix"
        [icon]="nzPrefixIcon"
        [template]="nzPrefix"
      >
      </div>
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  host: {
    '[class.ant-input-number-group]': `!isAffix && !isAddOn`,
    '[class.ant-input-number-group-rtl]': `dir === 'rtl'`,
    '[class.ant-input-number-group-wrapper]': `isAddOn`,
    '[class.ant-input-number-group-wrapper-rtl]': `dir === 'rtl'`,
    '[class.ant-input-number-affix-wrapper]': `!isAddOn && isAffix`,
    '[class.ant-input-number-affix-wrapper-disabled]': '!isAddOn && isAffix && disabled',
    '[class.ant-input-number-affix-wrapper-focused]': '!isAddOn && isAffix && focused',
    '[class.ant-input-number-affix-wrapper-rtl]': `dir === 'rtl'`
  }
})
export class NzInputNumberGroupComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  @Input() nzAddOnBeforeIcon: string | null = null;
  @Input() nzAddOnAfterIcon: string | null = null;
  @Input() nzPrefixIcon: string | null = null;
  @Input() nzAddOnBefore?: string | TemplateRef<{}>;
  @Input() nzAddOnAfter?: string | TemplateRef<{}>;
  @Input() nzPrefix?: string | TemplateRef<{}>;
  @Input() nzSize: NzSizeLDSType = 'default';
  @ContentChildren(NzInputNumberComponent) listOfNzInputNumber!: QueryList<NzInputNumberComponent>;
  focused = false;
  disabled = false;
  isAffix = false;
  isAddOn = false;
  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();

  constructor(
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality
  ) {}

  updateChildrenSize(): void {
    if (this.listOfNzInputNumber) {
      this.listOfNzInputNumber.forEach(item => (item.nzSize = this.nzSize));
    }
  }

  ngAfterContentInit(): void {
    this.updateChildrenSize();
    const listOfInputChange$ = this.listOfNzInputNumber.changes.pipe(startWith(this.listOfNzInputNumber));
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

  ngOnInit(): void {
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

  ngOnChanges(changes: SimpleChanges): void {
    const { nzSize, nzPrefix, nzPrefixIcon, nzAddOnAfter, nzAddOnBefore, nzAddOnAfterIcon, nzAddOnBeforeIcon } =
      changes;
    if (nzSize) {
      this.updateChildrenSize();
    }
    if (nzPrefix || nzPrefixIcon) {
      this.isAffix = !!(this.nzPrefix || this.nzPrefixIcon);
    }
    if (nzAddOnAfter || nzAddOnBefore || nzAddOnAfterIcon || nzAddOnBeforeIcon) {
      this.isAddOn = !!(this.nzAddOnAfter || this.nzAddOnBefore || this.nzAddOnAfterIcon || this.nzAddOnBeforeIcon);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
