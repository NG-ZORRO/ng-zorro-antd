import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTabsModule, type NzIndicator } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-tabs-indicator',
  imports: [NzTabsModule, NzRadioModule, FormsModule],
  template: `
    <nz-radio-group nzButtonStyle="solid" [(ngModel)]="positionIndicator">
      <label nz-radio-button nzValue="start">Start</label>
      <label nz-radio-button nzValue="center">Center</label>
      <label nz-radio-button nzValue="end">End</label>
    </nz-radio-group>
    <nz-tabs [nzIndicator]="indicator()">
      <nz-tab nzTitle="Tab 1">Content of Tab Pane 1</nz-tab>
      <nz-tab nzTitle="Tab 2">Content of Tab Pane 2</nz-tab>
      <nz-tab nzTitle="Tab 3">Content of Tab Pane 3</nz-tab>
    </nz-tabs>
  `
})
export class NzDemoTabsIndicatorComponent {
  readonly positionIndicator = signal<'start' | 'end' | 'center'>('start');

  protected readonly indicator = computed<NzIndicator>(() => ({
    size: origin => origin - 25,
    align: this.positionIndicator()
  }));
}
