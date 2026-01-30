/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { normalizePassiveListenerOptions, Platform } from '@angular/cdk/platform';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  DOCUMENT,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzScrollService } from 'ng-zorro-antd/core/services';
import { NgStyleInterface, NzDirectionVHType } from 'ng-zorro-antd/core/types';
import { fromEventOutsideAngular, numberAttributeWithZeroFallback } from 'ng-zorro-antd/core/util';

import { NzAnchorLinkComponent } from './anchor-link.component';
import { getOffsetTop } from './util';

interface Section {
  comp: NzAnchorLinkComponent;
  top: number;
}

const VISIBLE_CLASSNAME = 'ant-anchor-ink-ball-visible';
const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'anchor';
const sharpMatcherRegx = /#([^#]+)$/;

const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });

@Component({
  selector: 'nz-anchor',
  exportAs: 'nzAnchor',
  imports: [NgTemplateOutlet, NzAffixModule],
  template: `
    @if (nzAffix) {
      <nz-affix [nzOffsetTop]="nzOffsetTop" [nzTarget]="container">
        <ng-template [ngTemplateOutlet]="content" />
      </nz-affix>
    } @else {
      <ng-template [ngTemplateOutlet]="content" />
    }

    <ng-template #content>
      <div
        class="ant-anchor-wrapper"
        [class]="{ 'ant-anchor-wrapper-horizontal': nzDirection === 'horizontal' }"
        [style]="wrapperStyle"
      >
        <div class="ant-anchor" [class]="{ 'ant-anchor-fixed': !nzAffix && !nzShowInkInFixed }">
          <div class="ant-anchor-ink">
            <div class="ant-anchor-ink-ball" #ink></div>
          </div>
          <ng-content />
        </div>
      </div>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzAnchorComponent implements AfterViewInit, OnChanges {
  public nzConfigService = inject(NzConfigService);
  private scrollSrv = inject(NzScrollService);
  private cdr = inject(ChangeDetectorRef);
  private platform = inject(Platform);
  private renderer = inject(Renderer2);
  private doc: Document = inject(DOCUMENT);
  private destroyRef = inject(DestroyRef);

  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  @ViewChild('ink', { static: false }) private ink!: ElementRef;

  @Input({ transform: booleanAttribute }) nzAffix = true;

  @Input({ transform: booleanAttribute })
  @WithConfig()
  nzShowInkInFixed: boolean = false;

  @Input({ transform: numberAttribute })
  @WithConfig()
  nzBounds: number = 5;

  @Input({ transform: numberAttributeWithZeroFallback })
  @WithConfig()
  nzOffsetTop?: number = undefined;

  @Input({ transform: numberAttributeWithZeroFallback })
  @WithConfig()
  nzTargetOffset?: number = undefined;

  @Input() nzContainer?: string | HTMLElement;
  @Input() nzCurrentAnchor?: string;
  @Input() nzDirection: NzDirectionVHType = 'vertical';

  @Output() readonly nzClick = new EventEmitter<string>();
  @Output() readonly nzChange = new EventEmitter<string>();
  @Output() readonly nzScroll = new EventEmitter<NzAnchorLinkComponent>();

  visible = false;
  wrapperStyle: NgStyleInterface = { 'max-height': '100vh' };

  container?: HTMLElement | Window;
  activeLink?: string;

  private links: NzAnchorLinkComponent[] = [];
  private animating = false;
  private destroy$ = new Subject<boolean>();
  private handleScrollTimeoutID?: ReturnType<typeof setTimeout>;

  constructor() {
    this.destroyRef.onDestroy(() => {
      clearTimeout(this.handleScrollTimeoutID);
      this.destroy$.next(true);
      this.destroy$.complete();
    });
  }

  registerLink(link: NzAnchorLinkComponent): void {
    this.links.push(link);
  }

  unregisterLink(link: NzAnchorLinkComponent): void {
    this.links.splice(this.links.indexOf(link), 1);
  }

  private getContainer(): HTMLElement | Window {
    return this.container || window;
  }

  ngAfterViewInit(): void {
    this.registerScrollEvent();
  }
  private registerScrollEvent(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.destroy$.next(true);

    fromEventOutsideAngular(this.getContainer(), 'scroll', passiveEventListenerOptions)
      .pipe(throttleTime(50), takeUntil(this.destroy$))
      .subscribe(() => this.handleScroll());
    // Browser would maintain the scrolling position when refreshing.
    // So we have to delay calculation in avoid of getting a incorrect result.
    this.handleScrollTimeoutID = setTimeout(() => this.handleScroll());
  }

  handleScroll(): void {
    if (typeof document === 'undefined' || this.animating) {
      return;
    }

    const sections: Section[] = [];
    const offsetTop = this.nzTargetOffset ? this.nzTargetOffset : this.nzOffsetTop || 0;
    const scope = offsetTop + this.nzBounds;
    this.links.forEach(comp => {
      const sharpLinkMatch = sharpMatcherRegx.exec(comp.nzHref.toString());
      if (!sharpLinkMatch) {
        return;
      }
      const target = this.doc.getElementById(sharpLinkMatch[1]);
      if (target) {
        const top = getOffsetTop(target, this.getContainer());
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
    this.setVisible();
  }

  private clearActive(): void {
    this.links.forEach(i => {
      i.unsetActive();
    });
  }

  private setActive(comp?: NzAnchorLinkComponent): void {
    const originalActiveLink = this.activeLink;
    const targetComp = (this.nzCurrentAnchor && this.links.find(n => n.nzHref === this.nzCurrentAnchor)) || comp;
    if (!targetComp) return;

    targetComp.setActive();
    const linkNode = targetComp.getLinkTitleElement();
    if (this.nzDirection === 'vertical') {
      this.ink.nativeElement.style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
    } else {
      this.ink.nativeElement.style.left = `${linkNode.offsetLeft + linkNode.clientWidth / 2}px`;
    }
    this.activeLink = (comp || targetComp).nzHref;
    if (originalActiveLink !== this.activeLink) {
      this.nzChange.emit(this.activeLink);
    }
  }

  private handleActive(comp: NzAnchorLinkComponent): void {
    this.clearActive();
    this.setActive(comp);
    this.visible = true;
    this.setVisible();
    this.nzScroll.emit(comp);
  }

  private setVisible(): void {
    if (this.ink) {
      const visible = this.visible;
      if (visible) {
        this.renderer.addClass(this.ink.nativeElement, VISIBLE_CLASSNAME);
      } else {
        this.renderer.removeClass(this.ink.nativeElement, VISIBLE_CLASSNAME);
      }
    }
  }

  handleScrollTo(linkComp: NzAnchorLinkComponent): void {
    const el = this.doc.querySelector<HTMLElement>(linkComp.nzHref);
    if (!el) {
      return;
    }

    this.animating = true;
    const containerScrollTop = this.scrollSrv.getScroll(this.getContainer());
    const elOffsetTop = getOffsetTop(el, this.getContainer());
    let targetScrollTop = containerScrollTop + elOffsetTop;
    targetScrollTop -= this.nzTargetOffset !== undefined ? this.nzTargetOffset : this.nzOffsetTop || 0;
    this.scrollSrv.scrollTo(this.getContainer(), targetScrollTop, {
      callback: () => {
        this.animating = false;
        this.handleActive(linkComp);
      }
    });
    this.nzClick.emit(linkComp.nzHref);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzOffsetTop, nzContainer, nzCurrentAnchor } = changes;
    if (nzOffsetTop) {
      this.wrapperStyle = {
        'max-height': `calc(100vh - ${this.nzOffsetTop}px)`
      };
    }
    if (nzContainer) {
      const container = this.nzContainer;
      this.container = typeof container === 'string' ? this.doc.querySelector<HTMLElement>(container)! : container;
      this.registerScrollEvent();
    }
    if (nzCurrentAnchor) {
      this.setActive();
    }
  }
}
