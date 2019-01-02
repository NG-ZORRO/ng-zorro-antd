import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-page-header-basic',
  template: `
    <nz-page-header nzBackIcon>
      <nz-page-header-title>Page Title</nz-page-header-title>
      <nz-page-header-subtitle>The Page Subtitle</nz-page-header-subtitle>
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
}
