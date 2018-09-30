import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ShareModule } from './share/share.module';

import { environment } from '../environments/environment';
import { DEMOComponent } from './_demo/demo.component';
import { AppComponent } from './app.component';
import { routes } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent, DEMOComponent
  ],
  imports     : [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ShareModule,
    NgZorroAntdModule,
    RouterModule.forRoot(routes, environment.production ? { preloadingStrategy: PreloadAllModules } : {})
  ],
  providers   : [
    Title
  ],
  bootstrap   : [ AppComponent ]
})
export class AppModule {
}
