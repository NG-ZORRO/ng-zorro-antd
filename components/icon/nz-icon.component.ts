import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { IconService } from './services/nz-icon.service';
import { getThemeFromTypeName, normalizeType } from './utils';

// NzThemeType and ThemeType are different things.
export type NzThemeType = 'filled' | 'outlined' | 'twoTone';

@Component({
  selector: 'nz-icon',
  template: ''
})
export class NzIconComponent implements OnChanges {
  @Input() nzType: string;
  @Input() nzStyle: Array<{ [ key: string ]: string }>;
  @Input() nzTheme: NzThemeType;
  @Input() nzSpin = false;
  @Input() nzComponent: TemplateRef<void>;
  @Input() nzTwoToneColor: string;

  isComponent = false;
  isIconfont = false;
  isType = true;

  private _defaultTheme: NzThemeType = 'outlined';
  private _themeSpecified = false;

  /**
   * In this method we create an SVG and insert it into DOM, according to different types.
   */
  private changeIcon(): void {
    if (this.isType) { this.prepareTypeIcon(); }
    if (this.isComponent) { }
    if (this.isIconfont) { }
  }

  private prepareTypeIcon(): void {
    let type = this.nzType;
    const theme = this.nzTheme;
    const inlineTheme = getThemeFromTypeName(type);

    if (inlineTheme && theme) {
      console.warn(`This icon already has a theme '${inlineTheme}'. The prop 'theme' ${theme} will be ignored.'`);
    } else if (!inlineTheme) {
      type = normalizeType(type, theme || this._defaultTheme);
    }

    this._iconService.getRenderedContent(type).subscribe(svg => {
      this._setSVGElement(svg);
    });
  }

  private prepareComponentIcon(): void { }

  private prepareIconfont(): void { }

  private _setSVGElement(svg: SVGElement | null): void {
    this._clearSVGElement();
    if (svg) { this._elementRef.nativeElement.appendChild(svg); }
  }

  private _clearSVGElement(): void {
    const self: HTMLElement = this._elementRef.nativeElement;
    let childCount = self.childNodes.length;

    while (childCount--) {
      const child = self.childNodes[childCount];
      if (child.nodeType !== 1 || child.nodeName.toLowerCase() === 'svg') {
        self.removeChild(child);
      }
    }
  }

  constructor(
    private _iconService: IconService,
    private _elementRef: ElementRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.isComponent = !!this.nzComponent;
    // this.isIconfont = !this.isComponent; // TODO: implement icon font.
    this.isType = !this.isComponent && !this.isIconfont && !!this.nzType;
    if (changes.nzTheme) { this._themeSpecified = true; }

    this.changeIcon();
  }
}