import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-collapse-extra',
  template: `
    <nz-collapse [nzExpandIconPosition]="expandIconPosition">
      <nz-collapse-panel
        *ngFor="let panel of panels"
        [nzHeader]="panel.name"
        [nzActive]="panel.active"
        [nzExtra]="extraTpl"
        [nzDisabled]="panel.disabled"
      >
        <p style="margin:0;">
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
          guest in many households across the world.
        </p>
      </nz-collapse-panel>
    </nz-collapse>
    <ng-template #extraTpl>
      <!-- You can use stopPropagation if you don't want the panel to toggle -->
      <span nz-icon nzType="setting" (click)="$event.stopPropagation()"></span>
    </ng-template>
    <br />
    <span>Expand Icon Position: </span>
    <nz-select [(ngModel)]="expandIconPosition">
      <nz-option nzValue="left" nzLabel="left"></nz-option>
      <nz-option nzValue="right" nzLabel="right"></nz-option>
    </nz-select>
  `
})
export class NzDemoCollapseExtraComponent {
  expandIconPosition: 'left' | 'right' = 'left';

  panels = [
    {
      active: true,
      name: 'This is panel header 1',
      disabled: false
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 2'
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 3'
    }
  ];
}
