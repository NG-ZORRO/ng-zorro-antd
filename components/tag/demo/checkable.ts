import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tag-checkable',
  template: `
    <nz-checkable-tag [nzChecked]="check1" (nzChange)="check1=$event">Tag1</nz-checkable-tag>
    <nz-checkable-tag [nzChecked]="check2" (nzChange)="check2=$event">Tag2</nz-checkable-tag>
    <nz-checkable-tag [nzChecked]="check3" (nzChange)="check3=$event">Tag3</nz-checkable-tag>
  `,
  styles  : []
})
export class NzDemoTagCheckableComponent {
  check1 = true;
  check2 = true;
  check3 = true;
}
