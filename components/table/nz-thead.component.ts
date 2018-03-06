import {
  AfterContentInit,
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
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/operators/merge';
import { toBoolean } from '../core/util/convert';
import { NzThComponent } from './nz-th.component';

import { NzTableComponent } from './nz-table.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'thead:not(.ant-table-thead)',
  template: `
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
    <ng-container *ngIf="!nzTableComponent">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </ng-container>
  `
})
export class NzTheadComponent implements AfterContentInit, OnDestroy {
  private _singleSort = false;
  private sortSubscription: Subscription;
  @ViewChild('contentTemplate') template: TemplateRef<void>;
  @ContentChildren(NzThComponent, { descendants: true }) listOfNzThComponent: QueryList<NzThComponent>;
  @Output() nzSortChange = new EventEmitter<{ key: string, value: string }>();

  @Input()
  set nzSingleSort(value: boolean) {
    this._singleSort = toBoolean(value);
  }

  get nzSingleSort(): boolean {
    return this._singleSort;
  }

  constructor(@Host() @Optional() public nzTableComponent: NzTableComponent) {
    if (this.nzTableComponent) {
      this.nzTableComponent.nzTheadComponent = this;
    }
  }

  ngAfterContentInit(): void {
    let sortChange = new Subject<{ key: string, value: string }>().asObservable();
    const listOfTh = this.listOfNzThComponent.toArray();
    const sortChangeArray = listOfTh.map(th => th.nzSortChangeWithKey);
    if (sortChangeArray.length) {
      sortChangeArray.forEach(sort => {
        sortChange = sortChange.pipe(merge(sort.asObservable()));
      });
    }
    this.sortSubscription = sortChange.subscribe(data => {
      this.nzSortChange.emit(data);
      if (this.nzSingleSort) {
        listOfTh.forEach(th => th.nzSort = (th.nzSortKey === data.key ? th.nzSort : null));
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sortSubscription) {
      this.sortSubscription.unsubscribe();
      this.sortSubscription = null;
    }
  }
}
