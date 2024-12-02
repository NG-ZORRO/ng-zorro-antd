import { Component } from '@angular/core';

import { NzResizableModule, NzResizeEvent } from 'ng-zorro-antd/resizable';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'nz-demo-resizable-table',
  imports: [NzResizableModule, NzTableModule],
  template: `
    <nz-table #basicTable [nzData]="listOfData">
      <thead>
        <tr>
          @for (col of cols; track col) {
            @if (col.width) {
              <th
                nz-resizable
                nzBounds="window"
                nzPreview
                [nzWidth]="col.width"
                [nzMaxWidth]="256"
                [nzMinWidth]="60"
                (nzResizeEnd)="onResize($event, col.title)"
              >
                {{ col.title }}
                <nz-resize-handle nzDirection="right">
                  <div class="resize-trigger"></div>
                </nz-resize-handle>
              </th>
            } @else {
              <th>
                {{ col.title }}
              </th>
            }
          }
        </tr>
      </thead>
      <tbody>
        @for (data of basicTable.data; track data) {
          <tr>
            <td>{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td>{{ data.address }}</td>
            <td>-</td>
          </tr>
        }
      </tbody>
    </nz-table>
  `,
  styles: [
    `
      .nz-resizable-preview {
        border-width: 0;
        border-right-width: 1px;
      }
    `
  ]
})
export class NzDemoResizableTableComponent {
  cols: Array<{ title: string; width?: string }> = [
    {
      title: 'Name',
      width: '180px'
    },
    {
      title: 'Age',
      width: '180px'
    },
    {
      title: 'Address',
      width: '200px'
    },
    {
      title: 'Actions'
    }
  ];

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  onResize({ width }: NzResizeEvent, col: string): void {
    this.cols = this.cols.map(e => (e.title === col ? { ...e, width: `${width}px` } : e));
  }
}
