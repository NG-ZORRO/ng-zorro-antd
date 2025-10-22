import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-textarea-with-character-count',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule],
  template: `
    <form nz-form [formGroup]="form" nzLayout="vertical">
      <nz-form-item>
        <nz-form-control>
          <nz-textarea-count [nzMaxCharacterCount]="100">
            <textarea rows="4" formControlName="comment" nz-input></textarea>
          </nz-textarea-count>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzDemoInputTextareaWithCharacterCountComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group({ comment: this.fb.control('', [Validators.maxLength(100)]) });
}
