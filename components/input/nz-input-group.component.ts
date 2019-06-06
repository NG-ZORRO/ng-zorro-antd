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
  QueryList,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { InputBoolean, NgClassType, NzSizeLDSType } from 'ng-zorro-antd/core';
import { NzInputDirective } from './nz-input.directive';

@Component({
  selector: 'nz-input-group',
  exportAs: 'nzInputGroup',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nz-input-group.component.html',
  host: {
    '[class.ant-input-group-compact]': 'nzCompact',
    '[class.ant-input-search-enter-button]': 'nzSearch',
    '[class.ant-input-search]': 'nzSearch',
    '[class.ant-input-search-sm]': 'isSmallSearch',
    '[class.ant-input-affix-wrapper]': 'isAffixWrapper',
    '[class.ant-input-group-wrapper]': 'isAddOn',
    '[class.ant-input-group]': 'isGroup',
    '[class.ant-input-group-lg]': 'isLargeGroup',
    '[class.ant-input-group-wrapper-lg]': 'isLargeGroupWrapper',
    '[class.ant-input-affix-wrapper-lg]': 'isLargeAffix',
    '[class.ant-input-search-lg]': 'isLargeSearch',
    '[class.ant-input-group-sm]': 'isSmallGroup',
    '[class.ant-input-affix-wrapper-sm]': 'isSmallAffix',
    '[class.ant-input-group-wrapper-sm]': 'isSmallGroupWrapper'
  }
})
export class NzInputGroupComponent implements AfterContentInit {
  @ContentChildren(NzInputDirective) listOfNzInputDirective: QueryList<NzInputDirective>;
  private _size: NzSizeLDSType = 'default';
  @Input() nzAddOnBeforeIcon: NgClassType;
  @Input() nzAddOnAfterIcon: NgClassType;
  @Input() nzPrefixIcon: NgClassType;
  @Input() nzSuffixIcon: NgClassType;
  @Input() nzAddOnBefore: string | TemplateRef<void>;
  @Input() nzAddOnAfter: string | TemplateRef<void>;
  @Input() nzPrefix: string | TemplateRef<void>;
  @Input() nzSuffix: string | TemplateRef<void>;
  @Input() @InputBoolean() nzSearch = false;
  @Input() @InputBoolean() nzCompact = false;

  @Input() set nzSize(value: NzSizeLDSType) {
    this._size = value;
    this.updateChildrenInputSize();
  }

  get nzSize(): NzSizeLDSType {
    return this._size;
  }

  get isLarge(): boolean {
    return this.nzSize === 'large';
  }

  get isSmall(): boolean {
    return this.nzSize === 'small';
  }

  get isAffix(): boolean {
    return !!(this.nzSuffix || this.nzPrefix || this.nzPrefixIcon || this.nzSuffixIcon);
  }

  get isAddOn(): boolean {
    return !!(this.nzAddOnAfter || this.nzAddOnBefore || this.nzAddOnAfterIcon || this.nzAddOnBeforeIcon);
  }

  get isAffixWrapper(): boolean {
    return this.isAffix && !this.isAddOn;
  }

  get isGroup(): boolean {
    return !this.isAffix && !this.isAddOn;
  }

  get isLargeGroup(): boolean {
    return this.isGroup && this.isLarge;
  }

  get isLargeGroupWrapper(): boolean {
    return this.isAddOn && this.isLarge;
  }

  get isLargeAffix(): boolean {
    return this.isAffixWrapper && this.isLarge;
  }

  get isLargeSearch(): boolean {
    return this.nzSearch && this.isLarge;
  }

  get isSmallGroup(): boolean {
    return this.isGroup && this.isSmall;
  }

  get isSmallAffix(): boolean {
    return this.isAffixWrapper && this.isSmall;
  }

  get isSmallGroupWrapper(): boolean {
    return this.isAddOn && this.isSmall;
  }

  get isSmallSearch(): boolean {
    return this.nzSearch && this.isSmall;
  }

  updateChildrenInputSize(): void {
    if (this.listOfNzInputDirective) {
      this.listOfNzInputDirective.forEach(item => (item.nzSize = this.nzSize));
    }
  }

  ngAfterContentInit(): void {
    this.updateChildrenInputSize();
  }
}
