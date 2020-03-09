/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
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
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { InputBoolean } from 'ng-zorro-antd/core';
import { EMPTY, merge, Observable, of, Subject } from 'rxjs';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { NzThComponent } from '../cell/th.component';
import { NzTableService } from '../table.service';
import { NzTableComponent } from './table.component';
import { NzTrDirective } from './tr.directive';

@Component({
  selector: 'thead:not(.ant-table-thead)',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
    <ng-container *ngIf="!isInTable">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </ng-container>
  `
})
export class NzTheadComponent implements AfterContentInit, OnDestroy, AfterViewInit, OnInit {
  private destroy$ = new Subject<void>();
  isInTable = false;
  @ViewChild('contentTemplate', { static: true }) templateRef: TemplateRef<void>;
  @ContentChildren(NzTrDirective) listOfNzTrDirective: QueryList<NzTrDirective>;
  @ContentChildren(NzThComponent, { descendants: true }) listOfNzThComponent: QueryList<NzThComponent>;
  @Input() @InputBoolean() nzSingleSort = false;
  @Output() readonly nzSortChange = new EventEmitter<{ key: string; value: string | null }>();

  constructor(
    @Host() @Optional() private nzTableComponent: NzTableComponent,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Optional() private nzTableService: NzTableService
  ) {
    this.isInTable = !!this.nzTableComponent;
  }

  ngOnInit(): void {
    if (this.nzTableComponent) {
      this.nzTableComponent.theadTemplate = this.templateRef;
    }
  }

  ngAfterContentInit(): void {
    if (this.nzTableComponent) {
      const firstTableRow$ = this.listOfNzTrDirective.changes.pipe(
        startWith(this.listOfNzTrDirective),
        map(item => item && item.first)
      ) as Observable<NzTrDirective>;
      const listOfColumnsChanges$ = firstTableRow$.pipe(
        switchMap(firstTableRow => (firstTableRow ? firstTableRow.listOfColumnsChanges$ : of([]))),
        takeUntil(this.destroy$)
      );
      listOfColumnsChanges$.subscribe(data => this.nzTableService.setListOfThWidthConfig(data));
      /** TODO: need reset the measure row when scrollX change **/
      this.nzTableService.enableAutoMeasure$
        .pipe(switchMap(enable => (enable ? listOfColumnsChanges$ : EMPTY)))
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => this.nzTableService.setListOfMeasureColumn(data));
      const listOfFixedLeftColumnChanges$ = firstTableRow$.pipe(
        switchMap(firstTr => (firstTr ? firstTr.listOfFixedLeftColumnChanges$ : EMPTY)),
        takeUntil(this.destroy$)
      );
      const listOfFixedRightColumnChanges$ = firstTableRow$.pipe(
        switchMap(firstTr => (firstTr ? firstTr.listOfFixedRightColumnChanges$ : EMPTY)),
        takeUntil(this.destroy$)
      );
      listOfFixedLeftColumnChanges$.subscribe(listOfFixedLeftColumn => {
        this.nzTableComponent.setHasFixLeft(listOfFixedLeftColumn.length !== 0);
      });
      listOfFixedRightColumnChanges$.subscribe(listOfFixedRightColumn => {
        this.nzTableComponent.setHasFixRight(listOfFixedRightColumn.length !== 0);
      });
    }
    const listOfColumn$ = this.listOfNzThComponent.changes.pipe(
      startWith(this.listOfNzThComponent),
      switchMap(() => merge<{ key: string; value: string | null }>(...this.listOfNzThComponent.map(th => th.nzSortChangeWithKey))),
      takeUntil(this.destroy$)
    );
    listOfColumn$.subscribe((data: { key: string; value: string | null }) => {
      this.nzSortChange.emit(data);
      if (this.nzSingleSort) {
        this.listOfNzThComponent.forEach(th => th.setSortValueByKey(data.key));
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.nzTableComponent) {
      this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
