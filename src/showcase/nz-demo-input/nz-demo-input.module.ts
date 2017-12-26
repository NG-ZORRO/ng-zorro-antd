import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoInputBasicComponent } from './nz-demo-input-basic.component';
import { NzDemoInputSizeComponent } from './nz-demo-input-size.component';
import { NzDemoInputAddOnComponent } from './nz-demo-input-add-on.component';
import { NzDemoInputGroupComponent } from './nz-demo-input-group.component';
import { NzDemoInputSearchComponent } from './nz-demo-input-search.component';
import { NzDemoInputTextareaComponent } from './nz-demo-input-textarea.component';
import { NzDemoInputTextareaAutoSizeComponent } from './nz-demo-input-textarea-auot-size.component';
import { NzDemoInputAffixComponent } from './nz-demo-input-affix.component';
import { NzDemoInputComponent } from './nz-demo-input.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';

import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoInputRoutingModule } from './nz-demo-input.routing.module';

@NgModule({
  imports     : [ NzDemoInputRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule, FormsModule ],
  declarations: [ NzDemoInputComponent, NzDemoInputBasicComponent, NzDemoInputSizeComponent, NzDemoInputAddOnComponent, NzDemoInputGroupComponent, NzDemoInputSearchComponent, NzDemoInputTextareaComponent, NzDemoInputTextareaAutoSizeComponent, NzDemoInputAffixComponent ]
})
export class NzDemoInputModule {

}
