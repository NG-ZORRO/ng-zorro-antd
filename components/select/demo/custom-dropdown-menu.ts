import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-custom-dropdown-menu',
  template: `
    <nz-select nzShowSearch nzAllowClear [nzDropdownRender]="renderTemplate" nzPlaceHolder="custom dropdown render">
      <nz-option *ngFor="let item of listOfItem" [nzLabel]="item" [nzValue]="item"></nz-option>
    </nz-select>
    <ng-template #renderTemplate>
      <nz-divider></nz-divider>
      <div class="container">
        <input type="text" nz-input #inputElement />
        <a class="add-item" (click)="addItem(inputElement)"><i nz-icon nzType="plus"></i> Add item</a>
      </div>
    </ng-template>
  `,
  styles: [
    `
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
      input {
      }
      .add-item {
        flex: 0 0 auto;
        padding: 8px;
        display: block;
      }
    `
  ]
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
