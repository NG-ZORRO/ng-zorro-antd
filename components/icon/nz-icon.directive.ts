/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import {
  AfterContentChecked,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { IconDirective, ThemeType } from '@ant-design/icons-angular';
import { warnDeprecation, InputBoolean } from 'ng-zorro-antd/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzIconService } from './nz-icon.service';

const iconTypeRE = /^anticon\-\w/;

const getIconTypeClass = (className: string): { name: string; index: number } | undefined => {
  if (!className) {
    return undefined;
  } else {
    const classArr = className.split(/\s/);
    const index = classArr.findIndex(cls => cls !== 'anticon' && cls !== 'anticon-spin' && !!cls.match(iconTypeRE));
    return index === -1 ? undefined : { name: classArr[index], index };
  }
};

const normalizeType = (rawType: string): { type: string; crossError: boolean; verticalError: boolean } => {
  const ret = { type: rawType, crossError: false, verticalError: false };
  ret.type = rawType ? rawType.replace('anticon-', '') : '';
  if (ret.type.includes('verticle')) {
    ret.type = 'up';
    ret.verticalError = true;
  }
  if (ret.type.startsWith('cross')) {
    ret.type = 'close';
    ret.crossError = true;
  }
  return ret;
};

/**
 * This directive extends IconDirective to provide:
 *
 * - IconFont support
 * - spinning
 * - old API compatibility
 *
 * @break-changes
 *
 * - old API compatibility, icon class names would not be supported.
 * - properties that not started with `nz`.
 */
@Directive({
  selector: 'i.anticon, [nz-icon]',
  exportAs: 'nzIcon'
})
export class NzIconDirective extends IconDirective implements OnInit, OnChanges, OnDestroy, AfterContentChecked {
  @Input()
  @InputBoolean()
  set nzSpin(value: boolean) {
    this.spin = value;
  }

  @Input() nzRotate: number = 0;

  @Input() set nzType(value: string) {
    this.type = value;
  }

  @Input() set nzTheme(value: ThemeType) {
    this.theme = value;
  }

  @Input() set nzTwotoneColor(value: string) {
    this.twoToneColor = value;
  }

  @Input() set nzIconfont(value: string) {
    this.iconfont = value;
  }

  /** @deprecated 8.0.0 avoid exposing low layer API. */
  @Input() spin = false;

  /** @deprecated 8.0.0 avoid exposing low layer API. */
  @Input() iconfont: string;

  @Input()
  set type(value: string) {
    if (value && value.startsWith('anticon')) {
      const rawClass = getIconTypeClass(value);
      const type = rawClass ? normalizeType(rawClass.name).type : '';
      if (type && this.type !== type) {
        this._type = type;
      }
    } else {
      this._type = value;
    }
  }

  get type(): string {
    return this._type;
  }

  private classNameObserver: MutationObserver;
  private el = this.elementRef.nativeElement;
  private destroy$ = new Subject<void>();
  private _type: string;

  /**
   * Replacement of `changeIcon` for more modifications.
   * @param oldAPI
   */
  private changeIcon2(oldAPI: boolean = false): void {
    if (!oldAPI) {
      this.setClassName();
    }
    this._changeIcon().then(svg => {
      this.setSVGData(svg);
      if (!oldAPI && svg) {
        this.handleSpin(svg);
        this.handleRotate(svg);
      }
    });
  }

  private classChangeHandler(className: string): void {
    const ret = getIconTypeClass(className);
    if (ret) {
      const { type, crossError, verticalError } = normalizeType(ret.name);
      if (crossError) {
        this.iconService.warnAPI('cross');
      }
      if (verticalError) {
        this.iconService.warnAPI('vertical');
      }
      if (this.type !== type) {
        this._type = type;
        this.changeIcon2(true);
      }
    }
  }

  private handleSpin(svg: SVGElement): void {
    if ((this.spin || this.type === 'loading') && !this.elementRef.nativeElement.classList.contains('anticon-spin')) {
      this.renderer.addClass(svg, 'anticon-spin');
    } else {
      this.renderer.removeClass(svg, 'anticon-spin');
    }
  }

  private handleRotate(svg: SVGElement): void {
    if (this.nzRotate) {
      this.renderer.setAttribute(svg, 'style', `transform: rotate(${this.nzRotate}deg)`);
    } else {
      this.renderer.removeAttribute(svg, 'style');
    }
  }

  private setClassName(): void {
    if (typeof this.type === 'string') {
      const iconClassNameArr = this.el.className.split(/\s/);
      const ret = getIconTypeClass(this.el.className);
      if (ret) {
        iconClassNameArr.splice(ret.index, 1, `anticon-${this.type}`);
        this.renderer.setAttribute(this.el, 'class', iconClassNameArr.join(' '));
      } else {
        this.renderer.addClass(this.el, `anticon-${this.type}`);
      }
    }
  }

  private setSVGData(svg: SVGElement | null): void {
    if (typeof this.type === 'string' && svg) {
      this.renderer.setAttribute(svg, 'data-icon', this.type);
      this.renderer.setAttribute(svg, 'aria-hidden', 'true');
    }
  }

  constructor(
    public iconService: NzIconService,
    public elementRef: ElementRef,
    public renderer: Renderer2,
    private platform: Platform
  ) {
    super(iconService, elementRef, renderer);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { type, nzType, nzTwotoneColor, twoToneColor, spin, nzSpin, theme, nzTheme, nzRotate } = changes;

    if (type && !nzType) {
      warnDeprecation(
        `APIs for Icon without 'nz' prefix are deprecated and will be removed in 9.0.0! Please check icons with this type: '${type.currentValue}'.`
      );
    }

    if (type || nzType || nzTwotoneColor || twoToneColor || spin || nzSpin || theme || nzTheme) {
      this.changeIcon2();
    } else if (nzRotate) {
      this.handleRotate(this.el.firstChild);
    } else {
      this._setSVGElement(this.iconService.createIconfontIcon(`#${this.iconfont}`));
    }

    if (type && !nzType) {
      warnDeprecation(
        `APIs for Icon without 'nz' prefix are deprecated and will be removed in 9.0.0! Please check icons with this type: '${this.type}'.`
      );
    }
  }

  ngOnInit(): void {
    // If `this.type` is not specified and `classList` contains `anticon`, it should be an icon using old API.
    if (!this.type && this.el.classList.contains('anticon')) {
      this.iconService.warnAPI('old');
      // Get `type` from `className`. If not, initial rendering would be missed.
      this.classChangeHandler(this.el.className);
      if (this.platform.isBrowser) {
        // Add `class` mutation observer.
        this.classNameObserver = new MutationObserver((mutations: MutationRecord[]) => {
          mutations
            .filter((mutation: MutationRecord) => mutation.attributeName === 'class')
            .forEach((mutation: MutationRecord) => this.classChangeHandler((mutation.target as HTMLElement).className));
        });
        this.classNameObserver.observe(this.el, { attributes: true });
      }
    }
    // If `classList` does not contain `anticon`, add it before other class names.
    if (!this.el.classList.contains('anticon')) {
      this.renderer.setAttribute(this.el, 'class', `anticon ${this.el.className}`.trim());
    }

    this.iconService.configUpdated$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.type) {
          this.changeIcon2();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.classNameObserver) {
      this.classNameObserver.disconnect();
    }

    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * If custom content is provided, try to normalize SVG elements.
   */
  ngAfterContentChecked(): void {
    const children = this.el.children;
    let length = children.length;
    if (!this.type && children.length) {
      while (length--) {
        const child = children[length];
        if (child.tagName.toLowerCase() === 'svg') {
          this.iconService.normalizeSvgElement(child as SVGElement);
        }
      }
    }
  }
}
