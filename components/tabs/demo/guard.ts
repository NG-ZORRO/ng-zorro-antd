import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsCanDeactivateFn, NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-tabs-guard',
  imports: [NzTabsModule, NzModalModule],
  template: `
    <nz-tabs [nzCanDeactivate]="canDeactivate">
      @for (tab of tabs; track tab) {
        <nz-tab [nzTitle]="'Tab' + tab">Content of tab {{ tab }}</nz-tab>
      }
    </nz-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzDemoTabsGuardComponent {
  tabs = [1, 2, 3, 4];
  private modalService = inject(NzModalService);

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
      this.modalService.confirm({
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
