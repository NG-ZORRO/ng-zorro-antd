/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOCUMENT } from '@angular/common';
import { HttpBackend } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional, RendererFactory2, Self } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IconDefinition, IconService } from '@ant-design/icons-angular';
import { IconConfig, NzConfigService } from 'ng-zorro-antd/core/config';
import { warn } from 'ng-zorro-antd/core/logger';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Subject } from 'rxjs';
import { NZ_ICONS_USED_BY_ZORRO } from './icons';

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
  configUpdated$ = new Subject<void>();

  private iconfontCache = new Set<string>();

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

  constructor(
    rendererFactory: RendererFactory2,
    sanitizer: DomSanitizer,
    protected nzConfigService: NzConfigService,
    @Optional() handler: HttpBackend,
    @Optional() @Inject(DOCUMENT) _document: NzSafeAny,
    @Optional() @Inject(NZ_ICONS) icons?: IconDefinition[]
  ) {
    super(rendererFactory, handler, _document, sanitizer);

    this.onConfigChange();
    this.addIcon(...NZ_ICONS_USED_BY_ZORRO, ...(icons || []));
    this.configDefaultTwotoneColor();
    this.configDefaultTheme();
  }

  private onConfigChange(): void {
    this.nzConfigService.getConfigChangeEventForComponent('icon').subscribe(() => {
      this.configDefaultTwotoneColor();
      this.configDefaultTheme();
      this.configUpdated$.next();
    });
  }

  private configDefaultTheme(): void {
    const iconConfig = this.getConfig();
    this.defaultTheme = iconConfig.nzTheme || 'outline';
  }

  private configDefaultTwotoneColor(): void {
    const iconConfig = this.getConfig();
    const defaultTwotoneColor = iconConfig.nzTwotoneColor || DEFAULT_TWOTONE_COLOR;

    let primaryColor = DEFAULT_TWOTONE_COLOR;

    if (defaultTwotoneColor) {
      if (defaultTwotoneColor.startsWith('#')) {
        primaryColor = defaultTwotoneColor;
      } else {
        warn('Twotone color must be a hex color!');
      }
    }

    this.twoToneColor = { primaryColor };
  }

  private getConfig(): IconConfig {
    return this.nzConfigService.getConfigForComponent('icon') || {};
  }
}

export const NZ_ICONS_PATCH = new InjectionToken('nz_icons_patch');

@Injectable()
export class NzIconPatchService {
  patched = false;

  constructor(@Self() @Inject(NZ_ICONS_PATCH) private extraIcons: IconDefinition[], private rootIconService: NzIconService) {}

  doPatch(): void {
    if (this.patched) {
      return;
    }

    this.extraIcons.forEach(iconDefinition => this.rootIconService.addIcon(iconDefinition));
    this.patched = true;
  }
}
