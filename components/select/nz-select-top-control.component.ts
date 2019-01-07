import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isNotNil } from '../core/util/check';
import { NzOptionComponent } from './nz-option.component';
import { NzSelectService } from './nz-select.service';

@Component({
  selector           : '[nz-select-top-control]',
  preserveWhitespaces: false,
  animations         : [
    trigger('tagAnimation', [
      state('*', style({ opacity: 1, transform: 'scale(1)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate('150ms linear')
      ]),
      state('void', style({ opacity: 0, transform: 'scale(0)' })),
      transition('* => void', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('150ms linear')
      ])
    ])
  ],
  templateUrl        : './nz-select-top-control.component.html',
  host               : {
    '[class.ant-select-selection__rendered]': 'true'
  }
})
export class NzSelectTopControlComponent implements OnInit, OnDestroy {
  listOfCachedSelectedOption: NzOptionComponent[] = [];
  inputValue: string;
  isComposing = false;
  destroy$ = new Subject();
  @ViewChild('inputElement') inputElement: ElementRef;
  @Input() nzShowSearch = false;
  @Input() nzDisabled = false;
  @Input() nzPlaceHolder: string;
  @Input() nzOpen = false;

  /** cached selected option list **/
  updateListOfCachedOption(): void {
    if (this.nzSelectService.isSingleMode) {
      const selectedOption = this.nzSelectService.listOfTemplateOption.find(o => this.nzSelectService.compareWith(o.nzValue, this.nzSelectService.listOfSelectedValue[ 0 ]));
      if (isNotNil(selectedOption)) {
        this.listOfCachedSelectedOption = [ selectedOption ];
      }
    } else {
      const listOfCachedOptionFromLatestTemplate = this.nzSelectService.listOfTemplateOption.filter(o => isNotNil(this.nzSelectService.listOfSelectedValue.find(v => this.nzSelectService.compareWith(v, o.nzValue))));
      const restSelectedValue = this.nzSelectService.listOfSelectedValue.filter(v => !isNotNil(listOfCachedOptionFromLatestTemplate.find(o => this.nzSelectService.compareWith(o.nzValue, v))));
      const listOfCachedOptionFromOld = this.listOfCachedSelectedOption.filter(o => isNotNil(restSelectedValue.find(v => this.nzSelectService.compareWith(o.nzValue, v))));
      this.listOfCachedSelectedOption = listOfCachedOptionFromLatestTemplate.concat(listOfCachedOptionFromOld);
    }
  }

  setInputValue(value: string): void {
    this.inputValue = value;
    this.updateWidth();
    this.nzSelectService.updateSearchValue(value);
  }

  get placeHolderDisplay(): string {
    return this.inputValue || this.isComposing || this.nzSelectService.listOfSelectedValue.length ? 'none' : 'block';
  }

  get selectedValueDisplay(): { [ key: string ]: string } {
    let showSelectedValue = false;
    let opacity = 1;
    if (!this.nzShowSearch) {
      showSelectedValue = true;
    } else {
      if (this.nzOpen) {
        showSelectedValue = !(this.inputValue || this.isComposing);
        if (showSelectedValue) {
          opacity = 0.4;
        }
      } else {
        showSelectedValue = true;
      }
    }
    return {
      display: showSelectedValue ? 'block' : 'none',
      opacity: `${opacity}`
    };
  }

  get singleValueLabel(): string {
    return this.getPropertyFromValue(this.nzSelectService.listOfSelectedValue[ 0 ], 'nzLabel');
  }

  focusOnInput(): void {
    setTimeout(() => {
      if (this.inputElement) {
        this.inputElement.nativeElement.focus();
      }
    });
  }

  // tslint:disable-next-line:no-any
  getPropertyFromValue(value: any, prop: string): string {
    const targetOption = this.listOfCachedSelectedOption.find(item => this.nzSelectService.compareWith(item.nzValue, value));
    return targetOption ? targetOption[ prop ] : '';
  }

  // tslint:disable-next-line:no-any
  isOptionDisplay(value: any): boolean {
    return this.nzSelectService.isTagsMode || !!this.getPropertyFromValue(value, 'nzLabel');
  }

  // tslint:disable-next-line:no-any
  removeValueFormSelected(value: any, event?: MouseEvent): void {
    if (this.nzDisabled || this.getPropertyFromValue(value, 'nzDisabled')) {
      return;
    }
    const listOfSelectedValue = this.nzSelectService.listOfSelectedValue.filter(item => item !== value);
    this.nzSelectService.clearInput();
    this.nzSelectService.updateListOfSelectedValue(listOfSelectedValue, true);

    // Do not trigger the popup
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
  }

  updateWidth(): void {
    if (this.nzSelectService.isMultipleOrTags && this.inputElement) {
      if (this.inputValue || this.isComposing) {
        this.renderer.setStyle(this.inputElement.nativeElement, 'width', `${this.inputElement.nativeElement.scrollWidth}px`);
      } else {
        this.renderer.removeStyle(this.inputElement.nativeElement, 'width');
      }
    }
  }

  onKeyDown(e: KeyboardEvent): void {
    const keyCode = e.keyCode;
    const eventTarget = e.target as HTMLInputElement;
    if (
      this.nzSelectService.isMultipleOrTags &&
      !eventTarget.value &&
      // BackSpace
      keyCode === 8
    ) {
      e.preventDefault();
      if (this.nzSelectService.listOfSelectedValue.length) {
        this.removeValueFormSelected(this.nzSelectService.listOfSelectedValue[ this.nzSelectService.listOfSelectedValue.length - 1 ]);
      }
    }
  }

  constructor(private renderer: Renderer2, public nzSelectService: NzSelectService) {

  }

  ngOnInit(): void {
    this.nzSelectService.valueOrOption$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateListOfCachedOption();
    });
    this.nzSelectService.open$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (data) {
        this.focusOnInput();
      }
      this.nzSelectService.clearInput();
    });
    this.nzSelectService.clearInput$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.setInputValue('');
    });
    this.nzSelectService.keydown$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.onKeyDown(data);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
