import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
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

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'thead:not(.clear-nz)',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>`,
  styles  : [
      `:host {
      display: none;
    }`
  ]
})
export class NzTheadComponent implements AfterContentInit, OnDestroy {
  private _singleSort = false;
  private sortSubscription: Subscription;

  @Input()
  set nzSingleSort(value: boolean) {
    this._singleSort = toBoolean(value);
  }

  get nzSingleSort(): boolean {
    return this._singleSort;
  }

  @ViewChild(TemplateRef) template: TemplateRef<void>;

  @ContentChildren(NzThComponent, { descendants: true }) listOfNzThComponent: QueryList<NzThComponent>;

  @Output() nzSortChange = new EventEmitter<{ key: string, value: string }>();

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
