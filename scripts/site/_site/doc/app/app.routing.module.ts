/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Routes } from '@angular/router';

import { DEMO_ROUTES } from './router';
import { DEMOComponent } from './_demo/demo.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/docs/introduce/en' },
  ...DEMO_ROUTES,
  { path: 'docs', loadChildren: './docs/index.module#NzDocsModule' },
  { path: 'demo', component: DEMOComponent },
  { path: '**', redirectTo: '/docs/introduce/zh', pathMatch: 'full' }
];
