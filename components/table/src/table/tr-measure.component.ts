/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/* eslint-disable @angular-eslint/component-selector */

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
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, map, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';

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
  `,
  host: { class: 'ant-table-measure-now' }
})
export class NzTrMeasureComponent implements AfterViewInit, OnDestroy {
  @Input() listOfMeasureColumn: readonly string[] = [];
  @Output() readonly listOfAutoWidth = new EventEmitter<number[]>();
  @ViewChildren('tdElement') listOfTdElement!: QueryList<ElementRef>;
  private destroy$ = new Subject();
  constructor(private nzResizeObserver: NzResizeObserver, private ngZone: NgZone) {}
  trackByFunc(_: number, key: string): string {
    return key;
  }
  ngAfterViewInit(): void {
    this.listOfTdElement.changes
      .pipe(startWith(this.listOfTdElement))
      .pipe(
        switchMap(
          list =>
            combineLatest(
              list.toArray().map((item: ElementRef) =>
                this.nzResizeObserver.observe(item).pipe(
                  map(([entry]) => {
                    const { width } = entry.target.getBoundingClientRect();
                    return Math.floor(width);
                  })
                )
              )
            ) as Observable<number[]>
        ),
        debounceTime(16),
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        // Caretaker note: we don't have to re-enter the Angular zone each time the stream emits.
        // The below check is necessary to be sure that zone is not nooped through `BootstrapOptions`
        // (`bootstrapModule(AppModule, { ngZone: 'noop' }))`. The `ngZone instanceof NgZone` may return
        // `false` if zone is nooped, since `ngZone` will be an instance of the `NoopNgZone`.
        // The `ResizeObserver` might be also patched through `zone.js/dist/zone-patch-resize-observer`,
        // thus calling `ngZone.run` again will cause another change detection.
        if (this.ngZone instanceof NgZone && NgZone.isInAngularZone()) {
          this.listOfAutoWidth.next(data);
        } else {
          this.ngZone.run(() => this.listOfAutoWidth.next(data));
        }
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
