import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector           : 'nz-list-item-meta',
  templateUrl        : './nz-list-item-meta.component.html',
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
