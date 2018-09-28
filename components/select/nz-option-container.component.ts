import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { isNotNil } from '../core/util/check';
import { NzOptionGroupComponent } from './nz-option-group.component';
import { NzOptionComponent } from './nz-option.component';

import { merge, Subject, Subscription } from 'rxjs';
import { NzOptionLiComponent } from './nz-option-li.component';
import { defaultFilterOption, NzOptionPipe, TFilterOption } from './nz-option.pipe';

@Component({
  selector           : '[nz-option-container]',
  preserveWhitespaces: false,
  templateUrl        : './nz-option-container.component.html'
})
export class NzOptionContainerComponent implements AfterContentInit, OnDestroy {
  // tslint:disable-next-line:no-any
  private _listOfSelectedValue: any[];
  private _searchValue: string;
  isInit = false;
  isAddTagOptionDisplay = false;
  listOfAllTemplateOption: NzOptionComponent[] = [];
  optionSubscription: Subscription;
  groupSubscription: Subscription;
  listOfTagOption: NzOptionComponent[] = [];
  listOfFilterOption: NzOptionComponent[] = [];
  activatedOption: NzOptionComponent;
  /** can not use ViewChild since it will match sub options in option group **/
  @ViewChildren(NzOptionLiComponent) listOfNzOptionLiComponent: QueryList<NzOptionLiComponent>;
  @Input() listOfNzOptionComponent: QueryList<NzOptionComponent>;
  @Input() listOfNzOptionGroupComponent: QueryList<NzOptionGroupComponent>;
  // tslint:disable-next-line:no-any
  @Output() nzListOfSelectedValueChange = new EventEmitter<any[]>();
  @Output() nzListOfTemplateOptionChange = new EventEmitter<NzOptionComponent[]>();
  @Output() nzClickOption = new EventEmitter<void>();
  @Output() nzScrollToBottom = new EventEmitter<void>();
  @Input() nzMode = 'default';
  @Input() nzServerSearch = false;
  @Input() nzFilterOption: TFilterOption = defaultFilterOption;
  @Input() nzMaxMultipleCount = Infinity;
  @Input() nzNotFoundContent: string;
  // tslint:disable-next-line:no-any
  @Input() compareWith = (o1: any, o2: any) => o1 === o2;

  @Input()
  set nzSearchValue(value: string) {
    this._searchValue = value;
    this.updateAddTagOptionDisplay();
    this.updateListOfFilterOption();
  }

  get nzSearchValue(): string {
    return this._searchValue;
  }

  @Input()
  // tslint:disable-next-line:no-any
  set nzListOfSelectedValue(value: any[]) {
    if (this._listOfSelectedValue !== value) {
      this._listOfSelectedValue = value;
      /** should clear activedOption when listOfSelectedValue change **/
      this.clearActivatedOption();
      this.refreshAllOptionStatus(false);
    }
  }

  // tslint:disable-next-line:no-any
  get nzListOfSelectedValue(): any[] {
    return this._listOfSelectedValue;
  }

  addTagOption(): void {
    if (this.nzListOfSelectedValue.length < this.nzMaxMultipleCount) {
      this.nzListOfSelectedValue = [ ...this.nzListOfSelectedValue, this.nzSearchValue ];
      this.nzListOfSelectedValueChange.emit(this.nzListOfSelectedValue);
    }
  }

  clickOption(option: NzOptionComponent, isPressEnter: boolean): void {
    this.updateSelectedOption(option, isPressEnter);
    this.nzClickOption.emit();
  }

  onKeyDownUl(e: KeyboardEvent): void {
    if ([ 38, 40, 13 ].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      const activeIndex = this.listOfFilterOption.findIndex(item => item === this.activatedOption);
      if (e.keyCode === 38) {
        // arrow up
        const preIndex = activeIndex > 0 ? (activeIndex - 1) : (this.listOfFilterOption.length - 1);
        this.setActiveOption(this.listOfFilterOption[ preIndex ]);
      } else if (e.keyCode === 40) {
        // arrow down
        const nextIndex = activeIndex < this.listOfFilterOption.length - 1 ? (activeIndex + 1) : 0;
        this.setActiveOption(this.listOfFilterOption[ nextIndex ]);
      } else if (e.keyCode === 13) {
        // enter
        if (this.isTagsMode) {
          if (!this.isAddTagOptionDisplay) {
            this.clickOption(this.activatedOption, true);
          } else {
            this.addTagOption();
            this.nzClickOption.emit();
          }
        } else {
          this.clickOption(this.activatedOption, true);
        }
      }
    }
  }

  resetActiveOption(): void {
    const firstActiveOption = this.listOfAllTemplateOption.concat(this.listOfTagOption).find(item => this.compareWith(item.nzValue, this.nzListOfSelectedValue[ 0 ]));
    this.setActiveOption(firstActiveOption);
  }

  clearActivatedOption(): void {
    this.setActiveOption(null);
  }

  setActiveOption(option: NzOptionComponent, scroll: boolean = true): void {
    this.activatedOption = option;
    if (scroll) {
      this.scrollIntoView();
    }
  }

  scrollIntoView(): void {
    if (this.listOfNzOptionLiComponent && this.listOfNzOptionLiComponent.length) {
      const targetOption = this.listOfNzOptionLiComponent.find(o => o.nzOption === this.activatedOption);
      /* tslint:disable-next-line:no-string-literal */
      if (targetOption && targetOption.el && targetOption.el[ 'scrollIntoViewIfNeeded' ]) {
        /* tslint:disable-next-line:no-string-literal */
        setTimeout(() => targetOption.el[ 'scrollIntoViewIfNeeded' ](false), 150);
      }
    }
  }

