import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-custom-template',
  template: `
    <nz-select nzAllowClear nzPlaceHolder="Select OS" [nzCustomTemplate]="defaultTemplate">
      <nz-option nzLabel="Windows" nzValue="windows"></nz-option>
      <nz-option nzLabel="Apple" nzValue="apple"></nz-option>
      <nz-option nzLabel="Android" nzValue="android"></nz-option>
    </nz-select>
    <ng-template #defaultTemplate let-selected>
      <span nz-icon [nzType]="selected.nzValue"></span>
      {{ selected.nzLabel }}
    </ng-template>
    <br />
    <br />
    <nz-select nzAllowClear nzPlaceHolder="Select OS" nzMode="multiple" [nzCustomTemplate]="multipleTemplate">
      <nz-option nzLabel="Windows" nzValue="windows"></nz-option>
      <nz-option nzLabel="Apple" nzValue="apple"></nz-option>
      <nz-option nzLabel="Android" nzValue="android"></nz-option>
    </nz-select>
    <ng-template #multipleTemplate let-selected>
      <div class="ant-select-selection-item-content">
        <span nz-icon [nzType]="selected.nzValue"></span>
        {{ selected.nzLabel }}
      </div>
    </ng-template>
  `,
  styles: [
    `
      nz-select {
        width: 100%;
      }
    `
  ]
})
export class NzDemoSelectCustomTemplateComponent {}
