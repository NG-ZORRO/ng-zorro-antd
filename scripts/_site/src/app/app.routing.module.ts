import { Routes } from '@angular/router';
import { DEMO_ROUTES } from './router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/docs/introduce/zh' },
  ...DEMO_ROUTES,
  { 'path': 'docs', 'loadChildren': './docs/index.module#NzDocsModule' },
  { path: '**', redirectTo: '/docs/introduce/zh', pathMatch: 'full' }
];
