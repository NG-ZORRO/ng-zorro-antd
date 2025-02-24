import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormRecord, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-form-dynamic-form-item',
  imports: [ReactiveFormsModule, NzButtonModule, NzFormModule, NzIconModule, NzInputModule],
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      @for (control of listOfControl; track control; let i = $index) {
        <nz-form-item>
          @if (i === 0) {
            <nz-form-label [nzXs]="24" [nzSm]="4" [nzFor]="control.controlInstance"> Passengers </nz-form-label>
          }
          <nz-form-control
            [nzXs]="24"
            [nzSm]="20"
            [nzOffset]="i === 0 ? 0 : 4"
            nzErrorTip="Please input passenger's name or delete this field."
          >
            <input
              class="passenger-input"
              nz-input
              placeholder="placeholder"
              [attr.id]="control.id"
              [formControlName]="control.controlInstance"
            />
            <nz-icon nzType="minus-circle-o" class="dynamic-delete-button" (click)="removeField(control, $event)" />
          </nz-form-control>
        </nz-form-item>
      }

      <nz-form-item>
        <nz-form-control [nzXs]="{ span: 24, offset: 0 }" [nzSm]="{ span: 20, offset: 4 }">
          <button nz-button nzType="dashed" class="add-button" (click)="addField($event)">
            <nz-icon nzType="plus" />
            Add field
          </button>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzXs]="{ span: 24, offset: 0 }" [nzSm]="{ span: 20, offset: 4 }">
          <button nz-button nzType="primary">Submit</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styles: [
    `
      .dynamic-delete-button {
        cursor: pointer;
        position: relative;
        top: 4px;
        font-size: 24px;
        color: #999;
        transition: all 0.3s;
      }

      .dynamic-delete-button:hover {
        color: #777;
      }

      .passenger-input {
        width: 60%;
        margin-right: 8px;
      }

      [nz-form] {
        max-width: 600px;
      }

      .add-button {
        width: 60%;
      }
    `
  ]
})
export class NzDemoFormDynamicFormItemComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  validateForm: FormRecord<FormControl<string>> = this.fb.record({});
  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  addField(e?: MouseEvent): void {
    e?.preventDefault();

    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `passenger${id}`
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      this.fb.control('', Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    this.addField();
  }
}
