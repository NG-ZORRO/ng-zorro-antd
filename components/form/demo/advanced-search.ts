import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'nz-demo-form-advanced-search',
  template: `
    <form nz-form [formGroup]="validateForm" class="ant-advanced-search-form">
      <div nz-row [nzGutter]="24">
        <div nz-col [nzSpan]="8" *ngFor="let control of controlArray" [style.display]="control.show?'block':'none'">
          <nz-form-item nzFlex>
            <nz-form-label [nzFor]="'field'+control.index">Field {{control.index}}</nz-form-label>
            <nz-form-control>
              <input nz-input placeholder="placeholder" [formControlName]="'field'+control.index" [attr.id]="'field'+control.index">
            </nz-form-control>
          </nz-form-item>
        </div>
      </div>
      <div nz-row>
        <div nz-col [nzSpan]="24" style="text-align: right;">
          <button nz-button [nzType]="'primary'">Search</button>
          <button nz-button (click)="resetForm()">Clear</button>
          <a style="margin-left:8px;font-size:12px;" (click)="toggleCollapse()">
            Collapse
            <i nz-icon [type]="isCollapse?'down':'up'"></i>
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

      [nz-form-label] {
        overflow: visible;
      }

      button {
        margin-left: 8px;
      }
    `
  ]
})
export class NzDemoFormAdvancedSearchComponent implements OnInit {
  validateForm: FormGroup;
  controlArray = [];
  isCollapse = true;

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.isCollapse ? (index < 6) : true;
    });
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    for (let i = 0; i < 10; i++) {
      this.controlArray.push({ index: i, show: i < 6 });
      this.validateForm.addControl(`field${i}`, new FormControl());
    }
  }
}
