import { Component, inject, OnInit } from '@angular/core';
import { FormArray, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-form-dynamic-form-item',
  imports: [ReactiveFormsModule, NzButtonModule, NzFormModule, NzIconModule, NzInputModule],
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <ng-container formArrayName="names">
        @for (control of listOfControl.controls; track control; let i = $index) {
          <nz-form-item>
            @if (i === 0) {
              <nz-form-label [nzXs]="24" [nzSm]="4" [nzFor]="'passenger' + i"> Passengers </nz-form-label>
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
                [attr.id]="'passenger' + i"
                [formControlName]="i"
              />
              @if (listOfControl.controls.length > 1) {
                <nz-icon nzType="minus-circle-o" class="dynamic-delete-button" (click)="removeField(i, $event)" />
              }
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
            <button nz-button nzType="dashed" class="add-button" (click)="addHeadField($event)">
              <nz-icon nzType="plus" />
              Add field at head
            </button>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-control [nzXs]="{ span: 24, offset: 0 }" [nzSm]="{ span: 20, offset: 4 }">
            <button nz-button nzType="primary">Submit</button>
          </nz-form-control>
        </nz-form-item>
      </ng-container>
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
  validateForm = this.fb.group({
    names: this.fb.array([])
  });
  listOfControl = this.validateForm.get('names') as FormArray;

  addField(e?: MouseEvent): void {
    e?.preventDefault();
    this.listOfControl.push(this.fb.control('', Validators.required));
  }

  addHeadField(e?: MouseEvent): void {
    e?.preventDefault();
    this.listOfControl.insert(0, this.fb.control('The head item', Validators.required));
  }

  removeField(index: number, e: MouseEvent): void {
    e.preventDefault();
    this.listOfControl.removeAt(index);
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.listOfControl.controls).forEach(control => {
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
