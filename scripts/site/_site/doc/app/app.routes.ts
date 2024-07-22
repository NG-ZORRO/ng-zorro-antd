import { Routes } from '@angular/router';

import { DEMO_ROUTES } from './router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/docs/introduce/en' },
  ...DEMO_ROUTES,
  { path: 'docs', loadChildren: () => import('./docs/index.module').then(m => m.NzDocsModule) },
  {
    path: 'components/overview',
    loadChildren: () => import('./components-overview/routes').then(m => m.COMPONENTS_OVERVIEW_ROUTES)
  },
  { path: '**', redirectTo: '/docs/introduce/en', pathMatch: 'full' }
];
