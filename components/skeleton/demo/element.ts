import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import {
  NzSkeletonAvatarShape,
  NzSkeletonButtonShape,
  NzSkeletonInputSize,
  NzSkeletonModule
} from 'ng-zorro-antd/skeleton';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-skeleton-element',
  imports: [FormsModule, NzDividerModule, NzGridModule, NzSkeletonModule, NzRadioModule, NzSpaceModule, NzSwitchModule],
  template: `
    <nz-space nzSize="middle">
      <nz-skeleton-element
        *nzSpaceItem
        nzType="button"
        [nzActive]="elementActive"
        [nzSize]="elementSize"
        [nzShape]="buttonShape"
      />
      <nz-skeleton-element
        *nzSpaceItem
        nzType="avatar"
        [nzActive]="elementActive"
        [nzSize]="elementSize"
        [nzShape]="avatarShape"
      />
      <nz-skeleton-element
        *nzSpaceItem
        nzType="input"
        [nzActive]="elementActive"
        [nzSize]="elementSize"
        style="width:200px"
      />
    </nz-space>
    <br />
    <br />
    <nz-skeleton-element nzType="image" [nzActive]="elementActive" />
    <nz-divider />
    <div nz-row nzAlign="middle" [nzGutter]="8">
      <div nz-col nzSpan="10">
        Size:
        <nz-radio-group [(ngModel)]="elementSize">
          <label nz-radio-button nzValue="default">Default</label>
          <label nz-radio-button nzValue="large">Large</label>
          <label nz-radio-button nzValue="small">Small</label>
        </nz-radio-group>
      </div>
      <div nz-col nzSpan="5">
        Active:
        <nz-switch [(ngModel)]="elementActive" />
      </div>
    </div>
    <br />
    <br />
    <div nz-row nzAlign="middle" [nzGutter]="8">
      <div nz-col nzSpan="10">
        Button Shape:
        <nz-radio-group [(ngModel)]="buttonShape">
          <label nz-radio-button nzValue="default">Default</label>
          <label nz-radio-button nzValue="square">Square</label>
          <label nz-radio-button nzValue="circle">Circle</label>
          <label nz-radio-button nzValue="round">Round</label>
        </nz-radio-group>
      </div>
      <div nz-col nzSpan="10">
        Avatar Shape:
        <nz-radio-group [(ngModel)]="avatarShape">
          <label nz-radio-button nzValue="circle">Circle</label>
          <label nz-radio-button nzValue="square">Square</label>
        </nz-radio-group>
      </div>
    </div>
  `
})
export class NzDemoSkeletonElementComponent {
  elementActive = false;
  buttonShape: NzSkeletonButtonShape = 'default';
  avatarShape: NzSkeletonAvatarShape = 'circle';
  elementSize: NzSkeletonInputSize = 'default';
}
