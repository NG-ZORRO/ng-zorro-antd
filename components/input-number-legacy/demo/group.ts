import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberLegacyModule } from 'ng-zorro-antd/input-number-legacy';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-input-number-legacy-group',
  imports: [
    FormsModule,
    NzButtonModule,
    NzDatePickerModule,
    NzGridModule,
    NzInputNumberLegacyModule,
    NzSelectModule,
    NzSpaceModule,
    NzIconModule
  ],
  template: `
    <nz-space nzDirection="vertical" style="width: 100%">
      <nz-input-number-group nz-row [nzGutter]="8" nzSize="large" *nzSpaceItem>
        <div nz-col nzSpan="8">
          <nz-input-number-legacy [ngModel]="1234" [nzStep]="1" style="width: 100%"></nz-input-number-legacy>
        </div>
        <div nz-col nzSpan="8">
          <nz-input-number-legacy [ngModel]="56789" [nzStep]="1" style="width: 100%"></nz-input-number-legacy>
        </div>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem nzCompact>
        <nz-input-number-legacy [ngModel]="1234" [nzStep]="1" style="width: 33%"></nz-input-number-legacy>
        <nz-input-number-legacy [ngModel]="56789" [nzStep]="1" style="width: 33%"></nz-input-number-legacy>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem nzCompact>
        <nz-input-number-legacy
          [ngModel]="1234"
          [nzStep]="1"
          style="width: calc(100% - 200px)"
        ></nz-input-number-legacy>
        <button nz-button nzType="primary">Submit</button>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem nzCompact>
        <nz-input-number-legacy
          [ngModel]="1234"
          [nzStep]="1"
          style="width: calc(100% - 200px)"
        ></nz-input-number-legacy>
        <button nz-button>
          <span nz-icon nzType="copy" nzTheme="outline"></span>
        </button>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem nzCompact>
        <nz-select ngModel="Zhejiang">
          <nz-option nzValue="Zhejiang" nzLabel="Zhejiang"></nz-option>
          <nz-option nzValue="Jiangsu" nzLabel="Jiangsu"></nz-option>
        </nz-select>
        <nz-input-number-legacy [ngModel]="1234" [nzStep]="1" style="width: 50%"></nz-input-number-legacy>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem nzCompact>
        <nz-input-number-legacy [ngModel]="1234" [nzStep]="1" style="width: 50%"></nz-input-number-legacy>
        <nz-date-picker></nz-date-picker>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem nzCompact>
        <nz-input-number-legacy [ngModel]="1234" [nzStep]="1" style="width: 30%"></nz-input-number-legacy>
        <nz-range-picker></nz-range-picker>
      </nz-input-number-group>
    </nz-space>
  `
})
export class NzDemoInputNumberLegacyGroupComponent {}
