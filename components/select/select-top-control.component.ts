/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BACKSPACE } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzSelectSearchComponent } from './select-search.component';
import { NzSelectItemInterface, NzSelectModeType, NzSelectTopControlItemType } from './select.types';

@Component({
  selector: 'nz-select-top-control',
  exportAs: 'nzSelectTopControl',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <!--single mode-->
    <ng-container [ngSwitch]="mode">
      <ng-container *ngSwitchCase="'default'">
        <nz-select-search
          [nzId]="nzId"
          [disabled]="disabled"
          [value]="inputValue!"
          [showInput]="showSearch"
          [mirrorSync]="false"
          [autofocus]="autofocus"
          [focusTrigger]="open"
          (isComposingChange)="isComposingChange($event)"
          (valueChange)="onInputValueChange($event)"
        ></nz-select-search>
        <nz-select-item
          *ngIf="isShowSingleLabel"
          [deletable]="false"
          [disabled]="false"
          [removeIcon]="removeIcon"
          [label]="listOfTopItem[0].nzLabel"
          [contentTemplateOutlet]="customTemplate"
          [contentTemplateOutletContext]="listOfTopItem[0]"
        ></nz-select-item>
      </ng-container>
      <ng-container *ngSwitchDefault>
        <!--multiple or tags mode-->
        <nz-select-item
          *ngFor="let item of listOfSlicedItem; trackBy: trackValue"
          [removeIcon]="removeIcon"
          [label]="item.nzLabel"
          [disabled]="item.nzDisabled || disabled"
          [contentTemplateOutlet]="item.contentTemplateOutlet"
          [deletable]="true"
          [contentTemplateOutletContext]="item.contentTemplateOutletContext"
          (delete)="onDeleteItem(item.contentTemplateOutletContext)"
        ></nz-select-item>
        <nz-select-search
          [nzId]="nzId"
          [disabled]="disabled"
          [value]="inputValue!"
          [autofocus]="autofocus"
          [showInput]="true"
          [mirrorSync]="true"
          [focusTrigger]="open"
          (isComposingChange)="isComposingChange($event)"
          (valueChange)="onInputValueChange($event)"
        ></nz-select-search>
      </ng-container>
    </ng-container>
    <nz-select-placeholder *ngIf="isShowPlaceholder" [placeholder]="placeHolder"></nz-select-placeholder>
  `
})
export class NzSelectTopControlComponent implements OnChanges, OnInit, OnDestroy {
  @Input() nzId: string | null = null;
  @Input() showSearch = false;
  @Input() placeHolder: string | TemplateRef<NzSafeAny> | null = null;
  @Input() open = false;
  @Input() maxTagCount: number = Infinity;
  @Input() autofocus = false;
  @Input() disabled = false;
  @Input() mode: NzSelectModeType = 'default';
  @Input() customTemplate: TemplateRef<{ $implicit: NzSelectItemInterface }> | null = null;
  @Input() maxTagPlaceholder: TemplateRef<{ $implicit: NzSafeAny[] }> | null = null;
  @Input() removeIcon: TemplateRef<NzSafeAny> | null = null;
  @Input() listOfTopItem: NzSelectItemInterface[] = [];
  @Input() tokenSeparators: string[] = [];
  @Output() readonly tokenize = new EventEmitter<string[]>();
  @Output() readonly inputValueChange = new EventEmitter<string>();
  @Output() readonly deleteItem = new EventEmitter<NzSelectItemInterface>();
  @ViewChild(NzSelectSearchComponent) nzSelectSearchComponent!: NzSelectSearchComponent;
  listOfSlicedItem: NzSelectTopControlItemType[] = [];
  isShowPlaceholder = true;
  isShowSingleLabel = false;
  isComposing = false;
  inputValue: string | null = null;

  private destroy$ = new Subject<void>();

  updateTemplateVariable(): void {
    const isSelectedValueEmpty = this.listOfTopItem.length === 0;
    this.isShowPlaceholder = isSelectedValueEmpty && !this.isComposing && !this.inputValue;
    this.isShowSingleLabel = !isSelectedValueEmpty && !this.isComposing && !this.inputValue;
  }

  isComposingChange(isComposing: boolean): void {
    this.isComposing = isComposing;
    this.updateTemplateVariable();
  }

  onInputValueChange(value: string): void {
    if (value !== this.inputValue) {
      this.inputValue = value;
      this.updateTemplateVariable();
      this.inputValueChange.emit(value);
      this.tokenSeparate(value, this.tokenSeparators);
    }
  }

  tokenSeparate(inputValue: string, tokenSeparators: string[]): void {
    const includesSeparators = (str: string | string[], separators: string[]): boolean => {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < separators.length; ++i) {
        if (str.lastIndexOf(separators[i]) > 0) {
          return true;
        }
      }
      return false;
    };
    const splitBySeparators = (str: string | string[], separators: string[]): string[] => {
      const reg = new RegExp(`[${separators.join()}]`);
      const array = (str as string).split(reg).filter(token => token);
      return [...new Set(array)];
    };
    if (
      inputValue &&
      inputValue.length &&
      tokenSeparators.length &&
      this.mode !== 'default' &&
      includesSeparators(inputValue, tokenSeparators)
    ) {
      const listOfLabel = splitBySeparators(inputValue, tokenSeparators);
      this.tokenize.next(listOfLabel);
    }
  }

  clearInputValue(): void {
    if (this.nzSelectSearchComponent) {
      this.nzSelectSearchComponent.clearInputValue();
    }
  }

  focus(): void {
    if (this.nzSelectSearchComponent) {
      this.nzSelectSearchComponent.focus();
    }
  }

  blur(): void {
    if (this.nzSelectSearchComponent) {
      this.nzSelectSearchComponent.blur();
    }
  }

  trackValue(_index: number, option: NzSelectTopControlItemType): NzSafeAny {
    return option.nzValue;
  }

  onDeleteItem(item: NzSelectItemInterface): void {
    if (!this.disabled && !item.nzDisabled) {
      this.deleteItem.next(item);
    }
  }

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    @Host() @Optional() public noAnimation: NzNoAnimationDirective | null
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('ant-select-selector');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { listOfTopItem, maxTagCount, customTemplate, maxTagPlaceholder } = changes;
    if (listOfTopItem) {
      this.updateTemplateVariable();
    }
    if (listOfTopItem || maxTagCount || customTemplate || maxTagPlaceholder) {
      const listOfSlicedItem: NzSelectTopControlItemType[] = this.listOfTopItem.slice(0, this.maxTagCount).map(o => ({
        nzLabel: o.nzLabel,
        nzValue: o.nzValue,
        nzDisabled: o.nzDisabled,
        contentTemplateOutlet: this.customTemplate,
        contentTemplateOutletContext: o
      }));
      if (this.listOfTopItem.length > this.maxTagCount) {
        const exceededLabel = `+ ${this.listOfTopItem.length - this.maxTagCount} ...`;
        const listOfSelectedValue = this.listOfTopItem.map(item => item.nzValue);
        const exceededItem = {
          nzLabel: exceededLabel,
          nzValue: '$$__nz_exceeded_item',
          nzDisabled: true,
          contentTemplateOutlet: this.maxTagPlaceholder,
          contentTemplateOutletContext: listOfSelectedValue.slice(this.maxTagCount)
        };
        listOfSlicedItem.push(exceededItem);
      }
      this.listOfSlicedItem = listOfSlicedItem;
    }
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(this.elementRef.nativeElement, 'click')
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          // `HTMLElement.focus()` is a native DOM API which doesn't require Angular to run change detection.
          if (event.target !== this.nzSelectSearchComponent.inputElement.nativeElement) {
            this.nzSelectSearchComponent.focus();
          }
        });

      fromEvent<KeyboardEvent>(this.elementRef.nativeElement, 'keydown')
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          if (event.target instanceof HTMLInputElement) {
            const inputValue = event.target.value;

            if (
              event.keyCode === BACKSPACE &&
              this.mode !== 'default' &&
              !inputValue &&
              this.listOfTopItem.length > 0
            ) {
              event.preventDefault();
              // Run change detection only if the user has pressed the `Backspace` key and the following condition is met.
              this.ngZone.run(() => this.onDeleteItem(this.listOfTopItem[this.listOfTopItem.length - 1]));
            }
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
