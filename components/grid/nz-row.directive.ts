import {
  Directive
} from '@angular/core';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';

import { NzRowComponent } from './nz-row.component';

@Directive({
  selector : '[nz-row]',
  providers: [ NzUpdateHostClassService ]
})
export class NzRowDirective extends NzRowComponent {
}
