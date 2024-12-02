import { Component } from '@angular/core';

import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'nz-demo-list-simple',
  imports: [NzListModule, NzTypographyModule],
  template: `
    <h3>Default Size</h3>
    <nz-list nzBordered nzHeader="Header" nzFooter="Footer">
      @for (item of data; track item) {
        <nz-list-item>
          <span nz-typography><mark>[ITEM]</mark></span>
          {{ item }}
        </nz-list-item>
      }
    </nz-list>

    <h3>Small Size</h3>
    <nz-list nzBordered nzSize="small">
      <nz-list-header>Header</nz-list-header>
      @for (item of data; track item) {
        <nz-list-item>{{ item }}</nz-list-item>
      }

      <nz-list-footer>Footer</nz-list-footer>
    </nz-list>

    <h3>Large Size</h3>
    <ul nz-list [nzDataSource]="data" nzBordered nzSize="large">
      <nz-list-header>Header</nz-list-header>
      @for (item of data; track item) {
        <li nz-list-item nzNoFlex>
          <ul nz-list-item-actions>
            <nz-list-item-action>
              <a (click)="msg.info('edit')">edit</a>
            </nz-list-item-action>
          </ul>
          {{ item }}
        </li>
      }
      <nz-list-footer>Footer</nz-list-footer>
    </ul>
  `,
  styles: [
    `
      h3 {
        margin: 16px 0;
      }
      h3:first-child {
        margin-top: 0;
      }
      h3:last-child {
        margin-bottom: 0;
      }
    `
  ]
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
