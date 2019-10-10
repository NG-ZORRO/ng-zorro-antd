import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-custom-dropdown-menu',
  template: `
    <nz-select nzShowSearch nzAllowClear [ngModel]="'lucy'" [nzDropdownRender]="render">
      <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
      <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
    </nz-select>
    <ng-template #render>
      <nz-divider></nz-divider>
      <div class="add-item"><i nz-icon nzType="plus"></i> Add item</div>
    </ng-template>
  `,
  styles: [
    `
      nz-select {
        width: 120px;
      }

      nz-divider {
        margin: 4px 0;
      }

      .add-item {
        padding: 8px;
        cursor: pointer;
      }
    `
  ]
})
export class NzDemoSelectCustomDropdownMenuComponent {}
