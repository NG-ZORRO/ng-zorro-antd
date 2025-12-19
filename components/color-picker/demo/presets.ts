import { Component } from '@angular/core';

import { NzColorPickerModule, NzPresetColor } from 'ng-zorro-antd/color-picker';

@Component({
  selector: 'nz-demo-color-picker-presets',
  imports: [NzColorPickerModule],
  template: `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <h4>Basic Presets</h4>
        <nz-color-picker [nzPresets]="basicPresets" [nzValue]="'#1677ff'"></nz-color-picker>
      </div>

      <div>
        <h4>Multiple Preset Groups</h4>
        <nz-color-picker [nzPresets]="multiplePresets" [nzValue]="'#52c41a'"></nz-color-picker>
      </div>

      <div>
        <h4>Custom Preset with Collapsed State</h4>
        <nz-color-picker [nzPresets]="customPresets" [nzValue]="'#722ed1'"></nz-color-picker>
      </div>
    </div>
  `
})
export class NzDemoColorPickerPresetsComponent {
  basicPresets: NzPresetColor[] = [
    {
      label: 'Recommended',
      colors: [
        '#000000',
        '#000000E0',
        '#000000A6',
        '#00000073',
        '#00000040',
        '#00000026',
        '#0000001A',
        '#00000012',
        '#0000000A',
        '#00000005'
      ]
    },
    {
      label: 'Recent',
      colors: [
        '#F5222D',
        '#FA8C16',
        '#FADB14',
        '#8BBB11',
        '#52C41A',
        '#13A8A8',
        '#1677FF',
        '#2F54EB',
        '#722ED1',
        '#EB2F96'
      ]
    }
  ];

  multiplePresets: NzPresetColor[] = [
    {
      label: 'Primary Colors',
      colors: ['#1677ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'],
      key: 'primary'
    },
    {
      label: 'Secondary Colors',
      colors: ['#13c2c2', '#eb2f96', '#fa541c', '#a0d911', '#2f54eb'],
      key: 'secondary'
    },
    {
      label: 'Neutral Colors',
      colors: ['#000000', '#434343', '#666666', '#999999', '#cccccc'],
      key: 'neutral'
    }
  ];

  customPresets: NzPresetColor[] = [
    {
      label: 'Brand Colors',
      colors: ['#1677ff', '#69c0ff', '#bae7ff', '#e6f7ff'],
      defaultOpen: true,
      key: 'brand'
    },
    {
      label: 'Success Colors',
      colors: ['#52c41a', '#95de64', '#b7eb8f', '#d9f7be'],
      defaultOpen: false,
      key: 'success'
    },
    {
      label: 'Warning Colors',
      colors: ['#faad14', '#ffc53d', '#ffd666', '#ffe58f'],
      defaultOpen: false,
      key: 'warning'
    },
    {
      label: 'Error Colors',
      colors: ['#f5222d', '#ff4d4f', '#ff7875', '#ffa39e'],
      defaultOpen: false,
      key: 'error'
    }
  ];
}
