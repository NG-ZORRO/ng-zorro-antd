import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAffixModule } from '../affix/nz-affix.module';
import { SCROLL_SERVICE_PROVIDER } from '../core/scroll/nz-scroll.service';

import { NzAnchorLinkComponent } from './nz-anchor-link.component';
import { NzAnchorComponent } from './nz-anchor.component';

@NgModule({
  declarations: [ NzAnchorComponent, NzAnchorLinkComponent ],
  exports     : [ NzAnchorComponent, NzAnchorLinkComponent ],
  imports     : [ CommonModule, NzAffixModule ],
  providers   : [ SCROLL_SERVICE_PROVIDER ]
})
export class NzAnchorModule {
}
