import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tooltip-origin',
  template: `
    <button nz-button nz-element #button="nzElement">Action</button>
    <a nz-tooltip nzTooltipTitle="This action could not be revoked!" [nzTooltipOrigin]="button.elementRef">Notice</a>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoTooltipOriginComponent {}
