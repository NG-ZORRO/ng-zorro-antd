import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-empty-customize',
  template: `
    <nz-empty
      [nzNotFoundImage]="
        'https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original'
      "
      [nzNotFoundContent]="contentTpl"
      [nzNotFoundFooter]="footerTpl"
    >
      <ng-template #contentTpl>
        <span> Customize <a href="#API">Description</a> </span>
      </ng-template>
      <ng-template #footerTpl>
        <button nz-button nzType="primary" (click)="onClick()">Create Now</button>
      </ng-template>
    </nz-empty>
  `
})
export class NzDemoEmptyCustomizeComponent {
  onClick(): void {
    console.log('clicked');
  }
}
