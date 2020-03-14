import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-skeleton-element',
  template: `
    <div nz-row nzAlign="middle" [nzGutter]="8">
      <div nz-col nzSpan="5">
        ButtonActive:
        <nz-switch [(ngModel)]="buttonActive"></nz-switch>
      </div>
      <div nz-col nzSpan="9">
        ButtonSize:
        <nz-radio-group [(ngModel)]="buttonSize">
          <label nz-radio-button nzValue="default">Default</label>
          <label nz-radio-button nzValue="large">Large</label>
          <label nz-radio-button nzValue="small">Small</label>
        </nz-radio-group>
      </div>
      <div nz-col nzSpan="9">
        ButtonShape:
        <nz-radio-group [(ngModel)]="buttonShape">
          <label nz-radio-button nzValue="default">Default</label>
          <label nz-radio-button nzValue="circle">Circle</label>
          <label nz-radio-button nzValue="round">Round</label>
        </nz-radio-group>
      </div>
    </div>
    <br />
    <nz-skeleton-element nzType="button" [nzActive]="buttonActive" [nzSize]="buttonSize" [nzShape]="buttonShape"></nz-skeleton-element>
    <br />
    <br />
    <div nz-row nzAlign="middle" [nzGutter]="8">
      <div nz-col nzSpan="5">
        AvatarActive:
        <nz-switch [(ngModel)]="avatarActive"></nz-switch>
      </div>
      <div nz-col nzSpan="9">
        AvatarSize:
        <nz-radio-group [(ngModel)]="avatarSize">
          <label nz-radio-button nzValue="default">Default</label>
          <label nz-radio-button nzValue="large">Large</label>
          <label nz-radio-button nzValue="small">Small</label>
        </nz-radio-group>
      </div>
      <div nz-col nzSpan="9">
        AvatarShape:
        <nz-radio-group [(ngModel)]="avatarShape">
          <label nz-radio-button nzValue="circle">Circle</label>
          <label nz-radio-button nzValue="square">Square</label>
        </nz-radio-group>
      </div>
    </div>
    <br />
    <nz-skeleton-element nzType="avatar" [nzActive]="avatarActive" [nzSize]="avatarSize" [nzShape]="avatarShape"></nz-skeleton-element>
    <br />
    <br />
    <div nz-row nzAlign="middle" [nzGutter]="8">
      <div nz-col nzSpan="5">
        InputActive:
        <nz-switch [(ngModel)]="inputActive"></nz-switch>
      </div>
      <div nz-col nzSpan="9">
        InputSize:
        <nz-radio-group [(ngModel)]="inputSize">
          <label nz-radio-button nzValue="default">Default</label>
          <label nz-radio-button nzValue="large">Large</label>
          <label nz-radio-button nzValue="small">Small</label>
        </nz-radio-group>
      </div>
    </div>
    <br />
    <nz-skeleton-element nzType="input" [nzActive]="inputActive" [nzSize]="inputSize" style="width:300px"></nz-skeleton-element>
  `
})
export class NzDemoSkeletonElementComponent {
  buttonActive = false;
  avatarActive = false;
  inputActive = false;
  buttonSize = 'default';
  avatarSize = 'default';
  inputSize = 'default';
  buttonShape = 'default';
  avatarShape = 'circle';
}
