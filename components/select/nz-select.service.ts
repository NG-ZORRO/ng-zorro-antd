import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { isNotNil } from '../core/util';
import { NzOptionGroupComponent } from './nz-option-group.component';
import { NzOptionComponent } from './nz-option.component';
import { defaultFilterOption, NzFilterAddOptionPipe, NzFilterOptionPipe, TFilterOption } from './nz-option.pipe';

@Injectable()
export class NzSelectService {
  // tslint:disable-next-line:no-any
  private listOfSelectedValueWithEmit$ = new BehaviorSubject<{ value: any[], emit: boolean }>({
    value: [],
    emit : false
  });
  private mapOfTemplateOption$ = new BehaviorSubject<{
    listOfNzOptionComponent: NzOptionComponent[],
    listOfNzOptionGroupComponent: NzOptionGroupComponent[]
  }>({
    listOfNzOptionComponent     : [],
    listOfNzOptionGroupComponent: []
  });
  private searchValueRaw$ = new BehaviorSubject<string>('');
  searchValue = '';
  serverSearch = false;
  filterOption: TFilterOption = defaultFilterOption;
  mode: 'default' | 'multiple' | 'tags' = 'default';
  maxMultipleCount = Infinity;
  // tslint:disable-next-line:no-any
  compareWith = (o1: any, o2: any) => o1 === o2;
  open$ = new Subject<boolean>();
  keydown$ = new Subject<KeyboardEvent>();
  activatedOption: NzOptionComponent;
  activatedOption$ = new BehaviorSubject<NzOptionComponent>(null);
  listOfSelectedValue$ = this.listOfSelectedValueWithEmit$.pipe(map(data => data.value));
  listOfSelectedValueShouldEmit$ = this.listOfSelectedValueWithEmit$.pipe(
    filter(item => item.emit),
    map(data => data.value)
  );
  clearInput$ = new Subject<boolean>();
  clickOption$ = new Subject();
  listOfFilteredOption: NzOptionComponent[] = [];
  searchValue$ = this.searchValueRaw$.pipe(distinctUntilChanged(), tap((value) => {
    this.searchValue = value;
    if (value) {
      this.updateActivatedOption(this.listOfFilteredOption[ 0 ]);
    }
    this.updateListOfFilteredOption();
  }));
  // tslint:disable-next-line:no-any
  listOfSelectedValue: any[] = [];
  listOfTemplateOption: NzOptionComponent[] = [];
  listOfTagOption: NzOptionComponent[] = [];
  listOfTagAndTemplateOption: NzOptionComponent[] = [];
  listOfNzOptionComponent: NzOptionComponent[] = [];
  listOfNzOptionGroupComponent: NzOptionGroupComponent[] = [];
  valueOrOption$ = combineLatest(this.listOfSelectedValue$, this.mapOfTemplateOption$).pipe(tap(data => {
    this.listOfSelectedValue = data[ 0 ];
    this.listOfNzOptionComponent = data[ 1 ].listOfNzOptionComponent;
    this.listOfNzOptionGroupComponent = data[ 1 ].listOfNzOptionGroupComponent;
    this.listOfTemplateOption = this.listOfNzOptionComponent.concat(
      this.listOfNzOptionGroupComponent.reduce(
        (pre, cur) => [ ...pre, ...cur.listOfNzOptionComponent.toArray() ], []
      )
    );
    this.updateListOfTagOption();
    this.listOfTagAndTemplateOption = this.listOfTemplateOption.concat(this.listOfTagOption);
    this.updateListOfFilteredOption();
    this.resetActivatedOptionIfNeeded();
  }));

  updateListOfTagOption(): void {
    if (this.isTagsMode) {
      const listOfTagsOption = [];
      this.listOfSelectedValue.forEach(value => {
        const existedOption = this.listOfTemplateOption.find(o => this.compareWith(o.nzValue, value));
        if (!existedOption) {
          const nzOptionComponent = new NzOptionComponent();
          nzOptionComponent.nzValue = value;
          nzOptionComponent.nzLabel = value;
          listOfTagsOption.push(nzOptionComponent);
        }
      });
      this.listOfTagOption = listOfTagsOption;
    }
  }

