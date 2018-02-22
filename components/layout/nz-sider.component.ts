import {
  AfterViewInit,
  Component,
  EventEmitter,
  Host,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Optional,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { NzMatchMediaService } from '../core/services/nz-match-media.service';
import { toBoolean } from '../core/util/convert';

import { NzLayoutComponent } from './nz-layout.component';

export type NzBreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

@Component({
  selector           : 'nz-sider',
  preserveWhitespaces: false,
  template           : `
    <div class="ant-layout-sider-children">
      <ng-content></ng-content>
    </div>
    <span class="ant-layout-sider-zero-width-trigger" *ngIf="isZeroTrigger" (click)="toggleCollapse()">
      <i class="anticon anticon-bars"></i>
    </span>
    <div class="ant-layout-sider-trigger" *ngIf="isSiderTrgger" (click)="toggleCollapse()" [style.width.px]="nzCollapsed?nzCollapsedWidth:nzWidth">
      <ng-template [ngTemplateOutlet]="nzTrigger"></ng-template>
    </div>
    <ng-template #defaultTrigger>
      <i class="anticon" [class.anticon-left]="!nzCollapsed" [class.anticon-right]="nzCollapsed" *ngIf="!nzReverseArrow"></i>
      <i class="anticon" [class.anticon-left]="nzCollapsed" [class.anticon-right]="!nzCollapsed" *ngIf="nzReverseArrow"></i>
    </ng-template>
  `,
  host               : {
    '[class.ant-layout-sider]': 'true'
  }
})
export class NzSiderComponent implements OnInit, AfterViewInit {
  private _collapsed = false;
  private _collapsible = false;
  @ViewChild('defaultTrigger') _trigger: TemplateRef<void>;
  private _reverseArrow = false;
  private below = false;
  private isInit = false;
  private dimensionMap = {
    xs : '480px',
    sm : '576px',
    md : '768px',
    lg : '992px',
    xl : '1200px',
    xxl: '1600px'
  };
  @Input() nzWidth = 200;
  @Input() nzCollapsedWidth = 80;
  @Input() nzBreakpoint: NzBreakPoint;

  @Input()
  set nzReverseArrow(value: boolean) {
    this._reverseArrow = toBoolean(value);
  }

  get nzReverseArrow(): boolean {
    return this._reverseArrow;
  }

  @Input()
  set nzTrigger(value: TemplateRef<void>) {
    this._trigger = value;
  }

  get nzTrigger(): TemplateRef<void> {
    return this._trigger;
  }

  @Input()
  set nzCollapsible(value: boolean) {
    this._collapsible = toBoolean(value);
  }

  get nzCollapsible(): boolean {
    return this._collapsible;
  }

  @Input()
  @HostBinding('class.ant-layout-sider-collapsed')
  set nzCollapsed(value: boolean) {
    this._collapsed = toBoolean(value);
  }

  get nzCollapsed(): boolean {
    return this._collapsed;
  }

  @Output() nzCollapsedChange = new EventEmitter();

  @HostBinding('class.ant-layout-sider-zero-width')
  get setZeroClass(): boolean {
    return this.nzCollapsed && (this.nzCollapsedWidth === 0);
  }

  @HostBinding('style.flex')
  get setFlex(): string {
    if (this.nzCollapsed) {
      return `0 0 ${this.nzCollapsedWidth}px`;
    } else {
      return `0 0 ${this.nzWidth}px`;
    }
  }

  @HostBinding('style.max-width.px')
  @HostBinding('style.min-width.px')
  @HostBinding('style.width.px')
  get setWidth(): number {
    if (this.nzCollapsed) {
      return this.nzCollapsedWidth;
    } else {
      return this.nzWidth;
    }
  }

  @HostListener('window:resize', [ '$event' ])
  onWindowResize(e: UIEvent): void {
    this.watchMatchMedia();
  }

  watchMatchMedia(): void {
    if (this.nzBreakpoint) {
      const matchBelow = this.nzMatchMediaService.matchMedia(`(max-width: ${this.dimensionMap[ this.nzBreakpoint ]})`).matches;
      this.below = matchBelow;
      this.nzCollapsed = matchBelow;
      if (this.isInit) {
        this.nzCollapsedChange.emit(matchBelow);
      }
    }
  }

  toggleCollapse(): void {
    this.nzCollapsed = !this.nzCollapsed;
    this.nzCollapsedChange.emit(this.nzCollapsed);
  }

  get isZeroTrigger(): boolean {
    return this.nzCollapsible && this.nzTrigger && (this.nzCollapsedWidth === 0) && ((this.nzBreakpoint && this.below) || (!this.nzBreakpoint));
  }

  get isSiderTrgger(): boolean {
    return this.nzCollapsible && this.nzTrigger && (this.nzCollapsedWidth !== 0);
  }

  constructor(@Optional() @Host() private nzLayoutComponent: NzLayoutComponent, private nzMatchMediaService: NzMatchMediaService) {
  }

  ngOnInit(): void {
    this.watchMatchMedia();
    if (this.nzLayoutComponent) {
      this.nzLayoutComponent.hasSider = true;
    }
  }

  ngAfterViewInit(): void {
    this.isInit = true;
  }

}
