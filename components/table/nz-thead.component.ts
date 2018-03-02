import { Component, ContentChildren, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { NzThComponent } from './nz-th.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nz-table thead:not(.ant-table-thead)',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>`,
  styles  : [
      `:host {
      display: none;
    }`
  ]
})
export class NzTheadComponent {
  @ContentChildren(NzThComponent, { descendants: true }) listOfNzThComponent: QueryList<NzThComponent>;
  @ViewChild(TemplateRef) template: TemplateRef<void>;
}
