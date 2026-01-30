import { Component } from '@angular/core';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-select-custom-dropdown-menu',
  imports: [NzDividerModule, NzIconModule, NzInputModule, NzSelectModule],
  template: `
    <nz-select nzShowSearch nzAllowClear [nzDropdownRender]="renderTemplate" nzPlaceHolder="custom dropdown render">
      @for (item of listOfItem; track item) {
        <nz-option [nzLabel]="item" [nzValue]="item" />
      }
    </nz-select>
    <ng-template #renderTemplate>
      <nz-divider />
      <div class="container">
        <input type="text" nz-input #inputElement />
        <a class="add-item" (click)="addItem(inputElement)">
          <nz-icon nzType="plus" />
          Add item
        </a>
      </div>
    </ng-template>
  `,
  styles: `
    nz-select {
      width: 240px;
    }
    nz-divider {
      margin: 4px 0;
    }
    .container {
      display: flex;
      flex-wrap: nowrap;
      padding: 8px;
    }
    .add-item {
      flex: 0 0 auto;
      padding: 8px;
      display: block;
    }
  `
})
export class NzDemoSelectCustomDropdownMenuComponent {
  listOfItem = ['jack', 'lucy'];
  index = 0;

  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (this.listOfItem.indexOf(value) === -1) {
      this.listOfItem = [...this.listOfItem, input.value || `New item ${this.index++}`];
    }
  }
}
