import { Component } from '@angular/core';

import { NzBreadCrumbComponent } from './nz-breadcrumb.component';

@Component({
  selector           : 'nz-breadcrumb-item',
  preserveWhitespaces: false,
  template           : `
    <span class="ant-breadcrumb-link">
      <ng-content></ng-content>
    </span>
    <span class="ant-breadcrumb-separator">
      <ng-container *ngIf="nzBreadCrumbComponent.isTemplateRef; else stringTemplate">
        <ng-template [ngTemplateOutlet]="nzBreadCrumbComponent.nzSeparator"></ng-template>
      </ng-container>
      <ng-template #stringTemplate>
         {{ nzBreadCrumbComponent.nzSeparator }}
      </ng-template>
    </span>`,
  styles             : [
      `:host:last-child {
      color: rgba(0, 0, 0, 0.65);
    }

    :host:last-child .ant-breadcrumb-separator{
      display: none;
    }
    `
  ]
})
export class NzBreadCrumbItemComponent {
  constructor(public nzBreadCrumbComponent: NzBreadCrumbComponent) {
  }

}
