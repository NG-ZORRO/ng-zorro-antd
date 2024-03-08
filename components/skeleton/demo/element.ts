import { Component } from '@angular/core';

import {
  NzSkeletonAvatarShape,
  NzSkeletonAvatarSize,
  NzSkeletonButtonShape,
  NzSkeletonButtonSize,
  NzSkeletonInputSize
} from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'nz-demo-skeleton-element',
  template: `
    <nz-space nzSize="middle">
      <nz-skeleton-element
        *nzSpaceItem
        nzType="button"
        [nzActive]="elementActive"
        [nzSize]="elementSize"
        [nzShape]="buttonShape"
      ></nz-skeleton-element>
      <nz-skeleton-element
        *nzSpaceItem
        nzType="avatar"
        [nzActive]="elementActive"
        [nzSize]="elementSize"
        [nzShape]="avatarShape"
      ></nz-skeleton-element>
      <nz-skeleton-element
        *nzSpaceItem
        nzType="input"
        [nzActive]="elementActive"
        [nzSize]="elementSize"
        style="width:200px"
      ></nz-skeleton-element>
    </nz-space>
    <br />
    <br />
    <nz-skeleton-element nzType="image" [nzActive]="elementActive"></nz-skeleton-element>
    <nz-divider></nz-divider>
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
        <nz-switch [(ngModel)]="elementActive"></nz-switch>
      </div>
    </div>
    <br />
    <br />
    <div nz-row nzAlign="middle" [nzGutter]="8">
      <div nz-col nzSpan="10">
        Button Shape:
        <nz-radio-group [(ngModel)]="buttonShape">
          <label nz-radio-button nzValue="default">Default</label>
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
  buttonActive = false;
  avatarActive = false;
  inputActive = false;
  imageActive = false;
  buttonSize: NzSkeletonButtonSize = 'default';
  avatarSize: NzSkeletonAvatarSize = 'default';
  inputSize: NzSkeletonInputSize = 'default';
  elementActive = false;
  buttonShape: NzSkeletonButtonShape = 'default';
  avatarShape: NzSkeletonAvatarShape = 'circle';
  elementSize: NzSkeletonInputSize = 'default';
}
