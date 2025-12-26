/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
  viewChildren,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { filter } from 'rxjs/operators';

import { withAnimationCheck } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, WithConfig } from 'ng-zorro-antd/core/config';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { requestAnimationFrame } from 'ng-zorro-antd/core/polyfill';
import { NgStyleInterface, NzSizeLDSType, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzSegmentedItemComponent } from './segmented-item.component';
import { NzSegmentedService } from './segmented.service';
import { normalizeOptions, NzSegmentedOption, NzSegmentedOptions } from './types';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'segmented';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-segmented',
  exportAs: 'nzSegmented',
  template: `
    <!-- thumb motion div -->
    <div class="ant-segmented-group">
      @if (showThumb()) {
        <div
          class="ant-segmented-thumb"
          [style]="thumbStyle()"
          [animate.enter]="thumbAnimationEnter()"
          (transitionend)="handleTransitionEnd($event)"
        ></div>
      }

      <ng-content>
        @for (item of normalizedOptions; track item.value) {
          <label nz-segmented-item [nzIcon]="item.icon" [nzValue]="item.value" [nzDisabled]="item.disabled">
            {{ item.label }}
          </label>
        }
      </ng-content>
    </div>
  `,
  host: {
    class: 'ant-segmented',
    '[class.ant-segmented-disabled]': 'nzDisabled',
    '[class.ant-segmented-rtl]': `dir() === 'rtl'`,
    '[class.ant-segmented-lg]': `nzSize === 'large'`,
    '[class.ant-segmented-sm]': `nzSize === 'small'`,
    '[class.ant-segmented-block]': `nzBlock`,
    '[class.ant-segmented-vertical]': `nzVertical`,
    '[class.ant-segmented-shape-round]': `nzShape === 'round'`,
    // a11y
    role: 'radiogroup',
    'aria-label': 'segmented control',
    '[attr.tabindex]': 'nzDisabled ? undefined : 0'
  },
  providers: [
    NzSegmentedService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzSegmentedComponent),
      multi: true
    }
  ],
  imports: [NzIconModule, NzOutletModule, NzSegmentedItemComponent]
})
export class NzSegmentedComponent implements OnChanges, ControlValueAccessor {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  private readonly service = inject(NzSegmentedService);
  private readonly injector = inject(Injector);
  protected readonly dir = inject(Directionality).valueSignal;

  @Input({ transform: booleanAttribute }) nzBlock: boolean = false;
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input() nzOptions: NzSegmentedOptions = [];
  @Input({ transform: booleanAttribute }) nzVertical: boolean = false;
  @Input() nzShape: 'default' | 'round' = 'default';
  @Input() @WithConfig() nzSize: NzSizeLDSType = 'default';

  /**
   * @description set the `name` attribute of the segmented item native `input[type="radio"]`
   * @since 20.3.0
   */
  @Input() nzName?: string;

  @Output() readonly nzValueChange = new EventEmitter<number | string>();

  private viewItemCmps = viewChildren(NzSegmentedItemComponent);
  private contentItemCmps = contentChildren(NzSegmentedItemComponent);
  private renderedItemCmps = computed(() => this.viewItemCmps().concat(this.contentItemCmps()));
  private isDisabledFirstChange = true;

  protected value?: number | string;
  protected readonly thumbStyle = signal<NgStyleInterface | null>(null);
  protected readonly thumbAnimationEnter = withAnimationCheck(() => 'ant-segmented-thumb-motion-appear-active');
  protected readonly showThumb = this.service.showThumb;
  protected normalizedOptions: NzSegmentedOption[] = [];
  protected onChange: OnChangeType = () => {};
  protected onTouched: OnTouchedType = () => {};

