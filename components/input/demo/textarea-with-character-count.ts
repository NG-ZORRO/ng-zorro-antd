import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

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
  form: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.form = this.formBuilder.group({
      comment: [null, [Validators.maxLength(100)]]
    });
  }
}
