import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-custom-template',
  template: `
    <nz-select style="width: 200px;" nzAllowClear nzPlaceHolder="Select OS" [(ngModel)]="selectedOS" [nzCustomTemplate]="custom">
      <nz-option nzCustomContent nzLabel="Windows" nzValue="windows"><i nz-icon type="windows"></i> Windows</nz-option>
      <nz-option nzCustomContent nzLabel="Mac" nzValue="mac"><i nz-icon type="apple"></i> Mac</nz-option>
      <nz-option nzCustomContent nzLabel="Android" nzValue="android"><i nz-icon type="android"></i> Android</nz-option>
    </nz-select>
    <ng-template #custom let-selected>
      <div>
        Label: {{selected.nzLabel}}
      </div>
      <div>
        Value: {{ selected.nzValue }}
      </div>
    </ng-template>
  `
})
export class NzDemoSelectCustomTemplateComponent {
  selectedOS;
}
