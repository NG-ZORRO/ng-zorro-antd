import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-advance-count',
  imports: [FormsModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzIconModule],
  template: `
    <form nz-form [formGroup]="form" nzLayout="vertical">
      <nz-form-item>
        <nz-form-label><h4>ShowCount</h4></nz-form-label>
        <nz-form-control>
          <nz-input-wrapper nzAllowClear nzShowCount>
            <input nz-input formControlName="test_0" />
          </nz-input-wrapper>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label><h4>Exceed Max</h4></nz-form-label>
        <nz-form-control>
          <nz-input-wrapper nzShowCount [nzCountMax]="10">
            <input nz-input formControlName="test_1" />
          </nz-input-wrapper>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label><h4>Emoji count as length 1</h4></nz-form-label>
        <nz-form-control>
          <nz-input-wrapper [nzShowCount]="true" [nzCountMax]="6" [nzCountStrategy]="countStrategy">
            <input nz-input formControlName="test_2" />
          </nz-input-wrapper>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label><h4>Not exceed max</h4></nz-form-label>
        <nz-form-control>
          <nz-input-wrapper
            nzShowCount
            [nzCountMax]="10"
            [nzCountStrategy]="countStrategy"
            [nzExceedFormatter]="exceedFormatterFn"
          >
            <input nz-input formControlName="test_3" />
          </nz-input-wrapper>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label><h4>nz-input-password</h4></nz-form-label>
        <nz-form-control>
          <nz-input-password
            [nzVisibilityToggle]="false"
            nzShowCount
            [nzCountMax]="20"
            [nzCountStrategy]="countStrategy"
          >
            <input nz-input formControlName="test_4" />
          </nz-input-password>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label><h4>nz-input-search</h4></nz-form-label>
        <nz-form-control>
          <nz-input-search nzShowCount [nzCountMax]="20" [nzCountStrategy]="countStrategy">
            <input nz-input formControlName="test_5" />
          </nz-input-search>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzDemoInputAdvanceCountComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    test_0: ['Angular & NG-ZORRO'],
    test_1: ['Angular & NG-ZORRO'],
    test_2: ['🔥🔥🔥'],
    test_3: ['AAA🔥🔥🔥'],
    test_4: ['BBB'],
    test_5: ['CCC']
  });

  countStrategy: (v: string) => number = (v: string) => runes(v).length;
  exceedFormatterFn: (cur: string, max: number) => string = (v: string, m: number) => {
    const result = runes(v).slice(0, m).join('');
    return result;
  };
}

function runes(str: string): string[] {
  return [...str];
}
