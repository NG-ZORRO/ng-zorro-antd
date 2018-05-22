import {
  Component
} from '@angular/core';

@Component({
  selector           : '[nz-menu-group]',
  preserveWhitespaces: false,
  template           : `
    <div class="ant-menu-item-group-title">
      <ng-content select="[title]"></ng-content>
    </div>
    <ul class="ant-menu-item-group-list">
      <ng-content></ng-content>
    </ul>
  `,
  host               : {
    '[class.ant-menu-item-group]': 'true'
  }
})
export class NzMenuGroupComponent {
}
