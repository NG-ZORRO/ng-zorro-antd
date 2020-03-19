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
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzPageHeaderBreadcrumbDirective, NzPageHeaderFooterDirective } from './page-header-cells';

const NZ_CONFIG_COMPONENT_NAME = 'pageHeader';

@Component({
  selector: 'nz-page-header',
  exportAs: 'nzPageHeader',
  template: `
    <ng-content select="nz-breadcrumb[nz-page-header-breadcrumb]"></ng-content>

    <div class="ant-page-header-heading">
      <!--back-->
      <div *ngIf="nzBackIcon !== null" (click)="onBack()" class="ant-page-header-back">
        <div role="button" tabindex="0" class="ant-page-header-back-button">
          <i *ngIf="isStringBackIcon" nz-icon [nzType]="nzBackIcon ? nzBackIcon : 'arrow-left'" nzTheme="outline"></i>
          <ng-container *ngIf="isTemplateRefBackIcon" [ngTemplateOutlet]="nzBackIcon"></ng-container>
        </div>
      </div>
      <!--avatar-->
      <ng-content select="nz-avatar[nz-page-header-avatar]"></ng-content>
      <!--title-->
      <span class="ant-page-header-heading-title" *ngIf="nzTitle">
        <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      </span>
      <ng-content *ngIf="!nzTitle" select="nz-page-header-title, [nz-page-header-title]"></ng-content>
      <!--subtitle-->
      <span class="ant-page-header-heading-sub-title" *ngIf="nzSubtitle">
        <ng-container *nzStringTemplateOutlet="nzSubtitle">{{ nzSubtitle }}</ng-container>
      </span>
      <ng-content *ngIf="!nzSubtitle" select="nz-page-header-subtitle, [nz-page-header-subtitle]"></ng-content>
      <ng-content select="nz-page-header-tags, [nz-page-header-tags]"></ng-content>
      <ng-content select="nz-page-header-extra, [nz-page-header-extra]"></ng-content>
    </div>

    <ng-content select="nz-page-header-content, [nz-page-header-content]"></ng-content>
    <ng-content select="nz-page-header-footer, [nz-page-header-footer]"></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ant-page-header',
    '[class.has-footer]': 'nzPageHeaderFooter',
    '[class.ant-page-header-ghost]': 'nzGhost',
    '[class.has-breadcrumb]': 'nzPageHeaderBreadcrumb'
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

      nz-page-header,
      nz-page-header-content,
      nz-page-header-footer {
        display: block;
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
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, true) nzGhost: boolean;
  @Output() readonly nzBack = new EventEmitter<void>();

  @ContentChild(NzPageHeaderFooterDirective, { static: false }) nzPageHeaderFooter: ElementRef<NzPageHeaderFooterDirective>;

  @ContentChild(NzPageHeaderBreadcrumbDirective, { static: false }) nzPageHeaderBreadcrumb: ElementRef<NzPageHeaderBreadcrumbDirective>;

  constructor(private location: Location, public nzConfigService: NzConfigService) {}

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
