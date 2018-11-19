import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector       : 'nz-card-tab',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl    : './nz-card-tab.component.html'
})
export class NzCardTabComponent {
  @ViewChild(TemplateRef) template: TemplateRef<void>;
}
