import {
  Directive
} from '@angular/core';
import { NzColComponent } from './nz-col.component';

@Directive({
  selector: '[nz-col]'
})
export class NzColDirective extends NzColComponent {
}
