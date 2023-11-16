import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pagination-item-render',
  template: `
    <nz-pagination [nzPageIndex]="1" [nzTotal]="500" [nzItemRender]="renderItemTemplate"></nz-pagination>
    <ng-template #renderItemTemplate let-type let-page="page">
      @switch (type) {
        @case ('page') {
          <a>{{ page }}</a>
        }
        @case ('prev') {
          <a>Previous</a>
        }
        @case ('next') {
          <a>Next</a>
        }
        @case ('prev_5') {
          <a><<</a>
        }
        @case ('next_5') {
          <a>>></a>
        }
      }
    </ng-template>
  `
})
export class NzDemoPaginationItemRenderComponent {}
