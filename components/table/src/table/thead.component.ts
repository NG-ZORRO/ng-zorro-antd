/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/* eslint-disable @angular-eslint/component-selector */
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  inject,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, Observable, merge, of } from 'rxjs';
import { delay, map, mergeMap, startWith, switchMap } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzThAddOnComponent } from '../cell/th-addon.component';
import { NzTableDataService } from '../table-data.service';
import { NzTableStyleService } from '../table-style.service';
import { NzTrDirective } from './tr.directive';

@Component({
  selector: 'thead:not(.ant-table-thead)',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #contentTemplate>
      <ng-content />
    </ng-template>
    @if (!isInsideTable) {
      <ng-template [ngTemplateOutlet]="contentTemplate" />
    }
  `,
  imports: [NgTemplateOutlet]
})
export class NzTheadComponent<T> implements AfterContentInit, AfterViewInit, OnInit {
  private nzTableStyleService = inject(NzTableStyleService, { optional: true });
  private nzTableDataService: NzTableDataService<T> | null = inject(NzTableDataService, { optional: true });
  private destroyRef = inject(DestroyRef);
  private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  private renderer = inject(Renderer2);

  isInsideTable = !!this.nzTableStyleService;
  @ViewChild('contentTemplate', { static: true }) templateRef!: TemplateRef<NzSafeAny>;
  @ContentChildren(NzTrDirective, { descendants: true }) listOfNzTrDirective!: QueryList<NzTrDirective>;
  @ContentChildren(NzThAddOnComponent, { descendants: true }) listOfNzThAddOnComponent!: QueryList<
    NzThAddOnComponent<T>
  >;
  @Output() readonly nzSortOrderChange = new EventEmitter<{ key: NzSafeAny; value: string | null }>();

  ngOnInit(): void {
    if (this.nzTableStyleService) {
      this.nzTableStyleService.setTheadTemplate(this.templateRef);
    }
  }

  ngAfterContentInit(): void {
    if (this.nzTableStyleService) {
      const firstTableRow$ = this.listOfNzTrDirective.changes.pipe(
        startWith(this.listOfNzTrDirective),
        map(item => item && item.first),
        takeUntilDestroyed(this.destroyRef)
      ) as Observable<NzTrDirective>;
      const listOfColumnsChanges$ = firstTableRow$.pipe(
        switchMap(firstTableRow => (firstTableRow ? firstTableRow.listOfColumnsChanges$ : EMPTY))
      );
      listOfColumnsChanges$.subscribe(data => this.nzTableStyleService!.setListOfTh(data));
      /** TODO: need reset the measure row when scrollX change **/
      this.nzTableStyleService.enableAutoMeasure$
        .pipe(switchMap(enable => (enable ? listOfColumnsChanges$ : of([]))))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(data => this.nzTableStyleService!.setListOfMeasureColumn(data));
      const listOfFixedLeftColumnChanges$ = firstTableRow$.pipe(
        switchMap(firstTr => (firstTr ? firstTr.listOfFixedLeftColumnChanges$ : EMPTY))
      );
      const listOfFixedRightColumnChanges$ = firstTableRow$.pipe(
        switchMap(firstTr => (firstTr ? firstTr.listOfFixedRightColumnChanges$ : EMPTY))
      );
      listOfFixedLeftColumnChanges$.subscribe(listOfFixedLeftColumn => {
        this.nzTableStyleService!.setHasFixLeft(listOfFixedLeftColumn.length !== 0);
      });
      listOfFixedRightColumnChanges$.subscribe(listOfFixedRightColumn => {
        this.nzTableStyleService!.setHasFixRight(listOfFixedRightColumn.length !== 0);
      });
    }

    if (this.nzTableDataService) {
      const listOfColumn$ = this.listOfNzThAddOnComponent.changes.pipe(
        startWith(this.listOfNzThAddOnComponent)
      ) as Observable<QueryList<NzThAddOnComponent<T>>>;
      const manualSort$ = listOfColumn$.pipe(
        switchMap(() => merge(...this.listOfNzThAddOnComponent.map(th => th.manualClickOrder$))),
        takeUntilDestroyed(this.destroyRef)
      );
      manualSort$.subscribe(data => {
        const emitValue = { key: data.nzColumnKey, value: data.sortOrder };
        this.nzSortOrderChange.emit(emitValue);
        if (data.nzSortFn && data.nzSortPriority === false) {
          this.listOfNzThAddOnComponent.filter(th => th !== data).forEach(th => th.clearSortOrder());
        }
      });
      const listOfCalcOperator$ = listOfColumn$.pipe(
        switchMap(list =>
          merge(listOfColumn$, ...list.map(c => c.calcOperatorChange$)).pipe(mergeMap(() => listOfColumn$))
        ),
        map(list =>
          list
            .filter(item => !!item.nzSortFn || !!item.nzFilterFn)
            .map(item => {
              const { nzSortFn, sortOrder, nzFilterFn, nzFilterValue, nzSortPriority, nzColumnKey } = item;
              return {
                key: nzColumnKey,
                sortFn: nzSortFn,
                sortPriority: nzSortPriority,
                sortOrder: sortOrder!,
                filterFn: nzFilterFn!,
                filterValue: nzFilterValue
              };
            })
        ),
        // TODO: after checked error here
        delay(0),
        takeUntilDestroyed(this.destroyRef)
      );
      listOfCalcOperator$.subscribe(list => {
        this.nzTableDataService?.listOfCalcOperator$.next(list);
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.nzTableStyleService) {
      this.renderer.removeChild(this.renderer.parentNode(this.el), this.el);
    }
  }
}
