import {
  Directive,
  ElementRef,
  NgZone,
  Renderer2
} from '@angular/core';

import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';

import { NzRowComponent } from './nz-row.component';

@Directive({
  selector : '[nz-row]',
  providers: [ NzUpdateHostClassService ]
})
export class NzRowDirective extends NzRowComponent {
  constructor(elementRef: ElementRef, renderer: Renderer2, nzUpdateHostClassService: NzUpdateHostClassService, mediaMatcher: MediaMatcher, ngZone: NgZone, platform: Platform) {
    super(elementRef, renderer, nzUpdateHostClassService, mediaMatcher, ngZone, platform);
  }
}
