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
  ExclamationCircleOutline, FilterFill,
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

export interface NzIconfontOption {
  scriptUrl: string;
}

export const NZ_ICONS = new InjectionToken('nz_icons');
export const NZ_ICON_DEFAULT_TWOTONE_COLOR = new InjectionToken('nz_icon_default_twotone_color');
export const DEFAULT_TWOTONE_COLOR = '#1890ff';

/**
 * It should be a global singleton, otherwise registered icons could not be found.
 */
@Injectable({
  providedIn: 'root'
})
export class NzIconService extends IconService {
  private _iconfontCache = new Set<string>();

  warnedAboutAPI = false;
  warnedAboutCross = false; // TODO: remove in 2.0
  warnedAboutVertical = false;

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
    if (this._document && !this._iconfontCache.has(scriptUrl)) {
      const script = this._renderer.createElement('script');
      this._renderer.setAttribute(script, 'src', scriptUrl);
      this._renderer.setAttribute(script, 'data-namespace', scriptUrl.replace(/^(https?|http):/g, ''));
      this._iconfontCache.add(scriptUrl);
      this._renderer.appendChild(this._document.body, script);
    }
  }

  createIconfontIcon(type: string): SVGElement {
    return this._createSVGElementFromString(`<svg><use xlink:href="${type}"></svg>`);
  }

  // tslint:disable:no-any
  constructor(
    protected _rendererFactory: RendererFactory2,
    @Optional() protected _handler: HttpBackend,
    @Optional() @Inject(DOCUMENT) protected _document: any,
    @Optional() @Inject(NZ_ICONS) private _icons: IconDefinition[],
    @Optional() @Inject(NZ_ICON_DEFAULT_TWOTONE_COLOR) private _defaultColor: string
  ) {
    super(_rendererFactory, _handler, _document);

    const iconsUsedByZorro: IconDefinition[] = [
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
    this.addIcon(...iconsUsedByZorro);

    if (this._icons) { this.addIcon(...this._icons); }

    let primaryColor = DEFAULT_TWOTONE_COLOR;
    if (this._defaultColor) {
      if (this._defaultColor.startsWith('#')) {
        primaryColor = this._defaultColor;
      } else {
        if (isDevMode()) { console.error('[NG-ZORRO] twotone color must be a hex color!'); }
      }
    }
    this.twoToneColor = { primaryColor };
  }
}
