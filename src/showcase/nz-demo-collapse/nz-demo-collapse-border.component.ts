import {Component} from '@angular/core';

@Component({
  selector: 'nz-demo-collapse-border',
  template: `
    <nz-collapseset [nzBordered]="false">
      <nz-collapse *ngFor="let panel of panels" [nzTitle]="panel.name" [nzActive]="panel.active">
        <p>{{panel.name}} 的内容</p>
      </nz-collapse>
    </nz-collapseset>
  `,
  styles: []
})
export class NzDemoCollapseBorderComponent {
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
