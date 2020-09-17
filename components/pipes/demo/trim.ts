import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pipes-trim',
  template: `
    {{ 'hello' | nzTrim }}
    <br />
    {{ 'hello ' | nzTrim }}
    <br />
    {{ ' hello ' | nzTrim }}
    <br />
  `
})
export class NzDemoPipesTrimComponent {}
