import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-drawer-from-drawer',
  template: `
    <button nz-button nzType="primary" (click)="open()">Create</button>
    <nz-drawer
      [nzBodyStyle]="{ height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' }"
      [nzMaskClosable]="false"
      [nzWidth]="720"
      [nzVisible]="visible"
      nzTitle="Create"
      (nzOnClose)="close()"
    >
      <form nz-form>
        <div nz-row nzGutter="8">
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
                <nz-input-group nzAddOnBefore="http://" nzAddOnAfter=".com">
                  <input type="text" nz-input placeholder="please enter url" />
                </nz-input-group>
              </nz-form-control>
            </nz-form-item>
          </div>
        </div>
        <div nz-row nzGutter="8">
          <div nz-col nzSpan="12">
            <nz-form-item>
              <nz-form-label>Owner</nz-form-label>
              <nz-form-control>
                <nz-select nzPlaceHolder="Please select an owner"></nz-select>
              </nz-form-control>
            </nz-form-item>
          </div>
          <div nz-col nzSpan="12">
            <nz-form-item>
              <nz-form-label>Type</nz-form-label>
              <nz-form-control>
                <nz-select nzPlaceHolder="Please choose the type"></nz-select>
              </nz-form-control>
            </nz-form-item>
          </div>
        </div>
        <div nz-row nzGutter="8">
          <div nz-col nzSpan="12">
            <nz-form-item>
              <nz-form-label>Approver</nz-form-label>
              <nz-form-control>
                <nz-select nzPlaceHolder="Please choose the approver"></nz-select>
              </nz-form-control>
            </nz-form-item>
          </div>
          <div nz-col nzSpan="12">
            <nz-form-item>
              <nz-form-label>DateTime</nz-form-label>
              <nz-form-control>
                <nz-range-picker></nz-range-picker>
              </nz-form-control>
            </nz-form-item>
          </div>
        </div>
        <div nz-row nzGutter="8">
          <div nz-col nzSpan="24">
            <nz-form-item>
              <nz-form-label>Description</nz-form-label>
              <nz-form-control>
                <textarea nz-input placeholder="please enter url description" [nzAutosize]="{ minRows: 4, maxRows: 4 }"></textarea>
              </nz-form-control>
            </nz-form-item>
          </div>
        </div>
      </form>
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
