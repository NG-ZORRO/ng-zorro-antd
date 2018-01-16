import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-collapse-noarrow',
  template: `
    <nz-collapseset>
      <nz-collapse *ngFor="let panel of panels" [nzTitle]="panel.name" [nzActive]="panel.active" [nzDisabled]="panel.disabled" [nzShowArrow]="panel.arrow">
        <p style="margin:0;">A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
      </nz-collapse>
    </nz-collapseset>
  `,
  styles  : []
})
export class NzDemoCollapseNoarrowComponent {
  panels = [
    {
      active: true,
      name  : 'This is panel header 1',
      arrow : true
    },
    {
      active: false,
      arrow : false,
      name  : 'This is panel header 2'
    }
  ];
}
