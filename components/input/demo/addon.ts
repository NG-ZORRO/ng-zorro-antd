import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-addon',
  template: `
    <div style="margin-bottom: 16px;">
      <nz-input-group nzAddOnBefore="Http://" nzAddOnAfter=".com">
        <input type="text" nz-input [(ngModel)]="inputValue">
      </nz-input-group>
    </div>
    <div style="margin-bottom: 16px;">
      <nz-input-group [nzAddOnBefore]="addOnBeforeTemplate" [nzAddOnAfter]="addOnAfterTemplate">
        <input type="text" nz-input [(ngModel)]="inputValue">
      </nz-input-group>
      <ng-template #addOnBeforeTemplate>
        <nz-select [ngModel]="'Http://'">
          <nz-option [nzLabel]="'Http://'" [nzValue]="'Http://'"></nz-option>
          <nz-option [nzLabel]="'Https://'" [nzValue]="'Https://'"></nz-option>
        </nz-select>
      </ng-template>
      <ng-template #addOnAfterTemplate>
        <nz-select [ngModel]="'.com'">
          <nz-option [nzLabel]="'.com'" [nzValue]="'.com'"></nz-option>
          <nz-option [nzLabel]="'.jp'" [nzValue]="'.jp'"></nz-option>
          <nz-option [nzLabel]="'.cn'" [nzValue]="'.cn'"></nz-option>
          <nz-option [nzLabel]="'.org'" [nzValue]="'.org'"></nz-option>
        </nz-select>
      </ng-template>
    </div>
    <div style="margin-bottom: 16px;">
      <nz-input-group [nzAddOnAfter]="addOnAfterIconTemplate">
        <input type="text" nz-input [(ngModel)]="inputValue">
      </nz-input-group>
      <ng-template #addOnAfterIconTemplate>
        <i nz-icon type="setting"></i>
      </ng-template>
    </div>
  `
})
export class NzDemoInputAddonComponent {
  inputValue: string = 'my site';
}
