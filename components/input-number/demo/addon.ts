import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-number-addon',
  template: `
    <nz-space nzDirection="vertical" style="width: 100%">
      <nz-input-number-group *nzSpaceItem nzAddOnBefore="+" nzAddOnAfter="$">
        <nz-input-number [(ngModel)]="demoValue" [nzStep]="1"></nz-input-number>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem [nzAddOnBefore]="addOnBeforeTemplate" [nzAddOnAfter]="addOnAfterTemplate">
        <nz-input-number [(ngModel)]="demoValue" [nzStep]="1"></nz-input-number>
      </nz-input-number-group>
      <ng-template #addOnBeforeTemplate>
        <nz-select [ngModel]="'add'" style="width: 60px">
          <nz-option nzLabel="+" nzValue="add"></nz-option>
          <nz-option nzLabel="-" nzValue="minus"></nz-option>
        </nz-select>
      </ng-template>
      <ng-template #addOnAfterTemplate>
        <nz-select [ngModel]="'USD'" style="width: 60px">
          <nz-option nzValue="USD" nzLabel="$"></nz-option>
          <nz-option nzValue="EUR" nzLabel="€"></nz-option>
          <nz-option nzValue="GBP" nzLabel="£"></nz-option>
          <nz-option nzValue="CNY" nzLabel="¥"></nz-option>
        </nz-select>
      </ng-template>
      <nz-input-number-group *nzSpaceItem nzAddOnAfterIcon="setting">
        <nz-input-number [(ngModel)]="demoValue" [nzStep]="1"></nz-input-number>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem [nzAddOnBefore]="addOnBeforeCascaderTemplate">
        <nz-input-number [(ngModel)]="demoValue" [nzStep]="1"></nz-input-number>
      </nz-input-number-group>
      <ng-template #addOnBeforeCascaderTemplate>
        <nz-cascader [nzOptions]="[]" nzPlaceHolder="cascader" style="width: 150px"></nz-cascader>
      </ng-template>
    </nz-space>
  `
})
export class NzDemoInputNumberAddonComponent {
  demoValue = 100;
}
