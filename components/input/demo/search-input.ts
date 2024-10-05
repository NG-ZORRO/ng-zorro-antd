import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-search-input',
  standalone: true,
  imports: [FormsModule, NzButtonModule, NzInputModule, NzIconModule],
  template: `
    <nz-input-group [nzSuffix]="suffixIconSearch">
      <input type="text" nz-input placeholder="input search text" />
    </nz-input-group>
    <ng-template #suffixIconSearch>
      <span nz-icon nzType="search"></span>
    </ng-template>
    <br />
    <br />
    <nz-input-group nzSearch [nzAddOnAfter]="suffixIconButton">
      <input type="text" nz-input placeholder="input search text" />
    </nz-input-group>
    <ng-template #suffixIconButton>
      <button nz-button nzType="primary" nzSearch><span nz-icon nzType="search"></span></button>
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
