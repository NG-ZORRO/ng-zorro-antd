/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable, TemplateRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd';
import { BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NzThComponent } from './cell/th.component';

@Injectable()
export class NzTableService {
  hostWidth$ = new ReplaySubject<number>(1);
  columnCount$ = new ReplaySubject<number>(1);
  showEmpty$ = new ReplaySubject<boolean>(1);
  noResult$ = new ReplaySubject<string | TemplateRef<NzSafeAny> | undefined>(1);
  private listOfThWidthConfigPx$ = new BehaviorSubject<Array<string | null>>([]);
  private tableWidthConfigPx$ = new BehaviorSubject<Array<string | null>>([]);
  private manualWidthConfigPx$ = combineLatest([this.tableWidthConfigPx$, this.listOfThWidthConfigPx$]).pipe(
    map(([widthConfig, listOfWidth]) => (widthConfig.length ? widthConfig : listOfWidth))
  );
  private listOfAutoWidthPx$ = new ReplaySubject<string[]>(1);
  listOfListOfThWidthPx$ = combineLatest([this.listOfAutoWidthPx$, this.manualWidthConfigPx$]).pipe(
    map(([autoWidth, manualWidth]) => {
      /** use autoWidth until column length match **/
      return autoWidth.length !== manualWidth.length ? manualWidth : autoWidth;
    })
  );
  listOfMeasureColumn$ = new ReplaySubject<string[]>(1);
  listOfListOfThWidth$ = this.listOfAutoWidthPx$.pipe(map(list => list.map(width => parseInt(width, 10))));
  enableAutoMeasure$ = new ReplaySubject<boolean>(1);

  setTableWidthConfig(widthConfig: Array<string | null>): void {
    this.tableWidthConfigPx$.next(widthConfig);
  }
  setListOfTh(listOfTh: NzThComponent[]): void {
    let columnCount = 0;
    listOfTh.forEach(th => {
      columnCount += th.colspan || 1;
    });
    this.columnCount$.next(columnCount);
    this.listOfThWidthConfigPx$.next(listOfTh.map(item => item.nzWidth));
  }
  setListOfMeasureColumn(listOfTh: NzThComponent[]): void {
    const listOfKeys: string[] = [];
    listOfTh.forEach(th => {
      const length = th.colspan || 1;
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

  constructor() {}
}
