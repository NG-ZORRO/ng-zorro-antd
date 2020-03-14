import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'nz-demo-list-simple',
  template: `
    <h3 [ngStyle]="{ 'margin-bottom.px': 16 }">Default Size</h3>
    <nz-list nzBordered nzHeader="Header" nzFooter="Footer">
      <nz-list-item *ngFor="let item of data">
        <span nz-typography><mark>[ITEM]</mark></span>
        {{ item }}
      </nz-list-item>
    </nz-list>

    <h3 [ngStyle]="{ margin: '16px 0' }">Small Size</h3>
    <nz-list nzBordered nzSize="small">
      <nz-list-header>Header</nz-list-header>
      <nz-list-item *ngFor="let item of data">item</nz-list-item>
      <nz-list-footer>Footer</nz-list-footer>
    </nz-list>

    <h3 [ngStyle]="{ margin: '16px 0' }">Large Size</h3>
    <ul nz-list [nzDataSource]="data" nzBordered nzSize="large">
      <nz-list-header>Header</nz-list-header>
      <li nz-list-item *ngFor="let item of data" nzNoFlex>
        <ul nz-list-item-actions>
          <nz-list-item-action>
            <a (click)="msg.info('edit')">edit</a>
          </nz-list-item-action>
        </ul>
        {{ item }}
      </li>
      <nz-list-footer>Footer</nz-list-footer>
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
