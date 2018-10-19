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
import { IconDirective } from '@ant-design/icons-angular';
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
  private _el: HTMLElement;

  /**
   * In order to make this directive compatible to old API, we had do some ugly stuff here.
   * Should be removed in next major version.
   */
  private _classChangeHandler(className: string): void {
    if (!className) { return; }

    const forceSpin = className.indexOf('anticon-spin') > -1;
    const classArr = className.split(/\s/);
    let anticonType = classArr.filter(cls => cls !== 'anticon' && cls !== 'anticon-spin' && cls.match(/^anticon\-\w/))[ 0 ];

    if (!anticonType) { return; }

    anticonType = anticonType.replace('anticon-', '');
    if (anticonType.includes('verticle')) {
      anticonType = anticonType.replace('verticle', 'vertical');
      if (!this._iconService.warnedAboutVertical) {
        console.warn('[NG-ZORRO]', `'verticle' is misspelled, would be corrected in the next major version.`);
        this._iconService.warnedAboutVertical = true;
      }
    }
    if (anticonType.startsWith('cross')) {
      anticonType = anticonType.replace('cross', 'close');
      if (!this._iconService.warnedAboutCross) {
        console.warn('[NG-ZORRO]', `'cross' icon is replaced by 'close' icon.`);
        this._iconService.warnedAboutCross = true;
      }
    }
    if (!(anticonType.endsWith('-o') || anticonType.endsWith('-fill') || anticonType.endsWith('-twotone'))) {
      anticonType += '-o';
    }

    if (this.type !== anticonType) {
      this.type = anticonType;
      this._changeIcon().catch(err => {
          console.warn('[NG-ZORRO]', `You can find more about this error on http://ng.ant.design/components/icon/en\n`, err);
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
      this._renderer.addClass(this._el, 'anticon-spin');
    } else {
      this._renderer.removeClass(this._el, 'anticon-spin');
    }
  }

  private _getIconNameBack(): void {
    if (typeof this.type === 'string') {
      this._renderer.addClass(this._elementRef.nativeElement, `anticon-${this.type}`);
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
    this._el = this._elementRef.nativeElement;
    if (this._el && !this.type) {
      this._warnAPI();
      this._classChangeHandler(this._el.className);
      this._classNameObserver = new MutationObserver((mutations: MutationRecord[]) => {
        mutations
          .filter((mutation: MutationRecord) => mutation.attributeName === 'class')
          .forEach((mutation: MutationRecord) => this._classChangeHandler((mutation.target as HTMLElement).className));
      });
      this._classNameObserver.observe(this._elementRef.nativeElement, { attributes: true });
    }

    if (!this._el.classList.contains('anticon')) {
      this._renderer.setAttribute(this._el, 'class', `anticon ${this._el.className}`);
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
