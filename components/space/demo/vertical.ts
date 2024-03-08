import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-space-vertical',
  template: `
    <nz-space nzDirection="vertical">
      <nz-card *nzSpaceItem nzTitle="Card" style="width: 300px">
        <p>Card content</p>
        <p>Card content</p>
      </nz-card>
      <nz-card *nzSpaceItem nzTitle="Card" style="width: 300px">
        <p>Card content</p>
        <p>Card content</p>
      </nz-card>
    </nz-space>
  `
})
export class NzDemoSpaceVerticalComponent {}
