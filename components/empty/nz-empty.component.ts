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
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzI18nService } from 'ng-zorro-antd/i18n';

import { emptyImage } from './nz-empty-config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-empty',
  exportAs: 'nzEmpty',
  templateUrl: './nz-empty.component.html',
  styles: ['nz-empty { display: block; }'],
  host: {
    class: 'ant-empty'
  }
})
export class NzEmptyComponent implements OnChanges, OnInit, OnDestroy {
  @Input() nzNotFoundImage: string | TemplateRef<void>;
  @Input() nzNotFoundContent: string | TemplateRef<void>;
  @Input() nzNotFoundFooter: string | TemplateRef<void>;

  // NOTE: It would be very hack to use `ContentChild`, because Angular could
  // tell if user actually pass something to <ng-content>.
  // See: https://github.com/angular/angular/issues/12530.
  // I can use a directive but this would expose the name `footer`.
  // @ContentChild(TemplateRef, {static: false}) nzNotFoundFooter: TemplateRef<void>;

  defaultSvg = this.sanitizer.bypassSecurityTrustResourceUrl(emptyImage);
  isContentString = false;
  locale: { [key: string]: string } = {};

  get shouldRenderContent(): boolean {
    const content = this.nzNotFoundContent;
    return !!(content || typeof content === 'string');
  }

  private destroy$ = new Subject<void>();

  constructor(private sanitizer: DomSanitizer, private i18n: NzI18nService, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { nzNotFoundContent } = changes;
    if (nzNotFoundContent) {
      this.isContentString = typeof nzNotFoundContent.currentValue === 'string';
    }
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Empty');
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
