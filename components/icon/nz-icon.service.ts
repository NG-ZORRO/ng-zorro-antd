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
  CopyOutline,
  DoubleLeftOutline,
  DoubleRightOutline,
  DownOutline,
  EditOutline,
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
import { warn } from 'ng-zorro-antd/core';

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
  CopyOutline,
  DoubleLeftOutline,
  DoubleRightOutline,
  DownOutline,
  EditOutline,
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

  constructor(
    rendererFactory: RendererFactory2,
    sanitizer: DomSanitizer,
    @Optional() @Inject(NZ_ICONS) private icons: IconDefinition[],
    @Optional() @Inject(NZ_ICON_DEFAULT_TWOTONE_COLOR) private defaultColor: string,
    @Optional() handler: HttpBackend,
    // tslint:disable-next-line:no-any
    @Optional() @Inject(DOCUMENT) document: any
  ) {
    super(rendererFactory, handler, document, sanitizer);

    this.addIcon(...NZ_ICONS_USED_BY_ZORRO, ...(this.icons || []));

    let primaryColor = DEFAULT_TWOTONE_COLOR;
    if (this.defaultColor) {
      if (this.defaultColor.startsWith('#')) {
        primaryColor = this.defaultColor;
      } else {
        warn('Twotone color must be a hex color!');
      }
    }
    this.twoToneColor = { primaryColor };
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
    if (this._document && !this.iconfontCache.has(scriptUrl)) {
      const script = this._renderer.createElement('script');
      this._renderer.setAttribute(script, 'src', scriptUrl);
      this._renderer.setAttribute(script, 'data-namespace', scriptUrl.replace(/^(https?|http):/g, ''));
      this._renderer.appendChild(this._document.body, script);
      this.iconfontCache.add(scriptUrl);
    }
  }

  createIconfontIcon(type: string): SVGElement {
    return this._createSVGElementFromString(`<svg><use xlink:href="${type}"></svg>`);
  }
}
