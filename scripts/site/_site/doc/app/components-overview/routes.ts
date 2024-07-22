import { Routes } from '@angular/router';

export const COMPONENTS_OVERVIEW_ROUTES: Routes = [
  {
    path: '**',
    loadComponent: () => import('./components-overview.component').then(m => m.ComponentsOverviewComponent)
  }
];
