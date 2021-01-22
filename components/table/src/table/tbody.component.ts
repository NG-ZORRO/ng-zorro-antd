/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */

import { ChangeDetectionStrategy, Component, Optional, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { BehaviorSubject } from 'rxjs';
import { NzTableStyleService } from '../table-style.service';

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
  }
})
export class NzTbodyComponent {
  isInsideTable = false;
  showEmpty$ = new BehaviorSubject<boolean>(false);
  noResult$ = new BehaviorSubject<string | TemplateRef<NzSafeAny> | undefined>(undefined);
  listOfMeasureColumn$ = new BehaviorSubject<ReadonlyArray<string>>([]);

  constructor(@Optional() private nzTableStyleService: NzTableStyleService) {
    this.isInsideTable = !!this.nzTableStyleService;
    if (this.nzTableStyleService) {
      const { showEmpty$, noResult$, listOfMeasureColumn$ } = this.nzTableStyleService;
      noResult$.subscribe(this.noResult$);
      listOfMeasureColumn$.subscribe(this.listOfMeasureColumn$);
      showEmpty$.subscribe(this.showEmpty$);
    }
  }

  onListOfAutoWidthChange(listOfAutoWidth: number[]): void {
    this.nzTableStyleService.setListOfAutoWidth(listOfAutoWidth);
  }
}
