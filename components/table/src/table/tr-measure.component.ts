/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { NzResizeObserver } from 'ng-zorro-antd/core/resize-observers';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, map, startWith, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tr[nz-table-measure-row]',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <td
      #tdElement
      class="nz-disable-td"
      style="padding: 0px; border: 0px; height: 0px;"
      *ngFor="let th of listOfMeasureColumn; trackBy: trackByFunc"
    ></td>
  `
})
export class NzTrMeasureComponent implements AfterViewInit, OnDestroy {
  @Input() listOfMeasureColumn: ReadonlyArray<string> = [];
  @Output() readonly listOfAutoWidth = new EventEmitter<number[]>();
  @ViewChildren('tdElement') listOfTdElement!: QueryList<ElementRef>;
  private destroy$ = new Subject();
  constructor(private nzResizeObserver: NzResizeObserver, private ngZone: NgZone, private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('ant-table-measure-now');
  }
  trackByFunc(_: number, key: string): string {
    return key;
  }
  ngAfterViewInit(): void {
    this.listOfTdElement.changes
      .pipe(startWith(this.listOfTdElement))
      .pipe(
        switchMap(list => {
          return combineLatest(
            list.toArray().map((item: ElementRef) => {
              return this.nzResizeObserver.observe(item).pipe(
                map(([entry]) => {
                  const { width } = entry.target.getBoundingClientRect();
                  return Math.floor(width);
                })
              );
            })
          ) as Observable<number[]>;
        }),
        debounceTime(16),
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        this.ngZone.run(() => {
          this.listOfAutoWidth.next(data);
        });
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
