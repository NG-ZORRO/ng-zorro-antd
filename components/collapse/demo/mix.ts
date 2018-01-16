import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-collapse-mix',
  template: `
    <nz-collapseset>
      <nz-collapse *ngFor="let panel of panels" [nzTitle]="panel.name" [nzActive]="panel.active">
        <p>{{panel.name}}</p>
        <div *ngIf="panel.childPanel&&panel.childPanel.length>0">
          <nz-collapseset>
            <nz-collapse *ngFor="let childPanel of panel.childPanel" [nzTitle]="childPanel.name"
              [nzActive]="childPanel.active">
              <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
            </nz-collapse>
          </nz-collapseset>
        </div>
      </nz-collapse>
    </nz-collapseset>
  `,
  styles  : []
})
export class NzDemoCollapseMixComponent {
  panels = [
    {
      active    : true,
      disabled  : false,
      name      : 'This is panel header 1',
      childPanel: [
        {
          active: true,
          name  : 'This is panel header 1-1'
        },
        {
          active: false,
          name  : 'This is panel header 1-2'
        }
      ]
    },
    {
      active  : false,
      disabled: true,
      name    : 'This is panel header 2'
    },
    {
      active  : false,
      disabled: false,
      name    : 'This is panel header 3'
    }
  ];
}
