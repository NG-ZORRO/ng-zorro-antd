/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  ViewChildren
} from '@angular/core';
import { NzResizeObserver } from 'ng-zorro-antd/core/resize-observers';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { NzTableService } from './table.service';

@Component({
  selector: 'tbody',
  template: `
    <tr class="ant-table-measure-now" *ngIf="isInsideTable && listOfMeasureWidth.length">
      <td #tdElement class="nz-disable-td" style="padding: 0px; border: 0px; height: 0px;" *ngFor="let th of listOfMeasureWidth"></td>
    </tr>
    <ng-content></ng-content>
  `,
  host: {
    '[class.ant-table-tbody]': 'isInsideTable'
  }
})
export class NzTbodyComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChildren('tdElement') listOfTdElement: QueryList<ElementRef>;
  private destroy$ = new Subject();
  isInsideTable = false;
  listOfMeasureWidth: string[] = [];
  constructor(
    @Optional() private nzTableService: NzTableService,
    private nzResizeObserver: NzResizeObserver,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.isInsideTable = !!this.nzTableService;
  }

  ngOnInit(): void {
    if (this.nzTableService) {
      this.nzTableService.listOfMeasureColumn$.pipe(takeUntil(this.destroy$)).subscribe(list => {
        this.listOfMeasureWidth = list;
        this.cdr.markForCheck();
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.nzTableService) {
      const list$ = this.listOfTdElement.changes.pipe(startWith(this.listOfTdElement)).pipe(
        switchMap(list => {
          return combineLatest(
            list.toArray().map((item: ElementRef) =>
              this.nzResizeObserver.observe(item).pipe(
                map(([entry]) => {
                  const { width } = entry.target.getBoundingClientRect();
                  return `${Math.floor(width)}px`;
                }),
                distinctUntilChanged()
              )
            )
          );
        }),
        debounceTime(16)
      ) as Observable<string[]>;
      list$.pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.ngZone.run(() => {
          this.nzTableService.listOfAutoWidth$.next(data);
        });
      });
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
