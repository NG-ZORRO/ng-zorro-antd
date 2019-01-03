import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-page-header-basic',
  template: `
    <nz-page-header
      (nzBack)="onBack()"
      nzBackIcon
      nzTitle="Page Title"
      nzSubtitle="The Page Subtitle">
    </nz-page-header>
  `,
  styles  : [
      `
      nz-page-header {
        border: 1px solid rgb(235, 237, 240);
      }
    `
  ]
})
export class NzDemoPageHeaderBasicComponent {

  onBack() {
    console.log('onBack');
  }
}
