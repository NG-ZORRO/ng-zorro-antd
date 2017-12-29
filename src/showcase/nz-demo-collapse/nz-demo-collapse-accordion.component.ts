import {Component} from '@angular/core';

@Component({
  selector: 'nz-demo-collapse-accordion',
  template: `
    <nz-collapseset nzAccordion>
      <nz-collapse *ngFor="let panel of panels" [nzTitle]="panel.name" [nzActive]="panel.active">
        <p>{{panel.name}} 的内容</p>
      </nz-collapse>
    </nz-collapseset>
  `,
  styles: []
})
export class NzDemoCollapseAccordionComponent {
  panels = [
    {
      active: true,
      name: 'This is panel header 1',
      childPanel: [
        {
          active: false,
          name: 'This is panel header 1-1'
        }
      ]
    },
    {
      active: false,
      name: 'This is panel header 2'
    },
    {
      active: false,
      name: 'This is panel header 3'
    }
  ];
}
