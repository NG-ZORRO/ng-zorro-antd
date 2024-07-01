import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-demo-auto-complete-status',
  encapsulation: ViewEncapsulation.None,
  template: `
    <nz-space nzDirection="vertical" style="width: 100%">
      <input *nzSpaceItem nz-input [(ngModel)]="value" [nzAutocomplete]="auto" nzStatus="error" />
      <input *nzSpaceItem nz-input [(ngModel)]="value" [nzAutocomplete]="auto" nzStatus="warning" />
      <nz-autocomplete [nzDataSource]="['12345', '23456', '34567']" #auto></nz-autocomplete>
    </nz-space>
  `
})
export class NzDemoAutoCompleteStatusComponent {
  value?: string;
}
