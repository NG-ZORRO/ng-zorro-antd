import { Routes } from '@angular/router';

const COMPONENTS_OVERVIEW_ROUTES: Routes = [
  {
    path: '**',
    loadComponent: () => import('./components-overview.component').then(m => m.ComponentsOverviewComponent)
  }
];

export default COMPONENTS_OVERVIEW_ROUTES;
