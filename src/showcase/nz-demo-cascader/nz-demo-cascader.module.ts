import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzDemoCascaderBasicComponent } from './nz-demo-cascader-basic.component';
import { NzDemoCascaderCustomTriggerComponent } from './nz-demo-cascader-custom-trigger.component';
import { NzDemoCascaderDisabledComponent } from './nz-demo-cascader-disabled.component';
import { NzDemoCascaderSizeComponent } from './nz-demo-cascader-size.component';
import { NzDemoCascaderDefaultValueComponent } from './nz-demo-cascader-default-value.component';
import { NzDemoCascaderHoverComponent } from './nz-demo-cascader-hover.component';
import { NzDemoCascaderChangeOnSelectComponent } from './nz-demo-cascader-change-on-select.component';
import { NzDemoCascaderCustomRenderComponent } from './nz-demo-cascader-custom-render.component';
import { NzDemoCascaderLazyComponent } from './nz-demo-cascader-lazy.component';
import { NzDemoCascaderReactiveFormComponent } from './nz-demo-cascader-reactive-form.component';

import { NzDemoCascaderComponent } from './nz-demo-cascader.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';
import { NzDemoCascaderRoutingModule } from './nz-demo-cascader.routing.module';

@NgModule({
  imports     : [ NzDemoCascaderRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, NzCodeBoxModule, NgZorroAntdModule ],
  declarations: [
    NzDemoCascaderComponent,
    NzDemoCascaderBasicComponent,
    NzDemoCascaderCustomTriggerComponent,
    NzDemoCascaderDisabledComponent,
    NzDemoCascaderSizeComponent,
    NzDemoCascaderDefaultValueComponent,
    NzDemoCascaderHoverComponent,
    NzDemoCascaderChangeOnSelectComponent,
    NzDemoCascaderCustomRenderComponent,
    NzDemoCascaderLazyComponent,
    NzDemoCascaderReactiveFormComponent
  ]
})

export class NzDemoCascaderModule {

}
