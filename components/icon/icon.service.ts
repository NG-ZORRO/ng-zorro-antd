/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

import { IconDefinition, IconService } from '@ant-design/icons-angular';

import { IconConfig, NzConfigService, onConfigChangeEventForComponent } from 'ng-zorro-antd/core/config';
import { warn } from 'ng-zorro-antd/core/logger';

import { NZ_ICONS_USED_BY_ZORRO } from './icons';

export interface NzIconfontOption {
  scriptUrl: string;
}

export const NZ_ICONS = new InjectionToken<IconDefinition[]>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-icons' : ''
);
export const NZ_ICON_DEFAULT_TWOTONE_COLOR = new InjectionToken(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-icon-default-twotone-color' : ''
);
export const DEFAULT_TWOTONE_COLOR = '#1890ff';

/**
 * It should be a global singleton, otherwise registered icons could not be found.
 */
@Injectable({
  providedIn: 'root'
})
export class NzIconService extends IconService {
  protected nzConfigService = inject(NzConfigService);
  private platform = inject(Platform);

  configUpdated$ = new Subject<void>();

  protected override get _disableDynamicLoading(): boolean {
    return !this.platform.isBrowser;
  }

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

  constructor() {
    super([...NZ_ICONS_USED_BY_ZORRO, ...(inject(NZ_ICONS, { optional: true }) || [])]);

    this.onConfigChange();
    this.configDefaultTwotoneColor();
    this.configDefaultTheme();
  }

  private onConfigChange(): void {
    onConfigChangeEventForComponent('icon', () => {
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

export const NZ_ICONS_PATCH = new InjectionToken<IconDefinition[]>('nz_icons_patch');

@Injectable()
export class NzIconPatchService {
  patched = false;
  private extraIcons = inject(NZ_ICONS_PATCH, { self: true });

  constructor(private rootIconService: NzIconService) {}

  doPatch(): void {
    if (this.patched) {
      return;
    }

    this.extraIcons.forEach(iconDefinition => this.rootIconService.addIcon(iconDefinition));
    this.patched = true;
  }
}
