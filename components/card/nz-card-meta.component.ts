import {
  Component,
  Input,
  TemplateRef
} from '@angular/core';

@Component({
  selector           : 'nz-card-meta',
  preserveWhitespaces: false,
  templateUrl        : './nz-card-meta.component.html',
  styles             : [ `
    :host {
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
  private _title: string | TemplateRef<void>;
  private _description: string | TemplateRef<void>;
  @Input() nzAvatar: TemplateRef<void>;

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
}
