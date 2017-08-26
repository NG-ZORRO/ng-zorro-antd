import {
  Component,
  ViewEncapsulation,
  OnInit,
  Input,
  EventEmitter,
  Output,
  Renderer2,
  OnDestroy,
  ViewChild,
  ElementRef,
  Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
import { RxChain } from '@angular/cdk';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { throttleTime } from 'rxjs/operator/throttleTime';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';
import { Subscription } from 'rxjs/Subscription';

import { NzScrollService } from "../core/scroll/nz-scroll.service";
import { NzAnchorLinkComponent } from "./nz-anchor-link.component";

type Section = {
  comp: NzAnchorLinkComponent,
  top: number
};

@Component({
  selector: 'nz-anchor',
  encapsulation: ViewEncapsulation.None,
  template: `
  <div class="ant-anchor-wrapper" #container>
    <div class="ant-anchor">
      <div class="ant-anchor-ink">
        <div class="ant-anchor-ink-ball" [class.visible]="_visible" #ball></div>
      </div>
      <ng-content></ng-content>
    </div>
  </div>
  `,
  styleUrls: [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzAnchorComponent {

  private links: NzAnchorLinkComponent[] = [];
  private scroll$: Subscription = null;
  private target: Element = null;
  private animating: boolean = false;

  @ViewChild('container')
  private container: ElementRef;

  @ViewChild('ball')
  private ball: ElementRef;

  _top: number = 0;
  _visible: boolean = false;

  @Input()
  set nzTarget(el: Element) {
    this.target = el;
    this.registerScrollEvent();
  }

  @Input() nzOffsetTop: number = 0;

  @Input() nzBounds: number = 5;

  @Output() nzScroll: EventEmitter<NzAnchorLinkComponent> = new EventEmitter();

  constructor(private scrollSrv: NzScrollService, private _renderer: Renderer2, @Inject(DOCUMENT) private doc: Document) { }

  ngOnInit(): void {
    if (!this.scroll$) this.registerScrollEvent();
  }

  private getTarget(): Element | Window {
    return this.target || window;
  }

  private handleScroll() {
    if (this.animating) return;

    let sections: Section[] = [];
    this.links.forEach(comp => {
      comp.active = false;
      const target = this.doc.querySelector(comp.nzHref);
      const top = this.scrollSrv.getOffset(target).top;
      if (target && top < this.nzOffsetTop + this.nzBounds) {
        sections.push({
          top,
          comp
        })
      }
    });

    this._visible = !!sections.length;
    if (!this._visible)
      return;

    const maxSection = sections.reduce((prev, curr) => curr.top > prev.top ? curr : prev);
    maxSection.comp.active = true;

    let linkNode = (maxSection.comp.el.nativeElement as HTMLDivElement).querySelector('.ant-anchor-link-title') as HTMLElement;
    this.ball.nativeElement.style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
    // console.log(linkNode, linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5);

    this.nzScroll.emit(maxSection.comp);
  }

  private removeListen() {
    if (this.scroll$) this.scroll$.unsubscribe();
  }

  private registerScrollEvent() {
    this.removeListen();
    // 由于页面刷新时滚动条位置的记忆
    // 倒置在dom未渲染完成，导致计算不正确（500ms用于延后执行解决）
    setTimeout(() => {
      this.handleScroll();
    }, 500);
    this.scroll$ = (RxChain.from(fromEvent(this.getTarget(), 'scroll')) as RxChain<any>)
      .call(throttleTime, 50)
      .call(distinctUntilChanged)
      .subscribe(e => {
        this.handleScroll();
      });
  }

  add(linkComp: NzAnchorLinkComponent) {
    this.links.push(linkComp);
  }

  /** 设置滚动条至 `linkComp` 所处位置 */
  scrollTo(linkComp: NzAnchorLinkComponent) {
    const el = this.doc.querySelector(linkComp.nzHref);
    if (!el) return;

    this.animating = true;
    const containerScrollTop = this.scrollSrv.getScroll(this.getTarget());
    const elOffsetTop = this.scrollSrv.getOffset(el).top;
    const targetScrollTop = containerScrollTop + elOffsetTop - this.nzOffsetTop;
    this.scrollSrv.scrollTo(this.getTarget(), targetScrollTop, null, () => {
      this.animating = false;
      this.handleScroll();
    });

    if (!location.href.includes('#'))
      history.pushState(null, '', linkComp.nzHref);
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

}
