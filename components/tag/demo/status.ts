import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tag-status',
  template: `
    <div>
      <h4>Without icon</h4>
      <nz-tag nzColor="success">success</nz-tag>
      <nz-tag nzColor="processing">processing</nz-tag>
      <nz-tag nzColor="error">error</nz-tag>
      <nz-tag nzColor="warning">warning</nz-tag>
      <nz-tag nzColor="default">default</nz-tag>
    </div>
    <div>
      <h4>With icon</h4>
      <nz-tag nzColor="success">
        <span nz-icon nzType="check-circle"></span>
        <span>success</span>
      </nz-tag>
      <nz-tag nzColor="processing">
        <span nz-icon nzType="sync" nzSpin></span>
        <span>processing</span>
      </nz-tag>
      <nz-tag nzColor="error">
        <span nz-icon nzType="close-circle"></span>
        <span>error</span>
      </nz-tag>
      <nz-tag nzColor="warning">
        <span nz-icon nzType="exclamation-circle"></span>
        <span>warning</span>
      </nz-tag>
      <nz-tag nzColor="default">
        <span nz-icon nzType="clock-circle"></span>
        <span>default</span>
      </nz-tag>
    </div>
  `
})
export class NzDemoTagStatusComponent {}
