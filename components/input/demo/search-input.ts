import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-search-input',
  imports: [FormsModule, NzButtonModule, NzInputModule, NzIconModule],
  template: `
    <nz-input-wrapper class="ant-input-search">
      <input nz-input type="search" placeholder="input search text" />
      <button nzInputAddonAfter nz-button class="ant-input-search-button">
        <nz-icon nzType="search" />
      </button>
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper nzAllowClear class="ant-input-search">
      <input nz-input type="search" placeholder="input search text" />
      <button nzInputAddonAfter nz-button class="ant-input-search-button">
        <nz-icon nzType="search" />
      </button>
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper class="ant-input-search">
      <span nzInputAddonBefore>https://</span>
      <input nz-input type="search" placeholder="input search text" />
      <button nzInputAddonAfter nz-button class="ant-input-search-button">
        <nz-icon nzType="search" />
      </button>
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper class="ant-input-search ant-input-search-with-button">
      <input nz-input type="search" placeholder="input search text" />
      <button nzInputAddonAfter nz-button nzType="primary" class="ant-input-search-button">
        <nz-icon nzType="search" />
      </button>
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper class="ant-input-search ant-input-search-large ant-input-search-with-button">
      <input nz-input type="search" placeholder="input search text" nzSize="large" />
      <button nzInputAddonAfter nz-button nzType="primary" nzSize="large" class="ant-input-search-button"
        >Submit</button
      >
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper class="ant-input-search ant-input-search-large ant-input-search-with-button">
      <input nz-input type="search" placeholder="input search text" nzSize="large" />
      <nz-icon nzInputSuffix nzType="audio" [style.font-size.px]="16" [style.color]="'#1677ff'" />
      <button nzInputAddonAfter nz-button nzType="primary" nzSize="large" class="ant-input-search-button"
        >Submit</button
      >
    </nz-input-wrapper>
  `
})
export class NzDemoInputSearchInputComponent {}
