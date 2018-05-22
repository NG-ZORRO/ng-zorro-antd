import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-overflow',
  template: `
    <nz-badge [nzCount]="99"><a class="head-example"></a></nz-badge>
    <nz-badge [nzCount]="200"><a class="head-example"></a></nz-badge>
    <nz-badge [nzCount]="200" [nzOverflowCount]="10"><a class="head-example"></a></nz-badge>
    <nz-badge [nzCount]="10000" [nzOverflowCount]="999"><a class="head-example"></a></nz-badge>
  `
})
export class NzDemoBadgeOverflowComponent {
}
