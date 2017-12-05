import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'nz-demo-collapse-nest',
  template: `
    <nz-collapseset>
      <nz-collapse *ngFor="let panel of panels" [nzTitle]="panel.name" [nzActive]="panel.active">
        <p>{{panel.name}} 的内容</p>
        <div *ngIf="panel.childPanel&&panel.childPanel.length>0">
          <nz-collapseset>
            <nz-collapse *ngFor="let childPanel of panel.childPanel" [nzTitle]="childPanel.name"
                         [nzActive]="childPanel.active">
              <p>{{childPanel.name}} 的内容</p>
            </nz-collapse>
          </nz-collapseset>
        </div>
      </nz-collapse>
    </nz-collapseset>
  `,
  styles: []
})
export class NzDemoCollapseNestComponent {
  panels = [
    {
      active: true,
      disabled: false,
      name: 'This is panel header 1',
      childPanel: [
        {
          active: true,
          name: 'This is panel header 1-1'
        },
        {
          active: false,
          name: 'This is panel header 1-2'
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
