import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector           : 'nz-list-item-meta',
  templateUrl        : './nz-list-item-meta.component.html',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  host               : {
    '[class.ant-list-item-meta]': 'true'
  }
})
export class NzListItemMetaComponent {

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
  }

  @Input() nzTitle: string | TemplateRef<void>;

  @Input() nzDescription: string | TemplateRef<void>;
}
