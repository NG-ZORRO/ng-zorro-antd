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
        <i nz-icon nzType="check-circle"></i>
        <span>success</span>
      </nz-tag>
      <nz-tag nzColor="processing">
        <i nz-icon nzType="sync" nzSpin></i>
        <span>processing</span>
      </nz-tag>
      <nz-tag nzColor="error">
        <i nz-icon nzType="close-circle"></i>
        <span>error</span>
      </nz-tag>
      <nz-tag nzColor="warning">
        <i nz-icon nzType="exclamation-circle"></i>
        <span>warning</span>
      </nz-tag>
      <nz-tag nzColor="default">
        <i nz-icon nzType="clock-circle"></i>
        <span>default</span>
      </nz-tag>
    </div>
  `
})
export class NzDemoTagStatusComponent {}
