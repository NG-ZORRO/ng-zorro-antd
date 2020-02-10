/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { InputBoolean, NgClassType, NzSizeLDSType } from 'ng-zorro-antd/core';
import { NzInputDirective } from './input.directive';

@Component({
  selector: 'nz-input-group',
  exportAs: 'nzInputGroup',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="ant-input-wrapper ant-input-group" *ngIf="isAddOn; else noAddOnTemplate">
      <span
        *ngIf="nzAddOnBefore || nzAddOnBeforeIcon"
        nz-input-group-slot
        type="addon"
        [icon]="nzAddOnBeforeIcon"
        [template]="nzAddOnBefore"
      >
      </span>
      <span
        *ngIf="isAffix; else contentTemplate"
        class="ant-input-affix-wrapper"
        [class.ant-input-affix-wrapper-sm]="isSmall"
        [class.ant-input-affix-wrapper-lg]="isLarge"
      >
        <ng-template [ngTemplateOutlet]="affixTemplate"></ng-template>
      </span>
      <span
        *ngIf="nzAddOnAfter || nzAddOnAfterIcon"
        nz-input-group-slot
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
      <span *ngIf="nzPrefix || nzPrefixIcon" nz-input-group-slot type="prefix" [icon]="nzPrefixIcon" [template]="nzPrefix"></span>
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      <span *ngIf="nzSuffix || nzSuffixIcon" nz-input-group-slot type="suffix" [icon]="nzSuffixIcon" [template]="nzSuffix"></span>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  host: {
    '[class.ant-input-group-compact]': `nzCompact`,
    '[class.ant-input-search-enter-button]': `nzSearch`,
    '[class.ant-input-search]': `nzSearch`,
    '[class.ant-input-search-sm]': `nzSearch && isSmall`,
    '[class.ant-input-search-large]': `nzSearch && isLarge`,
    '[class.ant-input-group-wrapper]': `isAddOn`,
    '[class.ant-input-group-wrapper-lg]': `isAddOn && isLarge`,
    '[class.ant-input-group-wrapper-sm]': `isAddOn && isSmall`,
    '[class.ant-input-affix-wrapper]': `isAffix && !isAddOn`,
    '[class.ant-input-affix-wrapper-lg]': `isAffix && !isAddOn && isLarge`,
    '[class.ant-input-affix-wrapper-sm]': `isAffix && !isAddOn && isSmall`,
    '[class.ant-input-group]': `!isAffix && !isAddOn`,
    '[class.ant-input-group-lg]': `!isAffix && !isAddOn && isLarge`,
    '[class.ant-input-group-sm]': `!isAffix && !isAddOn && isSmall`
  }
})
export class NzInputGroupComponent implements AfterContentInit, OnChanges {
  @ContentChildren(NzInputDirective) listOfNzInputDirective: QueryList<NzInputDirective>;
  @Input() nzAddOnBeforeIcon: NgClassType;
  @Input() nzAddOnAfterIcon: NgClassType;
  @Input() nzPrefixIcon: NgClassType;
  @Input() nzSuffixIcon: NgClassType;
  @Input() nzAddOnBefore: string | TemplateRef<void>;
  @Input() nzAddOnAfter: string | TemplateRef<void>;
  @Input() nzPrefix: string | TemplateRef<void>;
  @Input() nzSuffix: string | TemplateRef<void>;
  @Input() nzSize: NzSizeLDSType;
  @Input() @InputBoolean() nzSearch = false;
  @Input() @InputBoolean() nzCompact = false;
  isLarge = false;
  isSmall = false;
  isAffix = false;
  isAddOn = false;

  updateChildrenInputSize(): void {
    if (this.listOfNzInputDirective) {
      this.listOfNzInputDirective.forEach(item => (item.nzSize = this.nzSize));
    }
  }

  ngAfterContentInit(): void {
    this.updateChildrenInputSize();
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
      nzAddOnBeforeIcon
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
    }
  }
}
