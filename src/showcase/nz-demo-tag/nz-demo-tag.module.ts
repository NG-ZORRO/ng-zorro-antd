import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoTagBasicComponent } from './nz-demo-tag-basic.component';
import { NzDemoTagControlComponent } from './nz-demo-tag-control.component';
import { NzDemoTagHotTagsComponent } from './nz-demo-tag-hot-tags.component';
import { NzDemoTagColorfulComponent } from './nz-demo-tag-colorful.component';
import { NzDemoTagCheckableComponent, NzDemoMyTagComponent } from './nz-demo-tag-checkable.component';

import { NzDemoTagComponent } from './nz-demo-tag.component';

import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';
import { NzDemoTagRoutingModule } from './nz-demo-tag.routing.module';

@NgModule({
  imports     : [ NzDemoTagRoutingModule, CommonModule, FormsModule, NzCodeBoxModule, NgZorroAntdModule ],
  declarations: [
    NzDemoTagComponent,
    NzDemoTagBasicComponent,
    NzDemoTagControlComponent,
    NzDemoTagHotTagsComponent,
    NzDemoTagColorfulComponent,
    NzDemoTagCheckableComponent, NzDemoMyTagComponent
  ]
})
export class NzDemoTagModule {

}
