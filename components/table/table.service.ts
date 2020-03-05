/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { NzThComponent } from './th.component';

@Injectable()
export class NzTableService {
  listOfThWidthConfig$ = new BehaviorSubject<string[]>([]);
  listOfMeasureColumn$ = new ReplaySubject<string[]>(1);
  listOfAutoWidth$ = new ReplaySubject<number[]>(1);
  isFixedHeader$ = new ReplaySubject<boolean>(1);

  setListOfThWidthConfig(listOfTh: NzThComponent[]): void {
    this.listOfThWidthConfig$.next(listOfTh.map(item => item.nzWidth));
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
    this.listOfAutoWidth$.next(listOfAutoWidth);
  }
  setFixHeader(isFixedHeader: boolean): void {
    this.isFixedHeader$.next(isFixedHeader);
  }

  constructor() {}
}
