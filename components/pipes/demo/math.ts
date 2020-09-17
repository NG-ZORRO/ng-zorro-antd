import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pipes-math',
  template: `
    {{ [7, 8, 2, 3] | nzMath: 'min' }}
    <br />
    {{ [7, 8, 2, 3] | nzMath: 'max' }}
    <br />
    {{ [7, 8, 2, 3] | nzMath: 'sum' }}
    <br />
    {{ [7, 8, 2, 3] | nzMath: 'avg' }}
    <br />
  `
})
export class NzDemoPipesMathComponent {}
