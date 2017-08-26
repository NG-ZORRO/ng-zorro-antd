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
  HostBinding
} from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { RxChain } from '@angular/cdk';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { throttleTime } from 'rxjs/operator/throttleTime';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';
import { Subscription } from 'rxjs/Subscription';

import { NzScrollService } from "../core/scroll/nz-scroll.service";

@Component({
  selector: 'nz-affix',
  encapsulation: ViewEncapsulation.None,
  template: `<div #wrap><ng-content></ng-content></div>`,
  styleUrls: [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzAffixComponent implements OnInit, OnDestroy {

  private scroll$: Subscription = null;
  private scrollWinInTarget$: Subscription = null;
  private target: Element = null;
  @ViewChild('wrap') private wrap: ElementRef;
  // 缓存固定状态
  private fixed: boolean = false;
  // 原始位置
  private orgOffset: { top: number, left: number };

  @Input()
  set nzTarget(el: Element) {
    this.target = el;
    this.registerScrollEvent();
  }

  @Input() nzOffsetTop: number = 0;

  @Input() nzOffsetBottom: number = 0;

  @Output() nzChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private scrollSrv: NzScrollService, private _el: ElementRef, private _renderer: Renderer2) { }

  ngOnInit(): void {
    if (!this.scroll$) this.registerScrollEvent();
  }

  private getTarget(): Element | Window {
    return this.target || window;
  }

  private reCalculate() {
    let elOffset = this.scrollSrv.getOffset(this._el.nativeElement);
    this.orgOffset = {
      top: elOffset.top + this.scrollSrv.getScroll(this.getTarget()),
      left: elOffset.left + this.scrollSrv.getScroll(this.getTarget(), false)
    };

    return this;
  }

  private process() {
    if (!this.orgOffset) this.reCalculate();
    const containerScrollTop = this.scrollSrv.getScroll(this.getTarget());
    let fixTop = this.getTarget() === window ? 0 : this.scrollSrv.getOffset(this.getTarget() as Element).top;
    let hasFixed = this.orgOffset.top - fixTop - containerScrollTop - this.nzOffsetTop <= 0;
    if (this.fixed === hasFixed) return;

    const wrapEl = this.wrap.nativeElement;
    wrapEl.classList[hasFixed ? 'add' : 'remove']('ant-affix');
    if (hasFixed) {
      wrapEl.style.cssText = `top:${this.nzOffsetTop + fixTop}px;left:${this.orgOffset.left}px`;
    } else {
      wrapEl.style.cssText = ``;
    }

    this.fixed = hasFixed;
    this.nzChange.emit(hasFixed);
  }

  private removeListen() {
    if (this.scroll$) this.scroll$.unsubscribe();
    if (this.scrollWinInTarget$) this.scrollWinInTarget$.unsubscribe();
  }

  private registerScrollEvent() {
    this.removeListen();
    this.reCalculate().process();
    this.scroll$ = (RxChain.from(fromEvent(this.getTarget(), 'scroll')) as RxChain<any>)
      .call(throttleTime, 50)
      .call(distinctUntilChanged)
      .subscribe(e => {
        this.process();
      });

    if (this.getTarget() !== window) {
      // 当 window 滚动位发生变动时，需要重新计算滚动容器
      this.scrollWinInTarget$ = (RxChain.from(fromEvent(window, 'scroll')) as RxChain<any>)
        .call(throttleTime, 50)
        .call(distinctUntilChanged)
        .subscribe(e => {
          this.orgOffset = null;
          this.fixed = false;
        });
    }
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

}
