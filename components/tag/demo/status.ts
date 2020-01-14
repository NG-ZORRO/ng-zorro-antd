import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tag-status',
  template: `
    <nz-tag nzColor="success">success</nz-tag>
    <nz-tag nzColor="processing">processing</nz-tag>
    <nz-tag nzColor="error">error</nz-tag>
    <nz-tag nzColor="default">default</nz-tag>
    <nz-tag nzColor="warning">warning</nz-tag>
  `
})
export class NzDemoTagStatusComponent {}
