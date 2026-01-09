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
    path: 'components/changelog/en',
    loadComponent: () => import('./docs/changelog-en')
  },
  {
    path: 'components/changelog/zh',
    loadComponent: () => import('./docs/changelog-zh')
  },
  { path: '**', redirectTo: '/docs/introduce/en', pathMatch: 'full' }
];
