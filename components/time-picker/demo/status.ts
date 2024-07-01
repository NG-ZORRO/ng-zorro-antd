import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-time-picker-status',
  template: `
    <nz-space nzDirection="vertical">
      <nz-time-picker *nzSpaceItem nzStatus="error"></nz-time-picker>
      <nz-time-picker *nzSpaceItem nzStatus="warning">></nz-time-picker>
    </nz-space>
  `
})
export class NzDemoTimePickerStatusComponent {}
