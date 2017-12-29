import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'nz-demo-collapse-custom',
  template: `
    <nz-collapseset [nzBordered]="false">
      <nz-collapse *ngFor="let panel of panels" [nzTitle]="panel.name" [nzActive]="panel.active"
                   [ngStyle]="panel.customStyle">
        <p>{{panel.name}} 的内容</p>
      </nz-collapse>
    </nz-collapseset>
  `,
  styles: []
})
export class NzDemoCollapseCustomComponent {
  panels = [
    {
      active: true,
      disabled: false,
      name: 'This is panel header 1',
      customStyle: {
        'background': '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        'border': '0px'
      }
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 2',
      customStyle: {
        'background': '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        'border': '0px'
      }
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 3',
      customStyle: {
        'background': '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        'border': '0px'
      }
    }
  ];
}
