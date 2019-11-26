import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'nz-demo-tabs-guard',
  template: `
    <nz-tabset [nzCanChange]="canChange">
      <nz-tab nzTitle="Tab 1">
        Content of Tab Pane 1
      </nz-tab>
      <nz-tab nzTitle="Tab 2">
        Content of Tab Pane 2
      </nz-tab>
      <nz-tab nzTitle="Tab 3" [nzCanDeactivate]="canDeactivate">
        Content of Tab Pane 3
      </nz-tab>
    </nz-tabset>
  `
})
export class NzDemoTabsGuardComponent {
  constructor(private modal: NzModalService) {}

  canChange = (fromIndex: number, toIndex: number) => {
    console.log(fromIndex, toIndex);
    if (toIndex === 0) {
      return true;
    }

    return this.confirm();
  };

  canDeactivate = () => this.confirm();

  private confirm(): Observable<boolean> {
    return new Observable(observer => {
      this.modal.confirm({
        nzTitle: '确定离开当前标签？',
        nzOnOk: () => {
          observer.next(true);
          observer.complete();
        },
        nzOnCancel: () => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
}
