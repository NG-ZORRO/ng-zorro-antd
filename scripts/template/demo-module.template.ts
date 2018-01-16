import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NzCopyIconModule } from '../share/nz-copy-icon/nz-copy-icon.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

{{imports}}

@NgModule({
  imports     : [
    NgZorroAntdModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzCodeBoxModule,
    NzCopyIconModule,
    RouterModule.forChild([
      { path: 'en', component: NzDemo{{component}}EnComponent },
      { path: 'zh', component: NzDemo{{component}}ZhComponent }
    ])
  ],
  declarations: [
{{declarations}}
  ]
})
export class NzDemo{{component}}Module {

}
