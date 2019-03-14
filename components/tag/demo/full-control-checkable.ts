import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tag-full-control-checkable',
  template: `
    <nz-tag nzMode="checkable" [(nzChecked)]="checked" [nzControl]="true" (nzCheckedChange)="checkChange($event)">Tag
    </nz-tag>
    <nz-switch [(ngModel)]="checked"></nz-switch>
  `
})
export class NzDemoTagFullControlCheckableComponent {
  checked = false;
  loading = false;

  checkChange(e: boolean): void {
    console.log(e);
  }

  clickTag(): void {
    this.checked = !this.checked;
  }
}
