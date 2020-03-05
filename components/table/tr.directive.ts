/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AfterContentInit, ContentChildren, Directive, OnDestroy, Optional, QueryList } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { NzFixedCellDirective } from './fixed-cell.directive';
import { NzTableService } from './table.service';
import { NzThComponent } from './th.component';

@Directive({
  selector: 'tr:not([mat-row]):not([mat-header-row]):not([nz-table-measure-row]):not([nzExpand])',
  host: {
    '[class.ant-table-row]': 'isInsideTable'
  }
})
export class NzTrDirective implements AfterContentInit, OnDestroy {
  @ContentChildren(NzThComponent) listOfNzThComponent: QueryList<NzThComponent>;
  @ContentChildren(NzFixedCellDirective) listOfCellFixedDirective: QueryList<NzFixedCellDirective>;
  private destroy$ = new Subject();
  isInsideTable = false;

  constructor(@Optional() private nzTableService: NzTableService) {
    this.isInsideTable = !!nzTableService;
  }

  ngAfterContentInit(): void {
    if (this.nzTableService) {
      const listOfFixedColumns$ = this.listOfCellFixedDirective.changes.pipe(
        startWith(this.listOfCellFixedDirective),
        takeUntil(this.destroy$)
      ) as Observable<QueryList<NzFixedCellDirective>>;
      const listOfFixedLeftColumn$ = listOfFixedColumns$.pipe(map(list => list.filter(item => item.nzLeft !== null)));
      const listOfFixedRightColumn$ = listOfFixedColumns$.pipe(map(list => list.filter(item => item.nzRight !== null)));
      listOfFixedLeftColumn$.subscribe(listOfFixedLeft => {
        listOfFixedLeft.forEach(cell => {
          cell.setIsLastLeft(cell === listOfFixedLeft[listOfFixedLeft.length - 1]);
        });
      });
      listOfFixedRightColumn$.subscribe(listOfFixedRight => {
        listOfFixedRight.forEach(cell => {
          cell.setIsFirstRight(cell === listOfFixedRight[0]);
        });
      });
      combineLatest([this.nzTableService.listOfAutoWidth$, listOfFixedLeftColumn$, listOfFixedRightColumn$]).subscribe(
        ([listOfAutoWidth, listOfLeftCell, listOfRightCell]) => {
          listOfRightCell.forEach((_, index) => {
            const cell = listOfRightCell[listOfRightCell.length - index - 1];
            if (cell.nzRight === '') {
              const currentArray = listOfRightCell.slice(listOfRightCell.length - index, listOfRightCell.length);
              const count = currentArray.reduce((pre, cur) => pre + (cur.colspan || 1), 0);
              const width = listOfAutoWidth
                .slice(listOfAutoWidth.length - count, listOfAutoWidth.length)
                .reduce((pre, cur) => pre + cur, 0);
              cell.setAutoRightWidth(`${width}px`);
            }
          });
          listOfLeftCell.forEach((cell, index) => {
            if (cell.nzLeft === '') {
              const currentArray = listOfRightCell.slice(0, index);
              const count = currentArray.reduce((pre, cur) => pre + (cur.colspan || 1), 0);
              const width = listOfAutoWidth.slice(0, count).reduce((pre, cur) => pre + cur, 0);
              cell.setAutoLeftWidth(`${width}px`);
            }
          });
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
