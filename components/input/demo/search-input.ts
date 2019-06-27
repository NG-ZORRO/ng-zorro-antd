import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-search-input',
  template: `
    <nz-input-group [nzSuffix]="suffixIconSearch">
      <input type="text" nz-input placeholder="input search text" />
    </nz-input-group>
    <ng-template #suffixIconSearch>
      <i nz-icon nzType="search"></i>
    </ng-template>
    <br />
    <br />
    <nz-input-group nzSearch [nzAddOnAfter]="suffixIconButton">
      <input type="text" nz-input placeholder="input search text" />
    </nz-input-group>
    <ng-template #suffixIconButton>
      <button nz-button nzType="primary" nzSearch><i nz-icon nzType="search"></i></button>
    </ng-template>
    <br />
    <br />
    <nz-input-group nzSearch nzSize="large" [nzAddOnAfter]="suffixButton">
      <input type="text" nz-input placeholder="input search text" />
    </nz-input-group>
    <ng-template #suffixButton>
      <button nz-button nzType="primary" nzSize="large" nzSearch>Search</button>
    </ng-template>
  `
})
export class NzDemoInputSearchInputComponent {}
