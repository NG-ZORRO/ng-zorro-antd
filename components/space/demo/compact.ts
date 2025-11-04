import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCascaderModule, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

@Component({
  selector: 'nz-demo-space-compact',
  imports: [
    NzSpaceModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzCascaderModule,
    NzTreeSelectModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzAutocompleteModule,
    NzTooltipModule,
    FormsModule
  ],
  template: `
    <nz-space-compact nzBlock>
      <input nz-input value="0571" [style.width.%]="20" />
      <input nz-input value="26888888" [style.width.%]="30" />
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock nzSize="small">
      <input nz-input value="https://ng.ant.design" [style.width]="'calc(100% - 200px)'" />
      <button nz-button nzType="primary">Submit</button>
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <input nz-input value="https://ng.ant.design" [style.width]="'calc(100% - 200px)'" />
      <button nz-button nzType="primary">Submit</button>
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <input nz-input value="git@github.com:NG-ZORRO/ng-zorro-antd.git" [style.width]="'calc(100% - 200px)'" />
      <button nz-button nz-tooltip nzTooltipTitle="copy git url">
        <nz-icon nzType="copy" />
      </button>
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <nz-select ngModel="Zhejianggggg">
        <nz-option nzLabel="Zhejianggggg" nzValue="Zhejianggggg"></nz-option>
        <nz-option nzLabel="Jiangsu" nzValue="Jiangsu"></nz-option>
      </nz-select>
      <input nz-input value="Xihu District, Hangzhou" [style.width.%]="50" />
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <nz-input-search [style.width.%]="30">
        <input nz-input value="0571" />
      </nz-input-search>
      <nz-input-search [style.width.%]="50">
        <input nz-input value="26888888" />
      </nz-input-search>
      <nz-input-search [style.width.%]="20">
        <input nz-input value="+1" />
      </nz-input-search>
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <nz-select nzMode="multiple" [ngModel]="['Zhejianggggg']" [style.width.%]="50">
        <nz-option nzLabel="Zhejianggggg" nzValue="Zhejianggggg"></nz-option>
        <nz-option nzLabel="Jiangsu" nzValue="Jiangsu"></nz-option>
      </nz-select>
      <input nz-input value="Xihu District, Hangzhou" [style.width.%]="50" />
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <nz-select ngModel="Option1">
        <nz-option nzLabel="Option1" nzValue="Option1"></nz-option>
        <nz-option nzLabel="Option2" nzValue="Option2"></nz-option>
      </nz-select>
      <input nz-input value="input content" [style.width.%]="50" />
      <nz-input-number [ngModel]="12" />
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <input nz-input value="input content" [style.width.%]="50" />
      <nz-date-picker [style.width.%]="50" />
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <nz-range-picker [style.width.%]="70" />
      <input nz-input value="input content" [style.width.%]="30" />
      <button nz-button nzType="primary">查询</button>
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <input nz-input value="input content" [style.width.%]="30" />
      <nz-range-picker [style.width.%]="70" />
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <nz-select ngModel="Option1-1">
        <nz-option nzLabel="Option1-1" nzValue="Option1-1"></nz-option>
        <nz-option nzLabel="Option2-1" nzValue="Option2-1"></nz-option>
      </nz-select>
      <nz-select ngModel="Option1-2">
        <nz-option nzLabel="Option1-2" nzValue="Option1-2"></nz-option>
        <nz-option nzLabel="Option2-2" nzValue="Option2-2"></nz-option>
      </nz-select>
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <nz-select ngModel="1">
        <nz-option nzLabel="Between" nzValue="1"></nz-option>
        <nz-option nzLabel="Except" nzValue="2"></nz-option>
      </nz-select>
      <input nz-input placeholder="Minimum" style="width: 100px; text-align: center" />
      <input
        nz-input
        class="site-input-split"
        style="
          width: 30px;
          border-left: 0;
          border-right: 0;
          pointer-events: none
        "
        placeholder="~"
        disabled
      />
      <input nz-input class="site-input-right" style="width: 100px; text-align: center" placeholder="Maximum" />
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <nz-select ngModel="Sign Up" [style.width.%]="30">
        <nz-option nzLabel="Sign Up" nzValue="Sign Up"></nz-option>
        <nz-option nzLabel="Sign In" nzValue="Sign In"></nz-option>
      </nz-select>
      <nz-autocomplete #auto [nzDataSource]="['text 1', 'text 2']" />
      <input nz-input placeholder="Email" [nzAutocomplete]="auto" [style.width.%]="70" />
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <nz-time-picker [style.width.%]="70" />
      <nz-cascader [nzOptions]="cascaderOptions" nzPlaceholder="Select Address" [style.width.%]="70" />
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <nz-tree-select
        [nzNodes]="nodes"
        nzShowSearch
        nzPlaceHolder="Please select"
        ngModel="10010"
        nzDefaultExpandAll
        [style.width.%]="60"
      ></nz-tree-select>
      <button nz-button nzType="primary">Submit</button>
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <nz-input-wrapper nzAddOnBefore="Http://" nzAddOnAfter=".com" [style.width.%]="50">
        <input nz-input placeholder="input here" />
      </nz-input-wrapper>
      <nz-input-number>
        <span nzInputPrefix>$</span>
      </nz-input-number>
      <nz-input-number>
        <span nzInputAddonBefore>$</span>
      </nz-input-number>
    </nz-space-compact>
  `,
  styles: [
    `
      .site-input-split {
        background-color: #fff;
      }

      .site-input-right:not(.ant-input-rtl) {
        border-left-width: 0;
      }

      .site-input-right:not(.ant-input-rtl):hover,
      .site-input-right:not(.ant-input-rtl):focus {
        border-left-width: 1px;
      }

      .site-input-right.ant-input-rtl {
        border-right-width: 0;
      }

      .site-input-right.ant-input-rtl:hover,
      .site-input-right.ant-input-rtl:focus {
        border-right-width: 1px;
      }
    `
  ]
})
export class NzDemoSpaceCompactComponent {
  cascaderOptions: NzCascaderOption[] = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
              isLeaf: true
            }
          ]
        }
      ]
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
              isLeaf: true
            }
          ]
        }
      ]
    }
  ];

  nodes = [
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
