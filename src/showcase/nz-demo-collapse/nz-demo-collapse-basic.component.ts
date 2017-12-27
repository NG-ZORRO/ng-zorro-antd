import {Component} from '@angular/core';

@Component({
  selector: 'nz-demo-collapse-basic',
  template: `
    <nz-collapseset>
      <nz-collapse *ngFor="let panel of panels" [nzTitle]="panel.name" [nzActive]="panel.active"
                   [nzDisabled]="panel.disabled">
        <p>{{panel.name}}内容</p>
      </nz-collapse>
    </nz-collapseset>
  `,
  styles: []
})
export class NzDemoCollapseBasicComponent {
  panels = [
    {
      active: true,
      name: 'This is panel header 1',
      disabled: false,
      childPanel: [
        {
          active: false,
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
      active: true,
      disabled: false,
      name: 'This is panel header 3'
    }
  ];
}
