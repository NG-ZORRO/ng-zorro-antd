import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import {
  forwardRef,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChange,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNotNil } from '../core/util/check';
import { toBoolean } from '../core/util/convert';
import { NzOptionContainerComponent } from './nz-option-container.component';
import { NzOptionGroupComponent } from './nz-option-group.component';
import { NzOptionComponent } from './nz-option.component';
import { defaultFilterOption, TFilterOption } from './nz-option.pipe';
import { NzSelectTopControlComponent } from './nz-select-top-control.component';

@Component({
  selector           : 'nz-select',
  preserveWhitespaces: false,
  providers          : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzSelectComponent),
      multi      : true
    }
  ],
  animations         : [
    trigger('dropDownAnimation', [
      state('hidden', style({
        opacity: 0,
        display: 'none'
      })),
      state('bottom', style({
        opacity        : 1,
        transform      : 'scaleY(1)',
        transformOrigin: '0% 0%'
      })),
      state('top', style({
        opacity        : 1,
        transform      : 'scaleY(1)',
        transformOrigin: '0% 100%'
      })),
      transition('hidden => bottom', [
        style({
          opacity        : 0,
          transform      : 'scaleY(0.8)',
          transformOrigin: '0% 0%'
        }),
        animate('100ms cubic-bezier(0.755, 0.05, 0.855, 0.06)')
      ]),
      transition('bottom => hidden', [
        animate('100ms cubic-bezier(0.755, 0.05, 0.855, 0.06)', style({
          opacity        : 0,
          transform      : 'scaleY(0.8)',
          transformOrigin: '0% 0%'
        }))
      ]),
      transition('hidden => top', [
        style({
          opacity        : 0,
          transform      : 'scaleY(0.8)',
          transformOrigin: '0% 100%'
        }),
        animate('100ms cubic-bezier(0.755, 0.05, 0.855, 0.06)')
      ]),
      transition('top => hidden', [
        animate('100ms cubic-bezier(0.755, 0.05, 0.855, 0.06)', style({
          opacity        : 0,
          transform      : 'scaleY(0.8)',
          transformOrigin: '0% 100%'
        }))
      ])
    ])
  ],
  template           : `
    <div
      cdkOverlayOrigin
      class="ant-select-selection"
      [class.ant-select-selection--single]="isSingleMode"
      [class.ant-select-selection--multiple]="isMultipleOrTags"
      (keydown)="onKeyDownCdkOverlayOrigin($event)"
      tabindex="0">
      <div
        nz-select-top-control
        [nzOpen]="nzOpen"
        [compareWith]="compareWith"
        [nzPlaceHolder]="nzPlaceHolder"
        [nzShowSearch]="nzShowSearch"
        [nzDisabled]="nzDisabled"
        [nzMode]="nzMode"
        [nzListTemplateOfOption]="listOfTemplateOption"
        [nzListOfSelectedValue]="listOfSelectedValue"
        (nzOnSearch)="onSearch($event.value,$event.emit)"
        (nzListOfSelectedValueChange)="updateListOfSelectedValueFromTopControl($event)">
      </div>
      <span *ngIf="nzAllowClear" class="ant-select-selection__clear" nz-select-unselectable (click)="onClearSelection($event)"></span>
      <span class="ant-select-arrow" nz-select-unselectable><b></b></span>
    </div>
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayOrigin]="cdkOverlayOrigin"
      (backdropClick)="closeDropDown()"
      (detach)="closeDropDown();"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayWidth]="overlayWidth"
      [cdkConnectedOverlayMinWidth]="overlayMinWidth"
      [cdkConnectedOverlayOpen]="!isDestroy">
      <div [ngClass]="dropDownClassMap" [@dropDownAnimation]="nzOpen ? dropDownPosition : 'hidden' " [ngStyle]="nzDropdownStyle">
        <div
          style="overflow: auto"
          nz-option-container
          [listOfNzOptionComponent]="listOfNzOptionComponent"
          [listOfNzOptionGroupComponent]="listOfNzOptionGroupComponent"
          [nzSearchValue]="searchValue"
          [nzFilterOption]="nzFilterOption"
          [nzServerSearch]="nzServerSearch"
          [compareWith]="compareWith"
          [nzNotFoundContent]="nzNotFoundContent"
          [nzMaxMultipleCount]="nzMaxMultipleCount"
          [nzMode]="nzMode"
          (nzScrollToBottom)="nzScrollToBottom.emit()"
          (nzClickOption)="onClickOptionFromOptionContainer()"
          (nzListOfTemplateOptionChange)="listOfTemplateOptionChange($event)"
          (nzListOfSelectedValueChange)="updateListOfSelectedValueFromOptionContainer($event)"
          [nzListOfSelectedValue]="listOfSelectedValue">
        </div>
      </div>
    </ng-template>
    <!--can not use ViewChild since it will match sub options in option group -->
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  host               : {
    '[class.ant-select]'            : 'true',
    '[class.ant-select-lg]'         : 'nzSize==="large"',
    '[class.ant-select-sm]'         : 'nzSize==="small"',
    '[class.ant-select-enabled]'    : '!nzDisabled',
    '[class.ant-select-disabled]'   : 'nzDisabled',
    '[class.ant-select-allow-clear]': 'nzAllowClear',
    '[class.ant-select-open]'       : 'nzOpen'
  },
  styles             : [ `
    .ant-select-dropdown {
      top: 100%;
      left: 0;
      position: relative;
      width: 100%;
      margin-top: 4px;
      margin-bottom: 4px;
    }
  ` ]
})
export class NzSelectComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  private _disabled = false;
  private _allowClear = false;
  private _showSearch = false;
  private _open = false;
  private _placeholder: string;
  private _autoFocus = false;
  private _dropdownClassName: string;
  onChange: (value: string | string[]) => void = () => null;
  onTouched: () => void = () => null;
  dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
  // tslint:disable-next-line:no-any
  listOfSelectedValue: any[] = [];
  listOfTemplateOption: NzOptionComponent[] = [];
  // tslint:disable-next-line:no-any
  value: any | any[];
  overlayWidth: number;
  overlayMinWidth: number;
  searchValue: string = '';
  isDestroy = true;
  isInit = false;
  dropDownClassMap;
  @ViewChild(CdkOverlayOrigin) cdkOverlayOrigin: CdkOverlayOrigin;
  @ViewChild(CdkConnectedOverlay) cdkConnectedOverlay: CdkConnectedOverlay;
  @ViewChild(NzSelectTopControlComponent) nzSelectTopControlComponent: NzSelectTopControlComponent;
  @ViewChild(NzOptionContainerComponent) nzOptionContainerComponent: NzOptionContainerComponent;
  /** should move to nz-option-container when https://github.com/angular/angular/issues/20810 resolved **/
  @ContentChildren(NzOptionComponent) listOfNzOptionComponent: QueryList<NzOptionComponent>;
  @ContentChildren(NzOptionGroupComponent) listOfNzOptionGroupComponent: QueryList<NzOptionGroupComponent>;
  @Output() nzOnSearch = new EventEmitter<string>();
  @Output() nzScrollToBottom = new EventEmitter<void>();
  @Output() nzOpenChange = new EventEmitter<boolean>();
  @Input() nzSize = 'default';
  @Input() nzServerSearch = false;
  @Input() nzMode: 'default' | 'multiple' | 'tags' = 'default';
  @Input() nzDropdownMatchSelectWidth = true;
  @Input() nzFilterOption: TFilterOption = defaultFilterOption;
  @Input() nzMaxMultipleCount = Infinity;
  @Input() nzDropdownStyle: { [key: string]: string; };
  @Input() nzNotFoundContent: string;
  /** https://github.com/angular/angular/pull/13349/files **/
           // tslint:disable-next-line:no-any
  @Input() compareWith = (o1: any, o2: any) => o1 === o2;

  @Input()
  set nzDropdownClassName(value: string) {
    this._dropdownClassName = value;
    this.updateDropDownClassMap();
  }

  get nzDropdownClassName(): string {
    return this._dropdownClassName;
  }

  @Input()
  set nzAutoFocus(value: boolean) {
    this._autoFocus = toBoolean(value);
    this.updateAutoFocus();
  }

  get nzAutoFocus(): boolean {
    return this._autoFocus;
  }

  @Input()
  set nzOpen(value: boolean) {
    this._open = value;
    this.handleEscBug();
    this.updateCdkConnectedOverlayStatus();
    this.updateDropDownClassMap();
    if (this.nzOpen) {
      if (this.nzSelectTopControlComponent) {
        this.nzSelectTopControlComponent.focusOnInput();
        this.nzSelectTopControlComponent.setInputValue('', true);
      }
      if (this.nzOptionContainerComponent) {
        this.nzOptionContainerComponent.scrollIntoView();
      }
      if (this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef) {
        this.cdkConnectedOverlay.overlayRef.updatePosition();
      }
    } else {
      if (this.nzSelectTopControlComponent) {
        this.nzSelectTopControlComponent.setInputValue('', false);
      }
      if (this.nzOptionContainerComponent) {
        this.nzOptionContainerComponent.resetActiveOption();
      }
    }
  }

  get nzOpen(): boolean {
    return this._open;
  }

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
    if (this.nzDisabled) {
      this.closeDropDown();
    }
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  set nzAllowClear(value: boolean) {
    this._allowClear = toBoolean(value);
  }

  get nzAllowClear(): boolean {
    return this._allowClear;
  }

  @Input()
  set nzShowSearch(value: boolean) {
    this._showSearch = toBoolean(value);
  }

  get nzShowSearch(): boolean {
    return this._showSearch;
  }

  @Input()
  set nzPlaceHolder(value: string) {
    this._placeholder = value;
  }

  get nzPlaceHolder(): string {
    return this._placeholder;
  }

  @HostListener('click')
  onClick(): void {
    if (!this.nzDisabled) {
      this.nzOpen = !this.nzOpen;
      this.nzOpenChange.emit(this.nzOpen);
    }
  }

  updateAutoFocus(): void {
    if (this.isInit && this.nzSelectTopControlComponent.inputElement) {
      if (this.nzAutoFocus) {
        this.renderer.setAttribute(this.nzSelectTopControlComponent.inputElement.nativeElement, 'autofocus', 'autofocus');
      } else {
        this.renderer.removeAttribute(this.nzSelectTopControlComponent.inputElement.nativeElement, 'autofocus');
      }
    }
  }

  focus(): void {
    if (this.nzSelectTopControlComponent.inputElement) {
      this.nzSelectTopControlComponent.inputElement.nativeElement.focus();
    }
  }

  blur(): void {
    if (this.nzSelectTopControlComponent.inputElement) {
      this.nzSelectTopControlComponent.inputElement.nativeElement.blur();
    }
  }

  /** overlay can not be always open , reopen overlay after press esc **/
  handleEscBug(): void {
    if (this.nzOpen && this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef && !this.cdkConnectedOverlay.overlayRef.backdropElement) {
      this.cdkConnectedOverlay.open = true;
      this.cdkConnectedOverlay.ngOnChanges({ open: new SimpleChange(false, true, false) });
    }
  }

  onKeyDownCdkOverlayOrigin(e: KeyboardEvent): void {
    if (this.nzOptionContainerComponent) {
      this.nzOptionContainerComponent.onKeyDownUl(e);
    }
  }

  closeDropDown(): void {
    if (this.nzOpen) {
      this.onTouched();
      this.nzOpen = false;
      this.nzOpenChange.emit(this.nzOpen);
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.dropDownPosition = position.connectionPair.originY;
    this.updateDropDownClassMap();
  }

  onClickOptionFromOptionContainer(): void {
    if (this.isSingleMode) {
      this.closeDropDown();
    } else if (this.nzMode === 'tags') {
      this.onSearch('', true);
    }
  }

  updateCdkConnectedOverlayStatus(): void {
    if (this.isInit && this.nzOpen && this.cdkOverlayOrigin) {
      if (this.nzDropdownMatchSelectWidth) {
        this.overlayWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
        this.cdkConnectedOverlay.overlayRef.updateSize({ width: this.overlayWidth });
      } else {
        this.overlayMinWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
        this.cdkConnectedOverlay.overlayRef.updateSize({ minWidth: this.overlayMinWidth });
      }

    }
    this.updateCdkConnectedOverlayPositions();
    if (this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef && this.cdkConnectedOverlay.overlayRef.backdropElement) {
      if (this.nzOpen) {
        this.renderer.removeStyle(this.cdkConnectedOverlay.overlayRef.backdropElement, 'display');
      } else {
        this.renderer.setStyle(this.cdkConnectedOverlay.overlayRef.backdropElement, 'display', 'none');
      }
    }
  }

  updateCdkConnectedOverlayPositions(): void {
    /** wait for input size change **/
    setTimeout(() => this.cdkConnectedOverlay.overlayRef.updatePosition(), 160);
  }

  get isSingleMode(): boolean {
    return this.nzMode === 'default';
  }

  get isMultipleOrTags(): boolean {
    return this.nzMode === 'tags' || this.nzMode === 'multiple';
  }

  /** option container nzListOfSelectedValueChange -> update ngModel **/
  // tslint:disable-next-line:no-any
  updateListOfSelectedValueFromOptionContainer(value: any[]): void {
    this.clearSearchValue();
    this.updateFromSelectedList(value);
  }

  /** option container nzListOfSelectedValueChange -> update ngModel **/
  // tslint:disable-next-line:no-any
  updateListOfSelectedValueFromTopControl(value: any[]): void {
    this.clearSearchValue();
    this.updateFromSelectedList(value);
  }

  // tslint:disable-next-line:no-any
  updateFromSelectedList(value: any[]): void {
    let modelValue;
    if (this.isSingleMode) {
      if (value.length) {
        modelValue = value[ 0 ];
      }
    } else {
      modelValue = value;
      this.updateCdkConnectedOverlayPositions();
    }
    this.updateNgModel(value, modelValue);
  }

  onSearch(value: string, emit: boolean): void {
    if (emit && (this.searchValue !== value)) {
      this.nzOnSearch.emit(value);
      this.searchValue = value;
    }
  }

  clearNgModel(): void {
    if (this.isSingleMode) {
      this.updateNgModel([], null);
    } else {
      this.updateNgModel([], []);
    }
  }

  // tslint:disable-next-line:no-any
  updateNgModel(list: any[], value: string | string[]): void {
    this.listOfSelectedValue = list;
    if (value !== this.value) {
      this.value = value;
      this.onChange(this.value);
    }
  }

  listOfTemplateOptionChange(value: NzOptionComponent[]): void {
    this.listOfTemplateOption = value;
  }

  updateDropDownClassMap(): void {
    this.dropDownClassMap = {
      [ 'ant-select-dropdown' ]                     : true,
      [ `ant-select-dropdown--single` ]             : this.isSingleMode,
      [ `ant-select-dropdown--multiple` ]           : this.isMultipleOrTags,
      [ `ant-select-dropdown-placement-bottomLeft` ]: this.dropDownPosition === 'bottom',
      [ `ant-select-dropdown-placement-topLeft` ]   : this.dropDownPosition === 'top',
      [ `${this.nzDropdownClassName}` ]             : !!this.nzDropdownClassName
    };
  }

  onClearSelection(e: MouseEvent): void {
    // TODO: should not clear disabled option ?
    e.stopPropagation();
    this.clearNgModel();
  }

  clearSearchValue(): void {
    if (this.isSingleMode) {
      this.nzSelectTopControlComponent.setInputValue('', false);
    } else {
      this.nzSelectTopControlComponent.setInputValue('', false);
    }
  }

  constructor(private renderer: Renderer2) {
  }

  /** update ngModel -> update listOfSelectedValue **/
  // tslint:disable-next-line:no-any
  writeValue(value: any | any[]): void {
    this.value = value;
    if (isNotNil(value)) {
      if (Array.isArray(value)) {
        this.listOfSelectedValue = value;
      } else {
        this.listOfSelectedValue = [ value ];
      }
    } else {
      this.listOfSelectedValue = [];
    }
  }

  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

  ngOnInit(): void {
    this.isDestroy = false;
    this.updateDropDownClassMap();
  }

  ngAfterViewInit(): void {
    this.isInit = true;
    Promise.resolve().then(() => this.updateCdkConnectedOverlayStatus());
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
  }
}
