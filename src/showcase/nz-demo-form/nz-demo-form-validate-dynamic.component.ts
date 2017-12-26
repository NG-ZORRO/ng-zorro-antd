import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'nz-demo-form-validate-dynamic',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm($event,validateForm.value)">
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="7">
          <label nz-form-item-required>Username</label>
        </div>
        <div nz-col [nzSpan]="12" nz-form-control nzHasFeedback>
          <nz-input formControlName="userName" [nzType]="'text'" [nzPlaceHolder]="'async validate try to write JasonWood'" [nzSize]="'large'">
          </nz-input>
          <div nz-form-explain *ngIf="getFormControl('userName').dirty&&getFormControl('userName').hasError('required')">Please input your username!</div>
          <div nz-form-explain *ngIf="getFormControl('userName').dirty&&getFormControl('userName').hasError('duplicated')">The username is redundant!</div>
          <div nz-form-explain *ngIf="getFormControl('userName').dirty&&getFormControl('userName').pending">Validating...</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="7">
          <label nz-form-item-required>E-mail</label>
        </div>
        <div nz-col [nzSpan]="12" nz-form-control nzHasFeedback>
          <nz-input formControlName="email" [nzPlaceHolder]="'email'" [nzType]="'email'" [nzSize]="'large'">
          </nz-input>
          <div nz-form-explain *ngIf="getFormControl('email').dirty&&getFormControl('email').hasError('email')">The input is not valid E-mail!</div>
          <div nz-form-explain *ngIf="getFormControl('email').dirty&&getFormControl('email').hasError('required')">Please input your E-mail!</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="7">
          <label nz-form-item-required>BirthDay</label>
        </div>
        <div nz-col [nzSpan]="12" nz-form-control>
          <nz-datepicker formControlName="birthDay" [nzSize]="'large'" [nzPlaceHolder]="'Choose your birthday'" style="width: 100%;"></nz-datepicker>
          <div nz-form-explain *ngIf="getFormControl('birthDay').dirty&&getFormControl('birthDay').hasError('required')">Please input your birthday!</div>
          <div nz-form-explain *ngIf="getFormControl('birthDay').dirty&&getFormControl('birthDay').hasError('expired')">Birthday must less than today!</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-col [nzSpan]="7" nz-form-label>
          <label nz-form-item-required>Password</label>
        </div>
        <div>
          <div nz-col [nzSpan]="12" nz-form-control nzHasFeedback>
            <nz-input formControlName="password" [nzPlaceHolder]="'password'" [nzType]="'password'" [nzSize]="'large'" (ngModelChange)="validateConfirmPassword()">
            </nz-input>
            <div nz-form-explain *ngIf="getFormControl('password').dirty&&getFormControl('password').hasError('required')">Please input your password!</div>
          </div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-col [nzSpan]="7" nz-form-label>
          <label nz-form-item-required>Confirm Password</label>
        </div>
        <div nz-col [nzSpan]="12" nz-form-control nzHasFeedback>
          <nz-input formControlName="passwordConfirmation" [nzType]="'password'" [nzPlaceHolder]="'confirm your password'" [nzSize]="'large'">
          </nz-input>
          <div nz-form-explain *ngIf="getFormControl('passwordConfirmation').dirty&&getFormControl('passwordConfirmation').hasError('required')">Please confirm your password!</div>
          <div nz-form-explain *ngIf="getFormControl('passwordConfirmation').dirty&&getFormControl('passwordConfirmation').hasError('confirm')">Two passwords that you enter is inconsistent!</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-col [nzSpan]="7" nz-form-label>
          <label nz-form-item-required>Comment</label>
        </div>
        <div nz-col [nzSpan]="12" nz-form-control>
          <nz-input formControlName="comment" [nzRows]="2" [nzType]="'textarea'" [nzPlaceHolder]="'write any thing'" [nzSize]="'large'">
          </nz-input>
          <div nz-form-explain *ngIf="getFormControl('comment').dirty&&getFormControl('comment').hasError('required')">Please write something here!</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-col [nzOffset]="7" [nzSpan]="12" nz-form-control>
          <button nz-button [nzType]="'primary'" [nzSize]="'large'" [disabled]="!validateForm.valid">Submit</button>
          <button nz-button [nzSize]="'large'" (click)="resetForm($event)">Reset</button>
        </div>
      </div>
    </form>`,

  styles: []
})
export class NzDemoFormValidateDynamicComponent implements OnInit {
  validateForm: FormGroup;
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
    }
    console.log(value);
  };

  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsPristine();
    }
  }

  validateConfirmPassword() {
    setTimeout(_ => {
      this.validateForm.controls[ 'passwordConfirmation' ].updateValueAndValidity();
    })
  }

  userNameAsyncValidator = (control: FormControl): any => {
    return Observable.create(function (observer) {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  };

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

  emailValidator = (control: FormControl): { [s: string]: boolean } => {
    const EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if (!control.value) {
      return { required: true }
    } else if (!EMAIL_REGEXP.test(control.value)) {
      return { error: true, email: true };
    }
  };
  passwordConfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls[ 'password' ].value) {
      return { confirm: true, error: true };
    }
  };
  birthDayValidator = (control: FormControl): any => {
    if (new Date(control.value) > new Date()) {
      return { expired: true, error: true }
    }
  };

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      userName            : [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
      email               : [ '', [ this.emailValidator ] ],
      birthDay            : [ '', [ this.birthDayValidator ] ],
      password            : [ '', [ Validators.required ] ],
      passwordConfirmation: [ '', [ this.passwordConfirmationValidator ] ],
      comment             : [ '', [ Validators.required ] ]
    });
  }

  ngOnInit() {
  }
}

