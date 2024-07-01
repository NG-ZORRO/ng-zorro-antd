import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-card-simple',
  template: `
    <nz-card style="width:300px;">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </nz-card>
  `,
  styles: [
    `
      p {
        margin: 0;
      }
    `
  ]
})
export class NzDemoCardSimpleComponent {}
