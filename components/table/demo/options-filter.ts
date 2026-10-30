import { Component, signal } from '@angular/core';

import { NzTableFilterValue, NzTableModule, NzTableOptionsFilterConfig } from 'ng-zorro-antd/table';

interface Order {
  id: number;
  customer: string;
  status: string | null;
  paid: boolean;
  createdAt: Date | null;
}

@Component({
  selector: 'nz-demo-table-options-filter',
  imports: [NzTableModule],
  template: `
    <nz-table #orderTable [nzData]="listOfData">
      <thead>
        <tr>
          <th>Customer</th>
          <th [nzFilterConfig]="statusFilter" [(nzFilterValue)]="statusFilterValue">Status</th>
          <th [nzFilterConfig]="paidFilter">Paid</th>
          <th [nzFilterConfig]="createdAtFilter">Created</th>
        </tr>
      </thead>
      <tbody>
        @for (data of orderTable.data; track data.id) {
          <tr>
            <td>{{ data.customer }}</td>
            <td>{{ data.status }}</td>
            <td>{{ data.paid ? 'Yes' : 'No' }}</td>
            <td>{{ data.createdAt?.toLocaleDateString() }}</td>
          </tr>
        }
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableOptionsFilterComponent {
  readonly statusFilterValue = signal<NzTableFilterValue>(['Shipped']);
  readonly statusFilter: NzTableOptionsFilterConfig<Order> = {
    type: 'options',
    valueGetter: order => order.status
  };
  readonly paidFilter: NzTableOptionsFilterConfig<Order> = {
    type: 'options',
    valueGetter: order => order.paid,
    labelFormatter: value => (value ? 'Yes' : 'No')
  };
  readonly createdAtFilter: NzTableOptionsFilterConfig<Order> = {
    type: 'options',
    valueGetter: order => order.createdAt,
    labelFormatter: value => (value as Date).toLocaleDateString()
  };
  readonly listOfData: Order[] = [
    { id: 1, customer: 'John Brown', status: 'Shipped', paid: true, createdAt: new Date(2024, 0, 2, 9) },
    { id: 2, customer: 'Jim Green', status: 'Processing', paid: false, createdAt: new Date(2024, 0, 2, 16) },
    { id: 3, customer: 'Joe Black', status: 'Shipped', paid: true, createdAt: new Date(2024, 0, 3) },
    { id: 4, customer: 'Jim Red', status: null, paid: false, createdAt: null },
    { id: 5, customer: 'Jane White', status: 'Cancelled', paid: false, createdAt: new Date(2024, 0, 4) },
    { id: 6, customer: 'Jake Gray', status: 'Shipped', paid: true, createdAt: new Date(2024, 0, 4) }
  ];
}
