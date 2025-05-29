import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-select-variant',
  imports: [FormsModule, NzSelectModule, NzSpaceModule, NzFlexDirective],
  template: `
    <div nz-flex nzGap="large">
      <nz-space nzDirection="vertical" style="flex: 1">
        <nz-select *nzSpaceItem ngModel="lucy" style="width: 100%">
          <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
          <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
          <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled></nz-option>
        </nz-select>
        <nz-select *nzSpaceItem ngModel="lucy" nzVariant="filled" style="width: 100%">
          <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
          <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
          <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled></nz-option>
        </nz-select>
        <nz-select *nzSpaceItem ngModel="lucy" nzVariant="borderless" style="width: 100%">
          <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
          <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
          <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled></nz-option>
        </nz-select>
        <nz-select *nzSpaceItem ngModel="lucy" nzVariant="underlined" style="width: 100%">
          <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
          <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
          <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled></nz-option>
        </nz-select>
      </nz-space>
      <nz-space nzDirection="vertical" style="flex: 1">
        <nz-select *nzSpaceItem nzMode="multiple" [ngModel]="['lucy']" style="width: 100%">
          <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
          <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
          <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled></nz-option>
        </nz-select>
        <nz-select *nzSpaceItem nzMode="multiple" [ngModel]="['lucy']" nzVariant="filled" style="width: 100%">
          <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
          <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
          <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled></nz-option>
        </nz-select>
        <nz-select *nzSpaceItem nzMode="multiple" [ngModel]="['lucy']" nzVariant="borderless" style="width: 100%">
          <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
          <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
          <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled></nz-option>
        </nz-select>
        <nz-select *nzSpaceItem nzMode="multiple" [ngModel]="['lucy']" nzVariant="underlined" style="width: 100%">
          <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
          <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
          <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled></nz-option>
        </nz-select>
      </nz-space>
    </div>
  `
})
export class NzDemoSelectVariantComponent {}
