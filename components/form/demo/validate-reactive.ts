import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, Observer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-form-validate-reactive',
  imports: [ReactiveFormsModule, NzButtonModule, NzFormModule, NzInputModule],
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSpan]="7" nzRequired>Username</nz-form-label>
        <nz-form-control [nzSpan]="12" nzHasFeedback nzValidatingTip="Validating..." [nzErrorTip]="userErrorTpl">
          <input nz-input formControlName="userName" placeholder="async validate try to write JasonWood" />
          <ng-template #userErrorTpl let-control>
            @if (control.errors?.['required']) {
              Please input your username!
            }
            @if (control.errors?.['duplicated']) {
              The username is redundant!
            }
          </ng-template>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="7" nzRequired>E-mail</nz-form-label>
        <nz-form-control [nzSpan]="12" nzHasFeedback [nzErrorTip]="emailErrorTpl">
          <input nz-input formControlName="email" placeholder="email" type="email" />
          <ng-template #emailErrorTpl let-control>
            @if (control.errors?.['email']) {
              The input is not valid E-mail!
            }
            @if (control.errors?.['required']) {
              Please input your E-mail!
            }
          </ng-template>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="7" nzRequired>Password</nz-form-label>
        <nz-form-control [nzSpan]="12" nzHasFeedback nzErrorTip="Please input your password!">
          <input nz-input type="password" formControlName="password" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="7" nzRequired>Confirm Password</nz-form-label>
        <nz-form-control [nzSpan]="12" nzHasFeedback [nzErrorTip]="passwordErrorTpl">
          <input nz-input type="password" formControlName="confirm" placeholder="confirm your password" />
          <ng-template #passwordErrorTpl let-control>
            @if (control.errors?.['required']) {
              Please confirm your password!
            }
            @if (control.errors?.['confirm']) {
              Password is inconsistent!
            }
          </ng-template>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="7" nzRequired>Comment</nz-form-label>
        <nz-form-control [nzSpan]="12" nzHasFeedback nzErrorTip="Please write something here!">
          <nz-textarea-count [nzMaxCharacterCount]="2000">
            <textarea formControlName="comment" nz-input rows="2" placeholder="write any thing"></textarea>
          </nz-textarea-count>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzOffset]="7" [nzSpan]="12">
          <button nz-button nzType="primary" [disabled]="!validateForm.valid">Submit</button>
          <button nz-button (click)="resetForm($event)">Reset</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styles: `
    [nz-form] {
      max-width: 600px;
    }

    button {
      margin-left: 8px;
    }
  `
})
export class NzDemoFormValidateReactiveComponent implements OnInit, OnDestroy {
  private fb = inject(NonNullableFormBuilder);
  private destroy$ = new Subject<void>();
  validateForm = this.fb.group({
    userName: this.fb.control('', [Validators.required], [this.userNameAsyncValidator]),
    email: this.fb.control('', [Validators.email, Validators.required]),
    password: this.fb.control('', [Validators.required]),
    confirm: this.fb.control('', [this.confirmValidator]),
    comment: this.fb.control('', [Validators.required])
  });

  ngOnInit(): void {
    this.validateForm.controls.password.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.validateForm.controls.confirm.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  userNameAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  }

  confirmValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== control.parent!.value.password) {
      return { confirm: true, error: true };
    }
    return {};
  }
}
