import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'nz-demo-tag-status',
  imports: [NzIconModule, NzTagModule],
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
        <nz-icon nzType="check-circle" />
        <span>success</span>
      </nz-tag>
      <nz-tag nzColor="processing">
        <nz-icon nzType="sync" nzSpin />
        <span>processing</span>
      </nz-tag>
      <nz-tag nzColor="error">
        <nz-icon nzType="close-circle" />
        <span>error</span>
      </nz-tag>
      <nz-tag nzColor="warning">
        <nz-icon nzType="exclamation-circle" />
        <span>warning</span>
      </nz-tag>
      <nz-tag nzColor="default">
        <nz-icon nzType="clock-circle" />
        <span>default</span>
      </nz-tag>
    </div>
  `
})
export class NzDemoTagStatusComponent {}
