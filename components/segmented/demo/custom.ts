import { Component } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-custom',
  imports: [NzAvatarModule, NzSegmentedModule],
  template: `
    <nz-segmented>
      <label nz-segmented-item nzValue="user1">
        <nz-avatar nzSrc="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
        <div>User 1</div>
      </label>
      <label nz-segmented-item nzValue="user2">
        <nz-avatar nzText="K" [style.background]="'#f56a00'" />
        <div>User 2</div>
      </label>
      <label nz-segmented-item nzValue="user3">
        <nz-avatar nzIcon="user" [style.background]="'#87d068'" />
        <div>User 3</div>
      </label>
    </nz-segmented>

    <br />
    <br />

    <nz-segmented>
      <label nz-segmented-item nzValue="spring">
        <div>Spring</div>
        <div>Jan-Mar</div>
      </label>
      <label nz-segmented-item nzValue="summer">
        <div>Summer</div>
        <div>Apr-Jun</div>
      </label>
      <label nz-segmented-item nzValue="autumn">
        <div>Autumn</div>
        <div>Jul-Sept</div>
      </label>
      <label nz-segmented-item nzValue="winter">
        <div>Winter</div>
        <div>Oct-Dec</div>
      </label>
    </nz-segmented>
  `,
  styles: `
    :host ::ng-deep .ant-segmented-item-label {
      margin: 4px;
    }
  `
})
export class NzDemoSegmentedCustomComponent {}
