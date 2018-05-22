import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../share/share.module';

{{imports}}

@NgModule({
  imports     : [
    ShareModule,
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
