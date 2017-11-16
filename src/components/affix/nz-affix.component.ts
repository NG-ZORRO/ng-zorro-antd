import {
  Component,
  ViewEncapsulation,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { throttleTime } from 'rxjs/operators/throttleTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';

import { NzScrollService } from '../core/scroll/nz-scroll.service';

@Component({
  selector     : 'nz-affix',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div #wrap>
      <ng-content></ng-content>
    </div>`,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzAffixComponent implements OnInit, OnDestroy {

  private didScroll = false;
  private scrollTime: any = null;
  private scroll$: Subscription = null;
  private scrollWinInTarget$: Subscription = null;
  private target: Element = null;
  @ViewChild('wrap') private wrap: ElementRef;
  // 缓存固定状态
  private fixed = false;
  // 原始位置
  private orgOffset: { top: number, left: number };

  @Input()
  set nzTarget(el: Element) {
    this.target = el;
    this.registerScrollEvent();
  }

  @Input() nzOffsetTop = 0;

  @Input() nzOffsetBottom = 0;

  @Output() nzChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private scrollSrv: NzScrollService, private _el: ElementRef) {
  }

  ngOnInit(): void {
    if (!this.scroll$) {
      this.registerScrollEvent();
    }
  }

  private getTarget(): Element | Window {
    return this.target || window;
  }

  private reCalculate() {
    const elOffset = this.scrollSrv.getOffset(this._el.nativeElement);
    this.orgOffset = {
      top : elOffset.top + this.scrollSrv.getScroll(this.getTarget()),
      left: elOffset.left + this.scrollSrv.getScroll(this.getTarget(), false)
    };

    return this;
  }

  private process() {
    if (!this.orgOffset) {
      this.reCalculate();
    }
    const containerScrollTop = this.scrollSrv.getScroll(this.getTarget());
    const fixTop = this.getTarget() === window ? 0 : this.scrollSrv.getOffset(this.getTarget() as Element).top;
    const hasFixed = this.orgOffset.top - fixTop - containerScrollTop - this.nzOffsetTop <= 0;
    if (this.fixed === hasFixed) {
      return;
    }

    const wrapEl = this.wrap.nativeElement;
    wrapEl.classList[ hasFixed ? 'add' : 'remove' ]('ant-affix');
    if (hasFixed) {
      wrapEl.style.cssText = `top:${this.nzOffsetTop + fixTop}px;left:${this.orgOffset.left}px`;
    } else {
      wrapEl.style.cssText = ``;
    }

    this.fixed = hasFixed;
    this.nzChange.emit(hasFixed);
  }

  private removeListen() {
    if (this.scrollTime) {
      clearTimeout(this.scrollTime);
    }
    if (this.scroll$) {
      this.scroll$.unsubscribe();
    }
    if (this.scrollWinInTarget$) {
      this.scrollWinInTarget$.unsubscribe();
    }
  }

  private registerScrollEvent() {
    this.removeListen();
    this.reCalculate().process();
    this.scrollTime = setInterval(() => {
      if (this.didScroll) {
        this.didScroll = false;
        this.process();
      }
    }, 100);
    this.scroll$ = fromEvent(this.getTarget(), 'scroll')
      .subscribe(() => this.didScroll = true);

    if (this.getTarget() !== window) {
      // 当 window 滚动位发生变动时，需要重新计算滚动容器
      this.scrollWinInTarget$ = fromEvent(window, 'scroll').pipe(throttleTime(50), distinctUntilChanged())
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
