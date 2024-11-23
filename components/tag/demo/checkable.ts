import { Component } from '@angular/core';

import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'nz-demo-tag-checkable',
  standalone: true,
  imports: [NzTagModule],
  template: `
    <nz-tag nzMode="checkable" [nzChecked]="true" (nzCheckedChange)="checkChange($event)">Tag1</nz-tag>
    <nz-tag nzMode="checkable" [nzChecked]="true" (nzCheckedChange)="checkChange($event)">Tag2</nz-tag>
    <nz-tag nzMode="checkable" [nzChecked]="true" (nzCheckedChange)="checkChange($event)">Tag3</nz-tag>
  `
})
export class NzDemoTagCheckableComponent {
  checkChange(e: boolean): void {
    console.log(e);
  }
}
