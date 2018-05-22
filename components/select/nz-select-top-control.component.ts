import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { isNotNil } from '../core/util/check';
import { NzOptionComponent } from './nz-option.component';

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
  template           : `
    <ng-template #inputTemplate>
      <input
        #inputElement
        autocomplete="off"
        class="ant-select-search__field"
        (compositionstart)="isComposing = true"
        (compositionend)="isComposing = false"
        (input)="updateWidth()"
        (keydown)="onKeyDownInput($event)"
        [ngModel]="inputValue"
        (ngModelChange)="setInputValue($event,true)"
        [disabled]="nzDisabled">
    </ng-template>
    <div
      *ngIf="nzPlaceHolder"
      nz-select-unselectable
      [style.display]="placeHolderDisplay"
      (click)="focusOnInput()"
      class="ant-select-selection__placeholder">
      {{ nzPlaceHolder }}
    </div>
    <!--single mode-->
    <ng-container *ngIf="isSingleMode">
      <!--selected label-->
      <div
        *ngIf="nzListOfSelectedValue.length"
        class="ant-select-selection-selected-value"
        [attr.title]="nzListOfSelectedValue[0].nzLabel"
        [ngStyle]="selectedValueDisplay">
        {{ singleValueLabel }}
      </div>
      <!--show search-->
      <div
        *ngIf="nzShowSearch"
        [style.display]="searchDisplay"
        class="ant-select-search ant-select-search--inline">
        <div class="ant-select-search__field__wrap">
          <ng-template [ngTemplateOutlet]="inputTemplate"></ng-template>
          <span class="ant-select-search__field__mirror">{{inputValue}}&nbsp;</span>
        </div>
      </div>
    </ng-container>
    <!--multiple or tags mode-->
    <ul *ngIf="isMultipleOrTags">
      <ng-container *ngFor="let value of nzListOfSelectedValue">
        <li
          *ngIf="isOptionDisplay(value)"
          [@tagAnimation]
          [attr.title]="getPropertyFromValue(value,'nzLabel')"
          [class.ant-select-selection__choice__disabled]="getPropertyFromValue(value,'nzDisabled')"
          class="ant-select-selection__choice">
          <div class="ant-select-selection__choice__content">{{ getPropertyFromValue(value, 'nzLabel') || value }}</div>
          <span *ngIf="!getPropertyFromValue(value,'nzDisabled')" class="ant-select-selection__choice__remove" (click)="removeValueFormSelected(value)"></span>
        </li>
      </ng-container>

      <li class="ant-select-search ant-select-search--inline">
        <ng-template [ngTemplateOutlet]="inputTemplate"></ng-template>
      </li>
    </ul>
  `,
  host               : {
    '[class.ant-select-selection__rendered]': 'true'
  }
})
export class NzSelectTopControlComponent {
  // tslint:disable-next-line:no-any
  private _listOfSelectedValue: any[];
  private _listTemplateOfOption: NzOptionComponent[] = [];
  listOfCachedSelectedOption: NzOptionComponent[] = [];
  inputValue: string;
  isComposing = false;
  @ViewChild('inputElement') inputElement: ElementRef;
  // tslint:disable-next-line:no-any
  @Output() nzListOfSelectedValueChange = new EventEmitter<any[]>();
  @Output() nzOnSearch = new EventEmitter<{ value: string, emit: boolean }>();
  @Input() nzMode = 'default';
  @Input() nzShowSearch = false;
  @Input() nzDisabled = false;

  @Input() nzPlaceHolder: string;
  @Input() nzOpen = false;
  // tslint:disable-next-line:no-any
  @Input() compareWith: (o1: any, o2: any) => boolean;

  @Input()
  // tslint:disable-next-line:no-any
  set nzListOfSelectedValue(value: any[]) {
    this._listOfSelectedValue = value;
    this.updateListOfCachedOption();
  }

  // tslint:disable-next-line:no-any
  get nzListOfSelectedValue(): any[] {
    return this._listOfSelectedValue;
  }

