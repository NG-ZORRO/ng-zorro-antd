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
        <nz-select *nzSpaceItem ngModel="lucy" [nzOptions]="options" />
        <nz-select *nzSpaceItem ngModel="lucy" nzVariant="filled" [nzOptions]="options" />
        <nz-select *nzSpaceItem ngModel="lucy" nzVariant="borderless" [nzOptions]="options" />
        <nz-select *nzSpaceItem ngModel="lucy" nzVariant="underlined" [nzOptions]="options" />
      </nz-space>
      <nz-space nzDirection="vertical" style="flex: 1">
        <nz-select *nzSpaceItem nzMode="multiple" [ngModel]="['lucy']" [nzOptions]="options" />
        <nz-select *nzSpaceItem nzMode="multiple" [ngModel]="['lucy']" nzVariant="filled" [nzOptions]="options" />
        <nz-select *nzSpaceItem nzMode="multiple" [ngModel]="['lucy']" nzVariant="borderless" [nzOptions]="options" />
        <nz-select *nzSpaceItem nzMode="multiple" [ngModel]="['lucy']" nzVariant="underlined" [nzOptions]="options" />
      </nz-space>
    </div>
  `,
  styles: `
    nz-space {
      flex: 1;
    }

    nz-select {
      width: 100%;
    }
  `
})
export class NzDemoSelectVariantComponent {
  options = [
    { label: 'Jack', value: 'jack' },
    { label: 'Lucy', value: 'lucy' },
    { label: 'Disabled', value: 'disabled', disabled: true }
  ];
}