  constructor() {
    this.service.selected$.pipe(takeUntilDestroyed()).subscribe(value => {
      this.value = value;
    });

    this.service.activated$.pipe(takeUntilDestroyed()).subscribe(element => {
      this.thumbStyle.update(prevStyle => {
        const nextStyle = this.calcThumbStyle(element);

        if (prevStyle && nextStyle) {
          // Trigger animation to end position
          requestAnimationFrame(() => {
            this.thumbStyle.set(this.getThumbStyle(nextStyle));
          });
        } else if (nextStyle) {
          return this.getThumbStyle(nextStyle);
        }
        return prevStyle;
      });
    });

    this.service.change$.pipe(takeUntilDestroyed()).subscribe(value => {
      this.nzValueChange.emit(value);
      this.onChange(value);
      this.service.animating$.next(true);
    });

    this.service.keydown$
      .pipe(
        filter(() => !this.nzDisabled),
        takeUntilDestroyed()
      )
      .subscribe(event => this.onKeyDown(event));

    afterNextRender(() => {
      effect(
        () => {
          const itemCmps = this.renderedItemCmps();

          if (!itemCmps.length) {
            return;
          }

          if (
            this.value === undefined || // If no value is set, select the first item
            !itemCmps.some(item => item.nzValue() === this.value) // handle value not in options
          ) {
            this.service.selected$.next(itemCmps[0].nzValue());
          }
        },
        { injector: this.injector }
      );
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzName, nzOptions, nzDisabled } = changes;
    if (nzName) {
      this.service.setName(this.nzName);
    }
    if (nzOptions) {
      this.normalizedOptions = normalizeOptions(nzOptions.currentValue);
    }
    if (nzDisabled) {
      this.service.disabled$.next(nzDisabled.currentValue);
    }
  }

  private onOffset(offset: number): void {
    const items = this.renderedItemCmps();
    const total = items.length;
    const originIndex = items.findIndex(item => item.nzValue() === this.value);
    let nextIndex = (originIndex + offset + total) % total;

    // find out the next non-disabled item
    while (items[nextIndex].nzDisabled()) {
      nextIndex = (nextIndex + Math.sign(offset) + total) % total;
      // avoid circular loop
      if (nextIndex === originIndex) {
        break;
      }
    }

    const nextOption = items[nextIndex];
    if (nextOption) {
      this.service.selected$.next(nextOption.nzValue());
      this.service.change$.next(nextOption.nzValue());
    }
  }

  // change selected item by direction keyboard interaction
  private onKeyDown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case UP_ARROW:
        this.onOffset(-1);
        break;
      case LEFT_ARROW:
        this.onOffset(this.dir() === 'rtl' ? 1 : -1);
        break;
      case DOWN_ARROW:
        this.onOffset(1);
        break;
      case RIGHT_ARROW:
        this.onOffset(this.dir() === 'rtl' ? -1 : 1);
        break;
    }
  }

  writeValue(value: number | string): void {
    this.service.selected$.next(value);
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.nzDisabled = (this.isDisabledFirstChange && this.nzDisabled) || disabled;
    this.isDisabledFirstChange = false;
  }

  /************* Thumb Animation *************/

  private calcThumbStyle(element?: HTMLElement): NgStyleInterface | null {
    if (!element || !element.offsetParent) {
      return null;
    }

    const parentElement = element.parentElement;
    if (!parentElement) {
      return null;
    }

    const style: NgStyleInterface = {
      left: element.offsetLeft,
      right: parentElement.clientWidth - element.clientWidth - element.offsetLeft,
      width: element.clientWidth,
      top: element.offsetTop,
      bottom: parentElement.clientHeight - element.clientHeight - element.offsetTop,
      height: element.clientHeight
    };

    if (this.nzVertical) {
      return {
        left: 0,
        right: 0,
        width: 0,
        top: style.top,
        bottom: style.bottom,
        height: style.height
      };
    }

    return {
      left: style.left,
      right: style.right,
      width: style.width,
      top: 0,
      bottom: 0,
      height: 0
    };
  }

  private getThumbStyle(targetStyle: NgStyleInterface): NgStyleInterface {
    if (this.nzVertical) {
      return {
        transform: `translateY(${targetStyle.top}px)`,
        width: '100%',
        height: `${targetStyle.height}px`
      };
    }

    const isRtl = this.dir() === 'rtl';
    const transformValue = isRtl ? -targetStyle.right : targetStyle.left;

    return {
      transform: `translateX(${transformValue}px)`,
      width: `${targetStyle.width}px`,
      height: '100%'
    };
  }

  protected handleTransitionEnd(event: TransitionEvent): void {
    if (event.propertyName === 'transform') {
      this.service.animating$.next(false);
    }
  }
}
