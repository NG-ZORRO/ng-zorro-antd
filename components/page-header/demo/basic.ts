import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-page-header-basic',
  template: `
    <nz-page-header class="site-page-header" (nzBack)="onBack()" nzBackIcon nzTitle="Title" nzSubtitle="This is a subtitle">
    </nz-page-header>
  `
})
export class NzDemoPageHeaderBasicComponent {
  onBack(): void {
    console.log('onBack');
  }
}
