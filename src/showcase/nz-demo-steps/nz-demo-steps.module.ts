import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoStepsComponent } from './nz-demo-steps.component';
import { NzDemoStepsBasicComponent } from './nz-demo-steps-basic.component';
import { NzDemoStepsDottedComponent } from './nz-demo-steps-dotted.component';
import { NzDemoStepsMiniComponent } from './nz-demo-steps-mini.component';
import { NzDemoStepsIconComponent } from './nz-demo-steps-icon.component';
import { NzDemoStepsChangeComponent } from './nz-demo-steps-change.component';
import { NzDemoStepsVerticalComponent } from './nz-demo-steps-vertical.component';
import { NzDemoStepsVerticalMiniComponent } from './nz-demo-steps-vertical-mini.component';
import { NzDemoStepsErrorComponent } from './nz-demo-steps-error.component'

import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';

@NgModule({
  imports     : [
    FormsModule,
    CommonModule,
    NzCodeBoxModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path     : '',
        component: NzDemoStepsComponent
      }
    ])
  ],
  exports     : [ NzDemoStepsComponent, RouterModule ],
  declarations: [NzDemoStepsDottedComponent, NzDemoStepsComponent, NzDemoStepsBasicComponent, NzDemoStepsMiniComponent, NzDemoStepsIconComponent, NzDemoStepsChangeComponent, NzDemoStepsVerticalComponent, NzDemoStepsVerticalMiniComponent, NzDemoStepsErrorComponent ]
})
export class NzDemoStepsModule {
}
