import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTabPosition, NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-tabs-slide',
  imports: [FormsModule, NzInputNumberModule, NzRadioModule, NzTabsModule],
  template: `
    <nz-radio-group [(ngModel)]="nzTabPosition" style="margin-bottom: 8px;">
      <label nz-radio-button nzValue="top">Horizontal</label>
      <label nz-radio-button nzValue="left">Vertical</label>
    </nz-radio-group>
    <nz-input-number style="float:right;" [nzMin]="0" [nzMax]="29" [(ngModel)]="selectedIndex" />

    <nz-tabs
      style="height:220px;"
      [nzTabPosition]="nzTabPosition()"
      [(nzSelectedIndex)]="selectedIndex"
      (nzSelectChange)="log([$event])"
    >
      @for (tab of tabs(); track tab) {
        <nz-tab
          [nzTitle]="tab.name"
          [nzDisabled]="tab.disabled"
          (nzSelect)="log(['select', tab])"
          (nzClick)="log(['click', tab])"
          (nzContextmenu)="log(['contextmenu', tab])"
          (nzDeselect)="log(['deselect', tab])"
        >
          {{ tab.content }}
        </nz-tab>
      }
    </nz-tabs>
  `
})
export class NzDemoTabsSlideComponent implements OnInit {
  readonly tabs = signal<Array<{ name: string; content: string; disabled: boolean }>>([]);
  readonly nzTabPosition = signal<NzTabPosition>('top');
  readonly selectedIndex = signal(27);

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  log(args: any[]): void {
    console.log(args);
  }

  ngOnInit(): void {
    const tabs: Array<{ name: string; content: string; disabled: boolean }> = [];
    for (let i = 0; i < 30; i++) {
      tabs.push({
        name: `Tab ${i}`,
        disabled: i === 28,
        content: `Content of tab ${i}`
      });
    }
    this.tabs.set(tabs);
  }
}
