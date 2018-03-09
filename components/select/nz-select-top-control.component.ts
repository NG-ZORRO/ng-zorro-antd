import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, Renderer2,
  ViewChild
} from '@angular/core';
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
        (compositionstart)="compositionStart()"
        (compositionend)="compositionEnd()"
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
        {{ getPropertyFromValue(nzListOfSelectedValue[0], 'nzLabel') }}
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
  private _open = false;
  inputValue: string;
  composing = false;
  @ViewChild('inputElement') inputElement: ElementRef;
  // tslint:disable-next-line:no-any
  // tslint:disable-next-line:no-any
  @Output() nzListOfSelectedValueChange = new EventEmitter<any[]>();
  @Output() nzOnSearch = new EventEmitter<string>();
  @Input() nzMode = 'default';
  @Input() nzShowSearch = false;
  @Input() nzDisabled = false;
  @Input() nzListOfOption: NzOptionComponent[] = [];

  @Input()
  // tslint:disable-next-line:no-any
  set nzListOfSelectedValue(value: any[]) {
    this._listOfSelectedValue = value;
  }

  // tslint:disable-next-line:no-any
  get nzListOfSelectedValue(): any[] {
    return this._listOfSelectedValue;
  }

  @Input()
  set nzOpen(value: boolean) {
    this._open = value;
    if (this.nzOpen) {
      this.focusOnInput();
      this.setInputValue('', true);
    } else {
      this.setInputValue('', false);
    }
  }

  get nzOpen(): boolean {
    return this._open;
  }

  @Input() nzPlaceHolder: string;

  setInputValue(value: string, emit: boolean): void {
    this.inputValue = value;
    this.updateWidth();
    if (emit) {
      this.nzOnSearch.emit(value);
    }
  }

  get isSingleMode(): boolean {
    return this.nzMode === 'default';
  }

  get isMultipleOrTags(): boolean {
    return this.nzMode === 'tags' || this.nzMode === 'multiple';
  }

  get placeHolderDisplay(): string {
    return this.inputValue || this.nzListOfSelectedValue.length ? 'none' : 'block';
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
        showSelectedValue = !(this.inputValue || this.composing);
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

  focusOnInput(): void {
    setTimeout(() => {
      if (this.inputElement) {
        this.inputElement.nativeElement.focus();
      }
    });
  }

  // tslint:disable-next-line:no-any
  getPropertyFromValue(value: any, prop: string): string {
    const targetOption = this.nzListOfOption.find(item => item.nzValue === value);
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

  compositionStart(): void {
    this.composing = true;
  }

  compositionEnd(): void {
    this.composing = false;
  }

  updateWidth(): void {
    if (this.isMultipleOrTags && this.inputElement) {
      if (this.inputValue) {
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

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {

  }
}
