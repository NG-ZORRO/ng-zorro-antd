/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AfterContentChecked, Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { IconDirective, ThemeType } from '@ant-design/icons-angular';
import { InputBoolean, NzUpdateHostClassService } from 'ng-zorro-antd/core';

import { NzIconService } from './nz-icon.service';

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
  selector: '[nz-icon]',
  exportAs: 'nzIcon',
  providers: [NzUpdateHostClassService],
  host: {
    '[class.anticon]': 'true'
  }
})
export class NzIconDirective extends IconDirective implements OnInit, OnChanges, AfterContentChecked {
  @Input()
  @InputBoolean()
  set nzSpin(value: boolean) {
    this.spin = value;
  }

  @Input() nzRotate: number = 0;

  @Input()
  set nzType(value: string) {
    this.type = value;
  }

  @Input()
  set nzTheme(value: ThemeType) {
    this.theme = value;
  }

  @Input()
  set nzTwotoneColor(value: string) {
    this.twoToneColor = value;
  }

  @Input()
  set nzIconfont(value: string) {
    this.iconfont = value;
  }

  private readonly el: HTMLElement;

  type: string;
  theme: ThemeType;
  // @ts-ignore
  twotoneColor: string;

  private iconfont: string;
  private spin: boolean = false;

  constructor(
    elementRef: ElementRef,
    public iconService: NzIconService,
    public renderer: Renderer2,
    private nzUpdateHostClassService: NzUpdateHostClassService
  ) {
    super(iconService, elementRef, renderer);

    this.el = elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzType, nzTwotoneColor, nzSpin, nzTheme, nzRotate } = changes;

    if (nzType || nzTwotoneColor || nzSpin || nzTheme) {
      this.changeIcon2();
    } else if (nzRotate) {
      this.handleRotate(this.el.firstChild as SVGElement);
    } else {
      this._setSVGElement(this.iconService.createIconfontIcon(`#${this.iconfont}`));
    }
  }

  ngOnInit(): void {
    this.renderer.setAttribute(this.el, 'class', `anticon ${this.el.className}`.trim());
  }

  /**
   * If custom content is provided, try to normalize SVG elements.
   */
  ngAfterContentChecked(): void {
    if (!this.type) {
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

  /**
   * Replacement of `changeIcon` for more modifications.
   */
  private changeIcon2(): void {
    this.setClassName();
    this._changeIcon().then(svgOrRemove => {
      if (svgOrRemove) {
        this.setSVGData(svgOrRemove);
        this.handleSpin(svgOrRemove);
        this.handleRotate(svgOrRemove);
      }
    });
  }

  private handleSpin(svg: SVGElement): void {
    if (this.spin || this.type === 'loading') {
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
    this.nzUpdateHostClassService.updateHostClass(this.el, {
      [`anticon-${this.type}`]: true
    });
  }

  private setSVGData(svg: SVGElement): void {
    this.renderer.setAttribute(svg, 'data-icon', this.type);
    this.renderer.setAttribute(svg, 'aria-hidden', 'true');
  }
}
