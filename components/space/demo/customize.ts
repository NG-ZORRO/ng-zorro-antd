import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-space-customize',
  template: `
    <nz-slider [(ngModel)]="size"></nz-slider>
    <nz-space [nzSize]="size">
      <button *nzSpaceItem nz-button nzType="primary">Button</button>
      <button *nzSpaceItem nz-button nzType="default">Default</button>
      <button *nzSpaceItem nz-button nzType="dashed">Dashed</button>
      <a *nzSpaceItem nz-button nzType="link">Link</a>
    </nz-space>
  `
})
export class NzDemoSpaceCustomizeComponent {
  size = 8;
}
