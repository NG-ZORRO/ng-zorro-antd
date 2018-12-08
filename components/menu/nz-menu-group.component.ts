import {
  Component
} from '@angular/core';

@Component({
  selector           : '[nz-menu-group]',
  templateUrl        : './nz-menu-group.component.html',
  host               : {
    '[class.ant-menu-item-group]': 'true'
  }
})
export class NzMenuGroupComponent {
}
