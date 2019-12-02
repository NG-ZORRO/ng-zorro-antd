import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-collapse-noarrow',
  template: `
    <nz-collapse>
      <nz-collapse-panel
        *ngFor="let panel of panels"
        [nzHeader]="panel.name"
        [nzActive]="panel.active"
        [nzDisabled]="panel.disabled"
        [nzShowArrow]="panel.arrow"
      >
        <p style="margin:0;">
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many
          households across the world.
        </p>
      </nz-collapse-panel>
    </nz-collapse>
  `
})
export class NzDemoCollapseNoarrowComponent {
  panels = [
    {
      active: true,
      name: 'This is panel header 1',
      arrow: true
    },
    {
      active: false,
      arrow: false,
      name: 'This is panel header 2'
    }
  ];
}
