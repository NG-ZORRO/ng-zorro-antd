/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/* eslint-disable @angular-eslint/component-selector */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, Optional, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

import { NzTableStyleService } from '../table-style.service';
import { NzTableFixedRowComponent } from './table-fixed-row.component';
import { NzTrMeasureComponent } from './tr-measure.component';

@Component({
  selector: 'tbody',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="listOfMeasureColumn$ | async as listOfMeasureColumn">
      <tr
        nz-table-measure-row
        *ngIf="isInsideTable && listOfMeasureColumn.length"
        [listOfMeasureColumn]="listOfMeasureColumn"
        (listOfAutoWidth)="onListOfAutoWidthChange($event)"
      ></tr>
    </ng-container>
    <ng-content></ng-content>
    <tr class="ant-table-placeholder" nz-table-fixed-row *ngIf="showEmpty$ | async">
      <nz-embed-empty nzComponentName="table" [specificContent]="(noResult$ | async)!"></nz-embed-empty>
    </tr>
  `,
  host: {
    '[class.ant-table-tbody]': 'isInsideTable'
  },
  imports: [NgIf, AsyncPipe, NzTrMeasureComponent, NzTableFixedRowComponent, NzEmptyModule],
  standalone: true
})
export class NzTbodyComponent implements OnDestroy {
  isInsideTable = false;
  showEmpty$ = new BehaviorSubject<boolean>(false);
  noResult$ = new BehaviorSubject<string | TemplateRef<NzSafeAny> | undefined>(undefined);
  listOfMeasureColumn$ = new BehaviorSubject<readonly string[]>([]);
  private destroy$ = new Subject<void>();

  constructor(@Optional() private nzTableStyleService: NzTableStyleService) {
    this.isInsideTable = !!this.nzTableStyleService;
    if (this.nzTableStyleService) {
      const { showEmpty$, noResult$, listOfMeasureColumn$ } = this.nzTableStyleService;
      noResult$.pipe(takeUntil(this.destroy$)).subscribe(this.noResult$);
      listOfMeasureColumn$.pipe(takeUntil(this.destroy$)).subscribe(this.listOfMeasureColumn$);
      showEmpty$.pipe(takeUntil(this.destroy$)).subscribe(this.showEmpty$);
    }
  }

  onListOfAutoWidthChange(listOfAutoWidth: number[]): void {
    this.nzTableStyleService.setListOfAutoWidth(listOfAutoWidth);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
