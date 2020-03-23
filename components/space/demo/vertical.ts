import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-space-vertical',
  template: `
    <nz-space nzDirection="vertical">
      <nz-space-item>
        <nz-card nzTitle="Card" style="width: 300px">
          <p>Card content</p>
          <p>Card content</p>
        </nz-card>
      </nz-space-item>
      <nz-space-item>
        <nz-card nzTitle="Card" style="width: 300px">
          <p>Card content</p>
          <p>Card content</p>
        </nz-card>
      </nz-space-item>
    </nz-space>
  `
})
export class NzDemoSpaceVerticalComponent {}
