/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  DestroyRef,
  ElementRef,
  forwardRef,
  inject,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NzFormItemFeedbackIconComponent } from 'ng-zorro-antd/core/form';
import { getStatusClassNames, getVariantClassNames } from 'ng-zorro-antd/core/util';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_SPACE_COMPACT_ITEM_TYPE, NZ_SPACE_COMPACT_SIZE, NzSpaceCompactItemDirective } from 'ng-zorro-antd/space';

import { NzInputAddonAfterDirective, NzInputAddonBeforeDirective } from './input-addon.directive';
import { NzInputPrefixDirective, NzInputSuffixDirective } from './input-affix.directive';
import { NzInputDirective } from './input.directive';
import { NZ_INPUT_WRAPPER } from './tokens';

@Component({
  selector: 'nz-input-wrapper',
  exportAs: 'nzInputWrapper',
  imports: [NzIconModule, NzFormItemFeedbackIconComponent, NgTemplateOutlet],
  template: `
    @if (hasAddon()) {
      <ng-template [ngTemplateOutlet]="inputWithAddonInner" />
    } @else if (hasAffix()) {
      <ng-template [ngTemplateOutlet]="inputWithAffixInner" />
    } @else {
      <ng-template [ngTemplateOutlet]="input" />
    }

    <ng-template #inputWithAddonInner>
      <span class="ant-input-wrapper ant-input-group">
        @if (addonBefore()) {
          <span class="ant-input-group-addon">
            <ng-content select="[nzInputAddonBefore]" />
          </span>
        }

        @if (hasAffix()) {
          <ng-template [ngTemplateOutlet]="inputWithAffix" />
        } @else {
          <ng-template [ngTemplateOutlet]="input" />
        }

        @if (addonAfter()) {
          <span class="ant-input-group-addon">
            <ng-content select="[nzInputAddonAfter]" />
          </span>
        }
      </span>
    </ng-template>

    <ng-template #inputWithAffix>
      <span [class]="affixWrapperClass()">
        <ng-template [ngTemplateOutlet]="inputWithAffixInner" />
      </span>
    </ng-template>

    <ng-template #inputWithAffixInner>
      @if (prefix()) {
        <span class="ant-input-prefix">
          <ng-content select="[nzInputPrefix]" />
        </span>
      }
      <ng-template [ngTemplateOutlet]="input" />
      @if (suffix() || hasFeedback()) {
        <span class="ant-input-suffix">
          <ng-content select="[nzInputSuffix]" />
          @if (hasFeedback() && status()) {
            <nz-form-item-feedback-icon [status]="status()" />
          }
        </span>
      }
    </ng-template>

    <ng-template #input>
      <ng-content select="[nz-input]" />
    </ng-template>
  `,
  providers: [
    { provide: NZ_SPACE_COMPACT_ITEM_TYPE, useValue: 'input' },
    { provide: NZ_INPUT_WRAPPER, useExisting: forwardRef(() => NzInputWrapperComponent) }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [NzSpaceCompactItemDirective],
  host: {
    '[class]': 'class()',
    '[class.ant-input-disabled]': 'disabled()'
  }
})
export class NzInputWrapperComponent {
  private readonly focusMonitor = inject(FocusMonitor);

  private readonly inputDir = contentChild.required(NzInputDirective);
  private readonly inputRef = contentChild.required(NzInputDirective, { read: ElementRef });
  protected readonly prefix = contentChild(NzInputPrefixDirective);
  protected readonly suffix = contentChild(NzInputSuffixDirective);
  protected readonly addonBefore = contentChild(NzInputAddonBeforeDirective);
  protected readonly addonAfter = contentChild(NzInputAddonAfterDirective);

  readonly size = computed(() => this.inputDir().nzSize());
  readonly variant = computed(() => this.inputDir().nzVariant());
  readonly disabled = computed(() => this.inputDir().finalDisabled());
  readonly readOnly = computed(() => this.inputDir().readonly());
  readonly status = computed(() => this.inputDir().status());
  readonly hasFeedback = computed(() => this.inputDir().hasFeedback());

  protected readonly hasAffix = computed(() => !!this.prefix() || !!this.suffix() || this.hasFeedback());
  protected readonly hasAddon = computed(() => !!this.addonBefore() || !!this.addonAfter());

  private readonly compactSize = inject(NZ_SPACE_COMPACT_SIZE, { optional: true });
  protected readonly dir = inject(Directionality).valueSignal;
  protected readonly focused = signal(false);

  protected readonly finalSize = computed(() => {
    if (this.compactSize) {
      return this.compactSize();
    }
    return this.size();
  });

  protected readonly class = computed(() => {
    if (this.hasAddon()) {
      return this.groupWrapperClass();
    }
    if (this.hasAffix()) {
      return this.affixWrapperClass();
    }
    return null;
  });
  protected readonly affixWrapperClass = computed(() => {
    return {
      'ant-input-affix-wrapper': true,
      'ant-input-affix-wrapper-lg': this.finalSize() === 'large',
      'ant-input-affix-wrapper-sm': this.finalSize() === 'small',
      'ant-input-affix-wrapper-disabled': this.disabled(),
      'ant-input-affix-wrapper-readonly': this.readOnly(),
      'ant-input-affix-wrapper-focused': this.focused(),
      'ant-input-affix-wrapper-rtl': this.dir() === 'rtl',
      ...getStatusClassNames('ant-input-affix-wrapper', this.status(), this.hasFeedback()),
      ...getVariantClassNames('ant-input-affix-wrapper', this.variant())
    };
  });
  protected readonly groupWrapperClass = computed(() => {
    return {
      'ant-input-group-wrapper': true,
      'ant-input-group-wrapper-sm': this.finalSize() === 'small',
      'ant-input-group-wrapper-lg': this.finalSize() === 'large',
      'ant-input-group-wrapper-rtl': this.dir() === 'rtl',
      ...getStatusClassNames('ant-input-group-wrapper', this.status(), this.hasFeedback()),
      ...getVariantClassNames('ant-input-group-wrapper', this.variant())
    };
  });

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const element = this.inputRef();
      this.focusMonitor
        .monitor(element)
        .pipe(takeUntilDestroyed(destroyRef))
        .subscribe(origin => {
          this.focused.set(!!origin);
        });

      destroyRef.onDestroy(() => {
        this.focusMonitor.stopMonitoring(element);
      });
    });
  }
}
