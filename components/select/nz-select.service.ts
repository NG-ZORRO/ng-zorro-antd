import { BACKSPACE, DOWN_ARROW, ENTER, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { combineLatest, merge, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, share, skip, tap } from 'rxjs/operators';
import { isNotNil } from '../core/util';
import { NzOptionGroupComponent } from './nz-option-group.component';
import { NzOptionComponent } from './nz-option.component';
import { defaultFilterOption, NzFilterOptionPipe, TFilterOption } from './nz-option.pipe';

@Injectable()
export class NzSelectService {
  // Input params
  autoClearSearchValue = true;
  serverSearch = false;
  filterOption: TFilterOption = defaultFilterOption;
  mode: 'default' | 'multiple' | 'tags' = 'default';
  maxMultipleCount = Infinity;
  disabled = false;
  // tslint:disable-next-line:no-any
  compareWith = (o1: any, o2: any) => o1 === o2;
  // selectedValueChanged should emit ngModelChange or not
  // tslint:disable-next-line:no-any
  private listOfSelectedValueWithEmit$ = new BehaviorSubject<{ value: any[], emit: boolean }>({
    value: [],
    emit : false
  });
  // ContentChildren Change
  private mapOfTemplateOption$ = new BehaviorSubject<{
    listOfNzOptionComponent: NzOptionComponent[],
    listOfNzOptionGroupComponent: NzOptionGroupComponent[]
  }>({
    listOfNzOptionComponent     : [],
    listOfNzOptionGroupComponent: []
  });
  // searchValue Change
  private searchValueRaw$ = new BehaviorSubject<string>('');
  private listOfFilteredOption: NzOptionComponent[] = [];
  private openRaw$ = new Subject<boolean>();
  private checkRaw$ = new Subject();
  private open = false;
  clearInput$ = new Subject<boolean>();
  searchValue = '';
  isShowNotFound = false;
  // open
  open$ = this.openRaw$.pipe(
    distinctUntilChanged(),
    share(),
    tap(() => this.clearInput())
  );
  activatedOption: NzOptionComponent;
  activatedOption$ = new ReplaySubject<NzOptionComponent>(1);
  listOfSelectedValue$ = this.listOfSelectedValueWithEmit$.pipe(map(data => data.value));
  modelChange$ = this.listOfSelectedValueWithEmit$.pipe(
    filter(item => item.emit),
    map(data => {
      const selectedList = data.value;
      let modelValue = null;
      if (this.isSingleMode) {
        if (selectedList.length) {
          modelValue = selectedList[ 0 ];
        }
      } else {
        modelValue = selectedList;
      }
      return modelValue;
    }),
    distinctUntilChanged()
  );
  searchValue$ = this.searchValueRaw$.pipe(
    distinctUntilChanged(),
    skip(1),
    share(),
    tap((value) => {
      this.searchValue = value;
      if (value) {
        this.updateActivatedOption(this.listOfFilteredOption[ 0 ]);
      }
      this.updateListOfFilteredOption();
    })
  );
  // tslint:disable-next-line:no-any
  listOfSelectedValue: any[] = [];
  // flat ViewChildren
  listOfTemplateOption: NzOptionComponent[] = [];
  // tag option
  listOfTagOption: NzOptionComponent[] = [];
  // tag option concat template option
  listOfTagAndTemplateOption: NzOptionComponent[] = [];
  // ViewChildren
  listOfNzOptionComponent: NzOptionComponent[] = [];
  listOfNzOptionGroupComponent: NzOptionGroupComponent[] = [];
  // click or enter add tag option
  addedTagOption: NzOptionComponent;
  // display in top control
  listOfCachedSelectedOption: NzOptionComponent[] = [];
  // selected value or ViewChildren change
  valueOrOption$ = combineLatest(this.listOfSelectedValue$, this.mapOfTemplateOption$).pipe(
    tap(data => {
      this.listOfSelectedValue = data[ 0 ];
      this.listOfNzOptionComponent = data[ 1 ].listOfNzOptionComponent;
      this.listOfNzOptionGroupComponent = data[ 1 ].listOfNzOptionGroupComponent;
      this.listOfTemplateOption = this.listOfNzOptionComponent.concat(
        this.listOfNzOptionGroupComponent.reduce(
          (pre, cur) => [ ...pre, ...cur.listOfNzOptionComponent.toArray() ], []
        )
      );
      this.updateListOfTagOption();
      this.updateListOfFilteredOption();
      this.resetActivatedOptionIfNeeded();
      this.updateListOfCachedOption();
    }),
    share());
  check$ = merge(
    this.checkRaw$,
    this.valueOrOption$,
    this.searchValue$,
    this.activatedOption$,
    this.open$,
    this.modelChange$
  ).pipe(
    share()
  );

  clickOption(option: NzOptionComponent): void {
    /** update listOfSelectedOption -> update listOfSelectedValue -> next listOfSelectedValue$ **/
    if (!option.nzDisabled) {
      this.updateActivatedOption(option);
      let listOfSelectedValue = [ ...this.listOfSelectedValue ];
      if (this.isMultipleOrTags) {
        const targetValue = listOfSelectedValue.find(o => this.compareWith(o, option.nzValue));
        if (isNotNil(targetValue)) {
          listOfSelectedValue.splice(listOfSelectedValue.indexOf(targetValue), 1);
          this.updateListOfSelectedValue(listOfSelectedValue, true);
        } else if (listOfSelectedValue.length < this.maxMultipleCount) {
          listOfSelectedValue.push(option.nzValue);
          this.updateListOfSelectedValue(listOfSelectedValue, true);
        }
      } else if (!this.compareWith(listOfSelectedValue[ 0 ], option.nzValue)) {
        listOfSelectedValue = [ option.nzValue ];
        this.updateListOfSelectedValue(listOfSelectedValue, true);
      }
      if (this.isSingleMode) {
        this.setOpenState(false);
      } else if (this.autoClearSearchValue) {
        this.clearInput();
      }
    }
  }

  updateListOfCachedOption(): void {
    if (this.isSingleMode) {
      const selectedOption = this.listOfTemplateOption.find(o => this.compareWith(o.nzValue, this.listOfSelectedValue[ 0 ]));
      if (isNotNil(selectedOption)) {
        this.listOfCachedSelectedOption = [ selectedOption ];
      }
    } else {
      const listOfCachedSelectedOption = [];
      this.listOfSelectedValue.forEach(v => {
        const listOfMixedOption = [ ...this.listOfTagAndTemplateOption, ...this.listOfCachedSelectedOption ];
        const option = listOfMixedOption.find(o => this.compareWith(o.nzValue, v));
        if (option) {
          listOfCachedSelectedOption.push(option);
        }
      });
      this.listOfCachedSelectedOption = listOfCachedSelectedOption;
    }
  }

  updateListOfTagOption(): void {
    if (this.isTagsMode) {
      const listOfMissValue = this.listOfSelectedValue.filter(value => !this.listOfTemplateOption.find(o => this.compareWith(o.nzValue, value)));
      this.listOfTagOption = listOfMissValue.map(value => {
        const nzOptionComponent = new NzOptionComponent();
        nzOptionComponent.nzValue = value;
        nzOptionComponent.nzLabel = value;
        return nzOptionComponent;
      });
      this.listOfTagAndTemplateOption = [ ...this.listOfTemplateOption.concat(this.listOfTagOption) ];
    } else {
      this.listOfTagAndTemplateOption = [ ...this.listOfTemplateOption ];
    }
  }

  updateAddTagOption(): void {
    const isMatch = this.listOfTagAndTemplateOption.find(item => item.nzLabel === this.searchValue);
    if (this.isTagsMode && this.searchValue && !isMatch) {
      const option = new NzOptionComponent();
      option.nzValue = this.searchValue;
      option.nzLabel = this.searchValue;
      this.addedTagOption = option;
      this.updateActivatedOption(option);
    } else {
      this.addedTagOption = null;
    }
  }

  updateListOfFilteredOption(): void {
    this.updateAddTagOption();
    const listOfFilteredOption = new NzFilterOptionPipe().transform(
      this.listOfTagAndTemplateOption,
      this.searchValue,
      this.filterOption,
      this.serverSearch
    );
    this.listOfFilteredOption = this.addedTagOption ? [ this.addedTagOption, ...listOfFilteredOption ] : [ ...listOfFilteredOption ];
    this.isShowNotFound = !this.isTagsMode && !this.listOfFilteredOption.length;
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

  tokenSeparate(inputValue: string, tokenSeparators: string[]): void {
    // auto tokenSeparators
    if (inputValue &&
      inputValue.length &&
      tokenSeparators.length &&
      this.isMultipleOrTags &&
      this.includesSeparators(inputValue, tokenSeparators)) {
      const listOfLabel = this.splitBySeparators(inputValue, tokenSeparators);
      this.updateSelectedValueByLabelList(listOfLabel);
      this.clearInput();
    }
  }

  includesSeparators(str: string | string[], separators: string[]): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < separators.length; ++i) {
      if (str.lastIndexOf(separators[ i ]) > 0) {
        return true;
      }
    }
    return false;
  }

  splitBySeparators(str: string | string[], separators: string[]): string[] {
    const reg = new RegExp(`[${separators.join()}]`);
    const array = (str as string).split(reg).filter(token => token);
    return Array.from(new Set(array));
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

  updateSelectedValueByLabelList(listOfLabel: string[]): void {
    const listOfSelectedValue = [ ...this.listOfSelectedValue ];
    const listOfMatchOptionValue = this.listOfTagAndTemplateOption
    .filter(item => listOfLabel.indexOf(item.nzLabel) !== -1)
    .map(item => item.nzValue)
    .filter(item => !isNotNil(this.listOfSelectedValue.find(v => this.compareWith(v, item))));
    if (this.isMultipleMode) {
      this.updateListOfSelectedValue([ ...listOfSelectedValue, ...listOfMatchOptionValue ], true);
    } else {
      const listOfUnMatchOptionValue = listOfLabel
      .filter(label => this.listOfTagAndTemplateOption
        .map(item => item.nzLabel).indexOf(label) === -1
      );
      this.updateListOfSelectedValue([ ...listOfSelectedValue, ...listOfMatchOptionValue, ...listOfUnMatchOptionValue ], true);
    }
  }

  onKeyDown(e: KeyboardEvent): void {
    const keyCode = e.keyCode;
    const eventTarget = e.target as HTMLInputElement;
    const listOfFilteredOptionWithoutDisabled = this.listOfFilteredOption.filter(item => !item.nzDisabled);
    const activatedIndex = listOfFilteredOptionWithoutDisabled.findIndex(item => item === this.activatedOption);
    switch (keyCode) {
      case UP_ARROW:
        e.preventDefault();
        const preIndex = activatedIndex > 0 ? (activatedIndex - 1) : (listOfFilteredOptionWithoutDisabled.length - 1);
        this.updateActivatedOption(listOfFilteredOptionWithoutDisabled[ preIndex ]);
        break;
      case DOWN_ARROW:
        e.preventDefault();
        const nextIndex = activatedIndex < listOfFilteredOptionWithoutDisabled.length - 1 ? (activatedIndex + 1) : 0;
        this.updateActivatedOption(listOfFilteredOptionWithoutDisabled[ nextIndex ]);
        if (!this.disabled && !this.open) {
          this.setOpenState(true);
        }
        break;
      case ENTER:
        e.preventDefault();
        if (this.open) {
          if (this.activatedOption && !this.activatedOption.nzDisabled) {
            this.clickOption(this.activatedOption);
          }
        } else {
          this.setOpenState(true);
        }
        break;
      case BACKSPACE:
        if (this.isMultipleOrTags && !eventTarget.value && this.listOfCachedSelectedOption.length) {
          e.preventDefault();
          this.removeValueFormSelected(this.listOfCachedSelectedOption[ this.listOfCachedSelectedOption.length - 1 ]);
        }
        break;
      case SPACE:
        if (!this.disabled && !this.open) {
          this.setOpenState(true);
          event.preventDefault();
        }
        break;
      case TAB:
        this.setOpenState(false);
        break;
    }
  }

  // tslint:disable-next-line:no-any
  removeValueFormSelected(option: NzOptionComponent): void {
    if (this.disabled || option.nzDisabled) {
      return;
    }
    const listOfSelectedValue = this.listOfSelectedValue.filter(item => !this.compareWith(item, option.nzValue));
    this.updateListOfSelectedValue(listOfSelectedValue, true);
    this.clearInput();
  }

  setOpenState(value: boolean): void {
    this.openRaw$.next(value);
    this.open = value;
  }

  check(): void {
    this.checkRaw$.next();
  }

  get isSingleMode(): boolean {
    return this.mode === 'default';
  }

  get isTagsMode(): boolean {
    return this.mode === 'tags';
  }

  get isMultipleMode(): boolean {
    return this.mode === 'multiple';
  }

  get isMultipleOrTags(): boolean {
    return this.mode === 'tags' || this.mode === 'multiple';
  }
}
