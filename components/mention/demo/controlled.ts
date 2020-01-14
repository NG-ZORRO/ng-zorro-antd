import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMentionComponent } from 'ng-zorro-antd/mention';

@Component({
  selector: 'nz-demo-mention-controlled',
  encapsulation: ViewEncapsulation.None,
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSm]="6" nzFor="mention">Top coders</nz-form-label>
        <nz-form-control [nzSm]="16" nzErrorTip="More than one must be selected!">
          <nz-mention #mentions [nzSuggestions]="suggestions">
            <input id="mention" placeholder="input here" formControlName="mention" nzMentionTrigger nz-input />
          </nz-mention>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nz-row style="margin-bottom:8px;">
        <nz-form-control [nzSpan]="14" [nzOffset]="6">
          <button type="button" nz-button nzType="primary" (click)="submitForm()">Submit</button>
          &nbsp;&nbsp;&nbsp;
          <button type="button" nz-button (click)="resetForm()">Reset</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzDemoMentionControlledComponent implements OnInit {
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];
  validateForm: FormGroup;
  @ViewChild('mentions', { static: true }) mentionChild: NzMentionComponent;

  get mention(): AbstractControl {
    return this.validateForm.get('mention')!;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      mention: ['@afc163 ', [Validators.required, this.mentionValidator]]
    });
  }

  mentionValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (this.mentionChild.getMentions().length < 2) {
      return { confirm: true, error: true };
    }
    return {};
  };

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
