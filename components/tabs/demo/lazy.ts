/* declarations: NzDemoTabContentLazyComponent,NzDemoTabContentEagerlyComponent */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-lazy',
  template: `
    <nz-tabset>
      <nz-tab nzTitle="Tab Eagerly 1">
        <nz-demo-tab-content-eagerly></nz-demo-tab-content-eagerly>
      </nz-tab>
      <nz-tab nzTitle="Tab Eagerly 2">
        <nz-demo-tab-content-eagerly></nz-demo-tab-content-eagerly>
      </nz-tab>
      <nz-tab nzTitle="Tab Lazy 1">
        <ng-template nz-tab>
          <nz-demo-tab-content-lazy></nz-demo-tab-content-lazy>
        </ng-template>
      </nz-tab>
      <nz-tab nzTitle="Tab Lazy 2">
        <ng-template nz-tab>
          <nz-demo-tab-content-lazy></nz-demo-tab-content-lazy>
        </ng-template>
      </nz-tab>
    </nz-tabset>
  `
})
export class NzDemoTabsLazyComponent {}

@Component({
  selector: 'nz-demo-tab-content-lazy',
  template: `
    lazy
  `
})
export class NzDemoTabContentLazyComponent implements OnInit {
  ngOnInit(): void {
    console.log(`I will init when tab active`);
  }
}

@Component({
  selector: 'nz-demo-tab-content-eagerly',
  template: `
    eagerly
  `
})
export class NzDemoTabContentEagerlyComponent implements OnInit {
  ngOnInit(): void {
    console.log(`I will init eagerly`);
  }
}
