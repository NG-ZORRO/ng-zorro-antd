import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy, OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { isNotNil } from '../core/util/check';
import { NzOptionGroupComponent } from './nz-option-group.component';
import { NzOptionComponent } from './nz-option.component';

import { NzOptionLiComponent } from './nz-option-li.component';
import { defaultFilterOption, NzOptionPipe, TFilterOption } from './nz-option.pipe';
import { NzSelectService } from './nz-select.service';

@Component({
  selector           : '[nz-option-container]',
  preserveWhitespaces: false,
  templateUrl        : './nz-option-container.component.html'
})
export class NzOptionContainerComponent implements OnDestroy, OnInit {
  searchValue: string;
  isAddTagOptionDisplay = false;
  listOfAllTemplateOption: NzOptionComponent[] = [];
  // tslint:disable-next-line:no-any
  listOfSelectedValue: any[] = [];
  listOfTagOption: NzOptionComponent[] = [];
  listOfFilterOption: NzOptionComponent[] = [];
  activatedOption: NzOptionComponent;
  /** can not use ViewChild since it will match sub options in option group **/
  @ViewChildren(NzOptionLiComponent) listOfNzOptionLiComponent: QueryList<NzOptionLiComponent>;
  @Input() listOfNzOptionComponent: QueryList<NzOptionComponent>;
  @Input() listOfNzOptionGroupComponent: QueryList<NzOptionGroupComponent>;
  // tslint:disable-next-line:no-any
  @Output() readonly nzClickOption = new EventEmitter<void>();
  @Output() readonly nzScrollToBottom = new EventEmitter<void>();
  @Input() nzServerSearch = false;
  @Input() nzFilterOption: TFilterOption = defaultFilterOption;
  @Input() nzMaxMultipleCount = Infinity;
  @Input() nzNotFoundContent: string;
  // tslint:disable-next-line:no-any
  @Input() compareWith = (o1: any, o2: any) => o1 === o2;
  @Input() nzMode: 'default' | 'multiple' | 'tags' = 'default';

  get isTagsMode(): boolean {
    return this.nzMode === 'tags';
  }

  get isMultipleOrTags(): boolean {
    return this.nzMode === 'tags' || this.nzMode === 'multiple';
  }

  addTagOption(): void {
    if (this.listOfSelectedValue.length < this.nzMaxMultipleCount) {
      this.listOfSelectedValue = [ ...this.listOfSelectedValue, this.searchValue ];
      this.nzSelectService.updateListOfSelectedValue(this.listOfSelectedValue, true);
      this.nzSelectService.clearInput(false);
    }
  }

  clickOption(option: NzOptionComponent, isPressEnter: boolean): void {
    this.updateSelectedOption(option, isPressEnter);
    this.nzClickOption.emit();
  }

  onKeyDown(e: KeyboardEvent): void {
    if ([ UP_ARROW, DOWN_ARROW, ENTER ].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      const activeIndex = this.listOfFilterOption.findIndex(item => item === this.activatedOption);
      if (e.keyCode === UP_ARROW) {
        // arrow up
        const preIndex = activeIndex > 0 ? (activeIndex - 1) : (this.listOfFilterOption.length - 1);
        this.setActiveOption(this.listOfFilterOption[ preIndex ]);
      } else if (e.keyCode === DOWN_ARROW) {
        // arrow down
        const nextIndex = activeIndex < this.listOfFilterOption.length - 1 ? (activeIndex + 1) : 0;
        this.setActiveOption(this.listOfFilterOption[ nextIndex ]);
      } else if (e.keyCode === ENTER) {
        // enter
        if (this.isTagsMode) {
          if (!this.isAddTagOptionDisplay) {
            this.updateSelectedOption(this.activatedOption, true);
          } else {
            this.addTagOption();
          }
        } else {
          this.updateSelectedOption(this.activatedOption, true);
        }
        this.nzClickOption.emit();
      }
    }
  }

