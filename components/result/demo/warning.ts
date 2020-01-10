import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-result-warning',
  template: `
    <nz-result nzStatus="warning" nzTitle="There are some problems with your operation">
      <div nz-result-extra>
        <button nz-button nzType="primary">Go Console</button>
      </div>
    </nz-result>
  `
})
export class NzDemoResultWarningComponent {}
