import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Host,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { merge, Subject } from 'rxjs';
import { flatMap, startWith, takeUntil } from 'rxjs/operators';
import { InputBoolean } from '../core/util/convert';
import { NzTableComponent } from './nz-table.component';
import { NzThComponent } from './nz-th.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector       : 'thead:not(.ant-table-thead)',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation  : ViewEncapsulation.None,
  templateUrl    : './nz-thead.component.html'
})
export class NzTheadComponent implements AfterContentInit, OnDestroy {
  private destroy$ = new Subject<void>();
  @ViewChild('contentTemplate') template: TemplateRef<void>;
  @ContentChildren(NzThComponent, { descendants: true }) listOfNzThComponent: QueryList<NzThComponent>;
  @Input() @InputBoolean() nzSingleSort = false;
  @Output() readonly nzSortChange = new EventEmitter<{ key: string, value: string }>();

  constructor(@Host() @Optional() public nzTableComponent: NzTableComponent) {
    if (this.nzTableComponent) {
      this.nzTableComponent.nzTheadComponent = this;
    }
  }

  ngAfterContentInit(): void {
    this.listOfNzThComponent.changes.pipe(
      startWith(true),
      flatMap(() => merge(...this.listOfNzThComponent.map(th => th.nzSortChangeWithKey))),
      takeUntil(this.destroy$)
    ).subscribe((data: { key: string, value: string }) => {
      this.nzSortChange.emit(data);
      if (this.nzSingleSort) {
        this.listOfNzThComponent.forEach(th => {
          th.nzSort = (th.nzSortKey === data.key ? th.nzSort : null);
          th.marForCheck();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
