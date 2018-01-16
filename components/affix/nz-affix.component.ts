import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { throttleTime } from 'rxjs/operators/throttleTime';

import { NzScrollService } from '../core/scroll/nz-scroll.service';

@Component({
  selector           : 'nz-affix',
  preserveWhitespaces: false,
  template           : `
    <div #wrap>
      <ng-content></ng-content>
    </div>`,
  host               : {
    'style': 'display:block'
  }
})
export class NzAffixComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {

  private didScroll = false;
  private scrollTime: number = null;
  private scroll$: Subscription = null;
  private scrollWinInTarget$: Subscription = null;

  @ViewChild('wrap') private wrap: ElementRef;
  // 缓存固定状态
  private fixed = false;
  // 原始位置
  private orgOffset: { top: number, left: number };

  @Input()
  nzTarget: Element;

  @Input() nzOffsetTop = 0;

  @Input() nzOffsetBottom = 0;

  @Output() nzChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private scrollSrv: NzScrollService, private _el: ElementRef) {
  }

  ngOnChanges(changes: { [P in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (changes.nzTarget) {
      this.registerScrollEvent();
    }
  }

  ngOnInit(): void {
    if (!this.nzTarget) {
      this.registerScrollEvent();
    }
  }

  ngAfterViewInit(): void {
    this.orgOffset = null;
    this.fixed = false;
  }

  private reCalculate(): this {
    const elOffset = this.scrollSrv.getOffset(this._el.nativeElement);
    this.orgOffset = {
      top : elOffset.top + this.scrollSrv.getScroll(this.nzTarget),
      left: elOffset.left + this.scrollSrv.getScroll(this.nzTarget, false)
    };

    return this;
  }

  private process(): void {
    if (!this.orgOffset) {
      this.reCalculate();
    }
    const containerScrollTop = this.scrollSrv.getScroll(this.nzTarget);
    const fixTop = this.nzTarget ? this.scrollSrv.getOffset(this.nzTarget).top : 0;
    const hasFixed = this.orgOffset.top - fixTop - containerScrollTop - this.nzOffsetTop <= 0;
    if (this.fixed === hasFixed) {
      return;
    }

    const wrapEl = this.wrap.nativeElement;
    wrapEl.classList[ hasFixed ? 'add' : 'remove' ]('ant-affix');
    if (hasFixed) {
      wrapEl.style.cssText = `top:${((+this.nzOffsetTop) + (+fixTop))}px;left:${this.orgOffset.left}px`;
    } else {
      wrapEl.style.cssText = ``;
    }

    this.fixed = hasFixed;
    this.nzChange.emit(hasFixed);
  }

  private removeListen(): void {
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

  private registerScrollEvent(): void {
    this.removeListen();
    this.reCalculate().process();
    // TODO: should refactor this logic
    this.scrollTime = window.setInterval(() => {
      if (this.didScroll) {
        this.didScroll = false;
        this.process();
      }
    }, 100);
    this.scroll$ = fromEvent(this.nzTarget || window, 'scroll')
    .subscribe(() => this.didScroll = true);

    if (this.nzTarget) {
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
