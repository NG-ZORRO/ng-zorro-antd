import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'nz-demo-form-dynamic-form-item',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item *ngFor="let control of controlArray;let i = index">
        <nz-form-label [nzXs]="24" [nzSm]="4" *ngIf="i==0" [nzFor]="control.controlInstance">Passengers</nz-form-label>
        <nz-form-control [nzXs]="24" [nzSm]="20" [nzOffset]="i==0?0:4">
          <input nz-input style="width: 60%; margin-right:8px;" placeholder="placeholder" [attr.id]="control.id" [formControlName]="control.controlInstance">
          <i nz-icon type="minus-circle-o" class="dynamic-delete-button" (click)="removeField(control,$event)"></i>
          <nz-form-explain *ngIf="getFormControl(control.controlInstance)?.dirty&&getFormControl(control.controlInstance)?.hasError('required')">
            Please input passenger's name or delete this field.
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzXs]="{span:24,offset:0}" [nzSm]="{span:20,offset:4}">
          <button nz-button nzType="dashed" style="width:60%" (click)="addField($event)"><i nz-icon type="plus"></i> Add field</button>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzXs]="{span:24,offset:0}" [nzSm]="{span:20,offset:4}">
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
        transition: all .3s;
      }

      .dynamic-delete-button:hover {
        color: #777;
      }

      [nz-form] {
        max-width: 600px;
      }
    `
  ]
})
export class NzDemoFormDynamicFormItemComponent implements OnInit {
  validateForm: FormGroup;
  controlArray: Array<{ id: number, controlInstance: string }> = [];

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = (this.controlArray.length > 0) ? this.controlArray[ this.controlArray.length - 1 ].id + 1 : 0;

    const control = {
      id,
      controlInstance: `passenger${id}`
    };
    const index = this.controlArray.push(control);
    console.log(this.controlArray[ this.controlArray.length - 1 ]);
    this.validateForm.addControl(this.controlArray[ index - 1 ].controlInstance, new FormControl(null, Validators.required));
  }

  removeField(i: { id: number, controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.controlArray.length > 1) {
      const index = this.controlArray.indexOf(i);
      this.controlArray.splice(index, 1);
      console.log(this.controlArray);
      this.validateForm.removeControl(i.controlInstance);
    }
  }

  getFormControl(name: string): AbstractControl {
    return this.validateForm.controls[ name ];
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    console.log(this.validateForm.value);
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    this.addField();
  }
}
