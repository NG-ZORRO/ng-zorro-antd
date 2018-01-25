import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';
import { matchMedia } from '../core/polyfill/match-media';

export type NzJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
export type NzAlign = 'top' | 'middle' | 'bottom';
export type NzType = 'flex' | null;
export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export interface BreakpointMap {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  xxl?: string;
}

const responsiveMap: BreakpointMap = {
  xs : '(max-width: 575px)',
  sm : '(min-width: 576px)',
  md : '(min-width: 768px)',
  lg : '(min-width: 992px)',
  xl : '(min-width: 1200px)',
  xxl: '(min-width: 1600px)'
};

@Component({
  selector           : 'nz-row',
  preserveWhitespaces: false,
  template           : `
    <ng-content></ng-content>
  `
})
export class NzRowComponent implements OnInit {
  private _gutter: number | object;
  private _type: NzType;
  private _align: NzAlign = 'top';
  private _justify: NzJustify = 'start';
  private classList: string[] = [];
  private el: HTMLElement;
  private prefixCls = 'ant-row';
  private breakPoint: Breakpoint;
  actualGutter: number;

  @Input()
  set nzType(value: NzType) {
    this._type = value;
    this.setClassMap();
  }

  get nzType(): NzType {
    return this._type;
  }

  @Input()
  set nzAlign(value: NzAlign) {
    this._align = value;
    this.setClassMap();
  }

  get nzAlign(): NzAlign {
    return this._align;
  }

  @Input()
  set nzJustify(value: NzJustify) {
    this._justify = value;
    this.setClassMap();
  }

  get nzJustify(): NzJustify {
    return this._justify;
  }

  @Input()
  get nzGutter(): number | object {
    return this._gutter;
  }

  set nzGutter(value: number | object) {
    this._gutter = value;
    this.updateGutter();
    this.setStyle();
  }

  setStyle(): void {
    this._renderer.setStyle(this.el, 'margin-left', `-${this.actualGutter / 2}px`);
    this._renderer.setStyle(this.el, 'margin-right', `-${this.actualGutter / 2}px`);
  }

  calculateGutter(): number {
    if (typeof this.nzGutter !== 'object') {
      return this.nzGutter;
    } else if (this.breakPoint && this.nzGutter[ this.breakPoint ]) {
      return this.nzGutter[ this.breakPoint ];
    } else {
      return;
    }
  }

  updateGutter(): void {
    this.actualGutter = this.calculateGutter();
  }

  @HostListener('window:resize', [ '$event' ])
  onWindowResize(e: UIEvent): void {
    this.watchMedia();
  }

  watchMedia(): void {
    Object.keys(responsiveMap).map((screen: Breakpoint) => {
      const matchBelow = matchMedia(responsiveMap[ screen ]).matches;
      if (matchBelow) {
        this.breakPoint = screen;
      }
    });
    this.updateGutter();
    this.setStyle();
  }

  /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289*/
  setClassMap(): void {
    this.classList.forEach(_className => {
      this._renderer.removeClass(this.el, _className);
    });
    this.classList = [
      (!this.nzType) && this.prefixCls,
      this.nzType && `${this.prefixCls}-${this.nzType}`,
      this.nzType && this.nzAlign && `${this.prefixCls}-${this.nzType}-${this.nzAlign}`,
      this.nzType && this.nzJustify && `${this.prefixCls}-${this.nzType}-${this.nzJustify}`
    ].filter((item) => {
      return !!item;
    });
    this.classList.forEach(_className => {
      this._renderer.addClass(this.el, _className);
    });
  }

  constructor(private elementRef: ElementRef, private _renderer: Renderer2) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.setClassMap();
    this.watchMedia();
  }
}
