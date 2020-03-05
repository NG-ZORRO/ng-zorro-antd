/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, Optional, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzTableService } from './table.service';

@Component({
  selector: 'tbody',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <tr
      nz-table-measure-row
      *ngIf="isInsideTable && listOfMeasureWidth.length"
      [listOfMeasureWidth]="listOfMeasureWidth"
      (listOfAutoWidth)="onListOfAutoWidthChange($event)"
    ></tr>
    <ng-content></ng-content>
  `,
  host: {
    '[class.ant-table-tbody]': 'isInsideTable'
  }
})
export class NzTbodyComponent implements OnDestroy {
  isInsideTable = false;
  listOfMeasureWidth: string[] = [];
  private destroy$ = new Subject<void>();

  constructor(@Optional() private nzTableService: NzTableService, private cdr: ChangeDetectorRef) {
    this.isInsideTable = !!this.nzTableService;
    this.nzTableService.listOfMeasureColumn$.pipe(takeUntil(this.destroy$)).subscribe(list => {
      this.listOfMeasureWidth = list;
      this.cdr.markForCheck();
    });
  }

  onListOfAutoWidthChange(listOfAutoWidth: number[]): void {
    this.nzTableService.setListOfAutoWidth(listOfAutoWidth);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
