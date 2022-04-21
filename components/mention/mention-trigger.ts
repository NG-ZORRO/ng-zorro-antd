/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  ExistingProvider,
  forwardRef,
  NgZone,
  OnDestroy,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';

import { NZ_MENTION_CONFIG } from './config';
import { Mention } from './mention.component';
import { NzMentionService } from './mention.service';

export const NZ_MENTION_TRIGGER_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NzMentionTriggerDirective),
  multi: true
};

@Directive({
  selector: 'input[nzMentionTrigger], textarea[nzMentionTrigger]',
  exportAs: 'nzMentionTrigger',
  providers: [NzDestroyService, NZ_MENTION_TRIGGER_ACCESSOR],
  host: {
    autocomplete: 'off'
  }
})
export class NzMentionTriggerDirective implements ControlValueAccessor, OnDestroy, AfterViewInit {
  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() readonly onFocusin: EventEmitter<void> = new EventEmitter();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() readonly onBlur: EventEmitter<void> = new EventEmitter();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() readonly onInput: EventEmitter<KeyboardEvent> = new EventEmitter();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() readonly onKeydown: EventEmitter<KeyboardEvent> = new EventEmitter();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() readonly onClick: EventEmitter<MouseEvent> = new EventEmitter();
  value?: string;

  constructor(
    public el: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
    private ngZone: NgZone,
    private ref: ChangeDetectorRef,
    private destroy$: NzDestroyService,
    private nzMentionService: NzMentionService
  ) {}

  completeEvents(): void {
    this.onFocusin.complete();
    this.onBlur.complete();
    this.onInput.complete();
    this.onKeydown.complete();
    this.onClick.complete();
  }

  focus(caretPos: number | null = null): void {
    this.el.nativeElement.focus();
    this.el.nativeElement.setSelectionRange(caretPos, caretPos);
  }

  insertMention(mention: Mention): void {
    const value: string = this.el.nativeElement.value;
    const insertValue = `${mention.mention}${NZ_MENTION_CONFIG.split}`;
    const newValue = [
      value.slice(0, mention.startPos + 1),
      insertValue,
      value.slice(mention.endPos, value.length)
    ].join('');
    this.el.nativeElement.value = newValue;
    this.focus(mention.startPos + insertValue.length + 1);
    this.onChange(newValue);
    this.value = newValue;
  }

  writeValue(value: string): void {
    this.value = value;
    if (typeof value === 'string') {
      this.el.nativeElement.value = value;
    } else {
      this.el.nativeElement.value = '';
    }
  }

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
    this.setupEventListener('input', this.onInput, true);
    this.setupEventListener('click', this.onClick, true);
    this.setupEventListener('keydown', this.onKeydown, true);
  }

  ngOnDestroy(): void {
    this.completeEvents();
  }

  private setupEventListener<T>(eventName: string, eventEmitter: EventEmitter<T>, shouldPassEvent = false): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent<T>(this.el.nativeElement, eventName)
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          if (eventEmitter.observers.length) {
            this.ngZone.run(() => {
              eventEmitter.emit(shouldPassEvent ? event : undefined);
              this.ref.markForCheck();
            });
          }
        });
    });
  }
}
