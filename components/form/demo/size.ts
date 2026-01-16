import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import type { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

@Component({
  selector: 'nz-demo-form-size',
  imports: [
    FormsModule,
    NzFormModule,
    NzRadioModule,
    NzInputModule,
    NzInputNumberModule,
    NzCascaderModule,
    NzSelectModule,
    NzTreeSelectModule,
    NzDatePickerModule,
    NzButtonModule,
    NzTimePickerModule,
    NzSwitchModule,
    NzColorPickerModule
  ],
  template: `
    <form nz-form [nzSize]="size()">
      <nz-form-item>
        <nz-form-label>Size</nz-form-label>
        <nz-form-control>
          <nz-radio-group name="size" [(ngModel)]="size">
            <label nz-radio-button nzValue="small">Small</label>
            <label nz-radio-button nzValue="default">Default</label>
            <label nz-radio-button nzValue="large">Large</label>
          </nz-radio-group>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Input</nz-form-label>
        <nz-form-control>
          <input nz-input />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Input Number</nz-form-label>
        <nz-form-control>
          <nz-input-number />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Cascader</nz-form-label>
        <nz-form-control>
          <nz-cascader [nzOptions]="[]" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Select</nz-form-label>
        <nz-form-control>
          <nz-select [nzOptions]="[]" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Tree Select</nz-form-label>
        <nz-form-control>
          <nz-tree-select
            [nzExpandedKeys]="expandKeys"
            [nzNodes]="nodes"
            nzShowSearch
            nzPlaceHolder="Please select"
            [nzNodes]="nodes"
          />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Date Picker</nz-form-label>
        <nz-form-control>
          <nz-date-picker />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Time Picker</nz-form-label>
        <nz-form-control>
          <nz-time-picker />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Switch</nz-form-label>
        <nz-form-control>
          <nz-switch />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Color Picker</nz-form-label>
        <nz-color-picker />
      </nz-form-item>
      <button nz-button nzType="primary">Button</button>
    </form>
  `
})
export class NzDemoFormSizeComponent {
  readonly size = signal<NzSizeLDSType>('default');

  expandKeys = ['100', '1001'];

  readonly nodes = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          children: [
            { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
        }
      ]
    }
  ];
}
