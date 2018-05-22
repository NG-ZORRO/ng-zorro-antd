import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector           : 'nz-list-item-meta',
  template           : `
    <div *ngIf="isAvatar" class="ant-list-item-meta-avatar">
      <ng-container *ngIf="avatarStr; else avatarTpl">
        <nz-avatar [nzSrc]="avatarStr"></nz-avatar>
      </ng-container>
    </div>
    <div *ngIf="isTitle || isDesc" class="ant-list-item-meta-content">
      <h4 *ngIf="isTitle" class="ant-list-item-meta-title">
        <ng-container *ngIf="titleStr; else titleTpl">{{ titleStr }}</ng-container>
      </h4>
      <div *ngIf="isDesc" class="ant-list-item-meta-description">
        <ng-container *ngIf="descStr; else descTpl">{{ descStr }}</ng-container>
      </div>
    </div>`,
  preserveWhitespaces: false,
  host               : {
    '[class.ant-list-item-meta]': 'true'
  }
})
export class NzListItemMetaComponent {

  isAvatar = false;
  avatarStr = '';
  avatarTpl: TemplateRef<void>;

  @Input()
  set nzAvatar(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.avatarStr = null;
      this.avatarTpl = value;
    } else {
      this.avatarStr = value;
    }

    this.isAvatar = !!value;
  }

  isTitle = false;
  titleStr = '';
  titleTpl: TemplateRef<void>;

  @Input()
  set nzTitle(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.titleStr = null;
      this.titleTpl = value;
    } else {
      this.titleStr = value;
    }

    this.isTitle = !!value;
  }

  isDesc = false;
  descStr = '';
  descTpl: TemplateRef<void>;

  @Input()
  set nzDescription(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.descStr = null;
      this.descTpl = value;
    } else {
      this.descStr = value;
    }

    this.isDesc = !!value;
  }
}
