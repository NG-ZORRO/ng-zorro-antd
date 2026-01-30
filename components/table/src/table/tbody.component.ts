/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/* eslint-disable @angular-eslint/component-selector */

import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, ViewEncapsulation, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

import { NzTableStyleService } from '../table-style.service';
import { NzTableFixedRowComponent } from './table-fixed-row.component';
import { NzTrMeasureComponent } from './tr-measure.component';

@Component({
  selector: 'tbody',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (listOfMeasureColumn$ | async; as listOfMeasureColumn) {
      @if (isInsideTable && listOfMeasureColumn.length) {
        <tr
          nz-table-measure-row
          [listOfMeasureColumn]="listOfMeasureColumn"
          (listOfAutoWidth)="onListOfAutoWidthChange($event)"
        ></tr>
      }
    }
    <ng-content />
    @if (showEmpty$ | async) {
      <tr class="ant-table-placeholder" nz-table-fixed-row>
        <nz-embed-empty nzComponentName="table" [specificContent]="(noResult$ | async)!" />
      </tr>
    }
  `,
  host: {
    '[class.ant-table-tbody]': 'isInsideTable'
  },
  imports: [AsyncPipe, NzTrMeasureComponent, NzTableFixedRowComponent, NzEmptyModule]
})
export class NzTbodyComponent {
  showEmpty$ = new BehaviorSubject<boolean>(false);
  noResult$ = new BehaviorSubject<string | TemplateRef<NzSafeAny> | undefined>(undefined);
  listOfMeasureColumn$ = new BehaviorSubject<readonly string[]>([]);
  private nzTableStyleService = inject(NzTableStyleService, { optional: true });
  isInsideTable = !!this.nzTableStyleService;

  constructor() {
    if (this.nzTableStyleService) {
      const { showEmpty$, noResult$, listOfMeasureColumn$ } = this.nzTableStyleService;
      noResult$.pipe(takeUntilDestroyed()).subscribe(this.noResult$);
      listOfMeasureColumn$.pipe(takeUntilDestroyed()).subscribe(this.listOfMeasureColumn$);
      showEmpty$.pipe(takeUntilDestroyed()).subscribe(this.showEmpty$);
    }
  }

  onListOfAutoWidthChange(listOfAutoWidth: number[]): void {
    this.nzTableStyleService?.setListOfAutoWidth(listOfAutoWidth);
  }
}
