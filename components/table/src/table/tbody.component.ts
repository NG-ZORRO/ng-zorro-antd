/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */

import { ChangeDetectionStrategy, Component, OnDestroy, Optional, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzTableService } from '../table.service';

@Component({
  selector: 'tbody',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <tr
      nz-table-measure-row
      *ngIf="isInsideTable && (listOfMeasureColumn$ | async)!.length"
      [listOfMeasureColumn]="listOfMeasureColumn$ | async"
      (listOfAutoWidth)="onListOfAutoWidthChange($event)"
    ></tr>
    <ng-content></ng-content>
    <tr
      nz-table-placeholder
      *ngIf="showEmpty$ | async"
      [contentTemplate]="emptyTemplate"
      [colspan]="columnCount$ | async"
      [enableAutoMeasure]="enableAutoMeasure$ | async"
      [hostWidth]="hostWidth$ | async"
    ></tr>
    <ng-template #emptyTemplate>
      <nz-embed-empty nzComponentName="table" [specificContent]="noResult$ | async"></nz-embed-empty
    ></ng-template>
  `,
  host: {
    '[class.ant-table-tbody]': 'isInsideTable'
  }
})
export class NzTbodyComponent implements OnDestroy {
  isInsideTable = false;
  hostWidth$ = new BehaviorSubject<number | null>(null);
  columnCount$ = new BehaviorSubject<number | null>(null);
  showEmpty$ = new BehaviorSubject<boolean>(false);
  noResult$ = new BehaviorSubject<string | TemplateRef<NzSafeAny> | undefined>(undefined);
  listOfMeasureColumn$ = new BehaviorSubject<string[]>([]);
  enableAutoMeasure$ = new BehaviorSubject<boolean>(false);
  private destroy$ = new Subject<void>();

  constructor(@Optional() private nzTableService: NzTableService) {
    this.isInsideTable = !!this.nzTableService;
    if (this.nzTableService) {
      const { showEmpty$, noResult$, listOfMeasureColumn$, columnCount$, enableAutoMeasure$, hostWidth$ } = this.nzTableService;
      noResult$.pipe(takeUntil(this.destroy$)).subscribe(this.noResult$);
      enableAutoMeasure$.pipe(takeUntil(this.destroy$)).subscribe(this.enableAutoMeasure$);
      hostWidth$.pipe(takeUntil(this.destroy$)).subscribe(this.hostWidth$);
      columnCount$.pipe(takeUntil(this.destroy$)).subscribe(this.columnCount$);
      listOfMeasureColumn$.pipe(takeUntil(this.destroy$)).subscribe(this.listOfMeasureColumn$);
      showEmpty$.pipe(takeUntil(this.destroy$)).subscribe(this.showEmpty$);
    }
  }

  onListOfAutoWidthChange(listOfAutoWidth: number[]): void {
    this.nzTableService.setListOfAutoWidth(listOfAutoWidth);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