  resetActiveOption(): void {
    const firstActiveOption = this.listOfAllTemplateOption.concat(this.listOfTagOption).find(item => this.compareWith(item.nzValue, this.listOfSelectedValue[ 0 ]));
    this.setActiveOption(firstActiveOption);
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
    /** update listOfSelectedOption -> update listOfSelectedValue -> next listOfSelectedValue$ **/
    if (option && !option.nzDisabled) {
      let changed = false;
      this.setActiveOption(option);
      let listOfSelectedValue = [ ...this.listOfSelectedValue ];
      if (this.isMultipleOrTags) {
        const targetValue = listOfSelectedValue.find(o => this.compareWith(o, option.nzValue));
        if (isNotNil(targetValue)) {
          if (!isPressEnter) {
            /** should not toggle option when press enter **/
            listOfSelectedValue.splice(listOfSelectedValue.indexOf(targetValue), 1);
            changed = true;
          }
        } else if (this.listOfSelectedValue.length < this.nzMaxMultipleCount) {
          listOfSelectedValue.push(option.nzValue);
          changed = true;
        }
      } else if (!this.compareWith(listOfSelectedValue[ 0 ], option.nzValue)) {
        listOfSelectedValue = [ option.nzValue ];
        changed = true;
      }
      /** update selectedValues when click option **/
      if (changed) {
        this.listOfSelectedValue = listOfSelectedValue;
        this.nzSelectService.updateListOfSelectedValue(this.listOfSelectedValue, true);
        this.nzSelectService.clearInput(false);
        if (this.isTagsMode) {
          this.refreshAllOptionStatus();
        }
      }
    }
  }

  refreshListOfTagOption(): void {
    if (this.isTagsMode) {
      /** refresh tags option **/
      const listOfTagsOption = [];
      this.listOfSelectedValue.forEach(value => {
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

  refreshAllOptionStatus(): void {
    /** update listOfSelectedValue | update option list -> update listOfAllTemplateOption -> update listOfSelectedOption -> update activatedOption **/
    this.refreshListOfTagOption();
    this.updateListOfFilterOption();
    this.updateAddTagOptionDisplay();
  }

  updateListOfFilterOption(): void {
    this.listOfFilterOption = new NzOptionPipe().transform(this.listOfAllTemplateOption.concat(this.listOfTagOption), this.searchValue, this.nzFilterOption, this.nzServerSearch) as NzOptionComponent[];
    if (this.searchValue) {
      this.setActiveOption(this.listOfFilterOption[ 0 ]);
    }
  }

  get isNotFoundDisplay(): boolean {
    return (!this.isTagsMode) && (!this.listOfFilterOption.length);
  }

  updateAddTagOptionDisplay(): void {
    const listOfAllOption = this.listOfAllTemplateOption.concat(this.listOfTagOption).map(item => item.nzLabel);
    const isMatch = listOfAllOption.indexOf(this.searchValue) > -1;
    this.isAddTagOptionDisplay = this.isTagsMode && this.searchValue && (!isMatch);
  }

  dropDownScroll(e: MouseEvent, ul: HTMLUListElement): void {
    e.preventDefault();
    e.stopPropagation();
    if (ul && (ul.scrollHeight - ul.scrollTop === ul.clientHeight)) {
      this.nzScrollToBottom.emit();
    }
  }

  constructor(private nzSelectService: NzSelectService) {

  }

  ngOnInit(): void {
    this.nzSelectService.listOfSelectedValue$.subscribe(data => {
      this.listOfSelectedValue = data;
      this.setActiveOption(null);
      this.refreshAllOptionStatus();
    });
    this.nzSelectService.listOfTemplateOption$.subscribe((data) => {
      this.listOfAllTemplateOption = data;
      this.refreshAllOptionStatus();
    });
    this.nzSelectService.searchValue$.subscribe(data => {
      this.searchValue = data;
      this.updateAddTagOptionDisplay();
      this.updateListOfFilterOption();
    });
    this.nzSelectService.open$.subscribe(data => {
      if (data) {
        this.scrollIntoView();
      } else {
        this.resetActiveOption();
      }
    });
    this.nzSelectService.keydown$.subscribe(data => {
      this.onKeyDown(data);
    });
  }

  ngOnDestroy(): void {
  }
}
