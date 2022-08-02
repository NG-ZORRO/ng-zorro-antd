import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-status',
  template: `
    <nz-space nzDirection="vertical" style="width: 100%">
      <nz-select *nzSpaceItem nzStatus="error" style="width: 100%"></nz-select>
      <nz-select *nzSpaceItem nzStatus="warning" style="width: 100%"></nz-select>
    </nz-space>
  `
})
export class NzDemoSelectStatusComponent {}
