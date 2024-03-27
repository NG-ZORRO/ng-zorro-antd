import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-table-summary',
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
        <tr *ngFor="let data of middleTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.borrow }}</td>
          <td>{{ data.repayment }}</td>
        </tr>
        <tr></tr>
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
  `,
  styles: [
    `
      tfoot th,
      tfoot td {
        background: #fafafa;
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

  fixedData: Array<{ name: string; description: string }> = [];
  totalBorrow = 0;
  totalRepayment = 0;
  ngOnInit(): void {
    this.data.forEach(({ borrow, repayment }) => {
      this.totalBorrow += borrow;
      this.totalRepayment += repayment;
    });
  }
}
