import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-addon',
  template: `
    <div style="margin-bottom: 16px;">
      <nz-input-group>
        <ng-template #addOnBefore>Http://</ng-template>
        <input type="text" nz-input [(ngModel)]="inputValue">
        <ng-template #addOnAfter>.com</ng-template>
      </nz-input-group>
    </div>
    <div style="margin-bottom: 16px;">
      <nz-input-group>
        <ng-template #addOnBefore>
          <nz-select [ngModel]="'Http://'">
            <nz-option [nzLabel]="'Http://'" [nzValue]="'Http://'"></nz-option>
            <nz-option [nzLabel]="'Https://'" [nzValue]="'Https://'"></nz-option>
          </nz-select>
        </ng-template>
        <input type="text" nz-input [(ngModel)]="inputValue">
        <ng-template #addOnAfter>
          <nz-select [ngModel]="'.com'">
            <nz-option [nzLabel]="'.com'" [nzValue]="'.com'"></nz-option>
            <nz-option [nzLabel]="'.jp'" [nzValue]="'.jp'"></nz-option>
            <nz-option [nzLabel]="'.cn'" [nzValue]="'.cn'"></nz-option>
            <nz-option [nzLabel]="'.org'" [nzValue]="'.org'"></nz-option>
          </nz-select>
        </ng-template>
      </nz-input-group>
    </div>
    <div style="margin-bottom: 16px;">
      <nz-input-group>
        <input type="text" nz-input [(ngModel)]="inputValue">
        <ng-template #addOnAfter>
          <i class="anticon anticon-setting"></i>
        </ng-template>
      </nz-input-group>
    </div>
  `
})
export class NzDemoInputAddonComponent {
  inputValue: string = 'my site';
}
