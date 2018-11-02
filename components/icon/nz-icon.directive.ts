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

const iconTypeRE = /^anticon\-\w/;

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
   * TODO: Should be removed in next major version.
   */
  private _classChangeHandler(className: string): void {
    if (className) {
      const iconType = className
        .split(/\s/)
        .filter(cls => cls !== 'anticon' && cls !== 'anticon-spin' && !!cls.match(iconTypeRE))[ 0 ];

      if (!iconType) {
        return;
      }

      let parsedIconType = iconType.replace('anticon-', '');
      if (parsedIconType.includes('verticle')) {
        parsedIconType = parsedIconType.replace('verticle', 'vertical');
        this._warnAPI('cross');
      }
      if (parsedIconType.startsWith('cross')) {
        parsedIconType = parsedIconType.replace('cross', 'close');
        this._warnAPI('vertical');
      }

      // Only change icon when icon type does change.
      if (this.type !== parsedIconType) {
        this.type = parsedIconType;
        this._changeIcon().catch(err => {
          console.warn('[NG-ZORRO]', `You can find more about this error on http://ng.ant.design/components/icon/en\n`, err);
        });
      }
    }
  }

  /**
   * In order to make this directive compatible to old API, we had do some ugly stuff here.
   * TODO: Should be removed in next major version.
   */
  private _warnAPI(type: 'old' | 'cross' | 'vertical'): void {
    if (isDevMode()) {
      if (type === 'old' && !this._iconService.warnedAboutAPI) {
        console.warn('[NG-ZORRO]', `<i class="anticon"></i> would be deprecated soon. Please use <i nz-icon type=""></i> API.`);
        this._iconService.warnedAboutAPI = true;
      }
      if (type === 'cross' && !this._iconService.warnedAboutCross) {
        console.warn('[NG-ZORRO]', `'cross' icon is replaced by 'close' icon.`);
        this._iconService.warnedAboutCross = true;
      }
      if (type === 'vertical' && !this._iconService.warnedAboutVertical) {
        console.warn('[NG-ZORRO]', `'verticle' is misspelled, would be corrected in the next major version.`);
        this._iconService.warnedAboutVertical = true;
      }
    }
  }

  private _toggleSpin(svg: SVGElement): void {
    if ((this.spin || this.type === 'loading') && !this._el.classList.contains('anticon-spin')) {
      this._renderer.addClass(svg, 'anticon-spin');
    } else {
      this._renderer.removeClass(svg, 'anticon-spin');
    }
  }

  private _setClassName(): void {
    // If there's not an anticon class, usually a new API icon, get the icon class name back.
    // anticon should be added before other class names.
    if (this._el && typeof this.type === 'string') {
      const iconClassNameArr = this._el.className.split(/\s/);
      const oldTypeNameIndex = iconClassNameArr.findIndex(cls => cls !== 'anticon' && cls !== 'anticon-spin' && !!cls.match(iconTypeRE));

      if (oldTypeNameIndex !== -1) {
        iconClassNameArr.splice(oldTypeNameIndex, 1, `anticon-${this.type}`);
        this._renderer.setAttribute(this._el, 'class', iconClassNameArr.join(' '));
      } else {
        this._renderer.addClass(this._el, `anticon-${this.type}`);
      }
    }
  }

  private _setSVGData(svg: SVGElement): void {
    if (typeof this.type === 'string') {
      this._renderer.setAttribute(svg, 'data-icon', this.type);
      this._renderer.setAttribute(svg, 'aria-hidden', 'true');
    }
  }

  private _addExtraModifications(svg: SVGElement): void {
    this._toggleSpin(svg);
    this._setSVGData(svg);
  }

  constructor(public _iconService: NzIconService, public _elementRef: ElementRef, public _renderer: Renderer2) {
    super(_iconService, _elementRef, _renderer);
  }

  ngOnChanges(): void {
    if (!this.iconfont) {
      // For ant design icons.
      this._setClassName();
      this._changeIcon().then(svg => {
        this._addExtraModifications(svg);
      }).catch((err) => {
        if (err) {
          console.error(err);
          console.warn('[NG-ZORRO]', `You can find more about this error on http://ng.ant.design/components/icon/en`);
        }
      });
    } else {
      // For iconfont icons.
      this._setSVGElement(this._iconService.createIconfontIcon(`#${this.iconfont}`));
    }
  }

  /**
   * Subscribe to DOM element attribute change events, so when user use ngClass or something the icon changes with it.
   */
  ngOnInit(): void {
    this._el = this._elementRef.nativeElement;

    // Make the component compatible to old class="anticon" API.
    if (this._el && !this.type) {
      this._warnAPI('old');
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

    if (this.type) {
      this._setClassName();
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
      this._iconService.normalizeSvgElement(children[ 0 ] as SVGElement);
    }
  }
}
