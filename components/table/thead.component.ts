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
import { merge, Observable, of, Subject } from 'rxjs';
import { flatMap, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { NzTableComponent } from './table.component';
import { NzTableService } from './table.service';
import { NzThComponent } from './th.component';
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
    private nzTableService: NzTableService
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
      const column$ = this.listOfNzTrDirective.changes.pipe(
        startWith(this.listOfNzTrDirective),
        switchMap(item => {
          const firstTr = item && item.first;
          if (firstTr) {
            const listOfColumn = firstTr.listOfNzThComponent;
            const listOfColumnChanges = listOfColumn.changes.pipe(startWith(listOfColumn));
            return listOfColumnChanges.pipe(
              switchMap(() =>
                merge(...[listOfColumnChanges, ...listOfColumn.map((c: NzThComponent) => c.widthChange$)]).pipe(
                  flatMap(() => listOfColumnChanges)
                )
              )
            ) as Observable<NzThComponent[]>;
          } else {
            return of([]);
          }
        }),
        takeUntil(this.destroy$)
      );
      column$.subscribe(data => this.nzTableService.listOfColumnWidth$.next(data.map(item => item.nzWidth)));

      this.nzTableService.isFixedHeader$
        .pipe(
          flatMap(fixed => {
            if (fixed) {
              return column$;
            } else {
              return of([]);
            }
          })
        )
        .subscribe(data => this.nzTableService.setListOfMeasureColumn(data));
    }

    this.listOfNzThComponent.changes
      .pipe(
        startWith(true),
        switchMap(() => merge<{ key: string; value: string | null }>(...this.listOfNzThComponent.map(th => th.nzSortChangeWithKey))),
        takeUntil(this.destroy$)
      )
      .subscribe((data: { key: string; value: string | null }) => {
        this.nzSortChange.emit(data);
        if (this.nzSingleSort) {
          this.listOfNzThComponent.forEach(th => {
            th.nzSort = th.nzSortKey === data.key ? th.nzSort : null;
            th.marForCheck();
          });
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
