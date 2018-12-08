import {
  Component,
  Input,
  TemplateRef
} from '@angular/core';

@Component({
  selector           : '[nz-tab-body]',
  templateUrl        : './nz-tab-body.component.html'
})
export class NzTabBodyComponent {
  @Input() content: TemplateRef<void>;
}
