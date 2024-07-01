import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nz-demo-input-textarea-with-character-count',
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
  form: FormGroup<{
    comment: FormControl<string | null>;
  }> = this.formBuilder.group({
    comment: ['', [Validators.maxLength(100)]]
  });

  constructor(private formBuilder: FormBuilder) {}
}
