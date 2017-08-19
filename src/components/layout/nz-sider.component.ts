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
  _dimensionMap = {
    xl: 1600,
    lg: 1200,
    md: 992,
    sm: 768,
    xs: 480,
  };
  _below = false;
  @Input() nzWidth = '200';
  @Input() nzTrigger = true;
  @Input() nzCollapsedWidth = 64;
  @Input() nzBreakpoint: NzBreakPoinit;
  @Input() @HostBinding('class.ant-layout-sider-collapsed') nzCollapsed = false;
  _collapsible = false;

  @Input()
  set nzCollapsible(value: boolean|string) {
    if (value === '') {
      this._collapsible = true;
    } else {
      this._collapsible = value as boolean;
    }
  }

  get nzCollapsible() {
    return this._collapsible;
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
      if (window.innerWidth < this._dimensionMap[ this.nzBreakpoint ]) {
        this._below = true;
        this.nzCollapsed = true;
        this.nzCollapsedChange.emit(true);
      } else {
        this._below = false;
        this.nzCollapsed = false;
        this.nzCollapsedChange.emit(false);
      }
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
  }

  get _isZeroTrigger() {
    return this.nzCollapsible && this.nzTrigger && (this.nzCollapsedWidth === 0) && ((this.nzBreakpoint && this._below) || (!this.nzBreakpoint));
  }

  get _isSiderTrgger() {
    return this.nzCollapsible && this.nzTrigger && (this.nzCollapsedWidth !== 0);
  }
}
