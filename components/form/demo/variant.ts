import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import type { NzVariant } from 'ng-zorro-antd/core/types';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMentionModule } from 'ng-zorro-antd/mention';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

@Component({
  selector: 'nz-demo-form-variant',
  imports: [
    NzFormModule,
    NzRadioModule,
    FormsModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzCascaderModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzTreeSelectModule,
    NzMentionModule
  ],
  template: `
    <form nz-form [nzVariant]="variant()">
      <nz-form-item>
        <nz-form-label>Form variant</nz-form-label>
        <nz-radio-group [(ngModel)]="variant" name="variant">
          <label nz-radio-button nzValue="outlined">Outlined</label>
          <label nz-radio-button nzValue="filled">Filled</label>
          <label nz-radio-button nzValue="borderless">Borderless</label>
          <label nz-radio-button nzValue="underlined">Underlined</label>
        </nz-radio-group>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Input</nz-form-label>
        <nz-form-control>
          <input placeholder="Please type something" nz-input />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>InputNumber</nz-form-label>
        <nz-form-control>
          <nz-input-number nzPlaceHolder="Please enter a number" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Select</nz-form-label>
        <nz-form-control>
          <nz-select nzPlaceHolder="Please select">
            <nz-option nzValue="Marie" nzLabel="Marie" />
            <nz-option nzValue="John" nzLabel="John" />
            <nz-option nzValue="Jill" nzLabel="Jill" />
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Cascader</nz-form-label>
        <nz-form-control>
          <nz-cascader />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>DatePicker</nz-form-label>
        <nz-form-control>
          <nz-date-picker />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item
        ><nz-form-label>TimePicker</nz-form-label>
        <nz-form-control>
          <nz-time-picker />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Tree Select</nz-form-label>
        <nz-form-control>
          <nz-tree-select [nzExpandedKeys]="expandKeys" [nzNodes]="nodes" nzPlaceHolder="Please select" />
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label>Mention</nz-form-label>
        <nz-form-control>
          <nz-mention [nzSuggestions]="suggestions">
            <textarea rows="1" placeholder="Input here" nzMentionTrigger nz-input></textarea>
          </nz-mention>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzDemoFormVariantComponent {
  readonly variant = signal<NzVariant>('outlined');

  expandKeys = ['100', '1001'];
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];

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
