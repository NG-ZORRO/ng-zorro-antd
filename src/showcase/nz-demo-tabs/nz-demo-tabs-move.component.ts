import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-move',
  template: `
    <nz-radio-group [(ngModel)]="nzTabPosition">
      <label nz-radio-button [nzValue]="'top'">
        <span>Horizontal</span>
      </label>
      <label nz-radio-button [nzValue]="'left'">
        <span>Vertical</span>
      </label>
    </nz-radio-group>
    <nz-input-number style="float:right;" [nzMin]="0" [nzMax]="10" [(ngModel)]="selectedIndex"></nz-input-number>
    <nz-tabset
      style="height:220px;"
      [nzTabPosition]="nzTabPosition"
      [(nzSelectedIndex)]="selectedIndex"
      (nzSelectChange)="_console([$event])">
      <nz-tab *ngFor="let tab of tabs"
        (nzSelect)="_console(['select',tab])"
        (nzClick)="_console(['click',tab])"
        (nzDeselect)="_console(['deselect',tab])">
        <ng-template #nzTabHeading>
          {{tab.name}}
        </ng-template>
        <span>{{tab.content}}</span>
      </nz-tab>
    </nz-tabset>`,
  styles  : []
})
export class NzDemoTabsMoveComponent implements OnInit {
  tabs = [];
  nzTabPosition = 'top';
  selectedIndex = 0;

  _console(args) {
    console.log(args);
  }

  ngOnInit() {
    for (let i = 0; i < 11; i++) {
      this.tabs.push({
        name   : `Tab ${i}`,
        content: `Content of tab ${i}`
      });
    }
  }
}

