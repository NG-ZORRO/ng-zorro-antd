/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzAnchorComponent } from './nz-anchor.component';

@Component({
  selector: 'nz-link',
  exportAs: 'nzLink',
  preserveWhitespaces: false,
  templateUrl: './nz-anchor-link.component.html',
  host: {
    '[class.ant-anchor-link-active]': 'active'
  },
  styles: [
    `
      nz-link {
        display: block;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzAnchorLinkComponent implements OnInit, OnDestroy {
  @Input() nzHref = '#';

  titleStr: string | null = '';
  titleTpl: TemplateRef<void>;
  active: boolean = false;

  @Input()
  set nzTitle(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.titleStr = null;
      this.titleTpl = value;
    } else {
      this.titleStr = value;
    }
  }

  @ContentChild('nzTemplate', { static: false }) nzTemplate: TemplateRef<void>;

  constructor(
    public elementRef: ElementRef,
    private anchorComp: NzAnchorComponent,
    private cdr: ChangeDetectorRef,
    private platform: Platform,
    renderer: Renderer2
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-anchor-link');
  }

  ngOnInit(): void {
    this.anchorComp.registerLink(this);
  }

  goToClick(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    if (this.platform.isBrowser) {
      this.anchorComp.handleScrollTo(this);
    }
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.anchorComp.unregisterLink(this);
  }
}
