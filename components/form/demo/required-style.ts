import { NgTemplateOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzFormModule, type NzRequiredMark } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'nz-demo-form-required-style',
  imports: [FormsModule, NzFormModule, NzRadioModule, NzInputModule, NgTemplateOutlet, NzTagModule],
  template: `
    <form nz-form [nzRequiredMark]="requiredMarkStyle()">
      <nz-radio-group [(ngModel)]="requiredMarkStyle" name="requiredMarkStyle">
        <label nz-radio-button [nzValue]="true">Default</label>
        <label nz-radio-button nzValue="optional">Optional</label>
        <label nz-radio-button [nzValue]="false">Hidden</label>
        <label nz-radio-button [nzValue]="customRequiredMark">Custom</label>
      </nz-radio-group>
      <nz-form-item>
        <nz-form-label nzFor="fieldA" nzRequired>Field A</nz-form-label>
        <nz-form-control>
          <input type="text" nz-input id="fieldA" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzFor="fieldB">Field B</nz-form-label>
        <nz-form-control>
          <input type="text" nz-input id="fieldB" />
        </nz-form-control>
      </nz-form-item>
    </form>

    <ng-template #customRequiredMark let-label let-required="required">
      @if (required) {
        <nz-tag nzColor="red">Required</nz-tag>
      } @else {
        <nz-tag nzColor="orange">Optional</nz-tag>
      }
      <ng-container *ngTemplateOutlet="label" />
    </ng-template>
  `,
  styles: `
    nz-radio-group {
      margin-bottom: 16px;
    }
    [nz-form] {
      max-width: 600px;
    }
  `
})
export class NzDemoFormRequiredStyleComponent {
  readonly requiredMarkStyle = signal<NzRequiredMark>('optional');
}
