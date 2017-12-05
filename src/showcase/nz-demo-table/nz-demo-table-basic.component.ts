import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-table-basic',
  template: `
    <nz-table #nzTable [nzDataSource]="data" [nzPageSize]="10">
      <thead nz-thead>
        <tr>
          <th nz-th><span>Name</span></th>
          <th nz-th><span>Age</span></th>
          <th nz-th><span>Address</span></th>
          <th nz-th><span>Action</span></th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <tr nz-tbody-tr *ngFor="let data of nzTable.data">
          <td nz-td>
            <a>{{data.name}}</a>
          </td>
          <td nz-td>{{data.age}}</td>
          <td nz-td>{{data.address}}</td>
          <td nz-td>
            <span>
              <a href="#">Action 一 {{data.name}}</a>
              <span nz-table-divider></span>
              <a href="#">Delete</a>
              <span nz-table-divider></span>
              <nz-dropdown>
                <a class="ant-dropdown-link" nz-dropdown>
                  More actions <i class="anticon anticon-down"></i>
                </a>
                <ul nz-menu>
                  <li nz-menu-item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
                  </li>
                  <li nz-menu-item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">2nd menu item</a>
                  </li>
                  <li nz-menu-item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">3rd menu item</a>
                  </li>
                </ul>
              </nz-dropdown>
            </span>
          </td>
        </tr>
      </tbody>
    </nz-table>`,
  styles  : []
})
export class NzDemoTableBasicComponent {
  data = [
    {
      key    : '1',
      name   : 'John Brown',
      age    : 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key    : '2',
      name   : 'Jim Green',
      age    : 42,
      address: 'London No. 1 Lake Park',
    }, {
      key    : '3',
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park',
    }
  ];
}

