/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AfterContentInit, ContentChildren, Directive, OnDestroy, Optional, QueryList } from '@angular/core';
import { combineLatest, merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { flatMap, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { NzCellFixedDirective } from '../cell/cell-fixed.directive';
import { NzThMeasureDirective } from '../cell/th-measure.directive';
import { NzTableStyleService } from '../table-style.service';

@Directive({
  selector: 'tr:not([mat-row]):not([mat-header-row]):not([nz-table-measure-row]):not([nzExpand]):not([nz-table-fixed-row])',
  host: {
    '[class.ant-table-row]': 'isInsideTable'
  }
})
export class NzTrDirective implements AfterContentInit, OnDestroy {
  @ContentChildren(NzThMeasureDirective) listOfNzThDirective!: QueryList<NzThMeasureDirective>;
  @ContentChildren(NzCellFixedDirective) listOfCellFixedDirective!: QueryList<NzCellFixedDirective>;
  private destroy$ = new Subject<void>();
  private listOfFixedColumns$ = new ReplaySubject<NzCellFixedDirective[]>(1);
  private listOfColumns$ = new ReplaySubject<NzThMeasureDirective[]>(1);
  listOfFixedColumnsChanges$: Observable<NzCellFixedDirective[]> = this.listOfFixedColumns$.pipe(
    switchMap(list =>
      merge(...[this.listOfFixedColumns$, ...list.map((c: NzCellFixedDirective) => c.changes$)]).pipe(
        flatMap(() => this.listOfFixedColumns$)
      )
    ),
    takeUntil(this.destroy$)
  );
  listOfFixedLeftColumnChanges$ = this.listOfFixedColumnsChanges$.pipe(map(list => list.filter(item => item.nzLeft !== false)));
  listOfFixedRightColumnChanges$ = this.listOfFixedColumnsChanges$.pipe(map(list => list.filter(item => item.nzRight !== false)));
  listOfColumnsChanges$: Observable<NzThMeasureDirective[]> = this.listOfColumns$.pipe(
    switchMap(list =>
      merge(...[this.listOfColumns$, ...list.map((c: NzThMeasureDirective) => c.changes$)]).pipe(flatMap(() => this.listOfColumns$))
    ),
    takeUntil(this.destroy$)
  );
  isInsideTable = false;

  constructor(@Optional() private nzTableStyleService: NzTableStyleService) {
    this.isInsideTable = !!nzTableStyleService;
  }

  ngAfterContentInit(): void {
    if (this.nzTableStyleService) {
      this.listOfCellFixedDirective.changes
        .pipe(startWith(this.listOfCellFixedDirective), takeUntil(this.destroy$))
        .subscribe(this.listOfFixedColumns$);
      this.listOfNzThDirective.changes.pipe(startWith(this.listOfNzThDirective), takeUntil(this.destroy$)).subscribe(this.listOfColumns$);
      /** set last left and first right **/
      this.listOfFixedLeftColumnChanges$.subscribe(listOfFixedLeft => {
        listOfFixedLeft.forEach(cell => cell.setIsLastLeft(cell === listOfFixedLeft[listOfFixedLeft.length - 1]));
      });
      this.listOfFixedRightColumnChanges$.subscribe(listOfFixedRight => {
        listOfFixedRight.forEach(cell => cell.setIsFirstRight(cell === listOfFixedRight[0]));
      });
      /** calculate fixed nzLeft and nzRight **/
      combineLatest([this.nzTableStyleService.listOfListOfThWidth$, this.listOfFixedLeftColumnChanges$]).subscribe(
        ([listOfAutoWidth, listOfLeftCell]) => {
          listOfLeftCell.forEach((cell, index) => {
            if (cell.isAutoLeft) {
              const currentArray = listOfLeftCell.slice(0, index);
              const count = currentArray.reduce((pre, cur) => pre + (cur.colspan || 1), 0);
              const width = listOfAutoWidth.slice(0, count).reduce((pre, cur) => pre + cur, 0);
              cell.setAutoLeftWidth(`${width}px`);
            }
          });
        }
      );
      combineLatest([this.nzTableStyleService.listOfListOfThWidth$, this.listOfFixedRightColumnChanges$]).subscribe(
        ([listOfAutoWidth, listOfRightCell]) => {
          listOfRightCell.forEach((_, index) => {
            const cell = listOfRightCell[listOfRightCell.length - index - 1];
            if (cell.isAutoRight) {
              const currentArray = listOfRightCell.slice(listOfRightCell.length - index, listOfRightCell.length);
              const count = currentArray.reduce((pre, cur) => pre + (cur.colspan || 1), 0);
              const width = listOfAutoWidth
                .slice(listOfAutoWidth.length - count, listOfAutoWidth.length)
                .reduce((pre, cur) => pre + cur, 0);
              cell.setAutoRightWidth(`${width}px`);
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
