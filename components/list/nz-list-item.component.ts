import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';

import { NzListItemMetaComponent } from './nz-list-item-meta.component';

@Component({
  selector           : 'nz-list-item',
  template           : `
    <ng-template #contentTpl>
      <div *ngIf="isCon" class="ant-list-item-content" [ngClass]="{'ant-list-item-content-single': metas.length < 1}">
        <ng-container *ngIf="conStr; else conTpl">{{ conStr }}</ng-container>
      </div>
    </ng-template>
    <ng-template #actionsTpl>
      <ul *ngIf="nzActions?.length > 0" class="ant-list-item-action">
        <li *ngFor="let i of nzActions; let idx = index">
          <ng-template [ngTemplateOutlet]="i"></ng-template>
          <em *ngIf="idx!==nzActions.length-1" class="ant-list-item-action-split"></em>
        </li>
      </ul>
    </ng-template>
    <ng-template #mainTpl>
      <ng-content></ng-content>
      <ng-template [ngTemplateOutlet]="contentTpl"></ng-template>
      <ng-template [ngTemplateOutlet]="actionsTpl"></ng-template>
    </ng-template>
    <div *ngIf="nzExtra; else mainTpl" class="ant-list-item-extra-wrap">
      <div class="ant-list-item-main">
        <ng-template [ngTemplateOutlet]="mainTpl"></ng-template>
      </div>
      <div class="ant-list-item-extra">
        <ng-template [ngTemplateOutlet]="nzExtra"></ng-template>
      </div>
    </div>`,
  preserveWhitespaces: false,
  host               : {
    '[class.ant-list-item]': 'true'
  }
})
export class NzListItemComponent {
  @Input() nzActions: Array<TemplateRef<void>> = [];
  @ContentChildren(NzListItemMetaComponent) metas: QueryList<NzListItemMetaComponent>;

  isCon = false;
  conStr = '';
  conTpl: TemplateRef<void>;

  @Input()
  set nzContent(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.conStr = null;
      this.conTpl = value;
    } else {
      this.conStr = value;
    }

    this.isCon = !!value;
  }

  @Input() nzExtra: TemplateRef<void>;
}
