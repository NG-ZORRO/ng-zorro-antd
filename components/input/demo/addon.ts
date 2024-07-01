import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-addon',
  template: `
    <div>
      <nz-input-group nzAddOnBefore="Http://" nzAddOnAfter=".com">
        <input type="text" nz-input [(ngModel)]="inputValue" />
      </nz-input-group>
    </div>
    <div>
      <nz-input-group [nzAddOnBefore]="addOnBeforeTemplate" [nzAddOnAfter]="addOnAfterTemplate">
        <input type="text" nz-input [(ngModel)]="inputValue" />
      </nz-input-group>
      <ng-template #addOnBeforeTemplate>
        <nz-select [ngModel]="'Http://'">
          <nz-option nzLabel="Http://" nzValue="Http://"></nz-option>
          <nz-option nzLabel="Https://" nzValue="Https://"></nz-option>
        </nz-select>
      </ng-template>
      <ng-template #addOnAfterTemplate>
        <nz-select [ngModel]="'.com'">
          <nz-option nzLabel=".com" nzValue=".com"></nz-option>
          <nz-option nzLabel=".jp" nzValue=".jp"></nz-option>
          <nz-option nzLabel=".cn" nzValue=".cn"></nz-option>
          <nz-option nzLabel=".org" nzValue=".org"></nz-option>
        </nz-select>
      </ng-template>
    </div>
    <div>
      <nz-input-group nzAddOnAfterIcon="setting">
        <input type="text" nz-input [(ngModel)]="inputValue" />
      </nz-input-group>
    </div>
  `,
  styles: [
    `
      div {
        margin-bottom: 16px;
      }
    `
  ]
})
export class NzDemoInputAddonComponent {
  inputValue: string = 'my site';
}
