import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector           : '[nz-menu-group]',
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  templateUrl        : './nz-menu-group.component.html',
  preserveWhitespaces: false,
  host               : {
    '[class.ant-menu-item-group]': 'true'
  }
})
export class NzMenuGroupComponent {
}
