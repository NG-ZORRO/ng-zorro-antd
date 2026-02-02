import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-input-addon',
  imports: [NzInputModule, NzIconModule, NzSelectModule, NzCascaderModule, FormsModule],
  template: `
    <nz-input-wrapper nzAddonBefore="http://" nzAddonAfter=".com">
      <input nz-input [(ngModel)]="value" />
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper>
      <nz-select nzInputAddonBefore ngModel="Http://">
        <nz-option nzLabel="Http://" nzValue="Http://" />
        <nz-option nzLabel="Https://" nzValue="Https://" />
      </nz-select>
      <input nz-input [(ngModel)]="value" />
      <nz-select nzInputAddonAfter ngModel=".com">
        <nz-option nzLabel=".com" nzValue=".com" />
        <nz-option nzLabel=".jp" nzValue=".jp" />
        <nz-option nzLabel=".cn" nzValue=".cn" />
        <nz-option nzLabel=".org" nzValue=".org" />
      </nz-select>
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper>
      <input nz-input [(ngModel)]="value" />
      <nz-icon nzInputAddonBefore nzType="setting" />
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper nzAddonBefore="http://" nzSuffix=".com">
      <input nz-input [(ngModel)]="value" />
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper>
      <nz-cascader nzInputAddonBefore [nzOptions]="[]" nzPlaceHolder="cascader" [style.width.px]="150" />
      <input nz-input [(ngModel)]="value" />
    </nz-input-wrapper>
  `
})
export class NzDemoInputAddonComponent {
  readonly value = signal('mysite');
}
