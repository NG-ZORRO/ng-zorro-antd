import {
  isDevMode,
  AfterContentChecked,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import { withSuffix, IconDirective } from '@ant-design/icons-angular';
import { NzIconService } from './nz-icon.service';

/**
 * This directive extends IconDirective to provide:
 *
 * - IconFont support
 * - spinning
 * - old API compatibility
 */
@Directive({
  selector: 'i.anticon, [nz-icon]'
})
export class NzIconDirective extends IconDirective implements OnInit, OnChanges, OnDestroy, AfterContentChecked {
  @Input() spin = false;
  @Input() iconfont: string;

  // private _renderer: Renderer2;
  private _classNameObserver: MutationObserver;

  /**
   * In order to make this directive compatible to old API, we had do some ugly stuff here.
   * Should be removed in next major version.
   */
  private _classChangeHandler(className: string): void {
    if (!className) {
      return;
    }

    const classArr = className.split(/\s/);
    const hasAnticonTag = className.indexOf('anticon') > -1;
    const autoSpin = className.indexOf('anticon-loading') > -1;
    let anticonType = classArr.filter(cls => cls !== 'anticon' && cls !== 'anticon-spin' && cls.startsWith('anticon-'))[ 0 ];

    if (!hasAnticonTag || !anticonType) {
      return;
    }

    anticonType = anticonType.replace('anticon-', '');

    // This is misspelled in old versions...
    if (anticonType.indexOf('verticle') > -1) {
      console.error(`'verticle' is misspelled, would be corrected in the next major version.`);
      anticonType = anticonType.replace('verticle', 'vertical');
    }
    // Add default outline theme.
    if (!(anticonType.endsWith('-o') || anticonType.endsWith('-fill') || anticonType.endsWith('-twotone'))) {
      anticonType += '-o';
    }
    this.spin = autoSpin || this.spin;
    if (this.type !== anticonType) {
      this.type = anticonType;
      this._changeIcon().then(svg => {
        this._addExtraModifications(svg);
      }).catch(() => {
        console.warn('[NG-ZORRO]', `You can find more about this error on http://ng.ant.design/components/icon/en`);
      });
    }
  }

  private _warnAPI(): void {
    if (isDevMode() && !this._iconService.warnedAboutAPI) {
      console.warn('[NG-ZORRO]', `<i class="anticon"></i> would be deprecated soon. Please use <i nz-icon type=""></i> API.`);
    }
    this._iconService.warnedAboutAPI = true;
  }

  private _addExtraModifications(svg: SVGElement): void {
    if (this.spin || this.type === 'loading') {
      this._renderer.addClass(svg, 'anticon-spin');
    } else {
      this._renderer.removeClass(svg, 'anticon-spin');
    }
  }

  private _getIconNameBack(): void {
    if (typeof this.type === 'string') {
      let back = '';
      if (this.theme && this.theme !== 'outline' && !this.type.endsWith('-o')) {
        back = `anticon-${withSuffix(this.type, this.theme)}`;
      } else {
        back = `anticon-${this.type}`;
      }
      this._renderer.addClass(this._elementRef.nativeElement, back);
    }
  }

  constructor(public _iconService: NzIconService, public _elementRef: ElementRef, public _renderer: Renderer2) {
    super(_iconService, _elementRef, _renderer); // NzIconService extends IconService so IconDirective won't complain.
  }

  ngOnChanges(): void {
    if (!this.iconfont) {
      this._getIconNameBack(); // Should get back classNames immediately.
      this._changeIcon().then(svg => {
        this._addExtraModifications(svg);
      }).catch(() => {
        console.warn('[NG-ZORRO]', `You can find more about this error on http://ng.ant.design/components/icon/en`);
      });
    } else {
      this._setSVGElement(this._iconService.createIconfontIcon(`#${this.iconfont}`));
    }
  }

  /**
   * Subscribe to DOM element attribute change events, so when user use ngClass or something the icon changes with it.
   */
  ngOnInit(): void {
    const element = this._elementRef.nativeElement as HTMLElement;
    if (element && element.className.indexOf('anticon') > -1 && !this.type) {
      this._warnAPI();
      this._classChangeHandler(element.className); // In case mutations didn't catch the init status.
      this._classNameObserver = new MutationObserver((mutations: MutationRecord[]) => {
        mutations
        .filter((mutation: MutationRecord) => mutation.attributeName === 'class')
        .forEach((mutation: MutationRecord) => this._classChangeHandler((mutation.target as HTMLElement).className));
      });
      this._classNameObserver.observe(this._elementRef.nativeElement, { attributes: true });
    } else {
      this._renderer.addClass(this._elementRef.nativeElement, 'anticon');
    }
  }

  ngOnDestroy(): void {
    if (this._classNameObserver) {
      this._classNameObserver.disconnect();
    }
  }

  /**
   * If custom content is provided, should try to normalize the svg element.
   */
  ngAfterContentChecked(): void {
    const children = (this._elementRef.nativeElement as HTMLElement).children;
    if (children && children.length && !this.type) {
      const child = children[ 0 ];
      this._iconService.normalizeSvgElement(child as SVGElement);
    }
  }
}
