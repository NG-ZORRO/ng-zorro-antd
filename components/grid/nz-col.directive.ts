import {
  Directive
} from '@angular/core';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';

import { NzColComponent } from './nz-col.component';

@Directive({
  selector : '[nz-col]',
  providers: [ NzUpdateHostClassService ]
})
export class NzColDirective extends NzColComponent {
}
