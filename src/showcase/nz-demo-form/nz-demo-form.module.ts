import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { NzDemoFormInlineComponent } from './nz-demo-form-inline.component';
import { NzDemoFormHorizontalComponent } from './nz-demo-form-horizontal.component';
import { NzDemoFormMixComponent } from './nz-demo-form-mix.component';
import { NzDemoFormValidateComponent } from './nz-demo-form-validate.component';
import { NzDemoFormValidateDynamicComponent } from './nz-demo-form-validate-dynamic.component';
import { NzDemoFormAdvancedComponent } from './nz-demo-form-advanced.component';
import { NzDemoFormDynamicComponent } from './nz-demo-form-dynamic.component';
import { NzDemoFormLoginComponent } from './nz-demo-form-login.component';
import { NzDemoFormLayoutComponent } from './nz-demo-form-layout.component';
import { NzDemoFormComponent } from './nz-demo-form.component';

import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoFormRoutingModule } from './nz-demo-form.routing.module';

@NgModule({
  imports     : [ NzDemoFormRoutingModule, CommonModule, ReactiveFormsModule, FormsModule, NzCodeBoxModule, NgZorroAntdModule ],
  declarations: [ NzDemoFormLayoutComponent, NzDemoFormDynamicComponent, NzDemoFormLoginComponent, NzDemoFormComponent, NzDemoFormInlineComponent, NzDemoFormHorizontalComponent, NzDemoFormMixComponent, NzDemoFormValidateComponent, NzDemoFormValidateDynamicComponent, NzDemoFormAdvancedComponent ]
})
export class NzDemoFormModule {

}
