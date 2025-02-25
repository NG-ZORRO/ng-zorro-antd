import { Component } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-custom',
  imports: [NzAvatarModule, NzSegmentedModule],
  template: `
    <nz-segmented>
      <label nz-segmented-item nzValue="user1">
        <div [style.padding.px]="4">
          <nz-avatar nzSrc="https://joeschmoe.io/api/v1/random" />
          <div>User 1</div>
        </div>
      </label>
      <label nz-segmented-item nzValue="user2">
        <div [style.padding.px]="4">
          <nz-avatar nzText="K" [style.background]="'#f56a00'" />
          <div>User 2</div>
        </div>
      </label>
      <label nz-segmented-item nzValue="user3">
        <div [style.padding.px]="4">
          <nz-avatar nzIcon="user" [style.background]="'#87d068'" />
          <div>User 3</div>
        </div>
      </label>
    </nz-segmented>

    <br />
    <br />

    <nz-segmented>
      <label nz-segmented-item nzValue="spring">
        <div [style.padding.px]="4">
          <div>Spring</div>
          <div>Jan-Mar</div>
        </div>
      </label>
      <label nz-segmented-item nzValue="summer">
        <div [style.padding.px]="4">
          <div>Summer</div>
          <div>Apr-Jun</div>
        </div>
      </label>
      <label nz-segmented-item nzValue="autumn">
        <div [style.padding.px]="4">
          <div>Autumn</div>
          <div>Jul-Sept</div>
        </div>
      </label>
      <label nz-segmented-item nzValue="winter">
        <div [style.padding.px]="4">
          <div>Winter</div>
          <div>Oct-Dec</div>
        </div>
      </label>
    </nz-segmented>
  `
})
export class NzDemoSegmentedCustomComponent {}
