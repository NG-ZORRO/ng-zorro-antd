import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzAnchorComponent } from './nz-anchor.component';
import { NzAnchorLinkComponent } from "./nz-anchor-link.component";
import { SCROLL_SERVICE_PROVIDER } from "../core/scroll/nz-scroll.service";

@NgModule({
  declarations: [ NzAnchorComponent, NzAnchorLinkComponent ],
  exports     : [ NzAnchorComponent, NzAnchorLinkComponent ],
  imports     : [ CommonModule ],
  providers   : [ SCROLL_SERVICE_PROVIDER ]
})
export class NzAnchorModule {
}

