import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-search-input',
  template: `
    <nz-input-group nzSuffixIcon="anticon anticon-search">
      <input type="text" nz-input placeholder="input search text">
    </nz-input-group>
    <br>
    <br>
    <nz-input-group nzSearch [nzSuffix]="suffixIconButton">
      <input type="text" nz-input placeholder="input search text">
    </nz-input-group>
    <ng-template #suffixIconButton>
      <button nz-button nzType="primary" nzSearch><i class="anticon anticon-search"></i></button>
    </ng-template>
    <br>
    <br>
    <nz-input-group nzSearch nzSize="large" [nzSuffix]="suffixButton">
      <input type="text" nz-input placeholder="input search text">
    </nz-input-group>
    <ng-template #suffixButton>
      <button nz-button nzType="primary" nzSize="large" nzSearch>Search</button>
    </ng-template>
  `
})
export class NzDemoInputSearchInputComponent {
}
