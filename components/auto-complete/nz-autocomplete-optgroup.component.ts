import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef
} from '@angular/core';

@Component({
  selector           : 'nz-auto-optgroup',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  templateUrl        : './nz-autocomplete-optgroup.component.html',
  host               : {
    'role' : 'group',
    'class': 'ant-select-dropdown-menu-item-group'
  }
})
export class NzAutocompleteOptgroupComponent {
  isLabelString: boolean;

  /** group 的 label，支持 'string' 和 `TemplateRef` */
  @Input()
  set nzLabel(value: string | TemplateRef<void>) {
    this.isLabelString = !(value instanceof TemplateRef);
    this._label = value;
  }

  get nzLabel(): string | TemplateRef<void> {
    return this._label;
  }

  _label: string | TemplateRef<void>;

  constructor() {
  }

}
