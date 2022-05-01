import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-collapse-collapsible',
  template: `
    <nz-collapse>
      <nz-collapse-panel
        *ngFor="let panel of panels"
        [nzHeader]="panel.name"
        [nzActive]="panel.active"
        [nzCollapsible]="panel.collapsible"
      >
        <p style="margin:0;">
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
          guest in many households across the world.
        </p>
      </nz-collapse-panel>
    </nz-collapse>
  `
})
export class NzDemoCollapseCollapsibleComponent {
  panels = [
    {
      active: true,
      name: 'This is panel header 1',
      collapsible: 'header'
    },
    {
      active: false,
      name: 'This is panel header 2',
      collapsible: 'disabled'
    }
  ] as const;
}
