// tslint:disable:ordered-imports no-any
import { Component, ContentChild, HostBinding, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'nz-list-item-meta',
  template: `
    <div *ngIf="avatar" class="ant-list-item-meta-avatar">
        <ng-container *ngIf="_avatar; else _avatarTpl"><nz-avatar [nzSrc]="_avatar"></nz-avatar></ng-container>
    </div>
    <div *ngIf="title || desc" class="ant-list-item-meta-content">
        <h4 *ngIf="title" class="ant-list-item-meta-title">
            <ng-container *ngIf="_title; else _titleTpl">{{ _title }}</ng-container>
        </h4>
        <div *ngIf="desc" class="ant-list-item-meta-description">
            <ng-container *ngIf="_desc; else _descTpl">{{ _desc }}</ng-container>
        </div>
    </div>
    `
})
export class NzListItemMetaComponent {
  @HostBinding('class.ant-list-item-meta') _nzListItemMeta = true;

  avatar = false;
  _avatar = '';
  _avatarTpl: TemplateRef<any>;
  @Input()
  set nzAvatar(value: string | TemplateRef<any>) {
    if (value instanceof TemplateRef) {
      this._avatarTpl = value;
    } else {
      this._avatar = value;
    }

    this.avatar = !!value;
  }

  title = false;
  _title = '';
  _titleTpl: TemplateRef<any>;
  @Input()
  set nzTitle(value: string | TemplateRef<any>) {
    if (value instanceof TemplateRef) {
      this._titleTpl = value;
    } else {
      this._title = value;
    }

    this.title = !!value;
  }

  desc = false;
  _desc = '';
  _descTpl: TemplateRef<any>;
  @Input()
  set nzDescription(value: string | TemplateRef<any>) {
    if (value instanceof TemplateRef) this._descTpl = value;
    else this._desc = value;

    this.desc = !!value;
  }
}