  updateSelectedOption(option: NzOptionComponent, isPressEnter: boolean): void {
    /** update listOfSelectedOption -> update nzListOfSelectedValue -> emit nzListOfSelectedValueChange **/
    if (option && !option.nzDisabled) {
      let changed = false;
      this.setActiveOption(option);
      let listOfSelectedValue = [ ...this.nzListOfSelectedValue ];
      if (this.isMultipleOrTags) {
        const targetValue = listOfSelectedValue.find(o => this.compareWith(o, option.nzValue));
        if (isNotNil(targetValue)) {
          if (!isPressEnter) {
            /** should not toggle option when press enter **/
            listOfSelectedValue.splice(listOfSelectedValue.indexOf(targetValue), 1);
            changed = true;
          }
        } else if (this.nzListOfSelectedValue.length < this.nzMaxMultipleCount) {
          listOfSelectedValue.push(option.nzValue);
          changed = true;
        }
      } else if (!this.compareWith(listOfSelectedValue[ 0 ], option.nzValue)) {
        listOfSelectedValue = [ option.nzValue ];
        changed = true;
      }
      /** update selectedValues when click option **/
      if (changed) {
        this._listOfSelectedValue = listOfSelectedValue;
        this.nzListOfSelectedValueChange.emit(this.nzListOfSelectedValue);
        if (this.isTagsMode) {
          this.refreshAllOptionStatus(false);
        }
      }
    }
  }

  refreshListOfTagOption(): void {
    if (this.isTagsMode) {
      /** refresh tags option **/
      const listOfTagsOption = [];
      this.nzListOfSelectedValue.forEach(value => {
        const existedOption = this.listOfAllTemplateOption.find(o => this.compareWith(o.nzValue, value));
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

  refreshListOfAllTemplateOption(): void {
    this.listOfAllTemplateOption = this.listOfNzOptionComponent.toArray().concat(this.listOfNzOptionGroupComponent.toArray().reduce((pre, cur) => [ ...pre, ...cur.listOfNzOptionComponent.toArray() ], []));
    Promise.resolve().then(() => this.nzListOfTemplateOptionChange.emit(this.listOfAllTemplateOption));
  }

  refreshAllOptionStatus(isTemplateOptionChange: boolean): void {
    /** update nzListOfSelectedValue | update option list -> update listOfAllTemplateOption -> update listOfSelectedOption -> update activatedOption **/
    if (this.isInit) {
      if (isTemplateOptionChange) {
        this.refreshListOfAllTemplateOption();
      }
      this.refreshListOfTagOption();
      this.updateListOfFilterOption();
      this.updateAddTagOptionDisplay();
    }
  }

  updateListOfFilterOption(): void {
    this.listOfFilterOption = new NzOptionPipe().transform(this.listOfAllTemplateOption.concat(this.listOfTagOption), this.nzSearchValue, this.nzFilterOption, this.nzServerSearch) as NzOptionComponent[];
    if (this.nzSearchValue) {
      this.setActiveOption(this.listOfFilterOption[ 0 ]);
    }
  }

  /** watch options change in option group **/
  watchSubOptionChanges(): void {
    this.unsubscribeOption();
    let optionChanges$ = merge(
      new Subject().asObservable(),
      this.listOfNzOptionGroupComponent.changes,
      this.listOfNzOptionComponent.changes
    );
    if (this.listOfNzOptionGroupComponent.length) {
      this.listOfNzOptionGroupComponent.forEach(group => optionChanges$ = group.listOfNzOptionComponent ? merge(group.listOfNzOptionComponent.changes, optionChanges$) : optionChanges$);
    }
    this.optionSubscription = optionChanges$.subscribe(() => this.refreshAllOptionStatus(true));
  }

  unsubscribeGroup(): void {
    if (this.groupSubscription) {
      this.groupSubscription.unsubscribe();
      this.groupSubscription = null;
    }
  }

  unsubscribeOption(): void {
    if (this.optionSubscription) {
      this.optionSubscription.unsubscribe();
      this.optionSubscription = null;
    }
  }

  get isTagsMode(): boolean {
    return this.nzMode === 'tags';
  }

  get isMultipleOrTags(): boolean {
    return this.nzMode === 'tags' || this.nzMode === 'multiple';
  }

  get isNotFoundDisplay(): boolean {
    return (!this.isTagsMode) && (!this.listOfFilterOption.length);
  }

  updateAddTagOptionDisplay(): void {
    const listOfAllOption = this.listOfAllTemplateOption.concat(this.listOfTagOption).map(item => item.nzLabel);
    const isMatch = listOfAllOption.indexOf(this.nzSearchValue) > -1;
    this.isAddTagOptionDisplay = this.isTagsMode && this.nzSearchValue && (!isMatch);
  }

  dropDownScroll(e: MouseEvent, ul: HTMLUListElement): void {
    e.preventDefault();
    e.stopPropagation();
    if (ul && (ul.scrollHeight - ul.scrollTop === ul.clientHeight)) {
      this.nzScrollToBottom.emit();
    }
  }

  ngAfterContentInit(): void {
    this.isInit = true;
    this.refreshAllOptionStatus(true);
    this.watchSubOptionChanges();
    this.groupSubscription = this.listOfNzOptionGroupComponent.changes.subscribe(() => this.watchSubOptionChanges());
  }

  ngOnDestroy(): void {
    this.unsubscribeGroup();
    this.unsubscribeOption();
  }
}
