import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'nz-demo-form-advanced',
  template: `
    <form nz-form [formGroup]="validateForm" class="ant-advanced-search-form">
      <div nz-row [nzGutter]="40">
        <div nz-col [nzSpan]="8" *ngFor="let control of controlArray" [style.display]="control.show?'block':'none'">
          <div nz-form-item nz-row>
            <div nz-form-label nz-col [nzSpan]="5">
              <label [attr.for]="'field'+control.index">Field {{control.index}}</label>
            </div>
            <div nz-form-control nz-col [nzSpan]="19">
              <nz-input [nzSize]="'large'" [nzPlaceHolder]="'placeholder'" [formControlName]="'field'+control.index" [nzId]="'field'+control.index"></nz-input>
            </div>
          </div>
        </div>
      </div>
      <div nz-row>
        <div nz-col [nzSpan]="24" style="text-align: right;">
          <button nz-button [nzType]="'primary'">Search</button>
          <button nz-button (click)="resetForm()">Clear</button>
          <a style="margin-left:8px;font-size:12px;" (click)="toggleCollapse()">
            Collapse
            <i class="anticon" [class.anticon-down]="isCollapse" [class.anticon-up]="!isCollapse"></i>
          </a>
        </div>
      </div>
    </form>
    <div class="search-result-list">
      Search Result List
    </div>
  `,

  styles: [
      `
      .ant-advanced-search-form {
        padding: 24px;
        background: #fbfbfb;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
      }

      .search-result-list {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 200px;
        text-align: center;
        padding-top: 80px;
      }
    `
  ]
})
export class NzDemoFormAdvancedComponent implements OnInit {
  validateForm: FormGroup;
  controlArray = [];
  isCollapse = true;

  toggleCollapse() {
    this.isCollapse = !this.isCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.isCollapse ? (index < 6) : true;
    })
  }

  resetForm() {
    this.validateForm.reset();
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({});

    for (let i = 0; i < 10; i++) {
      this.controlArray.push({ index: i, show: i < 6 });
      this.validateForm.addControl(`field${i}`, new FormControl());
    }
  }
}

