import {
  Component,
  Input,
  TemplateRef
} from '@angular/core';

@Component({
  selector           : '[nz-tab-body]',
  preserveWhitespaces: false,
  template           : `
    <ng-template [ngTemplateOutlet]="content"></ng-template>
  `
})
export class NzTabBodyComponent {
  @Input() content: TemplateRef<void>;
}
