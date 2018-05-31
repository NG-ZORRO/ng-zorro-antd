import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';

import { NzListItemMetaComponent } from './nz-list-item-meta.component';

@Component({
  selector           : 'nz-list-item',
  templateUrl        : './nz-list-item.component.html',
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
