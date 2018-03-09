import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList
} from '@angular/core';
import { NzOptionGroupComponent } from './nz-option-group.component';
import { NzOptionComponent } from './nz-option.component';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/operators/merge';
import { defaultFilterOption, NzOptionPipe, TFilterOption } from './nz-option.pipe';

@Component({
  selector           : '[nz-option-container]',
  preserveWhitespaces: false,
  template           : `
    <ul
      class="ant-select-dropdown-menu ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical"
      role="menu"
      (keydown)="onKeyDownUl($event)"
      (mouseleave)="clearActivatedOption()"
      tabindex="0">
      <li
        *ngIf="isNotFoundDisplay"
        nz-select-unselectable
        class="ant-select-dropdown-menu-item ant-select-dropdown-menu-item-disabled">
        Not Found
      </li>
      <li
        *ngIf="isAddTagOptionDisplay"
        nz-select-unselectable
        class="ant-select-dropdown-menu-item ant-select-dropdown-menu-item-active">
        {{ nzSearchValue }}
      </li>
      <li
        nz-option-li
        *ngFor="let option of listOfNzOptionComponent | nzFilterOptionPipe : nzSearchValue : nzFilterOption "
        (mouseover)="onMouseOverOption(option)"
        (click)="updateSelectedOption(option,false)"
        [nzActiveOption]="activatedOption"
        [nzOption]="option"
        [nzSelectedOptions]="listOfSelectedOption">
      </li>
      <li
        *ngFor="let group of listOfNzOptionGroupComponent | nzSubFilterOptionPipe : nzSearchValue : nzFilterOption"
        class="ant-select-dropdown-menu-item-group">
        <div
          class="ant-select-dropdown-menu-item-group-title"
          [attr.title]="group.isLabelString ? group.nzLabel : ''">
          <ng-container *ngIf="group.isLabelString; else labelTemplate">{{ group.nzLabel }}</ng-container>
          <ng-template #labelTemplate>
            <ng-template [ngTemplateOutlet]="group.nzLabel"></ng-template>
          </ng-template>
        </div>
        <ul class="ant-select-dropdown-menu-item-group-list">
          <li
            nz-option-li
            *ngFor="let option of group.listOfNzOptionComponent | nzFilterOptionPipe : nzSearchValue : nzFilterOption"
            (click)="updateSelectedOption(option,false)"
            (mouseover)="onMouseOverOption(option)"
            [nzActiveOption]="activatedOption"
            [nzOption]="option"
            [nzSelectedOptions]="listOfSelectedOption">
          </li>
        </ul>
      </li>
      <li
        nz-option-li
        *ngFor="let option of listOfTagOption | nzFilterOptionPipe : nzSearchValue : nzFilterOption "
        (mouseover)="onMouseOverOption(option)"
        (click)="updateSelectedOption(option,false)"
        [nzActiveOption]="activatedOption"
        [nzOption]="option"
        [nzSelectedOptions]="listOfSelectedOption">
      </li>
    </ul>`
})
export class NzOptionContainerComponent implements AfterContentInit, OnDestroy {
  // tslint:disable-next-line:no-any
  private _listOfSelectedValue: any[];
  private _searchValue: string;
  isInit = false;
  listOfAllTemplateOption: NzOptionComponent[] = [];
  optionSubscription: Subscription;
  groupSubscription: Subscription;
  listOfSelectedOption: NzOptionComponent[] = [];
  listOfTagOption: NzOptionComponent[] = [];
  listOfFilterOption: NzOptionComponent[] = [];
  activatedOption: NzOptionComponent;
  /** can not use ViewChild since it will match sub options in option group **/
  @Input() listOfNzOptionComponent: QueryList<NzOptionComponent>;
  @Input() listOfNzOptionGroupComponent: QueryList<NzOptionGroupComponent>;
  // tslint:disable-next-line:no-any
  @Output() nzListOfSelectedValueChange = new EventEmitter<any[]>();
  @Output() nzListOfOptionChange = new EventEmitter<NzOptionComponent[]>();
  @Input() nzMode = 'default';
  @Input() nzFilterOption: TFilterOption = defaultFilterOption;

