import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-collapse-borderless',
  template: `
    <nz-collapse [nzBordered]="false">
      <nz-collapse-panel *ngFor="let panel of panels" [nzHeader]="panel.name" [nzActive]="panel.active">
        <p>{{ panel.name }} content</p>
      </nz-collapse-panel>
    </nz-collapse>
  `
})
export class NzDemoCollapseBorderlessComponent {
  panels = [
    {
      active: true,
      disabled: false,
      name: 'This is panel header 1',
      childPannel: [
        {
          active: false,
          disabled: true,
          name: 'This is panel header 1-1'
        }
      ]
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 2'
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 3'
    }
  ];
}
