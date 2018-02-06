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
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';
import { toBoolean, toNumber } from '../core/util/convert';

import { NzScrollService } from '../core/scroll/nz-scroll.service';
import { NzAnchorLinkComponent } from './nz-anchor-link.component';

interface Section {
  comp: NzAnchorLinkComponent;
  top: number;
}

const sharpMatcherRegx = /#([^#]+)$/;

@Component({
  selector           : 'nz-anchor',
  preserveWhitespaces: false,
  template           : `
  <nz-affix *ngIf="nzAffix;else content" [nzOffsetTop]="nzOffsetTop">
    <ng-template [ngTemplateOutlet]="content"></ng-template>
  </nz-affix>
  <ng-template #content>
    <div class="ant-anchor-wrapper" #wrap [ngStyle]="_wrapperStyle">
      <div class="ant-anchor" [ngClass]="{'fixed': !nzAffix && !nzShowInkInFixed}">
        <div class="ant-anchor-ink">
          <div class="ant-anchor-ink-ball" [class.visible]="_visible" #ink></div>
        </div>
        <ng-content></ng-content>
      </div>
    </div>
  </ng-template>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzAnchorComponent implements OnDestroy, OnInit, AfterViewInit {

  private links: NzAnchorLinkComponent[] = [];
  private animating = false;
  private target: Element = null;
  /** @private */
  _scroll$: Subscription = null;
  /** @private */
  _visible = false;
  /** @private */
  _wrapperStyle: {} = { 'max-height': '100vh' };
  @ViewChild('wrap')
  private wrap: ElementRef;
  @ViewChild('ink')
  private ink: ElementRef;

  // region: fields

  private _affix: boolean = true;
  @Input()
  set nzAffix(value: boolean) {
    this._affix = toBoolean(value);
  }
  get nzAffix(): boolean {
    return this._affix;
  }

  private _bounds: number = 5;
  @Input()
  set nzBounds(value: number) {
    this._bounds = toNumber(value);
  }
  get nzBounds(): number {
    return this._bounds;
  }

  private _offsetTop: number;
  @Input()
  set nzOffsetTop(value: number) {
    this._offsetTop = toNumber(value);
    if (this._offsetTop >= 0) {
      this._wrapperStyle = {
        'max-height': `calc(100vh - ${this._offsetTop}px)`
      };
    }
  }
  get nzOffsetTop(): number {
    return this._offsetTop;
  }

  private _offsetBottom: number;
  @Input()
  set nzOffsetBottom(value: number) {
    this._offsetBottom = toNumber(value);
  }
  get nzOffsetBottom(): number {
    return this._offsetBottom;
  }

  private _showInkInFixed: boolean = true;
  @Input()
  set nzShowInkInFixed(value: boolean) {
    this._showInkInFixed = toBoolean(value);
  }
  get nzShowInkInFixed(): boolean {
    return this._showInkInFixed;
  }

  @Input()
  set nzTarget(el: Element) {
    this.target = el;
    this.registerScrollEvent();
  }

  @Output() nzClick: EventEmitter<string> = new EventEmitter();

  @Output() nzScroll: EventEmitter<NzAnchorLinkComponent> = new EventEmitter();

  // endregion

  /* tslint:disable-next-line:no-any */
  constructor(private scrollSrv: NzScrollService, private _renderer: Renderer2, @Inject(DOCUMENT) private doc: any, private cd: ChangeDetectorRef) {
  }

  registerLink(link: NzAnchorLinkComponent): void {
    if (this.links.indexOf(link) === -1) this.links.push(link);
  }

  unregisterLink(link: NzAnchorLinkComponent): void {
    const index = this.links.indexOf(link);
    if (index !== -1) {
      this.links.splice(index, 1);
    }
  }

  private getTarget(): Element | Window {
    return this.target || window;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.registerScrollEvent();
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

  private registerScrollEvent(): void {
    this.removeListen();
    this._scroll$ = fromEvent(this.getTarget(), 'scroll').pipe(throttleTime(50), distinctUntilChanged())
    .subscribe(e => this.handleScroll());
    // 由于页面刷新时滚动条位置的记忆
    // 倒置在dom未渲染完成，导致计算不正确
    setTimeout(() => this.handleScroll());
  }

  private removeListen(): void {
    if (this._scroll$) this._scroll$.unsubscribe();
  }

  private getOffsetTop(element: HTMLElement): number {
    if (!element || !element.getClientRects().length) return 0;
    const rect = element.getBoundingClientRect();
    if (rect.width || rect.height) {
      const doc = element.ownerDocument;
      const docElem = doc.documentElement;
      return rect.top - docElem.clientTop;
    }
    return rect.top;
  }

  handleScroll(): void {
    if (this.animating) return;

    const sections: Section[] = [];
    const scope = (this.nzOffsetTop || 0) + this.nzBounds;
    this.links.forEach(comp => {
      comp.active = false;
      const sharpLinkMatch = sharpMatcherRegx.exec(comp.nzHref.toString());
      if (!sharpLinkMatch) return;
      const target = this.doc.getElementById(sharpLinkMatch[1]);
      if (target && this.getOffsetTop(target) < scope) {
        const top = this.getOffsetTop(target);
        sections.push({
          top,
          comp
        });
      }
    });

    this._visible = !!sections.length;
    if (!this._visible) {
      this.cd.detectChanges();
      return;
    }

    const maxSection = sections.reduce((prev, curr) => curr.top > prev.top ? curr : prev);
    maxSection.comp.active = true;
    this.cd.detectChanges();

    const linkNode = (maxSection.comp.el.nativeElement as HTMLDivElement).querySelector('.ant-anchor-link-title') as HTMLElement;
    this.ink.nativeElement.style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5}px`;

    this.nzScroll.emit(maxSection.comp);
  }

  handleScrollTo(linkComp: NzAnchorLinkComponent): void {
    const el = this.doc.querySelector(linkComp.nzHref);
    if (!el) return;

    this.animating = true;
    const containerScrollTop = this.scrollSrv.getScroll(this.getTarget());
    const elOffsetTop = this.scrollSrv.getOffset(el).top;
    const targetScrollTop = containerScrollTop + elOffsetTop - (this.nzOffsetTop || 0);
    this.scrollSrv.scrollTo(this.getTarget(), targetScrollTop, null, () => {
      this.animating = false;
      this.handleScroll();
    });
    this.nzClick.emit(linkComp.nzHref);
  }

}
