/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { supportsScrollBehavior, Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { shallowEqual, toNumber, NgStyleInterface, NzScrollService } from 'ng-zorro-antd/core';
import { fromEvent, merge, Subscription } from 'rxjs';
import { auditTime } from 'rxjs/operators';

export const NZ_AFFIX_DEFAULT_SCROLL_TIME = 20;

@Component({
  selector: 'nz-affix',
  exportAs: 'nzAffix',
  templateUrl: './nz-affix.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      nz-affix {
        display: block;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class NzAffixComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() nzTarget: string | Element | Window;

  @Input()
  set nzOffsetTop(value: number | null) {
    if (value === undefined || value === null) {
      return;
    }
    this._offsetTop = toNumber(value, null);
    this.updatePosition({} as Event);
  }

  get nzOffsetTop(): number | null {
    return this._offsetTop;
  }

  @Input()
  set nzOffsetBottom(value: number) {
    if (typeof value === 'undefined') {
      return;
    }
    this._offsetBottom = toNumber(value, null);
    this.updatePosition({} as Event);
  }

  @Output() readonly nzChange = new EventEmitter<boolean>();

  private timeout: number;
  private scroll$: Subscription | null = null;
  private readonly events = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'];
  @ViewChild('fixedEl', { static: true }) private fixedEl: ElementRef<HTMLDivElement>;
  private readonly placeholderNode: HTMLElement;
  private affixStyle: NgStyleInterface | undefined;
  private placeholderStyle: NgStyleInterface | undefined;
  private _offsetTop: number | null;
  private _offsetBottom: number | null;

  private get target(): Element | Window {
    const el = this.nzTarget;
    return (typeof el === 'string' ? this.doc.querySelector(el) : el) || window;
  }

  constructor(
    _el: ElementRef,
    private scrollSrv: NzScrollService,
    // tslint:disable-next-line:no-any
    @Inject(DOCUMENT) private doc: any,
    private ngZone: NgZone,
    private platform: Platform
  ) {
    this.placeholderNode = _el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzTarget) {
      this.registerListeners();
    }
  }

  ngAfterViewInit(): void {
    this.registerListeners();
  }

  ngOnDestroy(): void {
    this.removeListeners();
  }

  getOffset(
    element: Element,
    target: Element | Window | undefined
  ): {
    top: number;
    left: number;
    width: number;
    height: number;
  } {
    const elemRect = element.getBoundingClientRect();
    const targetRect = this.getTargetRect(target);

    const scrollTop = this.scrollSrv.getScroll(target, true);
    const scrollLeft = this.scrollSrv.getScroll(target, false);

    const docElem = this.doc.body;
    const clientTop = docElem.clientTop || 0;
    const clientLeft = docElem.clientLeft || 0;

    return {
      top: elemRect.top - targetRect.top + scrollTop - clientTop,
      left: elemRect.left - targetRect.left + scrollLeft - clientLeft,
      width: elemRect.width,
      height: elemRect.height
    };
  }

  private registerListeners(): void {
    if (!supportsScrollBehavior()) {
      return;
    }
    this.removeListeners();
    this.scroll$ = this.ngZone.runOutsideAngular(() => {
      return merge(...this.events.map(evName => fromEvent(this.target, evName)))
        .pipe(auditTime(NZ_AFFIX_DEFAULT_SCROLL_TIME))
        .subscribe(e => this.updatePosition(e));
    });
    this.timeout = setTimeout(() => this.updatePosition({} as Event));
  }

  private removeListeners(): void {
    if (!this.scroll$) {
      return;
    }
    clearTimeout(this.timeout);
    this.scroll$.unsubscribe();
  }

  private getTargetRect(target: Element | Window | undefined): ClientRect {
    return target !== window
      ? (target as HTMLElement).getBoundingClientRect()
      : ({ top: 0, left: 0, bottom: 0 } as ClientRect);
  }

  private genStyle(affixStyle?: NgStyleInterface): string {
    if (!affixStyle) {
      return '';
    }
    return Object.keys(affixStyle)
      .map(key => {
        const val = affixStyle[key];
        return `${key}:${typeof val === 'string' ? val : val + 'px'}`;
      })
      .join(';');
  }

  private setAffixStyle(e: Event, affixStyle?: NgStyleInterface): void {
    const originalAffixStyle = this.affixStyle;
    const isWindow = this.target === window;
    if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
      return;
    }
    if (shallowEqual(originalAffixStyle, affixStyle)) {
      return;
    }

    const fixed = !!affixStyle;
    const wrapEl = this.fixedEl.nativeElement;
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

  private setPlaceholderStyle(placeholderStyle?: NgStyleInterface): void {
    const originalPlaceholderStyle = this.placeholderStyle;
    if (shallowEqual(placeholderStyle, originalPlaceholderStyle)) {
      return;
    }
    this.placeholderNode.style.cssText = this.genStyle(placeholderStyle);
    this.placeholderStyle = placeholderStyle;
  }

  private syncPlaceholderStyle(e: Event): void {
    if (!this.affixStyle) {
      return;
    }
    this.placeholderNode.style.cssText = '';
    this.placeholderStyle = undefined;
    const styleObj = { width: this.placeholderNode.offsetWidth, height: this.fixedEl.nativeElement.offsetHeight };
    this.setAffixStyle(e, {
      ...this.affixStyle,
      ...styleObj
    });
    this.setPlaceholderStyle(styleObj);
  }

  updatePosition(e: Event): void {
    if (!this.platform.isBrowser) {
      return;
    }
    const targetNode = this.target as (HTMLElement | Window);
    // Backwards support
    let offsetTop = this.nzOffsetTop;
    const scrollTop = this.scrollSrv.getScroll(targetNode!, true);
    const elemOffset = this.getOffset(this.placeholderNode, targetNode!);
    const fixedNode = this.fixedEl.nativeElement;
    const elemSize = {
      width: fixedNode.offsetWidth,
      height: fixedNode.offsetHeight
    };
    const offsetMode = {
      top: false,
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
    const targetRect = this.getTargetRect(targetNode as Window);
    const targetInnerHeight = (targetNode as Window).innerHeight || (targetNode as HTMLElement).clientHeight;
    if (scrollTop >= elemOffset.top - (offsetTop as number) && offsetMode.top) {
      const width = elemOffset.width;
      const top = targetRect.top + (offsetTop as number);
      this.setAffixStyle(e, {
        position: 'fixed',
        top,
        left: targetRect.left + elemOffset.left,
        maxHeight: `calc(100vh - ${top}px)`,
        width
      });
      this.setPlaceholderStyle({
        width,
        height: elemSize.height
      });
    } else if (
      scrollTop <= elemOffset.top + elemSize.height + (this._offsetBottom as number) - targetInnerHeight &&
      offsetMode.bottom
    ) {
      const targetBottomOffet = targetNode === window ? 0 : window.innerHeight - targetRect.bottom;
      const width = elemOffset.width;
      this.setAffixStyle(e, {
        position: 'fixed',
        bottom: targetBottomOffet + (this._offsetBottom as number),
        left: targetRect.left + elemOffset.left,
        width
      });
      this.setPlaceholderStyle({
        width,
        height: elemOffset.height
      });
    } else {
      if (
        e.type === 'resize' &&
        this.affixStyle &&
        this.affixStyle.position === 'fixed' &&
        this.placeholderNode.offsetWidth
      ) {
        this.setAffixStyle(e, { ...this.affixStyle, width: this.placeholderNode.offsetWidth });
      } else {
        this.setAffixStyle(e);
      }
      this.setPlaceholderStyle();
    }

    if (e.type === 'resize') {
      this.syncPlaceholderStyle(e);
    }
  }
}
