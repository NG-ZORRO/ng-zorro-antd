import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-slide',
  template: `
    <nz-radio-group [(ngModel)]="nzTabPosition">
      <label nz-radio-button [nzValue]="'top'">Horizontal</label>
      <label nz-radio-button [nzValue]="'left'">Vertical</label>
    </nz-radio-group>
    <nz-input-number style="float:right;" [nzMin]="0" [nzMax]="10" [(ngModel)]="selectedIndex"></nz-input-number>
    <nz-tabset style="height:220px;" [nzTabPosition]="nzTabPosition" [(nzSelectedIndex)]="selectedIndex" (nzSelectChange)="log([$event])">
      <nz-tab
        *ngFor="let tab of tabs"
        [nzTitle]="tab.name"
        (nzSelect)="log(['select', tab])"
        (nzClick)="log(['click', tab])"
        (nzDeselect)="log(['deselect', tab])"
      >
        {{ tab.content }}
      </nz-tab>
    </nz-tabset>
  `
})
export class NzDemoTabsSlideComponent implements OnInit {
  tabs: Array<{ name: string; content: string }> = [];
  nzTabPosition = 'top';
  selectedIndex = 0;

  /* tslint:disable-next-line:no-any */
  log(args: any[]): void {
    console.log(args);
  }

  ngOnInit(): void {
    for (let i = 0; i < 11; i++) {
      this.tabs.push({
        name: `Tab ${i}`,
        content: `Content of tab ${i}`
      });
    }
  }
}
