/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import {
  forwardRef,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, EMPTY, Subject } from 'rxjs';
import { flatMap, startWith, takeUntil } from 'rxjs/operators';

import {
  isNotNil,
  slideMotion,
  toBoolean,
  InputBoolean,
  NzNoAnimationDirective,
  NzSizeLDSType
} from 'ng-zorro-antd/core';

import { NzOptionGroupComponent } from './nz-option-group.component';
import { NzOptionComponent } from './nz-option.component';
import { TFilterOption } from './nz-option.pipe';
import { NzSelectTopControlComponent } from './nz-select-top-control.component';
import { NzSelectService } from './nz-select.service';

@Component({
  selector: 'nz-select',
  exportAs: 'nzSelect',
  preserveWhitespaces: false,
  providers: [
    NzSelectService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzSelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [slideMotion],
  templateUrl: './nz-select.component.html',
  host: {
    '[class.ant-select-lg]': 'nzSize==="large"',
    '[class.ant-select-sm]': 'nzSize==="small"',
    '[class.ant-select-enabled]': '!nzDisabled',
    '[class.ant-select-no-arrow]': '!nzShowArrow',
    '[class.ant-select-disabled]': 'nzDisabled',
    '[class.ant-select-allow-clear]': 'nzAllowClear',
    '[class.ant-select-open]': 'open',
    '(click)': 'toggleDropDown()'
  },
  styles: [
    `
      .ant-select-dropdown {
        top: 100%;
        left: 0;
        position: relative;
        width: 100%;
        margin-top: 4px;
        margin-bottom: 4px;
      }
    `
  ]
})
export class NzSelectComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy, AfterContentInit {
  open = false;
  // tslint:disable-next-line:no-any
  value: any | any[];
  onChange: (value: string | string[]) => void = () => null;
  onTouched: () => void = () => null;
  dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
  triggerWidth: number;
  private _disabled = false;
  private isInit = false;
  private destroy$ = new Subject();
  @ViewChild(CdkOverlayOrigin, { static: false }) cdkOverlayOrigin: CdkOverlayOrigin;
  @ViewChild(CdkConnectedOverlay, { static: false }) cdkConnectedOverlay: CdkConnectedOverlay;
  @ViewChild(NzSelectTopControlComponent, { static: true }) nzSelectTopControlComponent: NzSelectTopControlComponent;
  @ViewChild(NzSelectTopControlComponent, { static: true, read: ElementRef }) nzSelectTopControlElement: ElementRef;
  /** should move to nz-option-container when https://github.com/angular/angular/issues/20810 resolved **/
  @ContentChildren(NzOptionComponent) listOfNzOptionComponent: QueryList<NzOptionComponent>;
  @ContentChildren(NzOptionGroupComponent) listOfNzOptionGroupComponent: QueryList<NzOptionGroupComponent>;
  @Output() readonly nzOnSearch = new EventEmitter<string>();
  @Output() readonly nzScrollToBottom = new EventEmitter<void>();
  @Output() readonly nzOpenChange = new EventEmitter<boolean>();
  @Output() readonly nzBlur = new EventEmitter<void>();
  @Output() readonly nzFocus = new EventEmitter<void>();
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzDropdownClassName: string;
  @Input() nzDropdownMatchSelectWidth = true;
  @Input() nzDropdownStyle: { [key: string]: string };
  @Input() nzNotFoundContent: string;
  @Input() @InputBoolean() nzAllowClear = false;
  @Input() @InputBoolean() nzShowSearch = false;
  @Input() @InputBoolean() nzLoading = false;
  @Input() @InputBoolean() nzAutoFocus = false;
  @Input() nzPlaceHolder: string;
  @Input() nzMaxTagCount: number;
  @Input() nzDropdownRender: TemplateRef<void>;
  @Input() nzCustomTemplate: TemplateRef<{ $implicit: NzOptionComponent }>;
  @Input() nzSuffixIcon: TemplateRef<void>;
  @Input() nzClearIcon: TemplateRef<void>;
  @Input() nzRemoveIcon: TemplateRef<void>;
  @Input() nzMenuItemSelectedIcon: TemplateRef<void>;
  @Input() nzShowArrow = true;
  @Input() nzTokenSeparators: string[] = [];
  // tslint:disable-next-line:no-any
  @Input() nzMaxTagPlaceholder: TemplateRef<{ $implicit: any[] }>;

  @Input()
  set nzAutoClearSearchValue(value: boolean) {
    this.nzSelectService.autoClearSearchValue = toBoolean(value);
  }

  @Input()
  set nzMaxMultipleCount(value: number) {
    this.nzSelectService.maxMultipleCount = value;
  }

  @Input()
  set nzServerSearch(value: boolean) {
    this.nzSelectService.serverSearch = toBoolean(value);
  }

  @Input()
  set nzMode(value: 'default' | 'multiple' | 'tags') {
    this.nzSelectService.mode = value;
    this.nzSelectService.check();
  }

  @Input()
  set nzFilterOption(value: TFilterOption) {
    this.nzSelectService.filterOption = value;
  }

  @Input()
  // tslint:disable-next-line:no-any
  set compareWith(value: (o1: any, o2: any) => boolean) {
    this.nzSelectService.compareWith = value;
  }

  @Input()
  set nzOpen(value: boolean) {
    this.open = value;
    this.nzSelectService.setOpenState(value);
  }

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.nzSelectService.disabled = this._disabled;
    this.nzSelectService.check();
    if (this.nzDisabled && this.isInit) {
      this.closeDropDown();
    }
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  get nzSelectTopControlDOM(): HTMLElement {
    return this.nzSelectTopControlElement && this.nzSelectTopControlElement.nativeElement;
  }

  updateAutoFocus(): void {
    if (this.nzSelectTopControlDOM && this.nzAutoFocus) {
      this.nzSelectTopControlDOM.focus();
    }
  }

  focus(): void {
    if (this.nzSelectTopControlDOM) {
      this.nzSelectTopControlDOM.focus();
    }
  }

  blur(): void {
    if (this.nzSelectTopControlDOM) {
      this.nzSelectTopControlDOM.blur();
    }
  }

  onFocus(): void {
    this.nzFocus.emit();
  }

  onBlur(): void {
    this.nzBlur.emit();
  }

  onKeyDown(event: KeyboardEvent): void {
    this.nzSelectService.onKeyDown(event);
  }

  toggleDropDown(): void {
    if (!this.nzDisabled) {
      this.nzSelectService.setOpenState(!this.open);
    }
  }

  closeDropDown(): void {
    this.nzSelectService.setOpenState(false);
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.dropDownPosition = position.connectionPair.originY;
  }

  updateCdkConnectedOverlayStatus(): void {
    if (this.platform.isBrowser) {
      this.triggerWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
    }
  }

  updateCdkConnectedOverlayPositions(): void {
    setTimeout(() => {
      if (this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef) {
        this.cdkConnectedOverlay.overlayRef.updatePosition();
      }
    });
  }

  constructor(
    renderer: Renderer2,
    public nzSelectService: NzSelectService,
    private cdr: ChangeDetectorRef,
    private platform: Platform,
    elementRef: ElementRef,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-select');
  }

  /** update ngModel -> update listOfSelectedValue **/
  // tslint:disable-next-line:no-any
  writeValue(value: any | any[]): void {
    this.value = value;
    let listValue: any[] = []; // tslint:disable-line:no-any
    if (isNotNil(value)) {
      if (this.nzSelectService.isMultipleOrTags) {
        listValue = value;
      } else {
        listValue = [value];
      }
    }
    this.nzSelectService.updateListOfSelectedValue(listValue, false);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.nzSelectService.animationEvent$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateCdkConnectedOverlayPositions());
    this.nzSelectService.searchValue$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.nzOnSearch.emit(data);
      this.updateCdkConnectedOverlayPositions();
    });
    this.nzSelectService.modelChange$.pipe(takeUntil(this.destroy$)).subscribe(modelValue => {
      if (this.value !== modelValue) {
        this.value = modelValue;
        this.onChange(this.value);
      }
    });
    this.nzSelectService.open$.pipe(takeUntil(this.destroy$)).subscribe(value => {
      if (this.open !== value) {
        this.nzOpenChange.emit(value);
      }
      if (value) {
        this.focus();
        this.updateCdkConnectedOverlayStatus();
      } else {
        this.blur();
        this.onTouched();
      }
      this.open = value;
      this.nzSelectService.clearInput();
    });
    this.nzSelectService.check$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this.updateCdkConnectedOverlayStatus();
    this.updateAutoFocus();
    this.isInit = true;
  }

  ngAfterContentInit(): void {
    this.listOfNzOptionGroupComponent.changes
      .pipe(
        startWith(true),
        flatMap(() =>
          merge(
            this.listOfNzOptionGroupComponent.changes,
            this.listOfNzOptionComponent.changes,
            ...this.listOfNzOptionComponent.map(option => option.changes),
            ...this.listOfNzOptionGroupComponent.map(group =>
              group.listOfNzOptionComponent ? group.listOfNzOptionComponent.changes : EMPTY
            )
          ).pipe(startWith(true))
        )
      )
      .subscribe(() => {
        this.nzSelectService.updateTemplateOption(
          this.listOfNzOptionComponent.toArray(),
          this.listOfNzOptionGroupComponent.toArray()
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
