/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOCUMENT } from '@angular/common';
import { HttpBackend } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional, RendererFactory2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IconDefinition, IconService } from '@ant-design/icons-angular';
import {
  BarsOutline,
  CalendarOutline,
  CaretDownFill,
  CaretDownOutline,
  CaretUpFill,
  CaretUpOutline,
  CheckCircleFill,
  CheckCircleOutline,
  CheckOutline,
  ClockCircleOutline,
  CloseCircleFill,
  CloseCircleOutline,
  CloseOutline,
  DoubleLeftOutline,
  DoubleRightOutline,
  DownOutline,
  EllipsisOutline,
  ExclamationCircleFill,
  ExclamationCircleOutline,
  EyeOutline,
  FileFill,
  FileOutline,
  FilterFill,
  InfoCircleFill,
  InfoCircleOutline,
  LeftOutline,
  LoadingOutline,
  PaperClipOutline,
  QuestionCircleOutline,
  RightOutline,
  SearchOutline,
  StarFill,
  UploadOutline,
  UpOutline
} from '@ant-design/icons-angular/icons';

export interface NzIconfontOption {
  scriptUrl: string;
}

export const NZ_ICONS = new InjectionToken('nz_icons');
export const NZ_ICON_DEFAULT_TWOTONE_COLOR = new InjectionToken('nz_icon_default_twotone_color');
export const DEFAULT_TWOTONE_COLOR = '#1890ff';
export const NZ_ICONS_USED_BY_ZORRO: IconDefinition[] = [
  BarsOutline,
  CalendarOutline,
  CaretUpFill,
  CaretUpOutline,
  CaretDownFill,
  CaretDownOutline,
  CheckCircleFill,
  CheckCircleOutline,
  CheckOutline,
  ClockCircleOutline,
  CloseCircleOutline,
  CloseCircleFill,
  CloseOutline,
  DoubleLeftOutline,
  DoubleRightOutline,
  DownOutline,
  EllipsisOutline,
  ExclamationCircleFill,
  ExclamationCircleOutline,
  EyeOutline,
  FileFill,
  FileOutline,
  FilterFill,
  InfoCircleFill,
  InfoCircleOutline,
  LeftOutline,
  LoadingOutline,
  PaperClipOutline,
  QuestionCircleOutline,
  RightOutline,
  StarFill,
  SearchOutline,
  StarFill,
  UploadOutline,
  UpOutline
];

/**
 * It should be a global singleton, otherwise registered icons could not be found.
 */
@Injectable({
  providedIn: 'root'
})
export class NzIconService extends IconService {
  private iconfontCache = new Set<string>();
  private warnedAboutAPI = false;
  private warnedAboutCross = false;
  private warnedAboutVertical = false;

  warnAPI(type: 'old' | 'cross' | 'vertical'): void {
    if (type === 'old' && !this.warnedAboutAPI) {
      console.warn(`<i class="anticon"></i> would be deprecated soon. Please use <i nz-icon type=""></i> API.`);
      this.warnedAboutAPI = true;
    }
    if (type === 'cross' && !this.warnedAboutCross) {
      console.warn(`'cross' icon is replaced by 'close' icon.`);
      this.warnedAboutCross = true;
    }
    if (type === 'vertical' && !this.warnedAboutVertical) {
      console.warn(`'verticle' is misspelled, would be corrected in the next major version.`);
      this.warnedAboutVertical = true;
    }
  }

  normalizeSvgElement(svg: SVGElement): void {
    if (!svg.getAttribute('viewBox')) {
      this._renderer.setAttribute(svg, 'viewBox', '0 0 1024 1024');
    }
    if (!svg.getAttribute('width') || !svg.getAttribute('height')) {
      this._renderer.setAttribute(svg, 'width', '1em');
      this._renderer.setAttribute(svg, 'height', '1em');
    }
    if (!svg.getAttribute('fill')) {
      this._renderer.setAttribute(svg, 'fill', 'currentColor');
    }
  }

  fetchFromIconfont(opt: NzIconfontOption): void {
    const { scriptUrl } = opt;
    if (this.document && !this.iconfontCache.has(scriptUrl)) {
      const script = this._renderer.createElement('script');
      this._renderer.setAttribute(script, 'src', scriptUrl);
      this._renderer.setAttribute(script, 'data-namespace', scriptUrl.replace(/^(https?|http):/g, ''));
      this._renderer.appendChild(this.document.body, script);
      this.iconfontCache.add(scriptUrl);
    }
  }

  createIconfontIcon(type: string): SVGElement {
    return this._createSVGElementFromString(`<svg><use xlink:href="${type}"></svg>`);
  }

  constructor(
    protected rendererFactory: RendererFactory2,
    protected sanitizer: DomSanitizer,
    @Optional() protected handler: HttpBackend,
    // tslint:disable-next-line:no-any
    @Optional() @Inject(DOCUMENT) protected document: any,
    @Optional() @Inject(NZ_ICONS) private icons: IconDefinition[],
    @Optional() @Inject(NZ_ICON_DEFAULT_TWOTONE_COLOR) private defaultColor: string
  ) {
    super(rendererFactory, handler, document, sanitizer);

    this.addIcon(...NZ_ICONS_USED_BY_ZORRO, ...(this.icons || []));

    let primaryColor = DEFAULT_TWOTONE_COLOR;
    if (this.defaultColor) {
      if (this.defaultColor.startsWith('#')) {
        primaryColor = this.defaultColor;
      } else {
        console.warn('[NG-ZORRO]: twotone color must be a hex color!');
      }
    }
    this.twoToneColor = { primaryColor };
  }
}
