/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzAnchorComponent } from './anchor.component';

@Component({
  selector: 'nz-link',
  exportAs: 'nzLink',
  preserveWhitespaces: false,
  template: `
    <a
      #linkTitle
      class="ant-anchor-link-title"
      [href]="nzHref"
      [title]="titleStr"
      [target]="nzTarget"
      (click)="goToClick($event)"
    >
      <span *ngIf="titleStr; else titleTpl || nzTemplate">{{ titleStr }}</span>
    </a>
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzAnchorLinkComponent implements OnInit, OnDestroy {
  @Input() nzHref = '#';
  @Input() nzTarget?: string;

  titleStr: string | null = '';
  titleTpl?: TemplateRef<NzSafeAny>;

  @Input()
  set nzTitle(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.titleStr = null;
      this.titleTpl = value;
    } else {
      this.titleStr = value;
    }
  }

  @ContentChild('nzTemplate', { static: false }) nzTemplate!: TemplateRef<void>;
  @ViewChild('linkTitle') linkTitle!: ElementRef<HTMLAnchorElement>;

  constructor(
    public elementRef: ElementRef,
    private anchorComp: NzAnchorComponent,
    private platform: Platform,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(elementRef.nativeElement, 'ant-anchor-link');
  }

  ngOnInit(): void {
    this.anchorComp.registerLink(this);
  }

  getLinkTitleElement(): HTMLAnchorElement {
    return this.linkTitle.nativeElement;
  }

  setActive(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-anchor-link-active');
  }

  unsetActive(): void {
    this.renderer.removeClass(this.elementRef.nativeElement, 'ant-anchor-link-active');
  }

  goToClick(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    if (this.platform.isBrowser) {
      this.anchorComp.handleScrollTo(this);
    }
  }

  ngOnDestroy(): void {
    this.anchorComp.unregisterLink(this);
  }
}
