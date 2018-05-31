// tslint:disable:no-any
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import { NzScrollService } from '../core/scroll/nz-scroll.service';
import { shallowEqual } from '../core/util/check';
import { toNumber } from '../core/util/convert';
import { throttleByAnimationFrameDecorator } from '../core/util/throttleByAnimationFrame';

@Component({
  selector       : 'nz-affix',
  templateUrl    : './nz-affix.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles         : [
    `:host {
      display: block;
    }`
  ]
})
export class NzAffixComponent implements OnInit, OnDestroy {

  private timeout: any;
  private events = [
    'resize',
    'scroll',
    'touchstart',
    'touchmove',
    'touchend',
    'pageshow',
    'load'
  ];
  private affixStyle: any;
  private placeholderStyle: any;

  @ViewChild('wrap') private wrap: ElementRef;

  private _target: Element | Window = window;

  @Input()
  set nzTarget(value: Element | Window) {
    this.clearEventListeners();
    this._target = value || window;
    this.setTargetEventListeners();
    this.updatePosition({});
  }

  private _offsetTop: number;

  @Input()
  set nzOffsetTop(value: number) {
    if (typeof value === 'undefined') {
      return;
    }
    this._offsetTop = toNumber(value, null);
  }

  get nzOffsetTop(): number {
    return this._offsetTop;
  }

  private _offsetBottom: number;

  @Input()
  set nzOffsetBottom(value: number) {
    if (typeof value === 'undefined') {
      return;
    }
    this._offsetBottom = toNumber(value, null);
  }

  @Output() nzChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private scrollSrv: NzScrollService, private _el: ElementRef, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.timeout = setTimeout(() => {
      this.setTargetEventListeners();
      this.updatePosition({});
    });
  }

  private setTargetEventListeners(): void {
    this.clearEventListeners();
    this.events.forEach((eventName: string) => {
      this._target.addEventListener(eventName, this.updatePosition, false);
    });
  }

  private clearEventListeners(): void {
    this.events.forEach(eventName => {
      this._target.removeEventListener(eventName, this.updatePosition, false);
    });
  }

  ngOnDestroy(): void {
    this.clearEventListeners();
    clearTimeout(this.timeout);
    (this.updatePosition as any).cancel();
  }

  private getTargetRect(target: Element | Window | null): ClientRect {
    return target !== window ?
      (target as HTMLElement).getBoundingClientRect() :
      { top: 0, left: 0, bottom: 0 } as ClientRect;
  }

  getOffset(element: Element, target: Element | Window | null): {
    top: number;
    left: number;
    width: number;
    height: number;
  } {
    const elemRect = element.getBoundingClientRect();
    const targetRect = this.getTargetRect(target);

    const scrollTop = this.scrollSrv.getScroll(target, true);
    const scrollLeft = this.scrollSrv.getScroll(target, false);

    const docElem = window.document.body;
    const clientTop = docElem.clientTop || 0;
    const clientLeft = docElem.clientLeft || 0;

    return {
      top   : elemRect.top - targetRect.top + scrollTop - clientTop,
      left  : elemRect.left - targetRect.left + scrollLeft - clientLeft,
      width : elemRect.width,
      height: elemRect.height
    };
  }

  private genStyle(affixStyle: {}): string {
    if (affixStyle == null) {
      return '';
    }
    return Object.keys(affixStyle).map(key => {
      const val = affixStyle[ key ];
      return `${key}:${typeof val === 'string' ? val : val + 'px'}`;
    }).join(';');
  }

  private setAffixStyle(e: any, affixStyle: {}): void {
    const originalAffixStyle = this.affixStyle;
    const isWindow = this._target === window;
    if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
      return;
    }
    if (shallowEqual(originalAffixStyle, affixStyle)) {
      return;
    }

    const fixed = !!affixStyle;
    const wrapEl = this.wrap.nativeElement as HTMLElement;
    wrapEl.style.cssText = this.genStyle(affixStyle);
    this.affixStyle = affixStyle;
    const cls = 'ant-affix';
    if (fixed) {
      wrapEl.classList.add(cls);
    } else {
      wrapEl.classList.remove(cls);
    }

    if ((affixStyle && !originalAffixStyle) || (!affixStyle && originalAffixStyle)) {
      this.nzChange.emit(fixed);
    }
  }

  private setPlaceholderStyle(placeholderStyle: {}): void {
    const originalPlaceholderStyle = this.placeholderStyle;
    if (shallowEqual(placeholderStyle, originalPlaceholderStyle)) {
      return;
    }
    (this._el.nativeElement as HTMLElement).style.cssText = this.genStyle(placeholderStyle);
    this.placeholderStyle = placeholderStyle;
  }

  @throttleByAnimationFrameDecorator()
  updatePosition(e: any): void {
    const targetNode = this._target;
    // Backwards support
    let offsetTop = this.nzOffsetTop;
    const scrollTop = this.scrollSrv.getScroll(targetNode, true);
    const affixNode = this._el.nativeElement as HTMLElement;
    const elemOffset = this.getOffset(affixNode, targetNode);
    const elemSize = {
      width : affixNode.offsetWidth,
      height: affixNode.offsetHeight
    };
    const offsetMode = {
      top   : false,
      bottom: false
    };
    // Default to `offsetTop=0`.
    if (typeof offsetTop !== 'number' && typeof this._offsetBottom !== 'number') {
      offsetMode.top = true;
      offsetTop = 0;
    } else {
      offsetMode.top = typeof offsetTop === 'number';
      offsetMode.bottom = typeof this._offsetBottom === 'number';
    }
    const targetRect = this.getTargetRect(targetNode);
    const targetInnerHeight =
            (targetNode as Window).innerHeight || (targetNode as HTMLElement).clientHeight;
    if (scrollTop > elemOffset.top - (offsetTop as number) && offsetMode.top) {
      const width = elemOffset.width;
      const top = targetRect.top + (offsetTop as number);
      this.setAffixStyle(e, {
        position : 'fixed',
        top,
        left     : targetRect.left + elemOffset.left,
        maxHeight: `calc(100vh - ${top}px)`,
        width
      });
      this.setPlaceholderStyle({
        width,
        height: elemSize.height
      });
    } else if (
      scrollTop < elemOffset.top + elemSize.height + (this._offsetBottom as number) - targetInnerHeight &&
      offsetMode.bottom
    ) {
      const targetBottomOffet = targetNode === window ? 0 : (window.innerHeight - targetRect.bottom);
      const width = elemOffset.width;
      this.setAffixStyle(e, {
        position: 'fixed',
        bottom  : targetBottomOffet + (this._offsetBottom as number),
        left    : targetRect.left + elemOffset.left,
        width
      });
      this.setPlaceholderStyle({
        width,
        height: elemOffset.height
      });
    } else {
      if (e.type === 'resize' && this.affixStyle && this.affixStyle.position === 'fixed' && affixNode.offsetWidth) {
        this.setAffixStyle(e, { ...this.affixStyle, width: affixNode.offsetWidth });
      } else {
        this.setAffixStyle(e, null);
      }
      this.setPlaceholderStyle(null);
    }
  }

}
