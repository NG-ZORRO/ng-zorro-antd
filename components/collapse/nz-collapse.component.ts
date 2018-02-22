import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  Host,
  HostBinding,
  Input,
} from '@angular/core';

import { toBoolean } from '../core/util/convert';

import { NzCollapsesetComponent } from './nz-collapseset.component';

@Component({
  selector  : 'nz-collapse',
  template  : `
    <div class="ant-collapse-header" [attr.aria-expanded]="_active" (click)="clickHeader($event)" role="tab">
      <i class="arrow" *ngIf="nzShowArrow"></i>
      <ng-template [ngIf]="nzTitle">
        {{ nzTitle }}
      </ng-template>
      <ng-template [ngIf]="!nzTitle">
        <ng-content select="[collapse-title]"></ng-content>
      </ng-template>
    </div>
    <div class="ant-collapse-content" [@collapseState]="_active?'active':'inactive'">
      <div class="ant-collapse-content-box">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [
    trigger('collapseState', [
      state('inactive', style({
        opacity: '0',
        height : 0
      })),
      state('active', style({
        opacity: '1',
        height : '*'
      })),
      transition('inactive => active', animate('150ms ease-in')),
      transition('active => inactive', animate('150ms ease-out'))
    ])
  ],
  styles    : [
      `
      :host {
        display: block
      }`
  ],
  host      : {
    '[class.ant-collapse-item]': 'true'
  }
})

export class NzCollapseComponent {
  private _disabled = false;
  _active = false;
  _showArrow = true;
  _el;

  @Input() set nzShowArrow(value: boolean) {
    this._showArrow = toBoolean(value);
  }

  get nzShowArrow(): boolean {
    return this._showArrow;
  }

  @HostBinding('class.ant-collapse-no-arrow')
  get isNoArrow(): boolean {
    return !this.nzShowArrow;
  }

  @Input() nzTitle: string;

  @Input()
  @HostBinding('class.ant-collapse-item-disabled')
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  @HostBinding('class.ant-collapse-item-active')
  set nzActive(value: boolean) {
    this._active = toBoolean(value);
  }

  get nzActive(): boolean {
    return this._active;
  }

  clickHeader($event: MouseEvent): void {
    if (!this.nzDisabled) {
      this.nzActive = !this.nzActive;
      /** trigger host collapseSet click event */
      this._collapseSet.nzClick(this);
    }

  }

  constructor(@Host() private _collapseSet: NzCollapsesetComponent, private _elementRef: ElementRef) {
    this._el = this._elementRef.nativeElement;
    this._collapseSet.addTab(this);
  }
}
