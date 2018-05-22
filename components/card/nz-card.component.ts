import {
  Component,
  ContentChild,
  HostBinding,
  Input,
  TemplateRef
} from '@angular/core';

import { toBoolean } from '../core/util/convert';

import { NzCardTabComponent } from './nz-card-tab.component';

@Component({
  selector           : 'nz-card',
  preserveWhitespaces: false,
  template           : `
    <ng-template #titleTemplate>
      <ng-template [ngTemplateOutlet]="nzTitle"></ng-template>
    </ng-template>
    <ng-template #extraTemplate>
      <ng-template [ngTemplateOutlet]="nzExtra"></ng-template>
    </ng-template>
    <div class="ant-card-head" *ngIf="nzTitle||nzExtra||tab">
      <div class="ant-card-head-wrapper">
        <div class="ant-card-head-title" *ngIf="nzTitle">
          <ng-container *ngIf="isTitleString; else titleTemplate">{{ nzTitle }}</ng-container>
        </div>
        <div class="ant-card-extra" *ngIf="nzExtra">
          <ng-container *ngIf="isExtraString; else extraTemplate">{{ nzExtra }}</ng-container>
        </div>
      </div>
      <ng-container *ngIf="tab">
        <ng-template [ngTemplateOutlet]="tab.template"></ng-template>
      </ng-container>
    </div>
    <div class="ant-card-cover" *ngIf="nzCover">
      <ng-template [ngTemplateOutlet]="nzCover"></ng-template>
    </div>
    <div class="ant-card-body" [ngStyle]="nzBodyStyle">
      <ng-container *ngIf="!nzLoading">
        <ng-content></ng-content>
      </ng-container>
      <nz-card-loading *ngIf="nzLoading"></nz-card-loading>
    </div>
    <ul class="ant-card-actions" *ngIf="nzActions.length">
      <li *ngFor="let action of nzActions" [style.width.%]="100/nzActions.length">
        <span><ng-template [ngTemplateOutlet]="action"></ng-template></span>
      </li>
    </ul>
  `,
  styles             : [ `
    :host {
      display: block;
      position: relative;
    }
  ` ],
  host               : {
    '[class.ant-card]'        : 'true',
    '[class.ant-card-loading]': 'nzLoading'
  }
})
export class NzCardComponent {
  private _bordered = true;
  private _loading = false;
  private _hoverable = false;
  private _title: string | TemplateRef<void>;
  private _extra: string | TemplateRef<void>;
  private isTitleString: boolean;
  private isExtraString: boolean;
  @ContentChild(NzCardTabComponent) tab: NzCardTabComponent;
  @Input() nzBodyStyle: { [key: string]: string };
  @Input() nzCover: TemplateRef<void>;
  @Input() nzActions: Array<TemplateRef<void>> = [];
  @Input() nzType: string;

  @Input()
  set nzTitle(value: string | TemplateRef<void>) {
    this.isTitleString = !(value instanceof TemplateRef);
    this._title = value;
  }

  get nzTitle(): string | TemplateRef<void> {
    return this._title;
  }

  @Input()
  set nzExtra(value: string | TemplateRef<void>) {
    this.isExtraString = !(value instanceof TemplateRef);
    this._extra = value;
  }

  get nzExtra(): string | TemplateRef<void> {
    return this._extra;
  }

  @HostBinding('class.ant-card-type-inner')
  get isInner(): boolean {
    return this.nzType === 'inner';
  }

  @HostBinding('class.ant-card-contain-tabs')
  get isTabs(): boolean {
    return !!this.tab;
  }

  @Input()
  @HostBinding('class.ant-card-bordered')
  set nzBordered(value: boolean) {
    this._bordered = toBoolean(value);
  }

  get nzBordered(): boolean {
    return this._bordered;
  }

  @Input()
  set nzLoading(value: boolean) {
    this._loading = toBoolean(value);
  }

  get nzLoading(): boolean {
    return this._loading;
  }

  @Input()
  @HostBinding('class.ant-card-hoverable')
  set nzHoverable(value: boolean) {
    this._hoverable = toBoolean(value);
  }

  get nzHoverable(): boolean {
    return this._hoverable;
  }
}
