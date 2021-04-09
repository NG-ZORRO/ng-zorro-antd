/**
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
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NzTSType } from 'ng-zorro-antd/core/types';

import { NzI18nService, NzTextI18nInterface } from 'ng-zorro-antd/i18n';
import { NzAutosizeDirective } from 'ng-zorro-antd/input';

import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nz-text-edit',
  exportAs: 'nzTextEdit',
  template: `
    <button
      *ngIf="!editing"
      nz-tooltip
      nz-trans-button
      class="ant-typography-edit"
      [nzTooltipTitle]="tooltip === null ? null : tooltip || locale?.edit"
      (click)="onClick()"
    >
      <ng-container *nzStringTemplateOutlet="icon; let icon">
        <i nz-icon [nzType]="icon"></i>
      </ng-container>
    </button>
    <ng-container *ngIf="editing">
      <textarea
        #textarea
        nz-input
        nzAutosize
        (input)="onInput($event)"
        (blur)="confirm()"
        (keydown.esc)="onCancel()"
        (keydown.enter)="onEnter($event)"
      ></textarea>
      <button nz-trans-button class="ant-typography-edit-content-confirm" (click)="confirm()">
        <i nz-icon nzType="enter"></i>
      </button>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class NzTextEditComponent implements OnInit, OnDestroy {
  editing = false;
  locale!: NzTextI18nInterface;
  private destroy$ = new Subject();

  @Input() text?: string;
  @Input() icon: NzTSType = 'edit';
  @Input() tooltip?: null | NzTSType;
  @Output() readonly startEditing = new EventEmitter<void>();
  @Output() readonly endEditing = new EventEmitter<string>(true);
  @ViewChild('textarea', { static: false }) textarea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild(NzAutosizeDirective, { static: false }) autosizeDirective!: NzAutosizeDirective;

  beforeText?: string;
  currentText?: string;
  nativeElement = this.host.nativeElement;
  constructor(private zone: NgZone, private host: ElementRef, private cdr: ChangeDetectorRef, private i18n: NzI18nService) {}

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

  onEnter(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.confirm();
  }

  onCancel(): void {
    this.currentText = this.beforeText;
    this.confirm();
  }

  focusAndSetValue(): void {
    this.zone.onStable.pipe(take(1), takeUntil(this.destroy$)).subscribe(() => {
      if (this.textarea?.nativeElement) {
        this.textarea.nativeElement.focus();
        this.textarea.nativeElement.value = this.currentText || '';
        this.autosizeDirective.resizeToFitContent();
        this.cdr.markForCheck();
      }
    });
  }
}
