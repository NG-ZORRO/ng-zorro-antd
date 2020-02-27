/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ContentChildren,
  Directive,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { NzFixedLeftCellDirective } from './fixed-left-cell.directive';
import { NzFixedRightCellDirective } from './fixed-right-cell.directive';
import { NzTableComponent } from './table.component';
import { NzThComponent } from './th.component';

@Directive({
  selector: 'tr:not([mat-row]):not([mat-header-row])',
  host: {
    '[class.ant-table-row]': 'isInRow',
    '[class.ant-table-expanded-row]': 'nzExpand',
    '[hidden]': `isExpandSet && nzExpand === false`
  }
})
export class NzTrDirective implements OnChanges, AfterContentInit, OnDestroy {
  @Input() @InputBoolean() nzExpand = false;
  @ContentChildren(NzThComponent) listOfNzThComponent: QueryList<NzThComponent>;
  @ContentChildren(NzFixedLeftCellDirective) listOfLeftCellDirective: QueryList<NzFixedLeftCellDirective>;
  @ContentChildren(NzFixedRightCellDirective) listOfRightCellDirective: QueryList<NzFixedRightCellDirective>;
  private destroy$ = new Subject();
  isInRow = false;
  isExpandSet = false;

  constructor(@Host() @Optional() nzTableComponent: NzTableComponent) {
    this.isInRow = !!nzTableComponent;
  }

  ngAfterContentInit(): void {
    this.listOfLeftCellDirective.changes
      .pipe(startWith(this.listOfLeftCellDirective))
      .subscribe((listOfLeftCell: QueryList<NzFixedLeftCellDirective>) => {
        listOfLeftCell.forEach(cell => {
          cell.setIsLastLeft(cell === listOfLeftCell.last);
        });
      });
    this.listOfRightCellDirective.changes
      .pipe(startWith(this.listOfRightCellDirective))
      .subscribe((listOfRightCell: QueryList<NzFixedRightCellDirective>) => {
        listOfRightCell.forEach(cell => {
          cell.setIsFirstRight(cell === listOfRightCell.last);
        });
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzExpand } = changes;
    if (nzExpand) {
      this.isExpandSet = true;
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
