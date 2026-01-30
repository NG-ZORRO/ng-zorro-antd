import { Component, inject, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMentionComponent, NzMentionModule } from 'ng-zorro-antd/mention';

@Component({
  selector: 'nz-demo-mention-form',
  imports: [ReactiveFormsModule, NzButtonModule, NzFormModule, NzInputModule, NzMentionModule],
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSm]="6" nzFor="mention">Top coders</nz-form-label>
        <nz-form-control [nzSm]="16" nzErrorTip="More than one must be selected!">
          <nz-mention #mentions [nzSuggestions]="suggestions">
            <textarea
              rows="1"
              id="mention"
              placeholder="input here"
              formControlName="mention"
              nzMentionTrigger
              nz-input
            ></textarea>
          </nz-mention>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nz-row style="margin-bottom:8px;">
        <nz-form-control [nzSpan]="14" [nzOffset]="6">
          <div class="cta-wrapper">
            <button type="button" nz-button nzType="primary" (click)="submitForm()">Submit</button>
            <button type="button" nz-button (click)="resetForm()">Reset</button>
          </div>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styles: `
    .cta-wrapper {
      display: flex;
      gap: 1rem;
    }
  `
})
export class NzDemoMentionFormComponent {
  readonly suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご', 'ParsaArvaneh'];
  @ViewChild('mentions', { static: true }) mentionChild!: NzMentionComponent;

  mentionValidator: ValidatorFn = (control: AbstractControl): ValidationErrors => {
    if (!control.value) {
      return { required: true };
    } else if (this.mentionChild?.getMentions().length < 2) {
      return { confirm: true, error: true };
    }
    return {};
  };

  private fb = inject(FormBuilder);
  validateForm = this.fb.group({
    mention: ['@afc163 ', [Validators.required, this.mentionValidator]]
  });

  get mention(): FormControl<string | null> {
    return this.validateForm.controls.mention;
  }

  submitForm(): void {
    this.mention.markAsDirty();
    this.mention.updateValueAndValidity();
    if (this.mention.valid) {
      console.log('Submit!!!', this.mention.value);
      console.log(this.mentionChild.getMentions());
    } else {
      console.log('Errors in form!!!');
    }
  }

  resetForm(): void {
    this.validateForm.reset({
      mention: '@afc163 '
    });
  }
}
