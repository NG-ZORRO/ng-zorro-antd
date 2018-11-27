import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';

import { NzListItemMetaComponent } from './nz-list-item-meta.component';

@Component({
  selector           : 'nz-list-item',
  templateUrl        : './nz-list-item.component.html',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  host               : {
    '[class.ant-list-item]': 'true'
  }
})
export class NzListItemComponent {
  @ContentChildren(NzListItemMetaComponent) metas !: QueryList<NzListItemMetaComponent>;

  @Input() nzActions: Array<TemplateRef<void>> = [];

  @Input() nzContent: string | TemplateRef<void>;

  @Input() nzExtra: TemplateRef<void>;
}
