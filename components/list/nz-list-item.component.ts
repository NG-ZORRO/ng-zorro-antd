import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';

import { NzListItemMetaComponent } from './nz-list-item-meta.component';

@Component({
  selector           : 'nz-list-item',
  templateUrl        : './nz-list-item.component.html',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
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
