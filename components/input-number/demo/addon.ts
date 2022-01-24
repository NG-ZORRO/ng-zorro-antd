import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-number-addon',
  template: `
    <nz-input-number-group nzAddOnBefore="+" nzAddOnAfter="$">
      <nz-input-number [ngModel]="value"></nz-input-number>
    </nz-input-number-group>
    <br />
    <br />
    <nz-input-number-group [nzAddOnBefore]="selectBefore" [nzAddOnAfter]="selectAfter">
      <nz-input-number [ngModel]="value"></nz-input-number>
      <ng-template #selectBefore>
        <nz-select [ngModel]="'add'">
          <nz-option [nzValue]="'add'" nzLabel="+"></nz-option>
          <nz-option [nzValue]="'minus'" nzLabel="-"></nz-option>
        </nz-select>
      </ng-template>
      <ng-template #selectAfter>
        <nz-select [ngModel]="'USD'">
          <nz-option [nzValue]="'USD'" nzLabel="$"></nz-option>
          <nz-option [nzValue]="'EUR'" nzLabel="€"></nz-option>
          <nz-option [nzValue]="'GBP'" nzLabel="£"></nz-option>
          <nz-option [nzValue]="'CNY'" nzLabel="¥"></nz-option>
        </nz-select>
      </ng-template>
    </nz-input-number-group>
    <br />
    <br />
    <nz-input-number-group nzAddOnAfterIcon="setting">
      <nz-input-number [ngModel]="value"></nz-input-number>
    </nz-input-number-group>
    <br />
    <br />
    <nz-input-number-group [nzAddOnBefore]="cascaderAddon">
      <nz-input-number [ngModel]="value"></nz-input-number>
      <ng-template #cascaderAddon>
        <nz-cascader nzPlaceHolder="cascader"></nz-cascader>
      </ng-template>
    </nz-input-number-group>
  `,
  styles: [
    `
      nz-select {
        width: 60px;
      }
      nz-cascader {
        width: 150px;
      }
    `
  ]
})
export class NzDemoInputNumberAddonComponent {
  value = 100;
}
