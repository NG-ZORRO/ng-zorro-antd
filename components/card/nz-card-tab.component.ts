import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector   : 'nz-card-tab',
  templateUrl: './nz-card-tab.component.html'
})
export class NzCardTabComponent {
  @ViewChild(TemplateRef) template: TemplateRef<void>;
}
