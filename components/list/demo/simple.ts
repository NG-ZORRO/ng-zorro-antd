import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'nz-demo-list-simple',
  template: `
    <h3 [ngStyle]="{ 'margin-bottom.px': 16 }">Default Size</h3>
    <nz-list [nzDataSource]="data" nzBordered [nzHeader]="'Header'" [nzFooter]="'Footer'" [nzRenderItem]="defaultItem">
      <ng-template #defaultItem let-item>
        <nz-list-item>
          <span class="ant-typography"><mark>[ITEM]</mark></span>
          {{ item }}
        </nz-list-item>
      </ng-template>
    </nz-list>
    <h3 [ngStyle]="{ margin: '16px 0' }">Small Size</h3>
    <nz-list
      [nzDataSource]="data"
      nzBordered
      nzSize="small"
      [nzHeader]="'Header'"
      [nzFooter]="'Footer'"
      [nzRenderItem]="smallItem"
    >
      <ng-template #smallItem let-item><nz-list-item [nzContent]="item"></nz-list-item></ng-template>
    </nz-list>
    <h3 [ngStyle]="{ margin: '16px 0' }">Large Size</h3>
    <ul
      nz-list
      [nzDataSource]="data"
      nzBordered
      nzSize="large"
      [nzHeader]="'Header'"
      [nzFooter]="'Footer'"
      [nzRenderItem]="largeItem"
    >
      <ng-template #largeItem let-item>
        <li nz-list-item [nzActions]="[opAction]" [nzContent]="item" nzNoFlex></li>
        <ng-template #opAction><a (click)="msg.info('edit')">edit</a></ng-template>
      </ng-template>
    </ul>
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

  constructor(public msg: NzMessageService) {}
}
