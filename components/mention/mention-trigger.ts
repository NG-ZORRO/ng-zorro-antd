/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectorRef,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  ExistingProvider,
  forwardRef,
  inject,
  NgZone,
  Output
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';

import { NZ_MENTION_CONFIG } from './config';
import { Mention } from './mention.component';
import { NzMentionService } from './mention.service';

/**
 * @deprecated Internally used, will be removed in v21, please do not use it.
 */
export const NZ_MENTION_TRIGGER_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NzMentionTriggerDirective),
  multi: true
};

@Directive({
  selector: 'input[nzMentionTrigger], textarea[nzMentionTrigger]',
  exportAs: 'nzMentionTrigger',
  providers: [NZ_MENTION_TRIGGER_ACCESSOR],
  host: {
    autocomplete: 'off'
  }
})
export class NzMentionTriggerDirective implements ControlValueAccessor, AfterViewInit {
  public readonly elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement> = inject(
    ElementRef<HTMLInputElement | HTMLTextAreaElement>
  );
  private readonly ngZone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly nzMentionService = inject(NzMentionService);

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() readonly onFocusin = new EventEmitter<FocusEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() readonly onBlur = new EventEmitter<FocusEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() readonly onInput = new EventEmitter<KeyboardEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() readonly onKeydown = new EventEmitter<KeyboardEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() readonly onClick = new EventEmitter<MouseEvent>();
  value?: string;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.completeEvents();
    });
  }

  completeEvents(): void {
    this.onFocusin.complete();
    this.onBlur.complete();
    this.onInput.complete();
    this.onKeydown.complete();
    this.onClick.complete();
  }

  focus(caretPos: number | null = null): void {
    this.elementRef.nativeElement.focus();
    this.elementRef.nativeElement.setSelectionRange(caretPos, caretPos);
  }

  insertMention(mention: Mention): void {
    const value: string = this.elementRef.nativeElement.value;
    const insertValue = `${mention.mention}${NZ_MENTION_CONFIG.split}`;
    const newValue = [
      value.slice(0, mention.startPos + 1),
      insertValue,
      value.slice(mention.endPos, value.length)
    ].join('');
    this.elementRef.nativeElement.value = newValue;
    this.focus(mention.startPos + insertValue.length + 1);
    this.onChange(newValue);
    this.value = newValue;
  }

  writeValue(value: string): void {
    this.value = value;
    if (typeof value === 'string') {
      this.elementRef.nativeElement.value = value;
    } else {
      this.elementRef.nativeElement.value = '';
    }
  }

  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngAfterViewInit(): void {
    this.nzMentionService.registerTrigger(this);

    this.setupEventListener('blur', this.onBlur);
    this.setupEventListener('focusin', this.onFocusin);
    this.setupEventListener('input', this.onInput);
    this.setupEventListener('click', this.onClick);
    this.setupEventListener('keydown', this.onKeydown);
  }

  private setupEventListener<TEvent extends Event>(eventName: string, eventEmitter: EventEmitter<TEvent>): void {
    fromEventOutsideAngular<TEvent>(this.elementRef.nativeElement, eventName)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        if (eventEmitter.observers.length) {
          this.ngZone.run(() => {
            eventEmitter.emit(event);
            this.cdr.markForCheck();
          });
        }
      });
  }
}
