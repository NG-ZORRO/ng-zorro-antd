import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-description-list-basic',
  template: `
    <nz-description-list nzTitle="User Info">
      <nz-description-list-item nzTitle="UserName">Zhou Maomao</nz-description-list-item>
      <nz-description-list-item nzTitle="Telephone">18100000000</nz-description-list-item>
      <nz-description-list-item nzTitle="Live">Hangzhou, Zhejiang</nz-description-list-item>
      <nz-description-list-item nzTitle="Remark">Empty</nz-description-list-item>
      <nz-description-list-item nzTitle="Address">
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </nz-description-list-item>
    </nz-description-list>
  `
})

export class NzDemoDescriptionListBasicComponent {

}
