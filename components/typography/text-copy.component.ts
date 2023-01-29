/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Clipboard } from '@angular/cdk/clipboard';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzTSType } from 'ng-zorro-antd/core/types';
import { NzI18nService, NzTextI18nInterface } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'nz-text-copy',
  exportAs: 'nzTextCopy',
  template: `
    <button
      type="button"
      nz-tooltip
      nz-trans-button
      [nzTooltipTitle]="copied ? copedTooltip : copyTooltip"
      class="ant-typography-copy"
      [class.ant-typography-copy-success]="copied"
      (click)="onClick()"
    >
      <ng-container *nzStringTemplateOutlet="copied ? copedIcon : copyIcon; let icon">
        <span nz-icon [nzType]="icon"></span>
      </ng-container>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class NzTextCopyComponent implements OnInit, OnDestroy, OnChanges {
  copied = false;
  copyId: number = -1;
  locale!: NzTextI18nInterface;
  nativeElement = this.host.nativeElement;
  copyTooltip: NzTSType | null = null;
  copedTooltip: NzTSType | null = null;
  copyIcon: NzTSType = 'copy';
  copedIcon: NzTSType = 'check';
  private destroy$ = new Subject();

  @Input() text!: string;
  @Input() tooltips?: [NzTSType, NzTSType] | null;
  @Input() icons: [NzTSType, NzTSType] = ['copy', 'check'];

  @Output() readonly textCopy = new EventEmitter<string>();

  constructor(
    private host: ElementRef,
    private cdr: ChangeDetectorRef,
    private clipboard: Clipboard,
    private i18n: NzI18nService
  ) {}

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Text');
      this.updateTooltips();
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { tooltips, icons } = changes;
    if (tooltips) {
      this.updateTooltips();
    }
    if (icons) {
      this.updateIcons();
    }
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
    this.clipboard.copy(text);
    this.onCopied();
  }

  onCopied(): void {
    clearTimeout(this.copyId);
    this.copyId = setTimeout(() => {
      this.copied = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  private updateTooltips(): void {
    if (this.tooltips === null) {
      this.copedTooltip = null;
      this.copyTooltip = null;
    } else if (Array.isArray(this.tooltips)) {
      const [copyTooltip, copedTooltip] = this.tooltips;
      this.copyTooltip = copyTooltip || this.locale?.copy;
      this.copedTooltip = copedTooltip || this.locale?.copied;
    } else {
      this.copyTooltip = this.locale?.copy;
      this.copedTooltip = this.locale?.copied;
    }
    this.cdr.markForCheck();
  }

  private updateIcons(): void {
    const [copyIcon, copedIcon] = this.icons;
    this.copyIcon = copyIcon;
    this.copedIcon = copedIcon;
    this.cdr.markForCheck();
  }
}
