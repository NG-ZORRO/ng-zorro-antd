import { Component } from '@angular/core';
@Component({
  selector: 'nz-demo-card-flexible-content',
  template: `
    <nz-card nzHoverable style="width:240px" >
      <ng-template #cover>
        <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
      </ng-template>
      <ng-template #body>
        <div nz-card-meta>
          <ng-template #metaTitle>Europe Street beat</ng-template>
          <ng-template #metaDescription>www.instagram.com</ng-template>
        </div>
      </ng-template>
    </nz-card>
  `,
  styles  : []
})
export class NzDemoCardFlexibleContentComponent {
}
