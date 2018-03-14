import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-collapse-custom',
  template: `
    <nz-collapse [nzBordered]="false">
      <nz-collapse-panel *ngFor="let panel of panels" [nzHeader]="panel.name" [nzActive]="panel.active"
        [ngStyle]="panel.customStyle">
        <p>{{panel.name}} content</p>
      </nz-collapse-panel>
    </nz-collapse>
  `,
  styles  : []
})
export class NzDemoCollapseCustomComponent {
  panels = [
    {
      active     : true,
      disabled   : false,
      name       : 'This is panel header 1',
      customStyle: {
        'background'   : '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        'border'       : '0px'
      }
    },
    {
      active     : false,
      disabled   : true,
      name       : 'This is panel header 2',
      customStyle: {
        'background'   : '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        'border'       : '0px'
      }
    },
    {
      active     : false,
      disabled   : false,
      name       : 'This is panel header 3',
      customStyle: {
        'background'   : '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        'border'       : '0px'
      }
    }
  ];
}
