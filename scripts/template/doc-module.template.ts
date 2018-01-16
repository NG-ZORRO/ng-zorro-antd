import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';

{{imports}}

@NgModule({
  imports     : [
    NgZorroAntdModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
{{router}}
    ])
  ],
  declarations: [
{{declarations}}
  ]
})
export class NzDocsModule {

}
