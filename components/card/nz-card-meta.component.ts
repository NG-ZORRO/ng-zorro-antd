import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector           : 'nz-card-meta',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  templateUrl        : './nz-card-meta.component.html',
  styles             : [ `
    nz-card-meta {
      display: block;
    }
  ` ],
  host               : {
    '[class.ant-card-meta]': 'true'
  }
})
export class NzCardMetaComponent {
  isDescriptionString: boolean;
  isTitleString: boolean;

  @Input()
  set nzTitle(value: string | TemplateRef<void>) {
    this.isTitleString = !(value instanceof TemplateRef);
    this._title = value;
  }

  get nzTitle(): string | TemplateRef<void> {
    return this._title;
  }

  @Input()
  set nzDescription(value: string | TemplateRef<void>) {
    this.isDescriptionString = !(value instanceof TemplateRef);
    this._description = value;
  }

  get nzDescription(): string | TemplateRef<void> {
    return this._description;
  }

  @Input() nzAvatar: TemplateRef<void>;
  private _title: string | TemplateRef<void>;
  private _description: string | TemplateRef<void>;
}
