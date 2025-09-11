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
    <nz-input-wrapper>
      <span nzInputAddonBefore>http://</span>
      <input nz-input [(ngModel)]="value" />
      <span nzInputAddonAfter>.com</span>
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper>
      <nz-select nzInputAddonBefore [ngModel]="'Http://'">
        <nz-option nzLabel="Http://" nzValue="Http://"></nz-option>
        <nz-option nzLabel="Https://" nzValue="Https://"></nz-option>
      </nz-select>
      <input nz-input [(ngModel)]="value" />
      <nz-select nzInputAddonAfter [ngModel]="'.com'">
        <nz-option nzLabel=".com" nzValue=".com"></nz-option>
        <nz-option nzLabel=".jp" nzValue=".jp"></nz-option>
        <nz-option nzLabel=".cn" nzValue=".cn"></nz-option>
        <nz-option nzLabel=".org" nzValue=".org"></nz-option>
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
    <nz-input-wrapper>
      <span nzInputAddonBefore>http://</span>
      <input nz-input [(ngModel)]="value" />
      <span nzInputSuffix>.com</span>
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
