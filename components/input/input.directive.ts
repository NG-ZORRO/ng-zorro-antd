/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import {
  booleanAttribute,
  ComponentRef,
  computed,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
  OnInit,
  signal,
  ViewContainerRef
} from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import {
  NZ_FORM_SIZE,
  NzFormItemFeedbackIconComponent,
  NzFormNoStatusService,
  NzFormStatusService
} from 'ng-zorro-antd/core/form';
import { NzSizeLDSType, NzStatus, NzVariant } from 'ng-zorro-antd/core/types';
import { getStatusClassNames, InputFocusOptions, triggerFocus } from 'ng-zorro-antd/core/util';
import { NZ_SPACE_COMPACT_ITEM_TYPE, NZ_SPACE_COMPACT_SIZE, NzSpaceCompactItemDirective } from 'ng-zorro-antd/space';

import { NzInputPasswordDirective } from './input-password.directive';
import { NZ_INPUT_SEARCH, NZ_INPUT_WRAPPER } from './tokens';

const PREFIX_CLS = 'ant-input';

@Directive({
  selector: 'input[nz-input],textarea[nz-input]',
  exportAs: 'nzInput',
  host: {
    class: 'ant-input',
    '[attr.type]': 'type()',
    '[class]': 'classes()',
    '[class.ant-input-disabled]': 'finalDisabled()',
    '[class.ant-input-borderless]': `nzVariant() === 'borderless'`,
    '[class.ant-input-filled]': `nzVariant() === 'filled'`,
    '[class.ant-input-underlined]': `nzVariant() === 'underlined'`,
    '[class.ant-input-lg]': `finalSize() === 'large'`,
    '[class.ant-input-sm]': `finalSize() === 'small'`,
    '[attr.disabled]': 'finalDisabled() || null',
    '[attr.readonly]': 'readonly() || null',
    '[class.ant-input-rtl]': `dir() === 'rtl'`,
    '[class.ant-input-stepperless]': `nzStepperless()`,
    '[class.ant-input-focused]': 'focused()'
  },
  hostDirectives: [NzSpaceCompactItemDirective],
  providers: [{ provide: NZ_SPACE_COMPACT_ITEM_TYPE, useValue: 'input' }]
})
export class NzInputDirective implements OnInit {
  private elementRef = inject<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(ElementRef);
  private compactSize = inject(NZ_SPACE_COMPACT_SIZE, { optional: true });
  private destroyRef = inject(DestroyRef);
  private nzFormStatusService = inject(NzFormStatusService, { optional: true });
  private nzFormNoStatusService = inject(NzFormNoStatusService, { optional: true });
  private inputWrapper = inject(NZ_INPUT_WRAPPER, { host: true, optional: true });
  private focusMonitor = inject(FocusMonitor);
  private hostView = inject(ViewContainerRef);
  private readonly inputPasswordDir = inject(NzInputPasswordDirective, { host: true, optional: true });
  private readonly inputSearchDir = inject(NZ_INPUT_SEARCH, { host: true, optional: true });

  readonly ngControl = inject(NgControl, { self: true, optional: true });
  readonly value = signal<string>(this.elementRef.nativeElement.value);

  readonly nzVariant = input<NzVariant>('outlined');
  readonly nzSize = input<NzSizeLDSType>('default');
  /**
   * @deprecated Will be removed in v22.
   */
  readonly nzStepperless = input(true, { transform: booleanAttribute });
  readonly nzStatus = input<NzStatus>('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });

  readonly controlDisabled = signal(false);
  readonly finalDisabled = this.ngControl ? this.controlDisabled : this.disabled;
  readonly dir = inject(Directionality).valueSignal;
  // TODO: When the input group is removed, we can remove this.
  readonly size = linkedSignal(this.nzSize);

  private readonly formSize = inject(NZ_FORM_SIZE, { optional: true });

  readonly status = this.nzFormStatusService
    ? toSignal(this.nzFormStatusService.formStatusChanges.pipe(map(value => value.status)), { initialValue: '' })
    : this.nzStatus;
  readonly hasFeedback = toSignal(
    this.nzFormStatusService?.formStatusChanges.pipe(map(value => value.hasFeedback)) ?? EMPTY,
    { initialValue: false }
  );
  readonly classes = computed(() => getStatusClassNames(PREFIX_CLS, this.status(), this.hasFeedback()));
  readonly type = computed(() => {
    if (this.inputPasswordDir) {
      return this.inputPasswordDir.nzVisible() ? 'text' : 'password';
    }
    if (this.inputSearchDir) {
      return 'search';
    }
    return this.elementRef.nativeElement.getAttribute('type') || 'text';
  });

  protected readonly focused = signal<boolean>(false);
  protected readonly finalSize = computed(() => {
    if (this.formSize?.()) {
      return this.formSize();
    }
    if (this.compactSize) {
      return this.compactSize();
    }
    return this.size();
  });

  feedbackRef: ComponentRef<NzFormItemFeedbackIconComponent> | null = null;
  // TODO: When the input group is removed, we can remove this.
  disabled$ = toObservable(this.finalDisabled);

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.focusMonitor.stopMonitoring(this.elementRef);
    });

    this.focusMonitor
      .monitor(this.elementRef, false)
      .pipe(takeUntilDestroyed())
      .subscribe(origin => this.focused.set(!!origin));

    effect(() => {
      this.renderFeedbackIcon();
    });
  }

  ngOnInit(): void {
    // statusChanges is only accessible in onInit
    this.ngControl?.statusChanges?.pipe(startWith(null), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.controlDisabled.set(!!this.ngControl!.disabled);
    });

    this.ngControl?.valueChanges?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
      this.value.set(value);
    });
  }

  private renderFeedbackIcon(): void {
    if (!this.status() || !this.hasFeedback() || this.inputWrapper || !!this.nzFormNoStatusService) {
      // remove feedback
      this.hostView.clear();
      this.feedbackRef = null;
      return;
    }

    this.feedbackRef = this.feedbackRef || this.hostView.createComponent(NzFormItemFeedbackIconComponent);
    this.feedbackRef.location.nativeElement.classList.add('ant-input-suffix');
    this.feedbackRef.instance.status = this.status();
    this.feedbackRef.instance.updateIcon();
  }

  focus(options?: InputFocusOptions): void {
    triggerFocus(this.elementRef.nativeElement, options);
  }

  blur(): void {
    this.elementRef.nativeElement.blur();
  }
}
