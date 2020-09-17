import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pipe-ellipsis',
  template: `
    {{ 'Hello World' | nzEllipsis: 4 }}
    <br />
    {{ 'Hello World' | nzEllipsis: 4:'':true }}
    <br />
    {{ 'Hello World' | nzEllipsis: 4:'...':true }}
    <br />
    {{ 'Hello World, how is it going?' | nzEllipsis: 14:'...':true }}
  `
})
export class NzDemoPipeEllipsisComponent {}
