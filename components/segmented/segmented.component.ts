/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ThumbAnimationProps, thumbMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput, NzSafeAny, NzSizeLDSType, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

import { normalizeOptions, NzNormalizedOptions, NzSegmentedOption, NzSegmentedOptions } from './types';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'segmented';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-segmented',
  exportAs: 'nzSegmented',
  template: `
    <!-- thumb motion div -->
    <div class="ant-segmented-group">
      <div
        *ngIf="animationState"
        [ngClass]="{ 'ant-segmented-thumb': true, 'ant-segmented-thumb-motion': true }"
        [@thumbMotion]="animationState"
        (@thumbMotion.done)="handleThumbAnimationDone($event)"
      ></div>
      <label
        #itemLabels
        *ngFor="let item of normalizedOptions; let i = index"
        [ngClass]="{
          'ant-segmented-item': true,
          'ant-segmented-item-selected': i === selectedIndex,
          'ant-segmented-item-disabled': !!nzDisabled || item.disabled
        }"
      >
        <input class="ant-segmented-item-input" type="radio" [checked]="i === selectedIndex" />
        <div class="ant-segmented-item-label" (click)="!item.disabled && handleOptionClick(i)">
          <ng-container *ngIf="item.icon; else else_template">
            <span class="ant-segmented-item-icon"><span nz-icon [nzType]="item.icon"></span></span>
            <span>
              <ng-container
                *nzStringTemplateOutlet="item.useTemplate && nzLabelTemplate; context: { $implicit: item, index: i }"
              >
                {{ item.label }}
              </ng-container>
            </span>
          </ng-container>
          <ng-template #else_template>
            <ng-container
              *nzStringTemplateOutlet="item.useTemplate && nzLabelTemplate; context: { $implicit: item, index: i }"
            >
              {{ item.label }}
            </ng-container>
          </ng-template>
        </div>
      </label>
    </div>
  `,
  host: {
    class: 'ant-segmented',
    '[class.ant-segmented-disabled]': '!!nzDisabled',
    '[class.ant-segmented-rtl]': `dir === 'rtl'`,
    '[class.ant-segmented-lg]': `nzSize === 'large'`,
    '[class.ant-segmented-sm]': `nzSize === 'small'`,
    '[class.ant-segmented-block]': `!!nzBlock`
  },
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NzSegmentedComponent), multi: true }],
  animations: [thumbMotion]
})
export class NzSegmentedComponent implements OnChanges, ControlValueAccessor {
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzBlock: BooleanInput;

  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  @ViewChildren('itemLabels', { read: ElementRef }) listOfOptions!: QueryList<ElementRef>;

  @Input()
  @InputBoolean()
  nzBlock: boolean = false;

  @Input()
  @InputBoolean()
  nzDisabled: boolean = false;

  @Input() nzOptions: NzSegmentedOptions = [];

  @Input() @WithConfig() nzSize: NzSizeLDSType = 'default';

  @Input() nzLabelTemplate: TemplateRef<{ $implicit: NzSegmentedOption; index: number }> | null = null;

  @Output() readonly nzValueChange = new EventEmitter<number>();

  public dir: Direction = 'ltr';

  public selectedIndex = 0;
  public transitionedToIndex = -1;
  public animationState: null | { value: string; params: ThumbAnimationProps } = null;

  public normalizedOptions: NzNormalizedOptions = [];

  private destroy$ = new Subject<void>();

  onChange: OnChangeType = () => {};

  onTouched: OnTouchedType = () => {};

  constructor(
    public readonly nzConfigService: NzConfigService,
    private readonly cdr: ChangeDetectorRef,
    @Optional() private readonly directionality: Directionality
  ) {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe(direction => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzOptions } = changes;
    if (nzOptions) {
      this.normalizedOptions = normalizeOptions(nzOptions.currentValue);
    }
  }

  handleOptionClick(index: number): void {
    if (this.nzDisabled) {
      return;
    }

    this.changeSelectedIndex(index);

    this.onChange(index);
    this.nzValueChange.emit(index);
  }

  handleThumbAnimationDone(e: NzSafeAny): void {
    if (e.fromState === 'from') {
      this.selectedIndex = this.transitionedToIndex;
      this.transitionedToIndex = -1;
      this.animationState = null;
      this.cdr.detectChanges();
    }
  }

  writeValue(value: number | null): void {
    if (typeof value === 'number' && value > -1) {
      this.changeSelectedIndex(value);
      this.cdr.markForCheck();
    }
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  private changeSelectedIndex(index: number): void {
    if (!this.listOfOptions || this.selectedIndex === -1 || this.selectedIndex === index) {
      return;
    }

    this.animationState = {
      value: 'from',
      params: getThumbAnimationProps(this.listOfOptions.get(this.selectedIndex)!.nativeElement!)
    };
    this.selectedIndex = -1;
    this.cdr.detectChanges();

    this.animationState = {
      value: 'to',
      params: getThumbAnimationProps(this.listOfOptions.get(index)!.nativeElement!)
    };
    this.transitionedToIndex = index;
    this.cdr.detectChanges();
  }
}

function getThumbAnimationProps(element: HTMLElement): ThumbAnimationProps {
  return {
    transform: element.offsetLeft,
    width: element.clientWidth
  };
}
