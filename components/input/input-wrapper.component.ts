/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  DestroyRef,
  ElementRef,
  forwardRef,
  inject,
  input,
  output,
  signal,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormItemFeedbackIconComponent } from 'ng-zorro-antd/core/form';
import { getStatusClassNames, getVariantClassNames } from 'ng-zorro-antd/core/util';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_SPACE_COMPACT_ITEM_TYPE, NZ_SPACE_COMPACT_SIZE, NzSpaceCompactItemDirective } from 'ng-zorro-antd/space';

import { NzInputAddonAfterDirective, NzInputAddonBeforeDirective } from './input-addon.directive';
import { NzInputPrefixDirective, NzInputSuffixDirective } from './input-affix.directive';
import { NzInputPasswordDirective, NzInputPasswordIconDirective } from './input-password.directive';
import { NzInputSearchDirective, NzInputSearchEnterButtonDirective } from './input-search.directive';
import { NzInputDirective } from './input.directive';
import { NZ_INPUT_WRAPPER } from './tokens';

@Component({
  selector: 'nz-input-wrapper,nz-input-password,nz-input-search',
  exportAs: 'nzInputWrapper',
  imports: [NzIconModule, NzButtonModule, NzFormItemFeedbackIconComponent, NgTemplateOutlet],
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
        @if (hasAddonBefore()) {
          <span class="ant-input-group-addon">
            <ng-content select="[nzInputAddonBefore]">{{ nzAddonBefore() }}</ng-content>
          </span>
        }

        @if (hasAffix()) {
          <ng-template [ngTemplateOutlet]="inputWithAffix" />
        } @else {
          <ng-template [ngTemplateOutlet]="input" />
        }

        @if (hasAddonAfter()) {
          <span class="ant-input-group-addon">
            @if (inputSearchDir) {
              @let hasEnterButton = inputSearchEnterButton() ?? inputSearchDir.nzEnterButton() !== false;
              <button
                nz-button
                [nzType]="hasEnterButton ? 'primary' : 'default'"
                [nzSize]="size()"
                [nzLoading]="inputSearchDir.nzLoading()"
                type="button"
                class="ant-input-search-button"
                (click)="inputSearchDir.search($event)"
              >
                <ng-content select="[nzInputSearchEnterButton]">
                  @if (typeof inputSearchDir.nzEnterButton() === 'string') {
                    {{ inputSearchDir.nzEnterButton() }}
                  } @else {
                    <nz-icon nzType="search" nzTheme="outline" />
                  }
                </ng-content>
              </button>
            }
            <ng-content select="[nzInputAddonAfter]">{{ nzAddonAfter() }}</ng-content>
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
      @if (hasPrefix()) {
        <span class="ant-input-prefix">
          <ng-content select="[nzInputPrefix]">{{ nzPrefix() }}</ng-content>
        </span>
      }
      <ng-template [ngTemplateOutlet]="input" />
      @if (hasSuffix()) {
        <span class="ant-input-suffix">
          @if (nzAllowClear()) {
            <span
              class="ant-input-clear-icon"
              [class.ant-input-clear-icon-has-suffix]="
                nzSuffix() || suffix() || hasFeedback() || inputPasswordDir?.nzVisibilityToggle()
              "
              [class.ant-input-clear-icon-hidden]="!inputDir().value() || disabled() || readOnly()"
              role="button"
              tabindex="-1"
              (click)="clear(); inputSearchDir?.search($event, 'clear')"
            >
              <ng-content select="[nzInputClearIcon]">
                <nz-icon nzType="close-circle" nzTheme="fill" />
              </ng-content>
            </span>
          }
          @if (inputPasswordDir && inputPasswordDir.nzVisibilityToggle()) {
            <span
              class="ant-input-password-icon"
              role="button"
              tabindex="-1"
              (click)="inputPasswordDir.toggleVisible()"
            >
              @if (inputPasswordIconTmpl(); as tmpl) {
                <ng-template
                  [ngTemplateOutlet]="tmpl"
                  [ngTemplateOutletContext]="{ $implicit: inputPasswordDir.nzVisible() }"
                />
              } @else {
                <nz-icon [nzType]="inputPasswordDir.nzVisible() ? 'eye' : 'eye-invisible'" nzTheme="outline" />
              }
            </span>
          }
          <ng-content select="[nzInputSuffix]">{{ nzSuffix() }}</ng-content>
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
    '[class.ant-input-disabled]': 'disabled()',
    '[class.ant-input-affix-wrapper-textarea-with-clear-btn]': 'nzAllowClear() && isTextarea()'
  }
})
export class NzInputWrapperComponent {
  private readonly focusMonitor = inject(FocusMonitor);

  protected readonly inputPasswordDir = inject(NzInputPasswordDirective, { self: true, optional: true });
  protected readonly inputSearchDir = inject(NzInputSearchDirective, { self: true, optional: true });

  protected readonly inputRef = contentChild.required(NzInputDirective, { read: ElementRef });
  protected readonly inputDir = contentChild.required(NzInputDirective);

  protected readonly prefix = contentChild(NzInputPrefixDirective);
  protected readonly suffix = contentChild(NzInputSuffixDirective);
  protected readonly addonBefore = contentChild(NzInputAddonBeforeDirective);
  protected readonly addonAfter = contentChild(NzInputAddonAfterDirective);
  protected readonly inputPasswordIconTmpl = contentChild(NzInputPasswordIconDirective, { read: TemplateRef });
  protected readonly inputSearchEnterButton = contentChild(NzInputSearchEnterButtonDirective);

  readonly nzAllowClear = input(false, { transform: booleanAttribute });
  readonly nzPrefix = input<string>();
  readonly nzSuffix = input<string>();
  readonly nzAddonBefore = input<string>();
  readonly nzAddonAfter = input<string>();

  readonly nzClear = output<void>();

  readonly size = computed(() => this.inputDir().nzSize());
  readonly variant = computed(() => this.inputDir().nzVariant());
  readonly disabled = computed(() => this.inputDir().finalDisabled());
  readonly readOnly = computed(() => this.inputDir().readonly());
  readonly status = computed(() => this.inputDir().status());
  readonly hasFeedback = computed(() => this.inputDir().hasFeedback());

  protected readonly hasPrefix = computed(() => !!this.nzPrefix() || !!this.prefix());
  protected readonly hasSuffix = computed(
    () => !!this.nzSuffix() || !!this.suffix() || this.nzAllowClear() || this.hasFeedback() || this.inputPasswordDir
  );
  protected readonly hasAffix = computed(() => this.hasPrefix() || this.hasSuffix());
  protected readonly hasAddonBefore = computed(() => !!this.nzAddonBefore() || !!this.addonBefore());
  protected readonly hasAddonAfter = computed(
    () => !!this.nzAddonAfter() || !!this.addonAfter() || !!this.inputSearchDir
  );
  protected readonly hasAddon = computed(() => this.hasAddonBefore() || this.hasAddonAfter());

  private readonly compactSize = inject(NZ_SPACE_COMPACT_SIZE, { optional: true });
  protected readonly dir = inject(Directionality).valueSignal;
  protected readonly focused = signal(false);
  protected readonly isTextarea = computed(() => this.inputRef().nativeElement instanceof HTMLTextAreaElement);

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

  clear(): void {
    this.inputDir().ngControl?.control?.setValue('');
    this.nzClear.emit();
  }
}
