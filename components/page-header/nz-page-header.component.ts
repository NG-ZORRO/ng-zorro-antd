/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { Location } from '@angular/common';
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
export class NzPageHeaderComponent implements OnChanges {
  isTemplateRefBackIcon = false;
  isStringBackIcon = false;

  @Input() nzBackIcon: string | TemplateRef<void> | null = null;
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() nzSubtitle: string | TemplateRef<void>;
  @Output() readonly nzBack = new EventEmitter<void>();

  @ContentChild(NzPageHeaderFooterDirective, { static: false }) nzPageHeaderFooter: ElementRef<
    NzPageHeaderFooterDirective
  >;

  constructor(private location: Location) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('nzBackIcon')) {
      this.isTemplateRefBackIcon = changes.nzBackIcon.currentValue instanceof TemplateRef;
      this.isStringBackIcon = typeof changes.nzBackIcon.currentValue === 'string';
    }
  }

  onBack(): void {
    if (this.nzBack.observers.length) {
      this.nzBack.emit();
    } else {
      this.location.back();
    }
  }
}
