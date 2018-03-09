import { Component, Input } from '@angular/core';
import { NzOptionComponent } from './nz-option.component';

@Component({
  selector: '[nz-option-li]',
  template: `
    <ng-container *ngIf="nzOption.nzCustomContent">
      <ng-template [ngTemplateOutlet]="nzOption.template"></ng-template>
    </ng-container>
    <ng-container *ngIf="!nzOption.nzCustomContent">
      {{nzOption.nzLabel}}
    </ng-container>
  `,
  host    : {
    '[class.ant-select-dropdown-menu-item]'         : 'true',
    '[class.ant-select-dropdown-menu-item-selected]': 'selected',
    '[class.ant-select-dropdown-menu-item-disabled]': 'nzOption.nzDisabled',
    '[class.ant-select-dropdown-menu-item-active]'  : 'active && !nzOption.nzDisabled && nzShowActive',
    '[attr.unselectable]'                           : '"unselectable"',
    '[attr.role]'                                   : '"menuitem"',
    '[style.user-select]'                           : '"none"'
  }
})
export class NzOptionLiComponent {
  selected = false;
  active = false;
  @Input() nzOption: NzOptionComponent;
  @Input() nzShowActive = true;

  @Input()
  set nzActiveOption(value: NzOptionComponent) {
    if (value) {
      this.active = value === this.nzOption;
    } else {
      this.active = false;
    }
  }

  @Input()
  set nzSelectedOptions(value: NzOptionComponent[]) {
    this.selected = value.indexOf(this.nzOption) > -1;
  }
}
