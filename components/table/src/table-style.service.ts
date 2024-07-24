/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzThMeasureDirective } from './cell/th-measure.directive';
import { NzTableSummaryFixedType } from './table.types';

@Injectable()
export class NzTableStyleService {
  theadTemplate$ = new ReplaySubject<TemplateRef<NzSafeAny>>(1);
  tfootTemplate$ = new ReplaySubject<TemplateRef<NzSafeAny>>(1);
  tfootFixed$ = new ReplaySubject<NzTableSummaryFixedType | null>(1);
  hasFixLeft$ = new ReplaySubject<boolean>(1);
  hasFixRight$ = new ReplaySubject<boolean>(1);
  hostWidth$ = new ReplaySubject<number>(1);
  columnCount$ = new ReplaySubject<number>(1);
  showEmpty$ = new ReplaySubject<boolean>(1);
  noResult$ = new ReplaySubject<string | TemplateRef<NzSafeAny> | undefined>(1);
  private listOfThWidthConfigPx$ = new BehaviorSubject<ReadonlyArray<string | null>>([]);
  private tableWidthConfigPx$ = new BehaviorSubject<ReadonlyArray<string | null>>([]);
  manualWidthConfigPx$ = combineLatest([this.tableWidthConfigPx$, this.listOfThWidthConfigPx$]).pipe(
    map(([widthConfig, listOfWidth]) => (widthConfig.length ? widthConfig : listOfWidth))
  );
  private listOfAutoWidthPx$ = new ReplaySubject<readonly string[]>(1);
  listOfListOfThWidthPx$ = merge(
    /** init with manual width **/
    this.manualWidthConfigPx$,
    combineLatest([this.listOfAutoWidthPx$, this.manualWidthConfigPx$]).pipe(
      map(([autoWidth, manualWidth]) => {
        /** use autoWidth until column length match **/
        if (autoWidth.length === manualWidth.length) {
          return autoWidth.map((width, index) => {
            if (width === '0px') {
              return manualWidth[index] || null;
            } else {
              return manualWidth[index] || width;
            }
          });
        } else {
          return manualWidth;
        }
      })
    )
  );
  listOfMeasureColumn$ = new ReplaySubject<readonly string[]>(1);
  listOfListOfThWidth$ = this.listOfAutoWidthPx$.pipe(map(list => list.map(width => parseInt(width, 10))));
  enableAutoMeasure$ = new ReplaySubject<boolean>(1);

  setTheadTemplate(template: TemplateRef<NzSafeAny>): void {
    this.theadTemplate$.next(template);
  }

  setTfootTemplate(template: TemplateRef<NzSafeAny>): void {
    this.tfootTemplate$.next(template);
  }

  setTfootFixed(fixed: NzTableSummaryFixedType | null): void {
    this.tfootFixed$.next(fixed);
  }

  setHasFixLeft(hasFixLeft: boolean): void {
    this.hasFixLeft$.next(hasFixLeft);
  }

  setHasFixRight(hasFixRight: boolean): void {
    this.hasFixRight$.next(hasFixRight);
  }

  setTableWidthConfig(widthConfig: ReadonlyArray<string | null>): void {
    this.tableWidthConfigPx$.next(widthConfig);
  }

  setListOfTh(listOfTh: readonly NzThMeasureDirective[]): void {
    let columnCount = 0;
    listOfTh.forEach(th => {
      columnCount += (th.colspan && +th.colspan) || (th.colSpan && +th.colSpan) || 1;
    });
    const listOfThPx = listOfTh.map(item => item.nzWidth);
    this.columnCount$.next(columnCount);
    this.listOfThWidthConfigPx$.next(listOfThPx);
  }

  setListOfMeasureColumn(listOfTh: readonly NzThMeasureDirective[]): void {
    const listOfKeys: string[] = [];
    listOfTh.forEach(th => {
      const length = (th.colspan && +th.colspan) || (th.colSpan && +th.colSpan) || 1;
      for (let i = 0; i < length; i++) {
        listOfKeys.push(`measure_key_${i}`);
      }
    });
    this.listOfMeasureColumn$.next(listOfKeys);
  }

  setListOfAutoWidth(listOfAutoWidth: number[]): void {
    this.listOfAutoWidthPx$.next(listOfAutoWidth.map(width => `${width}px`));
  }

  setShowEmpty(showEmpty: boolean): void {
    this.showEmpty$.next(showEmpty);
  }

  setNoResult(noResult: string | TemplateRef<NzSafeAny> | undefined): void {
    this.noResult$.next(noResult);
  }

  setScroll(scrollX: string | null, scrollY: string | null): void {
    const enableAutoMeasure = !!(scrollX || scrollY);
    if (!enableAutoMeasure) {
      this.setListOfAutoWidth([]);
    }
    this.enableAutoMeasure$.next(enableAutoMeasure);
  }
}
