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
import { NzScrollService } from '../core/scroll/nz-scroll.service';
import { toBoolean, toNumber } from '../core/util/convert';

import { NzAnchorLinkComponent } from './nz-anchor-link.component';

interface Section {
  comp: NzAnchorLinkComponent;
  top: number;
}

const sharpMatcherRegx = /#([^#]+)$/;

@Component({
  selector           : 'nz-anchor',
  preserveWhitespaces: false,
  templateUrl        : './nz-anchor.component.html',
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush
})
export class NzAnchorComponent implements OnDestroy, AfterViewInit {

  private links: NzAnchorLinkComponent[] = [];
  private animating = false;
  private target: Element = null;
  private scroll$: Subscription = null;
  private destroyed = false;
  @ViewChild('ink') private ink: ElementRef;
  visible = false;
  wrapperStyle: {} = { 'max-height': '100vh' };

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
    this._bounds = toNumber(value, 5);
  }

  get nzBounds(): number {
    return this._bounds;
  }

  private _offsetTop: number;

  @Input()
  set nzOffsetTop(value: number) {
    this._offsetTop = toNumber(value, 0);
    this.wrapperStyle = {
      'max-height': `calc(100vh - ${this._offsetTop}px)`
    };
  }

  get nzOffsetTop(): number {
    return this._offsetTop;
  }

  private _showInkInFixed: boolean = false;

  @Input()
  set nzShowInkInFixed(value: boolean) {
    this._showInkInFixed = toBoolean(value);
  }

  get nzShowInkInFixed(): boolean {
    return this._showInkInFixed;
  }

  @Input()
  set nzTarget(el: string | Element) {
    this.target = typeof el === 'string' ? this.doc.querySelector(el) : el;
    this.registerScrollEvent();
  }

  @Output() readonly nzClick: EventEmitter<string> = new EventEmitter();

  @Output() readonly nzScroll: EventEmitter<NzAnchorLinkComponent> = new EventEmitter();

  // endregion

  /* tslint:disable-next-line:no-any */
  constructor(private scrollSrv: NzScrollService, @Inject(DOCUMENT) private doc: any, private cdr: ChangeDetectorRef) {
  }

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
    this.removeListen();
    this.scroll$ = fromEvent(this.getTarget(), 'scroll')
      .pipe(throttleTime(50), distinctUntilChanged())
      .subscribe(() => this.handleScroll());
    // 浏览器在刷新时保持滚动位置，会倒置在dom未渲染完成时计算不正确，因此延迟重新计算
    // 与之相对应可能会引起组件移除后依然触发 `handleScroll` 的 `detectChanges`
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
    if (!rect.width && !rect.height) {
      return rect.top;
    }
    return rect.top - element.ownerDocument.documentElement.clientTop;
  }

  handleScroll(): void {
    if (this.destroyed || this.animating) {
      return;
    }

    const sections: Section[] = [];
    const scope = (this.nzOffsetTop || 0) + this.nzBounds;
    this.links.forEach(comp => {
      const sharpLinkMatch = sharpMatcherRegx.exec(comp.nzHref.toString());
      if (!sharpLinkMatch) {
        return;
      }
      const target = this.doc.getElementById(sharpLinkMatch[ 1 ]);
      if (target && this.getOffsetTop(target) < scope) {
        const top = this.getOffsetTop(target);
        sections.push({
          top,
          comp
        });
      }
    });

    this.visible = !!sections.length;
    if (!this.visible) {
      this.clearActive();
      this.cdr.detectChanges();
    } else {
      const maxSection = sections.reduce((prev, curr) => curr.top > prev.top ? curr : prev);
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

    const linkNode = (comp.elementRef.nativeElement as HTMLDivElement).querySelector('.ant-anchor-link-title') as HTMLElement;
    this.ink.nativeElement.style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
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
    const elOffsetTop = this.scrollSrv.getOffset(el).top;
    const targetScrollTop = containerScrollTop + elOffsetTop - (this.nzOffsetTop || 0);
    this.scrollSrv.scrollTo(this.getTarget(), targetScrollTop, null, () => {
      this.animating = false;
      this.handleActive(linkComp);
    });
    this.nzClick.emit(linkComp.nzHref);
  }

}
