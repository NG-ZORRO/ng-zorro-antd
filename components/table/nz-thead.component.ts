/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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
  Optional,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';

import { InputBoolean } from 'ng-zorro-antd/core';

import { NzTableComponent } from './nz-table.component';
import { NzThComponent } from './nz-th.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'thead:not(.ant-table-thead)',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './nz-thead.component.html'
})
export class NzTheadComponent implements AfterContentInit, OnDestroy, AfterViewInit {
  private destroy$ = new Subject<void>();
  @ViewChild('contentTemplate', { static: true }) templateRef: TemplateRef<void>;
  @ContentChildren(NzThComponent, { descendants: true }) listOfNzThComponent: QueryList<NzThComponent>;
  @Input() @InputBoolean() nzSingleSort = false;
  @Output() readonly nzSortChange = new EventEmitter<{ key: string; value: string }>();

  // tslint:disable-next-line:no-any
  constructor(
    @Host() @Optional() public nzTableComponent: NzTableComponent,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    if (this.nzTableComponent) {
      this.nzTableComponent.nzTheadComponent = this;
    }
  }

  ngAfterContentInit(): void {
    this.listOfNzThComponent.changes
      .pipe(
        startWith(true),
        switchMap(() =>
          merge<{ key: string; value: string }>(...this.listOfNzThComponent.map(th => th.nzSortChangeWithKey))
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((data: { key: string; value: string }) => {
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
