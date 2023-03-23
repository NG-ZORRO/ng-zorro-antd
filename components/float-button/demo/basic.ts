import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-float-button-basic',
  template: `
    <div class="basic">
      <nz-float-button></nz-float-button>
    </div>
  `,
  styles: [
    `
      .basic {
        height: 300px;
        position: relative;
      }
      nz-float-button {
        position: absolute;
      }
    `
  ]
})
export class NzDemoFloatButtonBasicComponent {}
