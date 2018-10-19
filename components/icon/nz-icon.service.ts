import { DOCUMENT } from '@angular/common';
import { HttpBackend } from '@angular/common/http';
import { Inject, Injectable, Optional, RendererFactory2 } from '@angular/core';
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
    const svgString = `<svg><use xlink:href="${type}"></svg>`;
    return this._createSVGElementFromString(svgString);
  }

  constructor(
    protected _rendererFactory: RendererFactory2,
    @Optional() protected _handler: HttpBackend,
    // tslint:disable:no-any
    @Optional() @Inject(DOCUMENT) protected _document: any
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
  }
}
