import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../share/share.module';

{{imports}}

@NgModule({
  imports     : [
    ShareModule,
    RouterModule.forChild([
      { path: 'en', component: NzDemo{{component}}EnComponent },
      { path: 'zh', component: NzDemo{{component}}ZhComponent }
    ])
  ],
  declarations: [
{{declarations}}
  ],
  entryComponents: [
{{entryComponents}}
  ]
})
export class NzDemo{{component}}Module {

}
