import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-skeleton-element',
  template: `
    <form nz-form [nzLayout]="'inline'">
      <nz-form-item>
        ButtonActive:
        <nz-switch [(ngModel)]="buttonActive"></nz-switch>
      </nz-form-item>
      <nz-form-item>
        ButtonSize:
        <nz-radio-group [(ngModel)]="buttonSize">
          <label nz-radio-button nzValue="default">Default</label>
          <label nz-radio-button nzValue="large">Large</label>
          <label nz-radio-button nzValue="small">Small</label>
        </nz-radio-group>
      </nz-form-item>
      <nz-form-item>
        ButtonShape:
        <nz-radio-group [(ngModel)]="buttonShape">
          <label nz-radio-button nzValue="default">Default</label>
          <label nz-radio-button nzValue="circle">Circle</label>
          <label nz-radio-button nzValue="round">Round</label>
        </nz-radio-group>
      </nz-form-item>
    </form>
    <nz-skeleton-element nzType="button" [nzActive]="buttonActive" [nzSize]="buttonSize" [nzShape]="buttonShape"></nz-skeleton-element>

    <form nz-form [nzLayout]="'inline'">
      <nz-form-item>
        AvatarActive:
        <nz-switch [(ngModel)]="avatarActive"></nz-switch>
      </nz-form-item>
      <nz-form-item>
        AvatarSize:
        <nz-radio-group [(ngModel)]="avatarSize">
          <label nz-radio-button nzValue="default">Default</label>
          <label nz-radio-button nzValue="large">Large</label>
          <label nz-radio-button nzValue="small">Small</label>
        </nz-radio-group>
      </nz-form-item>
      <nz-form-item>
        AvatarShape:
        <nz-radio-group [(ngModel)]="avatarShape">
          <label nz-radio-button nzValue="circle">Circle</label>
          <label nz-radio-button nzValue="square">Square</label>
        </nz-radio-group>
      </nz-form-item>
    </form>
    <nz-skeleton-element nzType="button" [nzActive]="avatarActive" [nzSize]="avatarSize" [nzShape]="avatarShape"></nz-skeleton-element>

    <form nz-form [nzLayout]="'inline'">
      <nz-form-item>
        InputActive:
        <nz-switch [(ngModel)]="inputActive"></nz-switch>
      </nz-form-item>
      <nz-form-item>
        InputSize:
        <nz-radio-group [(ngModel)]="inputSize">
          <label nz-radio-button nzValue="default">Default</label>
          <label nz-radio-button nzValue="large">Large</label>
          <label nz-radio-button nzValue="small">Small</label>
        </nz-radio-group>
      </nz-form-item>
    </form>
    <nz-skeleton-element nzType="button" [nzActive]="inputActive" [nzSize]="inputActive"></nz-skeleton-element>
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
  avatarShape = 'square';
}
