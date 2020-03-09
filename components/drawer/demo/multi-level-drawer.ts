import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-drawer-multi-level-drawer',
  template: `
    <button nz-button nzType="primary" (click)="open()">New Cookbook</button>
    <nz-drawer
      [nzClosable]="false"
      [nzOffsetX]="childrenVisible ? 180 : 0"
      [nzWidth]="320"
      [nzVisible]="visible"
      nzTitle="Cookbook"
      (nzOnClose)="close()"
    >
      <form nz-form>
        <div nz-row>
          <div nz-col nzSpan="24">
            <nz-form-item>
              <nz-form-label>Name</nz-form-label>
              <nz-form-control>
                <input nz-input placeholder="please enter cookbook name" />
              </nz-form-control>
            </nz-form-item>
          </div>
        </div>
        <div nz-row>
          <div nz-col nzSpan="24">
            <nz-form-item>
              <nz-form-label>Food</nz-form-label>
              <nz-form-control>
                <nz-tag>potato</nz-tag>
                <nz-tag>eggplant</nz-tag>
                <nz-tag (click)="openChildren()">+</nz-tag>
              </nz-form-control>
            </nz-form-item>
          </div>
        </div>
      </form>
      <nz-drawer [nzClosable]="false" [nzVisible]="childrenVisible" nzTitle="Food" (nzOnClose)="closeChildren()">
        <nz-list [nzDataSource]="vegetables" [nzRenderItem]="item">
          <ng-template #item let-item>
            <nz-list-item [nzContent]="item"></nz-list-item>
          </ng-template>
        </nz-list>
      </nz-drawer>
    </nz-drawer>
  `
})
export class NzDemoDrawerMultiLevelDrawerComponent {
  visible = false;
  childrenVisible = false;

  vegetables = ['asparagus', 'bamboo', 'potato', 'carrot', 'cilantro', 'potato', 'eggplant'];

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  openChildren(): void {
    this.childrenVisible = true;
  }

  closeChildren(): void {
    this.childrenVisible = false;
  }
}
