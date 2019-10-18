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
  ViewEncapsulation
} from '@angular/core';

import { NzCopyToClipboardService } from 'ng-zorro-antd/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nz-text-copy',
  exportAs: 'nzTextCopy',
  templateUrl: './nz-text-copy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class NzTextCopyComponent implements OnInit, OnDestroy {
  copied = false;
  copyId: number;
  // tslint:disable-next-line:no-any
  locale: any = {};
  nativeElement = this.host.nativeElement;
  private destroy$ = new Subject();

  @Input() text: string;
  @Output() readonly textCopy = new EventEmitter<string>();

  constructor(
    private host: ElementRef,
    private cdr: ChangeDetectorRef,
    private copyToClipboard: NzCopyToClipboardService,
    private i18n: NzI18nService
  ) {}

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Text');
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.copyId);
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClick(): void {
    if (this.copied) {
      return;
    }
    this.copied = true;
    this.cdr.detectChanges();
    const text = this.text;
    this.textCopy.emit(text);
    this.copyToClipboard
      .copy(text)
      .then(() => this.onCopied())
      .catch(() => this.onCopied());
  }

  onCopied(): void {
    clearTimeout(this.copyId);
    this.copyId = setTimeout(() => {
      this.copied = false;
      this.cdr.detectChanges();
    }, 3000);
  }
}
