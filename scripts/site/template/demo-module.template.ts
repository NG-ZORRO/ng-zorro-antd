/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';
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
