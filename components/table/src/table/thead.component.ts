/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { warnDeprecation } from 'ng-zorro-antd/core/logger';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';

import { InputBoolean } from 'ng-zorro-antd/core/util';
import { EMPTY, merge, Observable, of, Subject } from 'rxjs';
import { delay, flatMap, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
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
      <ng-content></ng-content>
    </ng-template>
    <ng-container *ngIf="!isInsideTable">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </ng-container>
  `
})
export class NzTheadComponent implements AfterContentInit, OnDestroy, AfterViewInit, OnInit, OnChanges {
  static ngAcceptInputType_nzSingleSort: BooleanInput;

  private destroy$ = new Subject<void>();
  isInsideTable = false;
  @ViewChild('contentTemplate', { static: true }) templateRef!: TemplateRef<NzSafeAny>;
  @ContentChildren(NzTrDirective) listOfNzTrDirective!: QueryList<NzTrDirective>;
  @ContentChildren(NzThAddOnComponent, { descendants: true }) listOfNzThAddOnComponent!: QueryList<NzThAddOnComponent>;
  /** @deprecated use nzSortFn and nzSortPriority instead **/
  @Input() @InputBoolean() nzSingleSort = false;
  /** @deprecated use nzSortOrderChange instead **/
  @Output() readonly nzSortChange = new EventEmitter<{ key: NzSafeAny; value: string | null }>();
  @Output() readonly nzSortOrderChange = new EventEmitter<{ key: NzSafeAny; value: string | null }>();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Optional() private nzTableStyleService: NzTableStyleService,
    @Optional() private nzTableDataService: NzTableDataService
  ) {
    this.isInsideTable = !!this.nzTableStyleService;
  }

  ngOnInit(): void {
    if (this.nzTableStyleService) {
      this.nzTableStyleService.setTheadTemplate(this.templateRef);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzSingleSort } = changes;
    if (nzSingleSort) {
      warnDeprecation(
        `'nzSingleSort' is deprecated and will be removed in 10.0.0. Please use 'nzSortFn' and 'nzSortPriority' instead.`
      );
    }
  }

  ngAfterContentInit(): void {
    if (this.nzTableStyleService) {
      const firstTableRow$ = this.listOfNzTrDirective.changes.pipe(
        startWith(this.listOfNzTrDirective),
        map(item => item && item.first)
      ) as Observable<NzTrDirective>;
      const listOfColumnsChanges$ = firstTableRow$.pipe(
        switchMap(firstTableRow => (firstTableRow ? firstTableRow.listOfColumnsChanges$ : EMPTY)),
        takeUntil(this.destroy$)
      );
      listOfColumnsChanges$.subscribe(data => this.nzTableStyleService.setListOfTh(data));
      /** TODO: need reset the measure row when scrollX change **/
      this.nzTableStyleService.enableAutoMeasure$
        .pipe(switchMap(enable => (enable ? listOfColumnsChanges$ : of([]))))
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => this.nzTableStyleService.setListOfMeasureColumn(data));
      const listOfFixedLeftColumnChanges$ = firstTableRow$.pipe(
        switchMap(firstTr => (firstTr ? firstTr.listOfFixedLeftColumnChanges$ : EMPTY)),
        takeUntil(this.destroy$)
      );
      const listOfFixedRightColumnChanges$ = firstTableRow$.pipe(
        switchMap(firstTr => (firstTr ? firstTr.listOfFixedRightColumnChanges$ : EMPTY)),
        takeUntil(this.destroy$)
      );
      listOfFixedLeftColumnChanges$.subscribe(listOfFixedLeftColumn => {
        this.nzTableStyleService.setHasFixLeft(listOfFixedLeftColumn.length !== 0);
      });
      listOfFixedRightColumnChanges$.subscribe(listOfFixedRightColumn => {
        this.nzTableStyleService.setHasFixRight(listOfFixedRightColumn.length !== 0);
      });
    }
    if (this.nzTableDataService) {
      const listOfColumn$ = this.listOfNzThAddOnComponent.changes.pipe(startWith(this.listOfNzThAddOnComponent)) as Observable<
        QueryList<NzThAddOnComponent>
      >;
      const manualSort$ = listOfColumn$.pipe(
        switchMap(() => merge(...this.listOfNzThAddOnComponent.map(th => th.manualClickOrder$))),
        takeUntil(this.destroy$)
      );
      manualSort$.subscribe((data: NzThAddOnComponent) => {
        const emitValue = { key: data.nzColumnKey, value: data.sortOrder };
        this.nzSortChange.emit(emitValue);
        this.nzSortOrderChange.emit(emitValue);
        if (this.nzSingleSort || (data.nzSortFn && data.nzSortPriority === false)) {
          this.listOfNzThAddOnComponent.filter(th => th !== data).forEach(th => th.clearSortOrder());
        }
      });
      const listOfCalcOperator$ = listOfColumn$.pipe(
        switchMap(list =>
          merge(...[listOfColumn$, ...list.map((c: NzThAddOnComponent) => c.calcOperatorChange$)]).pipe(flatMap(() => listOfColumn$))
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
        delay(0)
      );
      listOfCalcOperator$.subscribe(list => {
        this.nzTableDataService.listOfCalcOperator$.next(list);
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.nzTableStyleService) {
      this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
