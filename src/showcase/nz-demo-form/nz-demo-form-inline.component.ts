import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'nz-demo-form-inline',
  template: `
    <form nz-form [nzLayout]="'inline'" [formGroup]="validateForm" (ngSubmit)="_submitForm()">
      <div nz-form-item>
        <div nz-form-control>
          <nz-input formControlName="userName" [nzPlaceHolder]="'Username'" [nzSize]="'large'">
            <ng-template #prefix>
              <i class="anticon anticon-user"></i>
            </ng-template>
          </nz-input>
          <div nz-form-explain *ngIf="validateForm.controls.userName.dirty&&validateForm.controls.userName.hasError('required')">Please input your username!</div>
        </div>
      </div>
      <div nz-form-item>
        <div nz-form-control>
          <nz-input formControlName="password" [nzType]="'password'" [nzPlaceHolder]="'Password'" [nzSize]="'large'">
            <ng-template #prefix>
              <i class="anticon anticon-lock"></i>
            </ng-template>
          </nz-input>
          <div nz-form-explain *ngIf="validateForm.controls.password.dirty&&validateForm.controls.password.hasError('required')">Please input your Password!</div>
        </div>
      </div>
      <button nz-button [nzType]="'primary'" [nzSize]="'large'" [disabled]="!validateForm.valid">Log in</button>
    </form>`,

  styles: []
})
export class NzDemoFormInlineComponent implements OnInit {
  validateForm: FormGroup;

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ]
    });
  }
}

