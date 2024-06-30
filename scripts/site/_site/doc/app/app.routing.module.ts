import { Routes } from '@angular/router';
import { DEMOComponent } from './_demo/demo.component';

import { DEMO_ROUTES } from './router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/docs/introduce/en' },
  ...DEMO_ROUTES,
  { path: 'docs', loadChildren: () => import('./docs/index.module').then(m => m.NzDocsModule) },
  { path: 'demo', component: DEMOComponent },
  {
    path: 'components/overview',
    loadChildren: () => import('./components-overview/components-overview.module').then(m => m.ComponentsOverviewModule)
  },
  { path: '**', redirectTo: '/docs/introduce/en', pathMatch: 'full' }
];
