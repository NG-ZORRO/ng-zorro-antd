import {
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector     : 'nz-tab-body',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-template [ngTemplateOutlet]="content"></ng-template>
  `,
})
export class NzTabBodyComponent {
  @Input() content: TemplateRef<void>;
}
