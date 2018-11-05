import {
  Directive,
  ElementRef,
  Host,
  Optional,
  Renderer2
} from '@angular/core';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';

import { NzColComponent } from './nz-col.component';
import { NzRowComponent } from './nz-row.component';
import { NzRowDirective } from './nz-row.directive';

@Directive({
  selector : '[nz-col]',
  providers: [ NzUpdateHostClassService ]
})
export class NzColDirective extends NzColComponent {
  constructor(nzUpdateHostClassService: NzUpdateHostClassService, elementRef: ElementRef, @Optional() @Host() nzRowComponent: NzRowComponent, @Optional() @Host() nzRowDirective: NzRowDirective, renderer: Renderer2) {
    super(nzUpdateHostClassService, elementRef, nzRowComponent, nzRowDirective, renderer);
  }
}
