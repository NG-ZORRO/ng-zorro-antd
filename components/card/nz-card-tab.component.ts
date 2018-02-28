import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'nz-card-tab',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>`
})
export class NzCardTabComponent {
  @ViewChild(TemplateRef) template: TemplateRef<void>;
}
