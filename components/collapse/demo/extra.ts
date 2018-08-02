import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-collapse-extra',
  template: `
    <nz-collapse>
      <nz-collapse-panel *ngFor="let panel of panels" [nzHeader]="panel.name" [nzExtra]="extra" [nzActive]="panel.active" [nzDisabled]="panel.disabled">
        <p style="margin:0;">A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
      </nz-collapse-panel>
      <ng-template #extra>
        <nz-dropdown>
          <a nz-dropdown>
            Hover me <i class="anticon anticon-down"></i>
          </a>
          <ul nz-menu nzSelectable>
            <li nz-menu-item>
              <a>1st menu item</a>
            </li>
            <li nz-menu-item>
              <a>2nd menu item</a>
            </li>
            <li nz-menu-item>
              <a>3rd menu item</a>
            </li>
          </ul>
        </nz-dropdown>
      </ng-template>
    </nz-collapse>
  `,
  styles  : []
})
export class NzDemoCollapseExtraComponent {
  panels = [
    {
      active    : true,
      name      : 'This is panel header 1',
      disabled  : false
    },
    {
      active  : false,
      disabled: false,
      name    : 'This is panel header 2'
    },
    {
      active  : false,
      disabled: true,
      name    : 'This is panel header 3'
    }
  ];
}
