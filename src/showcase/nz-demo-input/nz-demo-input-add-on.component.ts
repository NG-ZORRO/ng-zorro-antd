import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-add-on',
  template: `
    <nz-input [(ngModel)]="siteName">
      <ng-template #addOnBefore>http://</ng-template>
      <ng-template #addOnAfter>.com</ng-template>
    </nz-input>
    <div style="margin-top:16px;">
      <nz-input [(ngModel)]="siteName">
        <ng-template #addOnBefore>
          <nz-select style="width: 80px;" [ngModel]="'http://'">
            <nz-option [nzLabel]="'http://'" [nzValue]="'http://'"></nz-option>
            <nz-option [nzLabel]="'https://'" [nzValue]="'https://'"></nz-option>
          </nz-select>
        </ng-template>
        <ng-template #addOnAfter>
          <nz-select style="width: 70px;" [ngModel]="'.com'">
            <nz-option [nzLabel]="'.com'" [nzValue]="'.com'"></nz-option>
            <nz-option [nzLabel]="'.jp'" [nzValue]="'.jp'"></nz-option>
            <nz-option [nzLabel]="'.cn'" [nzValue]="'.cn'"></nz-option>
            <nz-option [nzLabel]="'.org'" [nzValue]="'.org'"></nz-option>
          </nz-select>
        </ng-template>
      </nz-input>
    </div>
    <div style="margin-top:16px;">
      <nz-input [(ngModel)]="siteName">
        <ng-template #addOnAfter><i class="anticon anticon-setting"></i></ng-template>
      </nz-input>
    </div>
  `,
  styles  : []
})
export class NzDemoInputAddOnComponent {
  siteName = 'mysite';
}
