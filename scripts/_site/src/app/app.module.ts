import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import {
  NgZorroAntdModule
} from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { DEMOComponent } from './_demo/demo.component';
import { routes } from './app.routing.module';
import { environment } from '../environments/environment';
import { NzCodeBoxModule } from './share/nz-codebox/nz-codebox.module';
import { NzHighlightModule } from './share/nz-highlight/nz-highlight.module';
import { NzNavBottomModule } from './share/nz-nav-bottom/nz-nav-bottom.module';

@NgModule({
  declarations: [
    AppComponent, DEMOComponent
  ],
  imports     : [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule.forRoot(),
    NzCodeBoxModule,
    NzHighlightModule,
    NzNavBottomModule,
    RouterModule.forRoot(routes, environment.production ? { preloadingStrategy: PreloadAllModules } : {})
  ],
  providers   : [
    Title,
  ],
  bootstrap   : [ AppComponent ]
})
export class AppModule {
}
