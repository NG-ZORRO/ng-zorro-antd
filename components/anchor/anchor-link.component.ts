/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { NzDirectionVHType, NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzAnchorComponent } from './anchor.component';

@Component({
  selector: 'nz-link',
  exportAs: 'nzLink',
  imports: [NgTemplateOutlet],
  template: `
    <a
      #linkTitle
      class="ant-anchor-link-title"
      [href]="nzHref"
      [attr.title]="titleStr"
      [target]="nzTarget"
      (click)="goToClick($event)"
    >
      @if (titleStr) {
        <span>{{ titleStr }}</span>
      } @else {
        <ng-template [ngTemplateOutlet]="titleTpl || nzTemplate" />
      }
    </a>
    @if (nzDirection === 'vertical') {
      <ng-content />
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-anchor-link'
  }
})
export class NzAnchorLinkComponent implements OnInit {
  public elementRef = inject(ElementRef<HTMLElement>);
  private anchorComp = inject(NzAnchorComponent);
  private platform = inject(Platform);
  private renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);

  @Input() nzHref = '#';
  @Input() nzTarget?: string;

  titleStr: string | null = '';
  titleTpl?: TemplateRef<NzSafeAny>;
  nzDirection: NzDirectionVHType = 'vertical';

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

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.anchorComp.unregisterLink(this);
    });
  }

  ngOnInit(): void {
    this.anchorComp.registerLink(this);
    this.nzDirection = this.anchorComp.nzDirection;
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
}
