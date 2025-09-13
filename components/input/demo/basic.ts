import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-input-basic',
  imports: [FormsModule, NzInputModule, NzSelectModule, NzSpaceModule, NzFormModule, ReactiveFormsModule],
  template: `
    <nz-input-wrapper>
      <input nz-input placeholder="Basic usage" [(ngModel)]="value" />
      <span nzInputPrefix>￥</span>
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper>
      <input nz-input placeholder="Basic usage" [(ngModel)]="value" />
      <span nzInputAddonBefore>+</span>
      <span nzInputAddonAfter>$</span>
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper>
      <input nz-input placeholder="Basic usage" [(ngModel)]="value" />
      <span nzInputPrefix>￥</span>
      <span nzInputAddonBefore>+</span>
      <span nzInputAddonAfter>$</span>
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper>
      <input nz-input placeholder="Basic usage" [(ngModel)]="value" />
      <nz-select nzInputAddonBefore [ngModel]="'Http://'">
        <nz-option nzLabel="Http://" nzValue="Http://"></nz-option>
        <nz-option nzLabel="Https://" nzValue="Https://"></nz-option>
      </nz-select>
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper>
      <input nz-input placeholder="Basic usage" [(ngModel)]="value" disabled />
      <span nzInputPrefix>￥</span>
      <span nzInputAddonBefore>+</span>
      <span nzInputAddonAfter>$</span>
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper>
      <input nz-input placeholder="Basic usage" [(ngModel)]="value" readonly />
      <span nzInputPrefix>￥</span>
      <span nzInputAddonBefore>+</span>
      <span nzInputAddonAfter>$</span>
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper>
      <input nz-input placeholder="Basic usage" [(ngModel)]="value" nzSize="large" />
      <span nzInputPrefix>￥</span>
      <span nzInputAddonBefore>+</span>
      <span nzInputAddonAfter>$</span>
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper>
      <input nz-input placeholder="Basic usage" [(ngModel)]="value" nzStatus="error" />
      <span nzInputPrefix>￥</span>
      <span nzInputAddonBefore>+</span>
      <span nzInputAddonAfter>$</span>
    </nz-input-wrapper>
    <br />
    <br />
    <nz-space-compact nzSize="small">
      <input nz-input placeholder="Basic usage" [(ngModel)]="value" />
      <nz-input-wrapper>
        <input nz-input placeholder="Basic usage" [(ngModel)]="value" />
        <span nzInputPrefix>￥</span>
        <span nzInputAddonBefore>+</span>
        <span nzInputAddonAfter>$</span>
      </nz-input-wrapper>
      <nz-input-wrapper>
        <input nz-input placeholder="Basic usage" [(ngModel)]="value" />
        <span nzInputPrefix>￥</span>
        <span nzInputAddonBefore>+</span>
        <span nzInputAddonAfter>$</span>
      </nz-input-wrapper>
    </nz-space-compact>
    <br />
    <br />
    <nz-form-control nzHasFeedback>
      <nz-input-wrapper>
        <input nz-input placeholder="Basic usage" [formControl]="control" />
        <span nzInputPrefix>￥</span>
        <span nzInputAddonBefore>+</span>
        <span nzInputAddonAfter>$</span>
      </nz-input-wrapper>
    </nz-form-control>
    <br />
    <nz-form-control nzHasFeedback>
      <input nz-input placeholder="Basic usage" [formControl]="control" />
    </nz-form-control>
  `
})
export class NzDemoInputBasicComponent {
  value?: string;
  control = new FormControl('', [Validators.required]);
}
