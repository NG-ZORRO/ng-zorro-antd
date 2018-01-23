import {
  Directive
} from '@angular/core';
import { NzRowComponent } from './nz-row.component';

@Directive({
  selector: '[nz-row]'
})
export class NzRowDirective extends NzRowComponent {
}
