import { Component } from '@angular/core';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'nz-demo-badge-ribbon',
  imports: [NzBadgeModule, NzCardModule],
  template: `
    <nz-ribbon nzText="Hippies">
      <nz-card nzTitle="Pushes open the window" nzSize="small"> And raises the spyglass. </nz-card>
    </nz-ribbon>
    <br />
    <nz-ribbon nzText="Hippies" nzColor="pink">
      <nz-card nzTitle="Pushes open the window" nzSize="small"> And raises the spyglass. </nz-card>
    </nz-ribbon>
    <br />
    <nz-ribbon nzText="Hippies" nzColor="red">
      <nz-card nzTitle="Pushes open the window" nzSize="small"> And raises the spyglass. </nz-card>
    </nz-ribbon>
    <br />
    <nz-ribbon nzText="Hippies" nzColor="cyan">
      <nz-card nzTitle="Pushes open the window" nzSize="small"> And raises the spyglass. </nz-card>
    </nz-ribbon>
    <br />
    <nz-ribbon nzText="Hippies" nzColor="green">
      <nz-card nzTitle="Pushes open the window" nzSize="small"> And raises the spyglass. </nz-card>
    </nz-ribbon>
    <br />
    <nz-ribbon nzText="Hippies" nzColor="purple">
      <nz-card nzTitle="Pushes open the window" nzSize="small"> And raises the spyglass. </nz-card>
    </nz-ribbon>
    <br />
    <nz-ribbon nzText="Hippies" nzColor="volcano">
      <nz-card nzTitle="Pushes open the window" nzSize="small"> And raises the spyglass. </nz-card>
    </nz-ribbon>
    <br />
    <nz-ribbon nzText="Hippies" nzColor="magenta">
      <nz-card nzTitle="Pushes open the window" nzSize="small"> And raises the spyglass. </nz-card>
    </nz-ribbon>
  `
})
export class NzDemoBadgeRibbonComponent {}
