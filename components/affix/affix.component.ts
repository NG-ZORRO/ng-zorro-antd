/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
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
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzScrollService } from 'ng-zorro-antd/core/services';
import { NgStyleInterface, NumberInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { getStyleAsText, InputNumber, shallowEqual } from 'ng-zorro-antd/core/util';

import { fromEvent, merge, ReplaySubject, Subject, Subscription } from 'rxjs';
import { auditTime, map, takeUntil } from 'rxjs/operators';

import { AffixRespondEvents } from './respond-events';
import { getTargetRect, SimpleRect } from './utils';

const NZ_CONFIG_COMPONENT_NAME = 'affix';
const NZ_AFFIX_CLS_PREFIX = 'ant-affix';
const NZ_AFFIX_DEFAULT_SCROLL_TIME = 20;

@Component({
  selector: 'nz-affix',
  exportAs: 'nzAffix',
  template: `
    <div #fixedEl>
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzAffixComponent implements AfterViewInit, OnChanges, OnDestroy {
  static ngAcceptInputType_nzOffsetTop: NumberInput;
  static ngAcceptInputType_nzOffsetBottom: NumberInput;

  @ViewChild('fixedEl', { static: true }) private fixedEl!: ElementRef<HTMLDivElement>;

  @Input() nzTarget?: string | Element | Window;

  @Input()
  @WithConfig<number | null>(NZ_CONFIG_COMPONENT_NAME)
  @InputNumber(undefined)
  nzOffsetTop?: null | number;

  @Input()
  @WithConfig<number | null>(NZ_CONFIG_COMPONENT_NAME)
  @InputNumber(undefined)
  nzOffsetBottom?: null | number;

  @Output() readonly nzChange = new EventEmitter<boolean>();

  private readonly placeholderNode: HTMLElement;

  private affixStyle?: NgStyleInterface;
  private placeholderStyle?: NgStyleInterface;
  private positionChangeSubscription: Subscription = Subscription.EMPTY;
  private offsetChanged$ = new ReplaySubject(1);
  private destroy$ = new Subject<void>();
  private timeout?: number;
  private document: Document;

  private get target(): Element | Window {
    const el = this.nzTarget;
    return (typeof el === 'string' ? this.document.querySelector(el) : el) || window;
  }

  constructor(
    el: ElementRef,
    @Inject(DOCUMENT) doc: NzSafeAny,
    public nzConfigService: NzConfigService,
    private scrollSrv: NzScrollService,
    private ngZone: NgZone,
    private platform: Platform,
    private renderer: Renderer2
  ) {
    // The wrapper would stay at the original position as a placeholder.
    this.placeholderNode = el.nativeElement;
    this.document = doc;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzOffsetBottom, nzOffsetTop, nzTarget } = changes;

    if (nzOffsetBottom || nzOffsetTop) {
      this.offsetChanged$.next();
    }
    if (nzTarget) {
      this.registerListeners();
    }
  }

  ngAfterViewInit(): void {
    this.registerListeners();
  }

  ngOnDestroy(): void {
    this.removeListeners();
  }

  private registerListeners(): void {
    this.removeListeners();
    this.positionChangeSubscription = this.ngZone.runOutsideAngular(() => {
      return merge(
        ...Object.keys(AffixRespondEvents).map(evName => fromEvent(this.target, evName)),
        this.offsetChanged$.pipe(
          takeUntil(this.destroy$),
          map(() => ({}))
        )
      )
        .pipe(auditTime(NZ_AFFIX_DEFAULT_SCROLL_TIME))
        .subscribe(e => this.updatePosition(e as Event));
    });
    this.timeout = setTimeout(() => this.updatePosition({} as Event));
  }

  private removeListeners(): void {
    clearTimeout(this.timeout);
    this.positionChangeSubscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  getOffset(element: Element, target: Element | Window | undefined): SimpleRect {
    const elemRect = element.getBoundingClientRect();
    const targetRect = getTargetRect(target!);

    const scrollTop = this.scrollSrv.getScroll(target, true);
    const scrollLeft = this.scrollSrv.getScroll(target, false);

    const docElem = this.document.body;
    const clientTop = docElem.clientTop || 0;
    const clientLeft = docElem.clientLeft || 0;

    return {
      top: elemRect.top - targetRect.top + scrollTop - clientTop,
      left: elemRect.left - targetRect.left + scrollLeft - clientLeft,
      width: elemRect.width,
      height: elemRect.height
    };
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
    this.renderer.setStyle(wrapEl, 'cssText', getStyleAsText(affixStyle));
    this.affixStyle = affixStyle;
    if (fixed) {
      wrapEl.classList.add(NZ_AFFIX_CLS_PREFIX);
    } else {
      wrapEl.classList.remove(NZ_AFFIX_CLS_PREFIX);
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
    this.renderer.setStyle(this.placeholderNode, 'cssText', getStyleAsText(placeholderStyle));
    this.placeholderStyle = placeholderStyle;
  }

  private syncPlaceholderStyle(e: Event): void {
    if (!this.affixStyle) {
      return;
    }
    this.renderer.setStyle(this.placeholderNode, 'cssText', '');
    this.placeholderStyle = undefined;
    const styleObj = {
      width: this.placeholderNode.offsetWidth,
      height: this.fixedEl.nativeElement.offsetHeight
    };
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

    const targetNode = this.target;
    let offsetTop = this.nzOffsetTop;
    const scrollTop = this.scrollSrv.getScroll(targetNode, true);
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
    if (typeof offsetTop !== 'number' && typeof this.nzOffsetBottom !== 'number') {
      offsetMode.top = true;
      offsetTop = 0;
    } else {
      offsetMode.top = typeof offsetTop === 'number';
      offsetMode.bottom = typeof this.nzOffsetBottom === 'number';
    }
    const targetRect = getTargetRect(targetNode as Window);
    const targetInnerHeight = (targetNode as Window).innerHeight || (targetNode as HTMLElement).clientHeight;
    if (scrollTop >= elemOffset.top - (offsetTop as number) && offsetMode.top) {
      const width = elemOffset.width;
      const top = targetRect.top + (offsetTop as number);
      this.setAffixStyle(e, {
        position: 'fixed',
        top,
        left: targetRect.left + elemOffset.left,
        width
      });
      this.setPlaceholderStyle({
        width,
        height: elemSize.height
      });
    } else if (scrollTop <= elemOffset.top + elemSize.height + (this.nzOffsetBottom as number) - targetInnerHeight && offsetMode.bottom) {
      const targetBottomOffset = targetNode === window ? 0 : window.innerHeight - targetRect.bottom!;
      const width = elemOffset.width;
      this.setAffixStyle(e, {
        position: 'fixed',
        bottom: targetBottomOffset + (this.nzOffsetBottom as number),
        left: targetRect.left + elemOffset.left,
        width
      });
      this.setPlaceholderStyle({
        width,
        height: elemOffset.height
      });
    } else {
      if (
        e.type === AffixRespondEvents.resize &&
        this.affixStyle &&
        this.affixStyle.position === 'fixed' &&
        this.placeholderNode.offsetWidth
      ) {
        this.setAffixStyle(e, {
          ...this.affixStyle,
          width: this.placeholderNode.offsetWidth
        });
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
