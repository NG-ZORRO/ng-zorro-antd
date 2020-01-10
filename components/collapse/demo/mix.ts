import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-collapse-mix',
  template: `
    <nz-collapse>
      <nz-collapse-panel *ngFor="let panel of panels" [nzHeader]="panel.name" [nzActive]="panel.active">
        <p>{{ panel.name }}</p>
        <div *ngIf="panel.childPanel && panel.childPanel.length > 0">
          <nz-collapse>
            <nz-collapse-panel *ngFor="let childPanel of panel.childPanel" [nzHeader]="childPanel.name" [nzActive]="childPanel.active">
              <p>
                A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many
                households across the world.
              </p>
            </nz-collapse-panel>
          </nz-collapse>
        </div>
      </nz-collapse-panel>
    </nz-collapse>
  `
})
export class NzDemoCollapseMixComponent {
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
