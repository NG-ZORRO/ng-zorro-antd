import { Routes } from '@angular/router';

const routes: Routes = [
  { path: 'en', loadComponent: () => import('./en.component') },
  { path: 'zh', loadComponent: () => import('./zh.component') }
];

export default routes;
