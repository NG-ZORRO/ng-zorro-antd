import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-advance-count',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule],
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
          <nz-input-wrapper nzShowCount [nzCount]="{ max: 10 }">
            <input nz-input formControlName="test_1" />
          </nz-input-wrapper>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label><h4>Emoji count as length 1</h4></nz-form-label>
        <nz-form-control>
          <nz-input-wrapper nzShowCount [nzCount]="{ max: 6, strategy: countStrategyFn }">
            <input nz-input formControlName="test_2" />
          </nz-input-wrapper>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label><h4>Not exceed max</h4></nz-form-label>
        <nz-form-control>
          <nz-input-wrapper
            nzShowCount
            [nzCount]="{ max: 10, strategy: countStrategyFn, exceedFormatter: exceedFormatterFn }"
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
            [nzCount]="{ max: 20, strategy: countStrategyFn, exceedFormatter: exceedFormatterFn }"
          >
            <input nz-input formControlName="test_4" />
          </nz-input-password>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label><h4>nz-input-search</h4></nz-form-label>
        <nz-form-control>
          <nz-input-search nzShowCount [nzCount]="{ max: 20, strategy: countStrategyFn }">
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

  countStrategyFn: (v: string) => number = v => runes(v).length;
  exceedFormatterFn: (cur: string, config: { max: number }) => string = (v, { max }) => {
    const result = runes(v).slice(0, max).join('');
    return result;
  };
}

function runes(str: string): string[] {
  return [...str];
}
