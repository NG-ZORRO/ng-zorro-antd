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
      <div nz-form-item nz-row *ngFor="let control of controlArray;let i = index">
        <div nz-form-label nz-col [nzXs]="24" [nzSm]="4" *ngIf="i==0">
          <label [attr.for]="control.controlInstance">Passengers</label>
        </div>
        <div nz-form-control nz-col [nzXs]="24" [nzSm]="20" [nzOffset]="i==0?0:4">
          <input nz-input style="width: 60%; margin-right:8px;" placeholder="placeholder" [attr.id]="control.id" [formControlName]="control.controlInstance">
          <i class="anticon anticon-minus-circle-o dynamic-delete-button" (click)="removeField(control,$event)"></i>
          <div nz-form-explain *ngIf="getFormControl(control.controlInstance)?.dirty&&getFormControl(control.controlInstance)?.hasError('required')">
            Please input passenger's name or delete this field.
          </div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-control nz-col [nzXs]="{span:24,offset:0}" [nzSm]="{span:20,offset:4}">
          <button nz-button nzType="dashed" style="width:60%" (click)="addField($event)">
            <i class="anticon anticon-plus"></i> Add field
          </button>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-control nz-col [nzXs]="{span:24,offset:0}" [nzSm]="{span:20,offset:4}">
          <button nz-button nzType="primary">Submit</button>
        </div>
      </div>
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
