import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { DOWN_ARROW, SPACE, TAB } from '@angular/cdk/keycodes';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import {
  forwardRef,
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, EMPTY } from 'rxjs';
import { distinctUntilChanged, flatMap, startWith } from 'rxjs/operators';
import { isNotNil } from '../core/util/check';
import { toBoolean, InputBoolean } from '../core/util/convert';
import { NzOptionGroupComponent } from './nz-option-group.component';
import { NzOptionComponent } from './nz-option.component';
import { defaultFilterOption, TFilterOption } from './nz-option.pipe';
import { NzSelectTopControlComponent } from './nz-select-top-control.component';
import { NzSelectService } from './nz-select.service';

@Component({
  selector           : 'nz-select',
  viewProviders      : [ NzSelectService ],
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
  templateUrl        : './nz-select.component.html',
  host               : {
    '[class.ant-select]'            : 'true',
    '[class.ant-select-lg]'         : 'nzSize==="large"',
    '[class.ant-select-sm]'         : 'nzSize==="small"',
    '[class.ant-select-enabled]'    : '!nzDisabled',
    '[class.ant-select-disabled]'   : 'nzDisabled',
    '[class.ant-select-allow-clear]': 'nzAllowClear',
    '[class.ant-select-open]'       : 'nzOpen',
    '(click)'                       : 'toggleDropDown()'
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
export class NzSelectComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy, AfterContentInit {
  private _disabled = false;
  private _open = false;
  private _autoFocus = false;
  onChange: (value: string | string[]) => void = () => null;
  onTouched: () => void = () => null;
  dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
  // tslint:disable-next-line:no-any
  value: any | any[];
  overlayWidth: number;
  overlayMinWidth: number;
  @ViewChild(CdkOverlayOrigin) cdkOverlayOrigin: CdkOverlayOrigin;
  @ViewChild(CdkConnectedOverlay) cdkConnectedOverlay: CdkConnectedOverlay;
  @ViewChild(NzSelectTopControlComponent) nzSelectTopControlComponent: NzSelectTopControlComponent;
  /** should move to nz-option-container when https://github.com/angular/angular/issues/20810 resolved **/
  @ContentChildren(NzOptionComponent) listOfNzOptionComponent: QueryList<NzOptionComponent>;
  @ContentChildren(NzOptionGroupComponent) listOfNzOptionGroupComponent: QueryList<NzOptionGroupComponent>;
  @Output() readonly nzOnSearch = new EventEmitter<string>();
  @Output() readonly nzScrollToBottom = new EventEmitter<void>();
  @Output() readonly nzOpenChange = new EventEmitter<boolean>();
  @Input() nzSize = 'default';
  @Input() nzDropdownClassName: string;
  @Input() nzDropdownMatchSelectWidth = true;
  @Input() nzDropdownStyle: { [ key: string ]: string; };
  @Input() nzNotFoundContent: string;
  @Input() @InputBoolean() nzAllowClear = false;
  @Input() @InputBoolean() nzShowSearch = false;
  @Input() nzPlaceHolder: string;

  @Input() set nzMaxMultipleCount(value: number) {
    this.nzSelectService.maxMultipleCount = value;
  }

  @Input()
  set nzServerSearch(value: boolean) {
    this.nzSelectService.serverSearch = value;
  }

  @Input()
  set nzMode(value: 'default' | 'multiple' | 'tags') {
    this.nzSelectService.mode = value;
  }

  @Input() set nzFilterOption(value: TFilterOption) {
    this.nzSelectService.filterOption = value;
  }

  @Input()
  // tslint:disable-next-line:no-any
  set compareWith(value: (o1: any, o2: any) => boolean) {
    this.nzSelectService.compareWith = value;
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
    this.updateCdkConnectedOverlayStatus();
    this.nzSelectService.open$.next(value);
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

  updateAutoFocus(): void {
    if (this.nzSelectTopControlComponent.inputElement) {
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

  onKeyDown(event: KeyboardEvent): void {
    this.nzSelectService.onKeyDown(event);
    if (!this.nzDisabled) {
      const keyCode = event.keyCode;
      if (keyCode === SPACE || keyCode === DOWN_ARROW) {
        this.openDropDown();
        event.preventDefault();
      }
      if (keyCode === TAB) {
        // if (keyCode === SPACE || keyCode === TAB) { // #2201
        this.closeDropDown();
        event.preventDefault();
      }
    }
  }

  toggleDropDown(): void {
    if (!this.nzDisabled) {
      if (this.nzOpen) {
        this.closeDropDown();
      } else {
        this.openDropDown();
      }
    }
  }

  openDropDown(): void {
    if (!this.nzOpen) {
      this.nzOpen = true;
      this.nzOpenChange.emit(this.nzOpen);
    }
  }

  closeDropDown(): void {
    if (this.nzOpen) {
      this.nzOpen = false;
      this.nzOpenChange.emit(this.nzOpen);
      this.blur();
      this.onTouched();
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.dropDownPosition = position.connectionPair.originY;
  }

  updateCdkConnectedOverlayStatus(): void {
    // TODO
    setTimeout(() => {
      if (this.nzOpen && this.cdkOverlayOrigin && this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef) {
        if (this.nzDropdownMatchSelectWidth) {
          this.overlayWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
          this.cdkConnectedOverlay.overlayRef.updateSize({ width: this.overlayWidth });
        } else {
          this.overlayMinWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
          this.cdkConnectedOverlay.overlayRef.updateSize({ minWidth: this.overlayMinWidth });
        }
      }
    });
  }

  updateCdkConnectedOverlayPositions(): void {
    /** wait for input size change **/
    setTimeout(() => this.cdkConnectedOverlay.overlayRef.updatePosition(), 160);
  }

  onClearSelection(e: MouseEvent): void {
    e.stopPropagation();
    this.nzSelectService.updateListOfSelectedValue([], true);
  }

  constructor(private renderer: Renderer2, public nzSelectService: NzSelectService) {
  }

  /** update ngModel -> update listOfSelectedValue **/
  // tslint:disable-next-line:no-any
  writeValue(value: any | any[]): void {
    this.value = value;
    let listValue = [];
    if (isNotNil(value)) {
      if (Array.isArray(value)) {
        listValue = value;
      } else {
        listValue = [ value ];
      }
    }
    this.nzSelectService.updateListOfSelectedValue(listValue, false);
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
    this.nzSelectService.searchValue$.subscribe(data => {
      this.nzOnSearch.emit(data);
    });
    this.nzSelectService.listOfSelectedValueShouldEmit$.subscribe(selectedList => {
      let modelValue = null;
      if (this.nzSelectService.isSingleMode) {
        if (selectedList.length) {
          modelValue = selectedList[ 0 ];
        }
      } else {
        modelValue = selectedList;
        this.updateCdkConnectedOverlayPositions();
      }
      if (modelValue !== this.value) {
        this.value = modelValue;
        this.onChange(this.value);
      }
    });
    this.nzSelectService.clickOption$.subscribe(() => {
      if (this.nzSelectService.isSingleMode) {
        this.closeDropDown();
      } else if (this.nzSelectService.isTagsMode) {
        this.nzSelectService.clearInput();
      }
    });
  }

  ngAfterViewInit(): void {
    this.updateCdkConnectedOverlayStatus();
  }

  ngAfterContentInit(): void {
    this.listOfNzOptionGroupComponent.changes.pipe(startWith(true), flatMap(() => merge(
      this.listOfNzOptionGroupComponent.changes,
      this.listOfNzOptionComponent.changes,
      ...this.listOfNzOptionGroupComponent.map(group => group.listOfNzOptionComponent ? group.listOfNzOptionComponent.changes : EMPTY)
    ).pipe(startWith(true)))).subscribe(() => {
      this.nzSelectService.updateTemplateOption(this.listOfNzOptionComponent.toArray(), this.listOfNzOptionGroupComponent.toArray());
    });
  }

  ngOnDestroy(): void {
  }
}
