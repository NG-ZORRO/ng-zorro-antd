import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-list-simple',
  template: `
  <h3 [ngStyle]="{'margin-bottom.px': 16 }">Default Size</h3>
  <nz-list [nzDataSource]="data" nzBordered
           [nzHeader]="'Header'" [nzFooter]="'Footer'"
           [nzRenderItem]="item">
    <ng-template #item let-item><nz-list-item [nzContent]="item"></nz-list-item></ng-template>
  </nz-list>
  <h3 [ngStyle]="{'margin': '16px 0' }">Small Size</h3>
  <nz-list [nzDataSource]="data" nzBordered nzSize="small"
           [nzHeader]="'Header'" [nzFooter]="'Footer'"
           [nzRenderItem]="item">
    <ng-template #item let-item><nz-list-item [nzContent]="item"></nz-list-item></ng-template>
  </nz-list>
  <h3 [ngStyle]="{'margin': '16px 0' }">Large Size</h3>
  <nz-list [nzDataSource]="data" nzBordered nzSize="large"
           [nzHeader]="'Header'" [nzFooter]="'Footer'"
           [nzRenderItem]="item">
    <ng-template #item let-item><nz-list-item [nzContent]="item"></nz-list-item></ng-template>
  </nz-list>
  `
})
export class NzDemoListSimpleComponent {
  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ];
}
