import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-search-input',
  template: `
    <nz-input-group>
      <ng-template #suffix>
        <i class="anticon anticon-search"></i>
      </ng-template>
      <input type="text" nz-input placeholder="input search text">
    </nz-input-group>
    <br>
    <br>
    <nz-input-group nzSearch>
      <input type="text" nz-input placeholder="input search text">
      <ng-template #suffix>
        <button nz-button nzType="primary" class="ant-input-search-button">
          <i class="anticon anticon-search"></i>
        </button>
      </ng-template>
    </nz-input-group>
    <br>
    <br>
    <nz-input-group nzSearch nzSize="large">
      <input type="text" nz-input placeholder="input search text" nzSize="large">
      <ng-template #suffix>
        <button nz-button nzType="primary" nzSize="large" class="ant-input-search-button">
          <span>Search</span>
        </button>
      </ng-template>
    </nz-input-group>
  `
})
export class NzDemoInputSearchInputComponent {
}
