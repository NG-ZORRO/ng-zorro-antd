/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  Output,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';

import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';

@Component({
  selector: 'tr[nz-table-measure-row]',
  encapsulation: ViewEncapsulation.None,
  template: `
    @for (th of listOfMeasureColumn; track $index) {
      <td #tdElement class="nz-disable-td" style="padding: 0; border: 0; height: 0;"></td>
    }
  `,
  host: {
    class: 'ant-table-measure-now'
  }
})
export class NzTrMeasureComponent implements AfterViewInit {
  private nzResizeObserver = inject(NzResizeObserver);
  private ngZone = inject(NgZone);
  private destroyRef = inject(DestroyRef);

  @Input() listOfMeasureColumn: readonly string[] = [];
  @Output() readonly listOfAutoWidth = new EventEmitter<number[]>();
  @ViewChildren('tdElement') listOfTdElement!: QueryList<ElementRef>;

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
                    /**
                     * https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentRect
                     * contentRect measures only the inner content area of an element (excluding padding and borders)
                     * means it's not impacted by ancestor CSS transforms (e.g. a modal's open animation)
                     */
                    const { width } = entry.contentRect;
                    return Math.floor(width);
                  })
                )
              )
            ) as Observable<number[]>
        ),
        debounceTime(16),
        takeUntilDestroyed(this.destroyRef)
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
}
