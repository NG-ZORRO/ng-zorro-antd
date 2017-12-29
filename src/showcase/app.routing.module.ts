import { Routes } from '@angular/router';
import { INTRO_ROUTES, DEMO_ROUTES } from './router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/docs/angular/introduce' },
  ...INTRO_ROUTES,
  ...DEMO_ROUTES,
  // todo 验证 terminal被替换成了pathMatch，默认为prefix
  { path: '**', redirectTo: '/docs/angular/introduce', pathMatch: 'full' }
];
