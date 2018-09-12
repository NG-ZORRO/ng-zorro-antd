/**
 * TODO: This service should be removed to ant design icons later.
 */

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { DomSanitizer, DOCUMENT } from '@angular/platform-browser';
import { ThemeType } from '@ant-design/icons/lib/types';
import { of as ObservableOf, Observable } from 'rxjs';
import { IconSVGDefinition, TwoToneColorPalette, TwoToneColorPaletteSetter } from './types';
import { getSecondaryColor, isIconDefinition, log, withSuffix } from './utils';

// TODO: import would still be a problem.
import * as allSVGs from '@ant-design/icons/lib/dist';

@Injectable({ providedIn: 'root' })
export class IconService {
  private _document: Document;
  private _svgDefinications = new Map<string, IconSVGDefinition>();
  private _twoToneColorPalette: TwoToneColorPalette = {
    primaryColor: '#333',
    secondaryColor: '#E6E6E6'
  };

  defaultTheme: ThemeType = 'outline';

  set twoToneColor({ primaryColor, secondaryColor }: TwoToneColorPaletteSetter) {
    if (primaryColor && typeof primaryColor === 'string') {
      this._twoToneColorPalette.primaryColor = primaryColor;
      this._twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
    }
  }

  get twoToneColor(): TwoToneColorPaletteSetter {
    return { ...this.twoToneColor };
  }

  add(...icons: IconSVGDefinition[]): void {
    icons.forEach(icon => {
      this._svgDefinications.set(withSuffix(icon.name, icon.theme), icon);
    });
  }

  clear(): void {
    this._svgDefinications.clear();
  }

  private _get(type: string): IconSVGDefinition {
    return this._svgDefinications.get(type);
  }

  getRenderedContent(icon: IconSVGDefinition | string, primaryColor?: string, secondaryColor?: string): Observable<SVGElement> {
    const toBeRendered: IconSVGDefinition | null = isIconDefinition(icon)
      ? icon
      : icon && typeof icon === 'string'
        ? this._get(icon)
        : null;

    if (!toBeRendered) {
      log(`type should be string or icon definiton, but got ${icon}`);
      return ObservableOf(null);
    } else {
      const priColor = primaryColor || this.twoToneColor.primaryColor;
      const secColor = secondaryColor || this.twoToneColor.secondaryColor;
      // TODO: render SVG element here.
      // NOTE: should I pass other parameters such as className, style, onClick here?
    }
  }

  private _createSVGElementFromString(str: string): SVGElement {
    const div = this._document.createElement('div');
    div.innerHTML = str;
    const svg: SVGElement = div.querySelector('svg');
    if (!svg) { throw Error('<svg> tag not found'); }
    return svg;
  }

  constructor(
    private santinizer: DomSanitizer,
    @Optional() _http: HttpClient,
    @Optional() @Inject(DOCUMENT) document: Document
  ) {
    this._document = document;
  }
}
