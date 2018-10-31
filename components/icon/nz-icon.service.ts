import { DOCUMENT } from '@angular/common';
import { HttpBackend } from '@angular/common/http';
import { isDevMode, Inject, Injectable, InjectionToken, Optional, RendererFactory2 } from '@angular/core';
import { IconDefinition, IconService } from '@ant-design/icons-angular';
import {
  CalendarOutline,
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
  ExclamationCircleFill,
  ExclamationCircleOutline,
  FilterFill,
  InfoCircleFill,
  InfoCircleOutline,
  LeftOutline,
  LoadingOutline,
  PaperClipOutline,
  QuestionCircleOutline,
  RightOutline,
  UploadOutline,
  UpOutline
} from '@ant-design/icons-angular/icons';
import { LoggerService } from '../core/util/logger';

export interface NzIconfontOption {
  scriptUrl: string;
}

export const NZ_ICONS = new InjectionToken('nz_icons');
export const NZ_ICON_DEFAULT_TWOTONE_COLOR = new InjectionToken('nz_icon_default_twotone_color');
export const DEFAULT_TWOTONE_COLOR = '#1890ff';
export const iconsUsedByZorro: IconDefinition[] = [
  CalendarOutline,
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
  ExclamationCircleFill,
  ExclamationCircleOutline,
  FilterFill,
  InfoCircleFill,
  InfoCircleOutline,
  LeftOutline,
  LoadingOutline,
  PaperClipOutline,
  QuestionCircleOutline,
  RightOutline,
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
      this.loggerService.warn(`<i class="anticon"></i> would be deprecated soon. Please use <i nz-icon type=""></i> API.`);
      this.warnedAboutAPI = true;
    }
    if (type === 'cross' && !this.warnedAboutCross) {
      this.loggerService.warn(`'cross' icon is replaced by 'close' icon.`);
      this.warnedAboutCross = true;
    }
    if (type === 'vertical' && !this.warnedAboutVertical) {
      this.loggerService.warn(`'verticle' is misspelled, would be corrected in the next major version.`);
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

  // tslint:disable:no-any
  constructor(
    protected rendererFactory: RendererFactory2,
    @Optional() protected handler: HttpBackend,
    @Optional() @Inject(DOCUMENT) protected document: any,
    @Optional() @Inject(NZ_ICONS) private icons: IconDefinition[],
    @Optional() @Inject(NZ_ICON_DEFAULT_TWOTONE_COLOR) private defaultColor: string,
    private loggerService: LoggerService
  ) {
    super(rendererFactory, handler, document);

    this.addIcon(...iconsUsedByZorro, ...(this.icons || []));

    let primaryColor = DEFAULT_TWOTONE_COLOR;
    if (this.defaultColor) {
      if (this.defaultColor.startsWith('#')) {
        primaryColor = this.defaultColor;
      } else {
        this.loggerService.warn('twotone color must be a hex color!');
      }
    }
    this.twoToneColor = { primaryColor };
  }
}
