import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'nz-demo-form-dynamic',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="_submitForm()">
      <div nz-form-item nz-row *ngFor="let control of controlArray;let i = index">
        <div nz-form-label nz-col [nzSpan]="4" *ngIf="i==0">
          <label [attr.for]="'passenger'+control">Passengers</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="20" [nzOffset]="i==0?0:4" [nzValidateStatus]="getFormControl('passenger'+control)">
          <nz-input style="width: 60%; margin-right:8px;" [nzSize]="'large'" [nzPlaceHolder]="'placeholder'" [formControlName]="'passenger'+control" [nzId]="'passenger'+control"></nz-input>
          <i class="anticon anticon-minus-circle-o dynamic-delete-button" (click)="removeField(control,$event)"></i>
          <div nz-form-explain *ngIf="getFormControl('passenger'+control)?.dirty&&getFormControl('passenger'+control)?.hasError('required')">Please input passenger's name or delete this field.</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-control nz-col [nzSpan]="20" [nzOffset]="4">
          <button nz-button [nzType]="'dashed'" [nzSize]="'large'" style="width:60%" (click)="addField($event)">
            <i class="anticon anticon-plus"></i>
            <span> Add field</span>
          </button>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-control nz-col [nzSpan]="20" [nzOffset]="4">
          <button nz-button [nzType]="'primary'" [nzSize]="'large'">Submit</button>
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
    `
  ]
})
export class NzDemoFormDynamicComponent implements OnInit {
  validateForm: FormGroup;
  controlArray = [];
  index = 0;

  addField(e?: MouseEvent) {
    if (e) {
      e.preventDefault();
    }
    this.controlArray.push(this.index);
    this.validateForm.addControl(`passenger${this.index}`, new FormControl(null, Validators.required));
    this.index++;
  }

  removeField(i, e: MouseEvent) {
    e.preventDefault();
    if (this.controlArray.length > 1) {
      this.controlArray.splice(i, 1);
      this.validateForm.removeControl(`passenger${this.index}`);
    }
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
    console.log(this.validateForm.value);
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({});
    this.addField();
  }
}

