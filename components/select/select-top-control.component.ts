/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BACKSPACE } from '@angular/cdk/keycodes';
import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { auditTime } from 'rxjs/operators';

import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/animation';
import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';

import { NzSelectItemComponent } from './select-item.component';
import { NzSelectPlaceholderComponent } from './select-placeholder.component';
import { NzSelectSearchComponent } from './select-search.component';
import {
  NzSelectItemInterface,
  NzSelectMaxTagCount,
  NzSelectModeType,
  NzSelectTopControlItemType,
  maxTagCountAttribute
} from './select.types';

@Component({
  selector: 'nz-select-top-control',
  exportAs: 'nzSelectTopControl',
  imports: [
    NzSelectSearchComponent,
    NzSelectItemComponent,
    NzSelectPlaceholderComponent,
    NzStringTemplateOutletDirective
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (prefix) {
      <div class="ant-select-prefix">
        <ng-container *nzStringTemplateOutlet="prefix">{{ prefix }}</ng-container>
      </div>
    }
    <span class="ant-select-selection-wrap">
      <!--single mode-->
      @switch (mode) {
        @case ('default') {
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
          />
          @if (isShowSingleLabel) {
            <nz-select-item
              [removeIcon]="removeIcon"
              [label]="listOfTopItem[0].nzLabel"
              [contentTemplateOutlet]="customTemplate"
              [contentTemplateOutletContext]="listOfTopItem[0]"
            />
          }
        }
        @default {
          <div class="ant-select-selection-overflow">
            <!--multiple or tags mode-->
            @for (item of listOfSlicedItem; track item.nzValue) {
              <div class="ant-select-selection-overflow-item">
                <nz-select-item
                  [removeIcon]="removeIcon"
                  [label]="item.nzLabel"
                  [disabled]="item.nzDisabled || disabled"
                  [contentTemplateOutlet]="item.contentTemplateOutlet"
                  deletable
                  [contentTemplateOutletContext]="item.contentTemplateOutletContext"
                  (delete)="onDeleteItem(item.contentTemplateOutletContext)"
                />
              </div>
            }
            <div class="ant-select-selection-overflow-item ant-select-selection-overflow-item-suffix">
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
              />
            </div>
          </div>
        }
      }
      @if (isShowPlaceholder) {
        <nz-select-placeholder [placeholder]="placeHolder" />
      }
    </span>
  `,
  host: {
    class: 'ant-select-selector'
  }
})
export class NzSelectTopControlComponent implements OnChanges, OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly ngZone = inject(NgZone);
  private readonly resizeObserver = inject(NzResizeObserver);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });

  @Input() nzId: string | null = null;
  @Input() showSearch = false;
  @Input() placeHolder: string | TemplateRef<NzSafeAny> | null = null;
  @Input() open = false;
  @Input({ transform: maxTagCountAttribute }) maxTagCount: NzSelectMaxTagCount = Infinity;
  @Input() autofocus = false;
  @Input() disabled = false;
  @Input() mode: NzSelectModeType = 'default';
  @Input() customTemplate: TemplateRef<{ $implicit: NzSelectItemInterface }> | null = null;
  @Input() maxTagPlaceholder: TemplateRef<{ $implicit: NzSafeAny[] }> | null = null;
  @Input() removeIcon: TemplateRef<NzSafeAny> | null = null;
  @Input() listOfTopItem: NzSelectItemInterface[] = [];
  @Input() tokenSeparators: string[] = [];
  @Input() prefix: TemplateRef<NzSafeAny> | string | null = null;
  @Output() readonly tokenize = new EventEmitter<string[]>();
  @Output() readonly inputValueChange = new EventEmitter<string>();
  @Output() readonly deleteItem = new EventEmitter<NzSelectItemInterface>();
  @ViewChild(NzSelectSearchComponent) nzSelectSearchComponent!: NzSelectSearchComponent;
  listOfSlicedItem: NzSelectTopControlItemType[] = [];
  isShowPlaceholder = true;
  isShowSingleLabel = false;
  isComposing = false;
  inputValue: string | null = null;

  calculatedMaxTagCount = Infinity;
  private canvas?: HTMLCanvasElement;

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
    const includesSeparators = (str: string, separators: string[]): boolean => {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < separators.length; ++i) {
        if (str.lastIndexOf(separators[i]) > 0) {
          return true;
        }
      }
      return false;
    };
    const splitBySeparators = (str: string, separators: string[]): string[] => {
      const reg = new RegExp(`[${separators.join()}]`);
      const array = str.split(reg).filter(token => token);
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
    this.nzSelectSearchComponent?.clearInputValue();
  }

  focus(): void {
    this.nzSelectSearchComponent?.focus();
  }

  blur(): void {
    this.nzSelectSearchComponent?.blur();
  }

  onDeleteItem(item: NzSelectItemInterface): void {
    if (!this.disabled && !item.nzDisabled) {
      this.deleteItem.next(item);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { listOfTopItem, maxTagCount, customTemplate, maxTagPlaceholder } = changes;
    if (listOfTopItem) {
      this.updateTemplateVariable();
    }
    if (maxTagCount && this.maxTagCount === 'responsive') {
      this.calculateFitCount();
      return;
    }
    if (listOfTopItem || maxTagCount || customTemplate || maxTagPlaceholder) {
      if (this.maxTagCount === 'responsive') {
        this.calculateFitCount();
      } else {
        this.updateSlicedItems();
      }
    }
  }

  private calculateFitCount(): void {
    if (!this.isBrowser || this.mode === 'default' || this.listOfTopItem.length === 0) {
      this.calculatedMaxTagCount = Infinity;
      this.updateSlicedItems();
      return;
    }

    const hostEl = this.elementRef.nativeElement;
    const prefixEl = hostEl.querySelector('.ant-select-prefix') as HTMLElement | null;
    const prefixWidth = prefixEl ? prefixEl.offsetWidth : 0;
    const containerWidth = (hostEl.clientWidth || 0) - prefixWidth;

    if (containerWidth <= 0) {
      this.calculatedMaxTagCount = Infinity;
      this.updateSlicedItems();
      return;
    }

    const availableWidth = Math.max(0, containerWidth - 8);

    const font = this.getComputedFont(hostEl);
    const tagExtraWidth = 34;
    const restTagWidth = 48;
    const totalCount = this.listOfTopItem.length;

    let accumulatedWidth = 0;
    let fitCount = 0;
    let allFit = true;

    for (let i = 0; i < totalCount; i++) {
      const item = this.listOfTopItem[i];
      const text = String(item.nzLabel ?? item.nzValue ?? '');
      const itemWidth = this.measureTextWidth(text, font) + tagExtraWidth;

      if (accumulatedWidth + itemWidth + restTagWidth <= availableWidth) {
        accumulatedWidth += itemWidth;
        fitCount++;
      } else {
        allFit = false;
        break;
      }
    }

    const finalCount = allFit ? Infinity : Math.max(1, fitCount);
    this.calculatedMaxTagCount = finalCount;
    this.updateSlicedItems();
    this.cdr.markForCheck();
  }

  private updateSlicedItems(): void {
    const effectiveCount =
      this.maxTagCount === 'responsive' ? this.calculatedMaxTagCount : (this.maxTagCount as number);

    const listOfSlicedItem: NzSelectTopControlItemType[] = this.listOfTopItem.slice(0, effectiveCount).map(o => ({
      nzLabel: o.nzLabel,
      nzValue: o.nzValue,
      nzDisabled: o.nzDisabled,
      contentTemplateOutlet: this.customTemplate,
      contentTemplateOutletContext: o
    }));
    if (this.listOfTopItem.length > effectiveCount) {
      const exceededLabel = `+ ${this.listOfTopItem.length - effectiveCount} ...`;
      const listOfSelectedValue = this.listOfTopItem.map(item => item.nzValue);
      const exceededItem = {
        nzLabel: exceededLabel,
        nzValue: '$$__nz_exceeded_item',
        nzDisabled: true,
        contentTemplateOutlet: this.maxTagPlaceholder,
        contentTemplateOutletContext: listOfSelectedValue.slice(effectiveCount)
      };
      listOfSlicedItem.push(exceededItem);
    }
    this.listOfSlicedItem = listOfSlicedItem;
  }

  private measureTextWidth(text: string, font: string): number {
    if (typeof document !== 'undefined') {
      try {
        if (!this.canvas) {
          this.canvas = document.createElement('canvas');
        }
        const ctx = this.canvas.getContext?.('2d');
        if (ctx) {
          ctx.font = font;
          return Math.ceil(ctx.measureText(text).width);
        }
      } catch {
        // fallback
      }
    }
    let estimated = 0;
    for (let i = 0; i < text.length; i++) {
      estimated += text.charCodeAt(i) > 255 ? 13 : 8;
    }
    return Math.max(16, estimated);
  }

  private getComputedFont(el: HTMLElement): string {
    if (typeof window === 'undefined') {
      return '400 14px sans-serif';
    }
    try {
      const style = window.getComputedStyle(el);
      const weight = style?.fontWeight || '400';
      const size = style?.fontSize || '14px';
      const family = style?.fontFamily || 'sans-serif';
      return `${weight} ${size} ${family}`;
    } catch {
      return '400 14px sans-serif';
    }
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.resizeObserver
        .observe(this.elementRef.nativeElement)
        .pipe(auditTime(16), takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          if (this.maxTagCount === 'responsive') {
            this.calculateFitCount();
          }
        });
    }

    fromEventOutsideAngular<MouseEvent>(this.elementRef.nativeElement, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        // `HTMLElement.focus()` is a native DOM API that doesn't require Angular to run change detection.
        if (event.target !== this.nzSelectSearchComponent.inputElement.nativeElement) {
          this.nzSelectSearchComponent.focus();
        }
      });

    fromEventOutsideAngular<KeyboardEvent>(this.elementRef.nativeElement, 'keydown')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        if (event.target instanceof HTMLInputElement) {
          const inputValue = event.target.value;

          if (event.keyCode === BACKSPACE && this.mode !== 'default' && !inputValue && this.listOfTopItem.length > 0) {
            event.preventDefault();
            // Run change detection only if the user has pressed the `Backspace` key and the following condition is met.
            this.ngZone.run(() => this.onDeleteItem(this.listOfTopItem[this.listOfTopItem.length - 1]));
          }
        }
      });
  }
}
