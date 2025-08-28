/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationEvent } from '@angular/animations';
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  contentChildren,
  effect,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  viewChildren,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { bufferCount } from 'rxjs/operators';

import { ThumbAnimationProps, thumbMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzSizeLDSType, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
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
      @if (animationState) {
        <div
          class="ant-segmented-thumb ant-segmented-thumb-motion"
          [@thumbMotion]="animationState"
          (@thumbMotion.done)="handleThumbAnimationDone($event)"
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
    '[class.ant-segmented-rtl]': `dir === 'rtl'`,
    '[class.ant-segmented-lg]': `nzSize === 'large'`,
    '[class.ant-segmented-sm]': `nzSize === 'small'`,
    '[class.ant-segmented-block]': `nzBlock`,
    '[class.ant-segmented-vertical]': `nzVertical`
  },
  providers: [
    NzSegmentedService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzSegmentedComponent),
      multi: true
    }
  ],
  animations: [thumbMotion],
  imports: [NzIconModule, NzOutletModule, NzSegmentedItemComponent]
})
export class NzSegmentedComponent implements OnChanges, ControlValueAccessor {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  public readonly nzConfigService = inject(NzConfigService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly directionality = inject(Directionality);
  private readonly service = inject(NzSegmentedService);

  @Input({ transform: booleanAttribute }) nzBlock: boolean = false;
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input() nzOptions: NzSegmentedOptions = [];
  @Input({ transform: booleanAttribute }) nzVertical: boolean = false;
  @Input() @WithConfig() nzSize: NzSizeLDSType = 'default';

  @Output() readonly nzValueChange = new EventEmitter<number | string>();

  private viewItemCmps = viewChildren(NzSegmentedItemComponent);
  private contentItemCmps = contentChildren(NzSegmentedItemComponent);
  private isDisabledFirstChange = true;

  protected dir: Direction = 'ltr';
  protected value?: number | string;
  protected animationState: null | { value: string; params: ThumbAnimationProps } = {
    value: 'to',
    params: thumbAnimationParamsOf()
  };
  protected normalizedOptions: NzSegmentedOption[] = [];
  protected onChange: OnChangeType = () => {};
  protected onTouched: OnTouchedType = () => {};

  constructor() {
    this.directionality.change.pipe(takeUntilDestroyed()).subscribe(direction => {
      this.dir = direction;
      this.cdr.markForCheck();
    });

    this.service.selected$.pipe(takeUntilDestroyed()).subscribe(value => {
      this.value = value;
    });

    this.service.change$.pipe(takeUntilDestroyed()).subscribe(value => {
      this.nzValueChange.emit(value);
      this.onChange(value);
    });

    this.service.activated$.pipe(bufferCount(2, 1), takeUntilDestroyed()).subscribe(elements => {
      if (this.nzVertical) {
        this.animationState = {
          value: 'fromVertical',
          params: thumbAnimationParamsOf(elements[0], true)
        };
        this.cdr.detectChanges();

        this.animationState = {
          value: 'toVertical',
          params: thumbAnimationParamsOf(elements[1], true)
        };
        this.cdr.detectChanges();
      } else {
        this.animationState = {
          value: 'from',
          params: thumbAnimationParamsOf(elements[0])
        };
        this.cdr.detectChanges();

        this.animationState = {
          value: 'to',
          params: thumbAnimationParamsOf(elements[1])
        };
        this.cdr.detectChanges();
      }
    });

    effect(() => {
      const itemCmps = this.viewItemCmps().concat(this.contentItemCmps());

      if (!itemCmps.length) {
        return;
      }

      if (
        this.value === undefined || // If no value is set, select the first item
        !itemCmps.some(item => item.nzValue() === this.value) // handle value not in options
      ) {
        this.service.selected$.next(itemCmps[0].nzValue());
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzOptions, nzDisabled } = changes;
    if (nzOptions) {
      this.normalizedOptions = normalizeOptions(nzOptions.currentValue);
    }
    if (nzDisabled) {
      this.service.disabled$.next(nzDisabled.currentValue);
    }
  }

  handleThumbAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'to' || event.toState === 'toVertical') {
      this.animationState = null;
    }
    this.service.animationDone$.next(event);
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
}

function thumbAnimationParamsOf(element?: HTMLElement, vertical: boolean = false): ThumbAnimationProps {
  if (vertical) {
    return {
      transform: element?.offsetTop ?? 0,
      width: element?.clientWidth ?? 0,
      height: element?.clientHeight ?? 0,
      vertical
    };
  }
  return {
    transform: element?.offsetLeft ?? 0,
    width: element?.clientWidth ?? 0
  };
}
