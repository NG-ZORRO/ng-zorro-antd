import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-drawer-from-drawer',
  imports: [
    NzButtonModule,
    NzDrawerModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    CdkTextareaAutosize
  ],
  template: `
    <button nz-button nzType="primary" (click)="open()">Create</button>
    <nz-drawer
      [nzBodyStyle]="{ overflow: 'auto' }"
      [nzMaskClosable]="false"
      [nzWidth]="720"
      [nzVisible]="visible"
      nzTitle="Create"
      [nzFooter]="footerTpl"
      (nzOnClose)="close()"
    >
      <form nz-form *nzDrawerContent>
        <div nz-row [nzGutter]="8">
          <div nz-col nzSpan="12">
            <nz-form-item>
              <nz-form-label>Name</nz-form-label>
              <nz-form-control>
                <input nz-input placeholder="please enter user name" />
              </nz-form-control>
            </nz-form-item>
          </div>
          <div nz-col nzSpan="12">
            <nz-form-item>
              <nz-form-label>Url</nz-form-label>
              <nz-form-control>
                <nz-input-wrapper nzAddonBefore="http://" nzAddonAfter=".com">
                  <input type="text" nz-input placeholder="please enter url" />
                </nz-input-wrapper>
              </nz-form-control>
            </nz-form-item>
          </div>
        </div>
        <div nz-row [nzGutter]="8">
          <div nz-col nzSpan="12">
            <nz-form-item>
              <nz-form-label>Owner</nz-form-label>
              <nz-form-control>
                <nz-select nzPlaceHolder="Please select an owner" />
              </nz-form-control>
            </nz-form-item>
          </div>
          <div nz-col nzSpan="12">
            <nz-form-item>
              <nz-form-label>Type</nz-form-label>
              <nz-form-control>
                <nz-select nzPlaceHolder="Please choose the type" />
              </nz-form-control>
            </nz-form-item>
          </div>
        </div>
        <div nz-row [nzGutter]="8">
          <div nz-col nzSpan="12">
            <nz-form-item>
              <nz-form-label>Approver</nz-form-label>
              <nz-form-control>
                <nz-select nzPlaceHolder="Please choose the approver" />
              </nz-form-control>
            </nz-form-item>
          </div>
          <div nz-col nzSpan="12">
            <nz-form-item>
              <nz-form-label>DateTime</nz-form-label>
              <nz-form-control>
                <nz-range-picker />
              </nz-form-control>
            </nz-form-item>
          </div>
        </div>
        <div nz-row [nzGutter]="8">
          <div nz-col nzSpan="24">
            <nz-form-item>
              <nz-form-label>Description</nz-form-label>
              <nz-form-control>
                <textarea
                  nz-input
                  placeholder="please enter url description"
                  cdkTextareaAutosize
                  cdkAutosizeMinRows="4"
                  cdkAutosizeMaxRows="4"
                ></textarea>
              </nz-form-control>
            </nz-form-item>
          </div>
        </div>
      </form>

      <ng-template #footerTpl>
        <div style="float: right">
          <button nz-button style="margin-right: 8px;" (click)="close()">Cancel</button>
          <button nz-button nzType="primary" (click)="close()">Submit</button>
        </div>
      </ng-template>
    </nz-drawer>
  `
})
export class NzDemoDrawerFromDrawerComponent {
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
