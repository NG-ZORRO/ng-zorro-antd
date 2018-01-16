import {
  Component,
  ContentChild,
  HostBinding,
  Input,
  TemplateRef
} from '@angular/core';
import { toBoolean } from '../core/util/convert';

@Component({
  selector           : 'nz-card',
  preserveWhitespaces: false,
  template           : `
    <div class="ant-card-head" *ngIf="title||extra||tabs">
      <ng-template [ngIf]="!tabs">
        <div class="ant-card-head-title" *ngIf="title">
          <ng-template
            [ngTemplateOutlet]="title">
          </ng-template>
        </div>
        <div class="ant-card-extra" *ngIf="extra">
          <ng-template
            [ngTemplateOutlet]="extra">
          </ng-template>
        </div>
      </ng-template>
      <div class="ant-card-head-wrapper" *ngIf="tabs">
        <div class="ant-card-head-title" *ngIf="title">
          <ng-template
            [ngTemplateOutlet]="title">
          </ng-template>
        </div>
        <div class="ant-card-extra" *ngIf="extra">
          <ng-template
            [ngTemplateOutlet]="extra">
          </ng-template>
        </div>
      </div>
      <ng-template [ngTemplateOutlet]="tabs" [ngIf]="tabs"></ng-template>
    </div>
    <div class="ant-card-cover" *ngIf="cover">
      <ng-template [ngTemplateOutlet]="cover"></ng-template>
    </div>
    <div class="ant-card-body">
      <ng-template
        *ngIf="!nzLoading"
        [ngTemplateOutlet]="body">
      </ng-template>
      <div *ngIf="nzLoading">
        <p class="ant-card-loading-block" style="width: 94%;"></p>
        <p>
          <span class="ant-card-loading-block" style="width: 28%;"></span><span class="ant-card-loading-block" style="width: 62%;"></span>
        </p>
        <p>
          <span class="ant-card-loading-block" style="width: 22%;"></span><span class="ant-card-loading-block" style="width: 66%;"></span>
        </p>
        <p>
          <span class="ant-card-loading-block" style="width: 56%;"></span><span class="ant-card-loading-block" style="width: 39%;"></span>
        </p>
        <p>
          <span class="ant-card-loading-block" style="width: 21%;"></span><span class="ant-card-loading-block" style="width: 15%;"></span><span class="ant-card-loading-block" style="width: 40%;"></span>
        </p>
      </div>
    </div>
    <ul class="ant-card-actions" *ngIf="actions">
      <ng-template [ngTemplateOutlet]="actions"></ng-template>
    </ul>
  `,
  host               : {
    '[class.ant-card]': 'true'
  }
})
export class NzCardComponent {
  private _bordered = true;
  private _loading = false;
  private _hoverable = false;
  @ContentChild('title') title: TemplateRef<void>;
  @ContentChild('extra') extra: TemplateRef<void>;
  @ContentChild('body') body: TemplateRef<void>;
  @ContentChild('cover') cover: TemplateRef<void>;
  @ContentChild('actions') actions: TemplateRef<void>;
  @ContentChild('tabs') tabs: TemplateRef<void>;

  @Input() nzType: string;

  @HostBinding('class.ant-card-type-inner')
  get isInner(): boolean {
    return this.nzType === 'inner';
  }

  @HostBinding('class.ant-card-contain-tabs')
  get isTabs(): boolean {
    return !!this.tabs;
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
