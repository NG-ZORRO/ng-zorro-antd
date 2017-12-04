import {
  Component,
  HostBinding,
  HostListener,
  Optional,
  Host,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import { NzLayoutComponent } from './nz-layout.component';
import { toBoolean } from '../util/convert';

export type NzBreakPoinit = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector     : 'nz-sider',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-content></ng-content>
    <span class="ant-layout-sider-zero-width-trigger" *ngIf="_isZeroTrigger" (click)="toggleCollapse()">
      <i class="anticon anticon-bars"></i>
    </span>
    <div class="ant-layout-sider-trigger" *ngIf="_isSiderTrgger" (click)="toggleCollapse()">
      <i class="anticon" [class.anticon-left]="!nzCollapsed" [class.anticon-right]="nzCollapsed"></i>
    </div>
  `
})
export class NzSiderComponent {
  private _collapsed = false;
  private _collapsible = false;
  private _trigger = true;

  _dimensionMap = {
    xl: '1600px',
    lg: '1200px',
    md: '992px',
    sm: '768px',
    xs: '480px',
  };
  _below = false;
  @Input() nzWidth = '200';
  @Input() nzCollapsedWidth = 64;
  @Input() nzBreakpoint: NzBreakPoinit;

  @Input()
  set nzTrigger(value: boolean) {
    this._trigger = toBoolean(value);
  }

  get nzTrigger() {
    return this._trigger;
  }

  @Input()
  set nzCollapsible(value: boolean) {
    this._collapsible = toBoolean(value);
  }

  get nzCollapsible() {
    return this._collapsible;
  }

  @Input()
  @HostBinding('class.ant-layout-sider-collapsed')
  set nzCollapsed(value: boolean) {
    this._collapsed = toBoolean(value);
  }

  get nzCollapsed() {
    return this._collapsed;
  }

  @Output() nzCollapsedChange = new EventEmitter();
  @HostBinding('class.ant-layout-sider') _nzLayoutSider = true;

  @HostBinding('class.ant-layout-sider-zero-width')
  get setZeroClass() {
    return this.nzCollapsed && (this.nzCollapsedWidth === 0);
  }

  @HostBinding('style.flex')
  get setFlex() {
    if (this.nzCollapsed) {
      return `0 0 ${this.nzCollapsedWidth}px`;
    } else {
      return `0 0 ${this.nzWidth}px`;
    }
  }

  @HostBinding('style.width.px')
  get setWidth() {
    if (this.nzCollapsed) {
      return this.nzCollapsedWidth;
    } else {
      return this.nzWidth;
    }
  }

  @HostListener('window:resize', [ '$event' ])
  onWindowResize(e) {
    if (this.nzBreakpoint) {
      const matchBelow = window.matchMedia(`(max-width: ${this._dimensionMap[ this.nzBreakpoint ]})`).matches;
      this._below = matchBelow;
      this.nzCollapsed = matchBelow;
      this.nzCollapsedChange.emit(matchBelow);
    }
  }

  toggleCollapse() {
    this.nzCollapsed = !this.nzCollapsed;
    this.nzCollapsedChange.emit(this.nzCollapsed);
  }


  constructor(@Optional() @Host() private nzLayoutComponent: NzLayoutComponent) {
    if (this.nzLayoutComponent) {
      this.nzLayoutComponent.hasSider = true;
    }
    if (typeof window !== 'undefined') {
      const matchMediaPolyfill = (mediaQuery: string): MediaQueryList => {
        return {
          media: mediaQuery,
          matches: false,
          addListener() {
          },
          removeListener() {
          },
        };
      };
      window.matchMedia = window.matchMedia || matchMediaPolyfill;
    }
  }

  get _isZeroTrigger() {
    return this.nzCollapsible && this.nzTrigger && (this.nzCollapsedWidth === 0) && ((this.nzBreakpoint && this._below) || (!this.nzBreakpoint));
  }

  get _isSiderTrgger() {
    return this.nzCollapsible && this.nzTrigger && (this.nzCollapsedWidth !== 0);
  }
}
