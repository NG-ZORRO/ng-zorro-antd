import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsCanDeactivateFn } from 'ng-zorro-antd/tabs';
import { Observable } from 'rxjs';

@Component({
  selector: 'nz-demo-tabs-guard',
  template: `
    <nz-tabset [nzCanDeactivate]="canDeactivate">
      <nz-tab *ngFor="let tab of tabs" [nzTitle]="'Tab' + tab"> Content of tab {{ tab }} </nz-tab>
    </nz-tabset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzDemoTabsGuardComponent {
  tabs = [1, 2, 3, 4];
  constructor(private modal: NzModalService) {}

  canDeactivate: NzTabsCanDeactivateFn = (fromIndex: number, toIndex: number) => {
    switch (fromIndex) {
      case 0:
        return toIndex === 1;
      case 1:
        return Promise.resolve(toIndex === 2);
      case 2:
        return this.confirm();
      default:
        return true;
    }
  };

  private confirm(): Observable<boolean> {
    return new Observable(observer => {
      this.modal.confirm({
        nzTitle: 'Are you sure you want to leave this tab?',
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
