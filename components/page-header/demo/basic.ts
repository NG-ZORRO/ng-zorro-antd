import { Component } from '@angular/core';

import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

@Component({
  selector: 'nz-demo-page-header-basic',
  imports: [NzPageHeaderModule],
  template: `
    <nz-page-header (nzBack)="onBack()" nzBackIcon nzTitle="Title" nzSubtitle="This is a subtitle"></nz-page-header>
  `
})
export class NzDemoPageHeaderBasicComponent {
  onBack(): void {
    console.log('onBack');
  }
}
