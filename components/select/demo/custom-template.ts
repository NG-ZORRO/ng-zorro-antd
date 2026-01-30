import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-select-custom-template',
  imports: [NzIconModule, NzSelectModule],
  template: `
    <nz-select nzAllowClear nzPlaceHolder="Select OS" [nzCustomTemplate]="defaultTemplate">
      <nz-option nzLabel="Windows" nzValue="windows" />
      <nz-option nzLabel="Apple" nzValue="apple" />
      <nz-option nzLabel="Android" nzValue="android" />
    </nz-select>
    <ng-template #defaultTemplate let-selected>
      <nz-icon [nzType]="selected.nzValue" />
      {{ selected.nzLabel }}
    </ng-template>
    <br />
    <br />
    <nz-select nzAllowClear nzPlaceHolder="Select OS" nzMode="multiple" [nzCustomTemplate]="multipleTemplate">
      <nz-option nzLabel="Windows" nzValue="windows" />
      <nz-option nzLabel="Apple" nzValue="apple" />
      <nz-option nzLabel="Android" nzValue="android" />
    </nz-select>
    <ng-template #multipleTemplate let-selected>
      <div class="ant-select-selection-item-content">
        <nz-icon [nzType]="selected.nzValue" />
        {{ selected.nzLabel }}
      </div>
    </ng-template>
  `,
  styles: `
    nz-select {
      width: 100%;
    }
  `
})
export class NzDemoSelectCustomTemplateComponent {}
