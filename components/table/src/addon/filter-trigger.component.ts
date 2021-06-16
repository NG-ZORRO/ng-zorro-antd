/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { warnDeprecation } from 'ng-zorro-antd/core/logger';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'nz-filter-trigger',
  exportAs: `nzFilterTrigger`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span
      nz-dropdown
      class="ant-table-filter-trigger"
      nzTrigger="click"
      nzPlacement="bottomRight"
      [nzBackdrop]="nzBackdrop || nzHasBackdrop"
      [nzClickHide]="false"
      [nzDropdownMenu]="nzDropdownMenu"
      [class.active]="nzActive"
      [class.ant-table-filter-open]="nzVisible"
      [nzVisible]="nzVisible"
      (nzVisibleChange)="onVisibleChange($event)"
      (click)="onFilterClick($event)"
    >
      <ng-content></ng-content>
    </span>
  `
})
export class NzFilterTriggerComponent implements OnChanges {
  static ngAcceptInputType_nzBackdrop: BooleanInput;
  static ngAcceptInputType_nzHasBackdrop: BooleanInput;

  @Input() nzActive = false;
  @Input() nzDropdownMenu!: NzDropdownMenuComponent;
  @Input() nzVisible = false;

  /**
   * @deprecated Not supported, use `nzBackdrop` instead.
   * @breaking-change 13.0.0
   */
  @Input() @InputBoolean() nzHasBackdrop = false;
  @Input() @InputBoolean() nzBackdrop = false;

  @Output() readonly nzVisibleChange = new EventEmitter<boolean>();

  onVisibleChange(visible: boolean): void {
    this.nzVisible = visible;
    this.nzVisibleChange.next(visible);
  }

  onFilterClick($event: MouseEvent): void {
    $event.stopPropagation();
  }

  hide(): void {
    this.nzVisible = false;
    this.cdr.markForCheck();
  }

  show(): void {
    this.nzVisible = true;
    this.cdr.markForCheck();
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { nzHasBackdrop } = changes;
    if (nzHasBackdrop) {
      warnDeprecation(
        '`nzHasBackdrop` in nz-filter-trigger component will be removed in 13.0.0, please use `nzBackdrop` instead.'
      );
    }
  }
}
