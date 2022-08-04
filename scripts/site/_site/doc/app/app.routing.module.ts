import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoverPreloadStrategy } from 'ngx-hover-preload';
import { environment } from '../environments/environment';

import { DEMO_ROUTES } from './router';
import { DEMOComponent } from './_demo/demo.component';

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

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      environment.production
        ? {
            preloadingStrategy: HoverPreloadStrategy,
            scrollPositionRestoration: 'enabled',
            initialNavigation: 'enabledBlocking'
          }
        : {}
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
