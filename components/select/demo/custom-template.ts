import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-custom-template',
  template: `
    <nz-select nzAllowClear nzPlaceHolder="Select OS" [(ngModel)]="selectedOS" [nzCustomTemplate]="custom">
      <nz-option nzCustomContent nzLabel="Windows" nzValue="windows"
        ><i nz-icon nzType="windows"></i> Windows
      </nz-option>
      <nz-option nzCustomContent nzLabel="Mac" nzValue="mac"><i nz-icon nzType="apple"></i> Mac</nz-option>
      <nz-option nzCustomContent nzLabel="Android" nzValue="android"
        ><i nz-icon nzType="android"></i> Android
      </nz-option>
    </nz-select>
    <ng-template #custom let-selected>
      <span>Label: {{ selected.nzLabel }} Value: {{ selected.nzValue }}</span>
    </ng-template>
  `,
  styles: [
    `
      nz-select {
        width: 200px;
      }
    `
  ]
})
export class NzDemoSelectCustomTemplateComponent {
  selectedOS = null;
}
