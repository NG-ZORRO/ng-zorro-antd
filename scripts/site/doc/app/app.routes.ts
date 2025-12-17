import { Routes } from '@angular/router';

import { DEMO_ROUTES } from './router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/docs/introduce/en' },
  ...DEMO_ROUTES,
  { path: 'docs', loadChildren: () => import('./docs/routes') },
  {
    path: 'components/overview',
    loadChildren: () => import('./components-overview/routes')
  },
  {
    path: 'components/changelog',
    loadChildren: () => import('./changelog/routes')
  },
  { path: '**', redirectTo: '/docs/introduce/en', pathMatch: 'full' }
];
