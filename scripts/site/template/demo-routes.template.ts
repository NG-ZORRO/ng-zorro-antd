import { Routes } from '@angular/router';

import { NzDemo{{component}}ZhComponent } from './zh.component';
import { NzDemo{{component}}EnComponent } from './en.component';

const routes: Routes = [
  { path: 'en', component: NzDemo{{component}}EnComponent },
  { path: 'zh', component: NzDemo{{component}}ZhComponent }
];

export default routes;
