import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector           : 'nz-auto-optgroup',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  templateUrl        : './nz-autocomplete-optgroup.component.html',
  host               : {
    'role' : 'group',
    'class': 'ant-select-dropdown-menu-item-group'
  }
})
export class NzAutocompleteOptgroupComponent {

  @Input() nzLabel: string | TemplateRef<void>;

  constructor() {
  }

}