  updateListOfFilteredOption(): void {
    this.listOfFilteredOption =
      [ ...
        new NzFilterAddOptionPipe().transform(
          this.listOfTagAndTemplateOption,
          this.searchValue,
          this.isTagsMode
        ),
        ...
          new NzFilterOptionPipe().transform(
            this.listOfTagAndTemplateOption,
            this.searchValue,
            this.filterOption,
            this.serverSearch
          )
      ];
  }

  clearInput(): void {
    this.clearInput$.next();
  }

  // tslint:disable-next-line:no-any
  updateListOfSelectedValue(value: any[], emit: boolean): void {
    this.listOfSelectedValueWithEmit$.next({ value, emit });
  }

  updateActivatedOption(option: NzOptionComponent): void {
    this.activatedOption$.next(option);
    this.activatedOption = option;
  }

  resetActivatedOptionIfNeeded(): void {
    const resetActivatedOption = () => {
      const activatedOption = this.listOfFilteredOption.find(item => this.compareWith(item.nzValue, this.listOfSelectedValue[ 0 ]));
      this.updateActivatedOption(activatedOption || null);
    };
    if (this.activatedOption) {
      if (
        !this.listOfFilteredOption.find(item => this.compareWith(item.nzValue, this.activatedOption.nzValue)) ||
        !this.listOfSelectedValue.find(item => this.compareWith(item, this.activatedOption.nzValue))
      ) {
        resetActivatedOption();
      }
    } else {
      resetActivatedOption();
    }
  }

  updateTemplateOption(listOfNzOptionComponent: NzOptionComponent[], listOfNzOptionGroupComponent: NzOptionGroupComponent[]): void {
    this.mapOfTemplateOption$.next({ listOfNzOptionComponent, listOfNzOptionGroupComponent });
  }

  updateSearchValue(value: string): void {
    this.searchValueRaw$.next(value);
  }

  updateSelectedOption(option: NzOptionComponent): void {
    /** update listOfSelectedOption -> update listOfSelectedValue -> next listOfSelectedValue$ **/
    if (option && !option.nzDisabled) {
      this.updateActivatedOption(option);
      let listOfSelectedValue = [ ...this.listOfSelectedValue ];
      if (this.isMultipleOrTags) {
        const targetValue = listOfSelectedValue.find(o => this.compareWith(o, option.nzValue));
        if (isNotNil(targetValue)) {
          /** should not toggle option when press enter **/
          listOfSelectedValue.splice(listOfSelectedValue.indexOf(targetValue), 1);
          this.updateListOfSelectedValue(listOfSelectedValue, true);
        } else if (this.listOfSelectedValue.length < this.maxMultipleCount) {
          listOfSelectedValue.push(option.nzValue);
          this.updateListOfSelectedValue(listOfSelectedValue, true);
        }
      } else if (!this.compareWith(listOfSelectedValue[ 0 ], option.nzValue)) {
        listOfSelectedValue = [ option.nzValue ];
        this.updateListOfSelectedValue(listOfSelectedValue, true);
      }
    }
  }

  onKeyDown(e: KeyboardEvent): void {
    this.keydown$.next(e);
    if ([ UP_ARROW, DOWN_ARROW, ENTER ].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      const listOfFilteredOptionWithoutDisabled = this.listOfFilteredOption.filter(item => !item.nzDisabled);
      const activatedIndex = listOfFilteredOptionWithoutDisabled.findIndex(item => item === this.activatedOption);
      if (e.keyCode === UP_ARROW) {
        const preIndex = activatedIndex > 0 ? (activatedIndex - 1) : (listOfFilteredOptionWithoutDisabled.length - 1);
        this.updateActivatedOption(listOfFilteredOptionWithoutDisabled[ preIndex ]);
      } else if (e.keyCode === DOWN_ARROW) {
        const nextIndex = activatedIndex < listOfFilteredOptionWithoutDisabled.length - 1 ? (activatedIndex + 1) : 0;
        this.updateActivatedOption(listOfFilteredOptionWithoutDisabled[ nextIndex ]);
      } else if (e.keyCode === ENTER) {
        if (!this.activatedOption.nzDisabled) {
          this.updateSelectedOption(this.activatedOption);
          this.clickOption$.next();
        }
      }
    }
  }

  get isSingleMode(): boolean {
    return this.mode === 'default';
  }

  get isTagsMode(): boolean {
    return this.mode === 'tags';
  }

  get isMultipleOrTags(): boolean {
    return this.mode === 'tags' || this.mode === 'multiple';
  }
}
