import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pipe-trim',
  template: `
    {{ 'hello' | nzTrim }}<br />
    {{ 'hello ' | nzTrim }}<br />
    {{ ' hello ' | nzTrim }}<br />
  `
})
export class NzDemoPipeTrimComponent {}
