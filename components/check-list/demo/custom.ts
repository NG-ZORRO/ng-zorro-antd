import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckListModule, NzItemProps } from 'ng-zorro-antd/check-list';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-check-list-custom',
  imports: [
    NzCheckListModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzInputModule,
    NzSegmentedModule
  ],
  template: `
    <div style="position: relative;">
      <form nz-form nzLayout="vertical" [formGroup]="form">
        <nz-form-item>
          <nz-form-label>nzShow</nz-form-label>
          <nz-form-control>
            <label nz-checkbox formControlName="nzShow"></label>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label>nzVisible</nz-form-label>
          <nz-form-control>
            <label nz-checkbox formControlName="nzVisible"></label>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label>nzProgress</nz-form-label>
          <nz-form-control>
            <label nz-checkbox formControlName="nzProgress"></label>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label>nzIndex</nz-form-label>
          <nz-form-control>
            <nz-segmented [nzOptions]="options" (nzValueChange)="handleIndexChange($event)"></nz-segmented>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label>nzTriggerRender</nz-form-label>
          <nz-form-control>
            <input nz-input formControlName="nzTriggerRender" />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label>nzTitle</nz-form-label>
          <nz-form-control>
            <input nz-input formControlName="nzTitle" />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label>nzFooter</nz-form-label>
          <nz-form-control>
            <input nz-input formControlName="nzFooter" />
          </nz-form-control>
        </nz-form-item>
      </form>

      <nz-check-list
        [nzShow]="form.controls.nzShow.value"
        [nzItems]="nzItems"
        [nzVisible]="form.controls.nzVisible.value"
        [nzIndex]="form.controls.nzIndex.value || 0"
        [nzProgress]="form.controls.nzProgress.value"
        [nzTriggerRender]="form.controls.nzTriggerRender.value"
        [nzTitle]="form.controls.nzTitle.value"
        [nzFooter]="form.controls.nzFooter.value"
        (nzHideCallback)="hideCancel($event)"
      ></nz-check-list>
    </div>
  `,
  styles: [
    `
      form {
        width: 300px;
      }
      nz-check-list {
        position: absolute;
      }
    `
  ]
})
export class NzDemoCheckListCustomComponent {
  private fb = inject(NonNullableFormBuilder);
  nzItems: NzItemProps[] = [
    {
      description: 'step 1',
      onClick: () => {
        console.log('step 1');
      }
    },
    {
      description: 'Step 2',
      onClick: () => {
        console.log('step 1');
      }
    },
    {
      description: 'Step 3',
      onClick: () => {
        console.log('step 3');
      }
    },
    {
      description: 'Step 4',
      onClick: () => {
        console.log('step 4');
      }
    },
    {
      description: 'ng-zorro-antd is an Angular UI component library that follows the Ant Design design specification',
      onClick: () => {
        console.log('step 5');
      }
    }
  ];
  options = [0, 1, 2, 3, 4, 5, 6];
  form = this.fb.group({
    nzProgress: true,
    nzShow: true,
    nzVisible: true,
    nzIndex: 0,
    nzTriggerRender: 'Open List',
    nzTitle: 'Customize task lists',
    nzFooter: 'Custom Footer Name'
  });

  handleIndexChange(num: number | string): void {
    this.form.controls.nzIndex.patchValue(Number(num));
  }

  hideCancel(check: boolean): void {
    console.log(check);
    this.form.controls.nzShow.patchValue(false);
    this.form.controls.nzVisible.patchValue(false);
  }
}
