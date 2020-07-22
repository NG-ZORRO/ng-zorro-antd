/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
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
  `,
  host: {
    '[class.ant-table-filter-trigger-container]': 'true',
    '[class.ant-table-filter-trigger-container-open]': 'nzVisible'
  }
})
export class NzFilterTriggerComponent {
  @Input() nzActive = false;
  @Input() nzDropdownMenu!: NzDropdownMenuComponent;
  @Input() nzVisible = false;
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
}