  @Input()
  set nzSearchValue(value: string) {
    this._searchValue = value;
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

  onKeyDownUl(e: KeyboardEvent): void {
    if ([ 38, 40, 13 ].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      const activeIndex = this.listOfFilterOption.findIndex(item => item === this.activatedOption);
      if (e.keyCode === 38) {
        // arrow up
        const preIndex = activeIndex > 0 ? (activeIndex - 1) : (this.listOfFilterOption.length - 1);
        this.activatedOption = this.listOfFilterOption[ preIndex ];
      } else if (e.keyCode === 40) {
        // arrow down
        const nextIndex = activeIndex < this.listOfFilterOption.length - 1 ? (activeIndex + 1) : 0;
        this.activatedOption = this.listOfFilterOption[ nextIndex ];
      } else if (e.keyCode === 13) {
        // enter
        if (this.listOfFilterOption.length !== 0) {
          this.updateSelectedOption(this.activatedOption, true);
        } else if (this.isTagsMode && this.nzSearchValue) {
          this.nzListOfSelectedValue = [ ...this.nzListOfSelectedValue, this.nzSearchValue ];
          this.nzListOfSelectedValueChange.emit(this.nzListOfSelectedValue);
        }
      }
    }
  }

  clearActivatedOption(): void {
    this.activatedOption = null;
  }

  onMouseOverOption(option: NzOptionComponent): void {
    this.activatedOption = option;
  }

  updateSelectedOption(option: NzOptionComponent, isPressEnter: boolean): void {
    /** update listOfSelectedOption -> update nzListOfSelectedValue -> emit nzListOfSelectedValueChange **/
    if (option && !option.nzDisabled) {
      let changed = false;
      this.activatedOption = option;
      if (this.isMultipleOrTags) {
        const index = this.listOfSelectedOption.map(o => o.nzValue).indexOf(option.nzValue);
        if (index > -1) {
          if (!isPressEnter) {
            /** should not toggle option when press enter **/
            this.listOfSelectedOption = this.listOfSelectedOption.filter((item, i) => i !== index);
            changed = true;
          }
        } else {
          this.listOfSelectedOption = [ ...this.listOfSelectedOption, option ];
          changed = true;
        }
      } else if (this.listOfSelectedOption[ 0 ] !== option) {
        this.listOfSelectedOption = [ option ];
        changed = true;
      }
      /** update selectedValues when click option **/
      if (changed) {
        this._listOfSelectedValue = this.listOfSelectedOption.map(item => item.nzValue);
        this.nzListOfSelectedValueChange.emit(this.nzListOfSelectedValue);
        if (this.isTagsMode) {
          this.refreshAllOptionStatus(false);
        }
      }
    }
  }

  refreshListOfTagOption(): void {
    /** refresh tags option **/
    const listOfTagsOption = [];
    this.nzListOfSelectedValue.forEach(value => {
      if (this.listOfAllTemplateOption.map(item => item.nzValue).indexOf(value) === -1) {
        const nzOptionComponent = new NzOptionComponent();
        nzOptionComponent.nzValue = value;
        nzOptionComponent.nzLabel = value;
        listOfTagsOption.push(nzOptionComponent);
      }
    });
    this.listOfTagOption = listOfTagsOption;
  }

  refreshListOfSelectedOption(): void {
    /** should not use filter in order to keep the sequence **/
    const listOfSelectedOption = [];
    this.nzListOfSelectedValue.forEach(item => {
      const listOfConcatOption = this.listOfAllTemplateOption.concat(this.listOfTagOption);
      const option = listOfConcatOption.find(o => o.nzValue === item);
      if (option) {
        listOfSelectedOption.push(option);
      }
    });
    this.listOfSelectedOption = listOfSelectedOption;
    this.updateListOfFilterOption();
  }

  refreshListOfAllTemplateOption(): void {
    this.listOfAllTemplateOption = this.listOfNzOptionComponent.toArray().concat(this.listOfNzOptionGroupComponent.toArray().reduce((pre, cur) => [ ...pre, ...cur.listOfNzOptionComponent.toArray() ], []));
    Promise.resolve().then(() => this.nzListOfOptionChange.emit(this.listOfAllTemplateOption));
  }

  refreshAllOptionStatus(isTemplateOptionChange: boolean): void {
    /** update nzListOfSelectedValue | update option list -> update listOfAllTemplateOption -> update listOfSelectedOption -> update activatedOption **/
    if (this.isInit) {
      if (isTemplateOptionChange) {
        this.refreshListOfAllTemplateOption();
      }
      this.refreshListOfTagOption();
      this.refreshListOfSelectedOption();
    }
  }

  updateListOfFilterOption(): void {
    this.listOfFilterOption = new NzOptionPipe().transform(this.listOfAllTemplateOption.concat(this.listOfTagOption), this.nzSearchValue, this.nzFilterOption);
    if (this.nzSearchValue) {
      this.activatedOption = this.listOfFilterOption[ 0 ];
    }
  }

  /** watch options change in option group **/
  watchSubOptionChanges(): void {
    this.unsubscribeOption();
    let optionChanges$ = new Subject().asObservable().pipe(merge(this.listOfNzOptionGroupComponent.changes)).pipe(merge(this.listOfNzOptionComponent.changes));
    if (this.listOfNzOptionGroupComponent.length) {
      this.listOfNzOptionGroupComponent.forEach(group => optionChanges$ = group.listOfNzOptionComponent ? optionChanges$.pipe(merge(group.listOfNzOptionComponent.changes)) : optionChanges$);
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

  get isAddTagOptionDisplay(): boolean {
    return this.isTagsMode && (!this.listOfFilterOption.length);
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
