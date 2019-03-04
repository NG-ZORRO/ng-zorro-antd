import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pagination-itemRender',
  template: `
    <nz-pagination [nzPageIndex]="1" [nzTotal]="500" [nzItemRender]="renderItemTemplate"></nz-pagination>
    <ng-template #renderItemTemplate let-type let-page="page">
      <a *ngIf="type==='pre'">Previous</a>
      <a *ngIf="type==='next'">Next</a>
      <a *ngIf="type==='page'">{{page}}</a>
    </ng-template>
  `,
  styles  : []
})
export class NzDemoPaginationItemRenderComponent {
}
