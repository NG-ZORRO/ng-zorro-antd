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
    <form nz-form nzLayout="vertical" [formGroup]="form">
      <nz-form-item>
        <nz-form-label>Visible</nz-form-label>
        <nz-form-control>
          <label nz-checkbox formControlName="nzVisible"></label>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Show Progress</nz-form-label>
        <nz-form-control>
          <label nz-checkbox formControlName="nzProgress"></label>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Index</nz-form-label>
        <nz-form-control>
          <nz-segmented [nzOptions]="options" (nzValueChange)="handleIndexChange($event)" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Trigger Render</nz-form-label>
        <nz-form-control>
          <input nz-input formControlName="nzTriggerRender" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Title</nz-form-label>
        <nz-form-control>
          <input nz-input formControlName="nzTitle" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Footer</nz-form-label>
        <nz-form-control>
          <input nz-input formControlName="nzFooter" />
        </nz-form-control>
      </nz-form-item>
    </form>

    <nz-check-list
      [nzItems]="nzItems"
      [nzVisible]="form.controls.nzVisible.value"
      [nzIndex]="form.controls.nzIndex.value || 0"
      [nzProgress]="form.controls.nzProgress.value"
      [nzTriggerRender]="form.controls.nzTriggerRender.value"
      [nzTitle]="form.controls.nzTitle.value"
      [nzFooter]="form.controls.nzFooter.value"
      (nzHide)="hideCancel($event)"
    />
  `,
  styles: `
    :host {
      position: relative;
    }
    form {
      width: 300px;
    }
    nz-check-list {
      position: absolute;
    }
  `
})
export class NzDemoCheckListCustomComponent {
  private fb = inject(NonNullableFormBuilder);
  readonly nzItems: NzItemProps[] = [
    {
      description: 'step 1',
      onClick: () => console.log('step 1')
    },
    {
      description: 'Step 2',
      onClick: () => console.log('step 1')
    },
    {
      description: 'Step 3',
      onClick: () => console.log('step 3')
    },
    {
      description: 'Step 4',
      onClick: () => console.log('step 4')
    }
  ];
  readonly options = this.nzItems.map((_, index) => index).concat(this.nzItems.length + 1);
  form = this.fb.group({
    nzProgress: true,
    nzVisible: false,
    nzIndex: 0,
    nzTriggerRender: 'Open List',
    nzTitle: 'Customize task lists',
    nzFooter: 'Custom Footer Name'
  });

  handleIndexChange(num: number | string): void {
    this.form.controls.nzIndex.setValue(Number(num));
  }

  hideCancel(check: boolean): void {
    console.log(check);
    this.form.controls.nzVisible.setValue(false);
  }
}
