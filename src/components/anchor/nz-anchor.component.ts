import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { throttleTime } from 'rxjs/operators/throttleTime';

import { NzScrollService } from '../core/scroll/nz-scroll.service';
import { NzAnchorLinkComponent } from './nz-anchor-link.component';

interface Section {
  comp: NzAnchorLinkComponent;
  top: number;
}

@Component({
  selector     : 'nz-anchor',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="ant-anchor-wrapper" #container>
      <div class="ant-anchor">
        <div class="ant-anchor-ink">
          <div class="ant-anchor-ink-ball" [class.visible]="_visible" #ball></div>
        </div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzAnchorComponent implements OnDestroy, OnInit {

  private links: NzAnchorLinkComponent[] = [];
  private scroll$: Subscription = null;
  private target: Element = null;
  private animating = false;
  private doc: Document;

  @ViewChild('container')
  private container: ElementRef;

  @ViewChild('ball')
  private ball: ElementRef;

  _top = 0;
  _visible = false;

  @Input()
  set nzTarget(el: Element) {
    this.target = el;
    this.registerScrollEvent();
  }

  @Input() nzOffsetTop = 0;

  @Input() nzBounds = 5;

  @Output() nzScroll: EventEmitter<NzAnchorLinkComponent> = new EventEmitter();

  /* tslint:disable-next-line:no-any */
  constructor(private scrollSrv: NzScrollService, private _renderer: Renderer2, @Inject(DOCUMENT) doc: any) {
    this.doc = doc;
  }

  ngOnInit(): void {
    if (!this.scroll$) {
      this.registerScrollEvent();
    }
  }

  private getTarget(): Element | Window {
    return this.target || window;
  }

  private handleScroll(): void {
    if (this.animating) {
      return;
    }

    const sections: Section[] = [];
    this.links.forEach(comp => {
      comp.active = false;
      const target = this.doc.querySelector(comp.nzHref);
      const top = this.scrollSrv.getOffset(target).top;
      if (target && top < this.nzOffsetTop + this.nzBounds) {
        sections.push({
          top,
          comp
        });
      }
    });

    this._visible = !!sections.length;
    if (!this._visible) {
      return;
    }

    const maxSection = sections.reduce((prev, curr) => curr.top > prev.top ? curr : prev);
    maxSection.comp.active = true;

    const linkNode = (maxSection.comp.el.nativeElement as HTMLDivElement).querySelector('.ant-anchor-link-title') as HTMLElement;
    this.ball.nativeElement.style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5}px`;

    this.nzScroll.emit(maxSection.comp);
  }

  private removeListen(): void {
    if (this.scroll$) {
      this.scroll$.unsubscribe();
    }
  }

  private registerScrollEvent(): void {
    this.removeListen();
    // 由于页面刷新时滚动条位置的记忆
    // 倒置在dom未渲染完成，导致计算不正确（500ms用于延后执行解决）
    setTimeout(() => {
      this.handleScroll();
    }, 500);
    this.scroll$ = fromEvent(this.getTarget(), 'scroll').pipe(throttleTime(50), distinctUntilChanged())
      .subscribe(e => {
        this.handleScroll();
      });
  }

  add(linkComp: NzAnchorLinkComponent): void {
    this.links.push(linkComp);
  }

  /** 设置滚动条至 `linkComp` 所处位置 */
  scrollTo(linkComp: NzAnchorLinkComponent): void {
    const el = this.doc.querySelector(linkComp.nzHref);
    if (!el) {
      return;
    }

    this.animating = true;
    const containerScrollTop = this.scrollSrv.getScroll(this.getTarget());
    const elOffsetTop = this.scrollSrv.getOffset(el).top;
    const targetScrollTop = containerScrollTop + elOffsetTop - this.nzOffsetTop;
    this.scrollSrv.scrollTo(this.getTarget(), targetScrollTop, null, () => {
      this.animating = false;
      this.handleScroll();
    });
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

}