  @Input()
  set nzListTemplateOfOption(value: NzOptionComponent[]) {
    this._listTemplateOfOption = value;
    this.updateListOfCachedOption();
  }

  get nzListTemplateOfOption(): NzOptionComponent[] {
    return this._listTemplateOfOption;
  }

  /** cached selected option list **/
  updateListOfCachedOption(): void {
    if (this.isSingleMode) {
      const selectedOption = this.nzListTemplateOfOption.find(o => this.compareWith(o.nzValue, this.nzListOfSelectedValue[ 0 ]));
      if (isNotNil(selectedOption)) {
        this.listOfCachedSelectedOption = [ selectedOption ];
      }
    } else {
      const listOfCachedOptionFromLatestTemplate = this.nzListTemplateOfOption.filter(o => isNotNil(this.nzListOfSelectedValue.find(v => this.compareWith(v, o.nzValue))));
      const restSelectedValue = this.nzListOfSelectedValue.filter(v => !isNotNil(listOfCachedOptionFromLatestTemplate.find(o => this.compareWith(o.nzValue, v))));
      const listOfCachedOptionFromOld = this.listOfCachedSelectedOption.filter(o => isNotNil(restSelectedValue.find(v => this.compareWith(o.nzValue, v))));
      this.listOfCachedSelectedOption = listOfCachedOptionFromLatestTemplate.concat(listOfCachedOptionFromOld);
    }
  }

  setInputValue(value: string, emit: boolean): void {
    this.inputValue = value;
    this.updateWidth();
    this.nzOnSearch.emit({ value, emit });
  }

  get isSingleMode(): boolean {
    return this.nzMode === 'default';
  }

  get isMultipleOrTags(): boolean {
    return this.nzMode === 'tags' || this.nzMode === 'multiple';
  }

  get placeHolderDisplay(): string {
    return this.inputValue || this.isComposing || this.nzListOfSelectedValue.length ? 'none' : 'block';
  }

  get searchDisplay(): string {
    return this.nzOpen ? 'block' : 'none';
  }

  get selectedValueDisplay(): { [key: string]: string } {
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
    return this.getPropertyFromValue(this.nzListOfSelectedValue[ 0 ], 'nzLabel');
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
    const targetOption = this.listOfCachedSelectedOption.find(item => this.compareWith(item.nzValue, value));
    return targetOption ? targetOption[ prop ] : '';
  }

  // tslint:disable-next-line:no-any
  isOptionDisplay(value: any): boolean {
    return (this.nzMode === 'tags') || !!this.getPropertyFromValue(value, 'nzLabel');
  }

  // tslint:disable-next-line:no-any
  removeValueFormSelected(value: any): void {
    if (this.nzDisabled || this.getPropertyFromValue(value, 'nzDisabled')) {
      return;
    }
    this._listOfSelectedValue = this.nzListOfSelectedValue.filter(item => item !== value);
    this.nzListOfSelectedValueChange.emit(this.nzListOfSelectedValue);
  }

  updateWidth(): void {
    if (this.isMultipleOrTags && this.inputElement) {
      if (this.inputValue || this.isComposing) {
        this.renderer.setStyle(this.inputElement.nativeElement, 'width', `${this.inputElement.nativeElement.scrollWidth}px`);
      } else {
        this.renderer.removeStyle(this.inputElement.nativeElement, 'width');
      }
    }
  }

  onKeyDownInput(e: KeyboardEvent): void {
    const keyCode = e.keyCode;
    const eventTarget = e.target as HTMLInputElement;
    if (
      this.isMultipleOrTags &&
      !eventTarget.value &&
      // BackSpace
      keyCode === 8
    ) {
      e.preventDefault();
      if (this.nzListOfSelectedValue.length) {
        this.removeValueFormSelected(this.nzListOfSelectedValue[ this.nzListOfSelectedValue.length - 1 ]);
      }
    }
  }

  constructor(private renderer: Renderer2) {

  }
}
