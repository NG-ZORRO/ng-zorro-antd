/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  forwardRef,
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  ExistingProvider,
  OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Mention } from './nz-mention.component';
import { NzMentionService } from './nz-mention.service';

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
    autocomplete: 'off',
    '(focusin)': 'onFocusin.emit()',
    '(blur)': 'onBlur.emit()',
    '(input)': 'onInput.emit($event)',
    '(keydown)': 'onKeydown.emit($event)',
    '(click)': 'onClick.emit($event)'
  }
})
export class NzMentionTriggerDirective implements ControlValueAccessor, OnDestroy, AfterViewInit {
  onChange: (value: string) => void;
  onTouched: () => void;

  readonly onFocusin: EventEmitter<void> = new EventEmitter();
  readonly onBlur: EventEmitter<void> = new EventEmitter();
  readonly onInput: EventEmitter<KeyboardEvent> = new EventEmitter();
  readonly onKeydown: EventEmitter<KeyboardEvent> = new EventEmitter();
  readonly onClick: EventEmitter<MouseEvent> = new EventEmitter();
  value: string;

  constructor(public el: ElementRef, private nzMentionService: NzMentionService) {}

  completeEvents(): void {
    this.onFocusin.complete();
    this.onBlur.complete();
    this.onInput.complete();
    this.onKeydown.complete();
    this.onClick.complete();
  }

  focus(caretPos?: number): void {
    this.el.nativeElement.focus();
    this.el.nativeElement.setSelectionRange(caretPos, caretPos);
  }

  insertMention(mention: Mention): void {
    const value: string = this.el.nativeElement.value;
    const insertValue = mention.mention.trim() + ' ';
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
  }

  ngOnDestroy(): void {
    this.completeEvents();
  }
}
