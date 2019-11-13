/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';

import {
  toNumber,
  InputBoolean,
  InputNumber,
  NgStyleInterface,
  NzConfigService,
  NzScrollService,
  WithConfig
} from 'ng-zorro-antd/core';

import { NzAnchorLinkComponent } from './nz-anchor-link.component';

interface Section {
  comp: NzAnchorLinkComponent;
  top: number;
}

const NZ_CONFIG_COMPONENT_NAME = 'anchor';
const sharpMatcherRegx = /#([^#]+)$/;

@Component({
  selector: 'nz-anchor',
  exportAs: 'nzAnchor',
  preserveWhitespaces: false,
  templateUrl: './nz-anchor.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzAnchorComponent implements OnDestroy, AfterViewInit {
  @ViewChild('ink', { static: false }) private ink: ElementRef;

  @Input() @InputBoolean() nzAffix = true;

  @Input()
  @WithConfig(NZ_CONFIG_COMPONENT_NAME, false)
  @InputBoolean()
  nzShowInkInFixed: boolean;

  @Input()
  @WithConfig(NZ_CONFIG_COMPONENT_NAME, 5)
  @InputNumber()
  nzBounds: number;

  @Input()
  @WithConfig<number>(NZ_CONFIG_COMPONENT_NAME)
  set nzOffsetTop(value: number) {
    this._offsetTop = toNumber(value, 0);
    this.wrapperStyle = {
      'max-height': `calc(100vh - ${this._offsetTop}px)`
    };
  }

  get nzOffsetTop(): number {
    return this._offsetTop;
  }

  private _offsetTop: number;

  @Input()
  set nzTarget(el: string | Element) {
    this.target = typeof el === 'string' ? this.doc.querySelector(el) : el;
    this.registerScrollEvent();
  }

  @Output() readonly nzClick = new EventEmitter<string>();
  @Output() readonly nzScroll = new EventEmitter<NzAnchorLinkComponent>();

  visible = false;
  wrapperStyle: NgStyleInterface = { 'max-height': '100vh' };

  private links: NzAnchorLinkComponent[] = [];
  private animating = false;
  private target: Element | null = null;
  private scroll$: Subscription | null = null;
  private destroyed = false;

  constructor(
    public nzConfigService: NzConfigService,
    private scrollSrv: NzScrollService,
    /* tslint:disable-next-line:no-any */
    @Inject(DOCUMENT) private doc: any,
    private cdr: ChangeDetectorRef,
    private platform: Platform
  ) {}

  registerLink(link: NzAnchorLinkComponent): void {
    this.links.push(link);
  }

  unregisterLink(link: NzAnchorLinkComponent): void {
    this.links.splice(this.links.indexOf(link), 1);
  }

  private getTarget(): Element | Window {
    return this.target || window;
  }

  ngAfterViewInit(): void {
    this.registerScrollEvent();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.removeListen();
  }

  private registerScrollEvent(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.removeListen();
    this.scroll$ = fromEvent(this.getTarget(), 'scroll')
      .pipe(
        throttleTime(50),
        distinctUntilChanged()
      )
      .subscribe(() => this.handleScroll());
    // Browser would maintain the scrolling position when refreshing.
    // So we have to delay calculation in avoid of getting a incorrect result.
    setTimeout(() => this.handleScroll());
  }

  private removeListen(): void {
    if (this.scroll$) {
      this.scroll$.unsubscribe();
    }
  }

  private getOffsetTop(element: HTMLElement): number {
    if (!element || !element.getClientRects().length) {
      return 0;
    }
    const rect = element.getBoundingClientRect();
    if (rect.width || rect.height) {
      if (this.getTarget() === window) {
        return rect.top - element.ownerDocument!.documentElement!.clientTop;
      }
      return rect.top - (this.getTarget() as HTMLElement).getBoundingClientRect().top;
    }
    return rect.top;
  }

  handleScroll(): void {
    if (typeof document === 'undefined' || this.destroyed || this.animating) {
      return;
    }

    const sections: Section[] = [];
    const scope = (this.nzOffsetTop || 0) + this.nzBounds;
    this.links.forEach(comp => {
      const sharpLinkMatch = sharpMatcherRegx.exec(comp.nzHref.toString());
      if (!sharpLinkMatch) {
        return;
      }
      const target = this.doc.getElementById(sharpLinkMatch[1]);
      if (target) {
        const top = this.getOffsetTop(target);
        if (top < scope) {
          sections.push({
            top,
            comp
          });
        }
      }
    });

    this.visible = !!sections.length;
    if (!this.visible) {
      this.clearActive();
      this.cdr.detectChanges();
    } else {
      const maxSection = sections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
      this.handleActive(maxSection.comp);
    }
  }

  private clearActive(): void {
    this.links.forEach(i => {
      i.active = false;
      i.markForCheck();
    });
  }

  private handleActive(comp: NzAnchorLinkComponent): void {
    this.clearActive();

    comp.active = true;
    comp.markForCheck();

    const linkNode = (comp.elementRef.nativeElement as HTMLDivElement).querySelector(
      '.ant-anchor-link-title'
    ) as HTMLElement;
    this.ink.nativeElement.style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
    this.visible = true;
    this.cdr.detectChanges();

    this.nzScroll.emit(comp);
  }

  handleScrollTo(linkComp: NzAnchorLinkComponent): void {
    const el = this.doc.querySelector(linkComp.nzHref);
    if (!el) {
      return;
    }

    this.animating = true;
    const containerScrollTop = this.scrollSrv.getScroll(this.getTarget());
    const elOffsetTop = this.getOffsetTop(el);
    const targetScrollTop = containerScrollTop + elOffsetTop - (this.nzOffsetTop || 0);
    this.scrollSrv.scrollTo(this.getTarget(), targetScrollTop, undefined, () => {
      this.animating = false;
      this.handleActive(linkComp);
    });
    this.nzClick.emit(linkComp.nzHref);
  }
}
