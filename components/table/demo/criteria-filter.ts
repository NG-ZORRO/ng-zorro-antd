import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

import {
  NzTableDateFilterConfig,
  NzTableFilterValue,
  NzTableModule,
  NzTableNumberFilterConfig,
  NzTableTextFilterConfig,
  NzTableTextFilterMatcher
} from 'ng-zorro-antd/table';

interface Order {
  id: number;
  customer: string;
  amount: number | null;
  createdAt: Date | null;
}

/** Matches when every query character appears in order, e.g. `jbn` matches `John Brown`. */
const subsequenceMatcher: NzTableTextFilterMatcher = (query, value, { caseSensitive }) => {
  const source = caseSensitive ? value : value.toLowerCase();
  let index = 0;
  for (const char of caseSensitive ? query : query.toLowerCase()) {
    index = source.indexOf(char, index) + 1;
    if (index === 0) {
      return false;
    }
  }
  return true;
};

@Component({
  selector: 'nz-demo-table-criteria-filter',
  imports: [JsonPipe, NzTableModule],
  template: `
    <nz-table #orderTable [nzData]="listOfData">
      <thead>
        <tr>
          <th [nzFilterConfig]="customerFilter" [(nzFilterValue)]="customerFilterValue">Customer</th>
          <th [nzFilterConfig]="amountFilter" [(nzFilterValue)]="amountFilterValue">Amount</th>
          <th [nzFilterConfig]="createdAtFilter" [(nzFilterValue)]="createdAtFilterValue">Created</th>
        </tr>
      </thead>
      <tbody>
        @for (data of orderTable.data; track data.id) {
          <tr>
            <td>{{ data.customer }}</td>
            <td>{{ data.amount }}</td>
            <td>{{ data.createdAt?.toLocaleDateString() }}</td>
          </tr>
        }
      </tbody>
    </nz-table>
    <pre>{{
      { customer: customerFilterValue(), amount: amountFilterValue(), created: createdAtFilterValue() } | json
    }}</pre>
  `
})
export class NzDemoTableCriteriaFilterComponent {
  readonly customerFilterValue = signal<NzTableFilterValue>(null);
  readonly amountFilterValue = signal<NzTableFilterValue>({ operator: 'greaterThanOrEqual', value: 100 });
  readonly createdAtFilterValue = signal<NzTableFilterValue>(null);
  readonly customerFilter: NzTableTextFilterConfig<Order> = {
    type: 'text',
    valueGetter: order => order.customer,
    fuzzyMatcher: subsequenceMatcher
  };
  readonly amountFilter: NzTableNumberFilterConfig<Order> = {
    type: 'number',
    valueGetter: order => order.amount
  };
  readonly createdAtFilter: NzTableDateFilterConfig<Order> = {
    type: 'date',
    valueGetter: order => order.createdAt,
    defaultOperator: 'between'
  };
  readonly listOfData: Order[] = [
    { id: 1, customer: 'John Brown', amount: 120, createdAt: new Date(2024, 0, 2) },
    { id: 2, customer: 'Jim Green', amount: 80, createdAt: new Date(2024, 0, 5) },
    { id: 3, customer: 'Joe Black', amount: 340, createdAt: new Date(2024, 1, 12) },
    { id: 4, customer: 'Jim Red', amount: null, createdAt: null },
    { id: 5, customer: 'Jane White', amount: 100, createdAt: new Date(2024, 2, 1) },
    { id: 6, customer: 'jake gray', amount: 45.5, createdAt: new Date(2024, 2, 18) }
  ];
}
