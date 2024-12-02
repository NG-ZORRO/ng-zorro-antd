import { Component, OnInit } from '@angular/core';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'nz-demo-table-summary',
  imports: [NzTableModule, NzTypographyModule],
  template: `
    <nz-table #middleTable nzBordered [nzData]="data" [nzShowPagination]="false">
      <thead>
        <tr>
          <th>Name</th>
          <th>Borrow</th>
          <th>Repayment</th>
        </tr>
      </thead>
      <tbody>
        @for (data of middleTable.data; track $index) {
          <tr>
            <td>{{ data.name }}</td>
            <td>{{ data.borrow }}</td>
            <td>{{ data.repayment }}</td>
          </tr>
        }
      </tbody>
      <tfoot nzSummary>
        <tr>
          <td>Total</td>
          <td>
            <span nz-typography nzType="danger">{{ totalBorrow }}</span>
          </td>
          <td>
            <span nz-typography>{{ totalRepayment }}</span>
          </td>
        </tr>
        <tr>
          <td>Balance</td>
          <td colspan="2">
            <span nz-typography>{{ totalBorrow - totalRepayment }}</span>
          </td>
        </tr>
      </tfoot>
    </nz-table>

    <br />

    <nz-table
      #fixedTable
      nzBordered
      [nzData]="fixedData"
      [nzShowPagination]="false"
      [nzScroll]="{ x: '1280px', y: '500px' }"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        @for (data of fixedTable.data; track data.key) {
          <tr>
            <td>{{ data.name }}</td>
            <td>{{ data.description }}</td>
          </tr>
        }
      </tbody>
      <tfoot nzSummary nzFixed>
        <tr>
          <td>Summary</td>
          <td>This is a summary content</td>
        </tr>
      </tfoot>
    </nz-table>
  `,
  styles: [
    `
      :host ::ng-deep tfoot.ant-table-summary {
        background-color: #fafafa !important;
      }
    `
  ]
})
export class NzDemoTableSummaryComponent implements OnInit {
  data = [
    {
      name: 'John Brown',
      borrow: 10,
      repayment: 33
    },
    {
      name: 'Jim Green',
      borrow: 100,
      repayment: 0
    },
    {
      name: 'Joe Black',
      borrow: 10,
      repayment: 10
    },
    {
      name: 'Jim Red',
      borrow: 75,
      repayment: 45
    }
  ];

  fixedData: Array<{ key: number; name: string; description: string }> = [];
  totalBorrow = 0;
  totalRepayment = 0;

  ngOnInit(): void {
    this.data.forEach(({ borrow, repayment }) => {
      this.totalBorrow += borrow;
      this.totalRepayment += repayment;
    });

    for (let i = 0; i < 20; i += 1) {
      this.fixedData.push({
        key: i,
        name: ['Light', 'Bamboo', 'Little'][i % 3],
        description: 'Everything that has a beginning, has an end.'
      });
    }
  }
}
