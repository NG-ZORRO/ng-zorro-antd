/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { NzPageHeaderFooterDirective } from './nz-page-header-cells';

@Component({
  selector: 'nz-page-header',
  exportAs: 'nzPageHeader',
  templateUrl: './nz-page-header.component.html',
  styleUrls: ['./nz-page-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ant-page-header',
    '[class.ant-page-header-has-footer]': 'nzPageHeaderFooter'
  },
  styles: [
    `
      .ant-page-header-back-button {
        border: 0px;
        background: transparent;
        padding: 0px;
        line-height: inherit;
        display: inline-block;
      }
    `
  ]
})
export class NzPageHeaderComponent implements OnInit, OnChanges {
  isTemplateRefBackIcon = false;
  isStringBackIcon = false;

  @Input() nzBackIcon: string | TemplateRef<void> | null = null;
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() nzSubtitle: string | TemplateRef<void>;
  @Output() readonly nzBack = new EventEmitter<void>();

  @ContentChild(NzPageHeaderFooterDirective, { static: false }) nzPageHeaderFooter: ElementRef<
    NzPageHeaderFooterDirective
  >;

  constructor(@Optional() private dir: Directionality) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('nzBackIcon')) {
      this.isTemplateRefBackIcon = changes.nzBackIcon.currentValue instanceof TemplateRef;
      this.isStringBackIcon = typeof changes.nzBackIcon.currentValue === 'string';
    }
  }

  getLayoutDirection(): Direction {
    return this.dir && this.dir.value === 'rtl' ? 'rtl' : 'ltr';
  }
  onBack(): void {
    this.nzBack.emit();
  }
}
