import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NzOptionComponent } from './nz-option.component';

@Injectable()
export class NzSelectService {
  // tslint:disable-next-line:no-any
  private listOfSelectedValueWithEmit$ = new BehaviorSubject<{ value: any[], emit: boolean }>({
    value: [],
    emit : false
  });
  open$ = new Subject<boolean>();
  keydown$ = new Subject<KeyboardEvent>();
  listOfTemplateOption$ = new BehaviorSubject<NzOptionComponent[]>([]);
  listOfSelectedValue$ = this.listOfSelectedValueWithEmit$.pipe(map(data => data.value));
  listOfSelectedValueShouldEmit$ = this.listOfSelectedValueWithEmit$.pipe(
    filter(item => item.emit),
    map(data => data.value)
  );
  clearInput$ = new Subject<boolean>();
  searchValue$: BehaviorSubject<string> = new BehaviorSubject('');

  clearInput(value: boolean): void {
    this.clearInput$.next(value);
  }

  // tslint:disable-next-line:no-any
  updateListOfSelectedValue(value: any[], emit: boolean): void {
    this.listOfSelectedValueWithEmit$.next({ value, emit });
  }
}
