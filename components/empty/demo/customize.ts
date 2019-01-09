import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-empty-customize',
  template: `
    <nz-empty
      [nzNotFoundImage]="'https://camo.githubusercontent.com/f23136cf1985a02fa5cc9a09b766b65f8677826c/68747470733a2f2f696d672e616c6963646e2e636f6d2f7466732f54423146564d446f737249384b4a6a79304668585862666e7058612d3230302d3230302e737667'"
      [nzNotFoundContent]="contentTpl"
      [nzNotFoundFooter]="footerTpl">
      <ng-template #contentTpl>
        <span>
          Customize <a href="#API">Description</a>
        </span>
      </ng-template>
      <ng-template #footerTpl>
        <button nz-button nzType="primary" (click)="onClick()">Create Now</button>
      </ng-template>
    </nz-empty>`,
  styles  : []
})
export class NzDemoEmptyCustomizeComponent {
  onClick(): void {
    console.log('clicked');
  }
}
