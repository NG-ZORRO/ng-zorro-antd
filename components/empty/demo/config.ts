import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

@Component({
  selector: 'nz-demo-empty-config',
  imports: [
    FormsModule,
    NzCascaderModule,
    NzDividerModule,
    NzEmptyModule,
    NzIconModule,
    NzListModule,
    NzSelectModule,
    NzSwitchModule,
    NzTableModule,
    NzTransferModule,
    NzTreeSelectModule
  ],
  template: `
    <nz-switch
      [nzUnCheckedChildren]="'default'"
      [nzCheckedChildren]="'customize'"
      [(ngModel)]="customize"
      (ngModelChange)="onConfigChange()"
    ></nz-switch>

    <nz-divider></nz-divider>

    <h3>Select</h3>
    <nz-select style="width: 200px"></nz-select>

    <h3>TreeSelect</h3>
    <nz-tree-select style="width: 200px;"></nz-tree-select>

    <h3>Cascader</h3>
    <nz-cascader style="width: 200px;" [nzShowSearch]="true" [nzOptions]="[]"></nz-cascader>

    <h3>Transfer</h3>
    <nz-transfer></nz-transfer>

    <h3>Table</h3>
    <nz-table [nzData]="[]">
      <thead>
        <tr>
          <th>Title</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody></tbody>
    </nz-table>

    <h3>List</h3>
    <nz-list [nzDataSource]="[]"></nz-list>

    <ng-template #customTpl let-name>
      <div style="text-align: center;">
        <nz-icon nzType="smile" style="font-size: 20px;" />
        <p>Data Not Found in {{ name }}</p>
      </div>
    </ng-template>
  `,
  styles: [
    `
      h3 {
        font-size: inherit;
        margin: 16px 0 8px 0;
      }
    `
  ]
})
export class NzDemoEmptyConfigComponent {
  @ViewChild('customTpl', { static: false }) customTpl?: TemplateRef<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

  customize = false;

  constructor(private nzConfigService: NzConfigService) {}

  onConfigChange(): void {
    if (this.customize) {
      this.nzConfigService.set('empty', { nzDefaultEmptyContent: this.customTpl });
    } else {
      this.nzConfigService.set('empty', { nzDefaultEmptyContent: undefined });
    }
  }
}
