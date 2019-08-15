/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzAutosizeDirective } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-text-edit',
  exportAs: 'nzTextEdit',
  templateUrl: './nz-text-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class NzTextEditComponent implements OnInit, OnDestroy {
  editing = false;
  // tslint:disable-next-line:no-any
  locale: any = {};
  private destroy$ = new Subject();

  @Input() text: string;
  @Output() readonly startEditing = new EventEmitter<void>();
  @Output() readonly endEditing = new EventEmitter<string>();
  @ViewChild('textarea', { static: false }) textarea: ElementRef<HTMLTextAreaElement>;
  @ViewChild(NzAutosizeDirective, { static: false }) autosizeDirective: NzAutosizeDirective;

  beforeText: string;
  currentText: string;
  nativeElement = this.host.nativeElement;
  constructor(private host: ElementRef, private cdr: ChangeDetectorRef, private i18n: NzI18nService) {}

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Text');
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClick(): void {
    this.beforeText = this.text;
    this.currentText = this.beforeText;
    this.editing = true;
    this.startEditing.emit();
    this.focusAndSetValue();
  }

  confirm(): void {
    this.editing = false;
    this.endEditing.emit(this.currentText);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.currentText = target.value;
  }

  onEnter(event: KeyboardEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.confirm();
  }

  onCancel(): void {
    this.currentText = this.beforeText;
    this.confirm();
  }

  focusAndSetValue(): void {
    setTimeout(() => {
      if (this.textarea && this.textarea.nativeElement) {
        this.textarea.nativeElement.focus();
        this.textarea.nativeElement.value = this.currentText;
        this.autosizeDirective.resizeToFitContent();
      }
    });
  }
}
