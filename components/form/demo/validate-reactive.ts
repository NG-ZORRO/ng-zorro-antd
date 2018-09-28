import { Component } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'nz-demo-form-validate-reactive',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm($event,validateForm.value)">
      <nz-form-item>
        <nz-form-label [nzSpan]="7" nzRequired>Username</nz-form-label>
        <nz-form-control [nzSpan]="12" nzHasFeedback>
          <input nz-input formControlName="userName" placeholder="async validate try to write JasonWood">
          <nz-form-explain *ngIf="validateForm.get('userName').dirty && validateForm.get('userName').errors || validateForm.get('userName').pending ">
            <ng-container *ngIf="validateForm.get('userName').hasError('required')">
              Please input your username!
            </ng-container>
            <ng-container *ngIf="validateForm.get('userName').hasError('duplicated')">
              The username is redundant!
            </ng-container>
            <ng-container *ngIf="validateForm.get('userName').pending">
              Validating...
            </ng-container>
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="7" nzRequired>E-mail</nz-form-label>
        <nz-form-control [nzSpan]="12" nzHasFeedback>
          <input nz-input formControlName="email" placeholder="email" type="email">
          <nz-form-explain *ngIf="validateForm.get('email').dirty&&validateForm.get('email').errors">
            <ng-container *ngIf="validateForm.get('email').hasError('email')">
              The input is not valid E-mail!
            </ng-container>
            <ng-container *ngIf="validateForm.get('email').hasError('required')">
              Please input your E-mail!
            </ng-container>
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="7" nzRequired>Password</nz-form-label>
        <div>
          <nz-form-control [nzSpan]="12" nzHasFeedback>
            <input nz-input type="password" formControlName="password" (ngModelChange)="validateConfirmPassword()">
            <nz-form-explain *ngIf="validateForm.get('password').dirty&&validateForm.get('password').hasError('required')">Please input your password!</nz-form-explain>
          </nz-form-control>
        </div>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="7" nzRequired>Confirm Password</nz-form-label>
        <nz-form-control [nzSpan]="12" nzHasFeedback>
          <input nz-input type="password" formControlName="confirm" placeholder="confirm your password">
          <nz-form-explain *ngIf="validateForm.get('confirm').dirty&&validateForm.get('confirm').errors">
            <ng-container *ngIf="validateForm.get('confirm').hasError('required')">
              Please confirm your password!
            </ng-container>
            <ng-container *ngIf="validateForm.get('confirm').hasError('confirm')">
              Password is inconsistent!
            </ng-container>
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="7" nzRequired>Comment</nz-form-label>
        <nz-form-control [nzSpan]="12" >
          <textarea formControlName="comment" nz-input rows="2" placeholder="write any thing"></textarea>
          <nz-form-explain *ngIf="validateForm.get('comment').dirty&&validateForm.get('comment').hasError('required')">Please write something here!</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzOffset]="7" [nzSpan]="12">
          <button nz-button nzType="primary" [disabled]="!validateForm.valid">Submit</button>
          <button nz-button (click)="resetForm($event)">Reset</button>
        </nz-form-control>
      </nz-form-item>
    </form>`,

  styles: [
    `
      [nz-form] {
        max-width: 600px;
      }
      button {
        margin-left: 8px;
      }
    `
  ]
})
export class NzDemoFormValidateReactiveComponent {
  validateForm: FormGroup;
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
    console.log(value);
  };

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsPristine();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    setTimeout(() => {
      if (control.value === 'JasonWood') {
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    }, 1000);
  });

  confirmValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      userName: [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
      email   : [ '', [ Validators.email ] ],
      password: [ '', [ Validators.required ] ],
      confirm : [ '', [ this.confirmValidator ] ],
      comment : [ '', [ Validators.required ] ]
    });
  }
}
