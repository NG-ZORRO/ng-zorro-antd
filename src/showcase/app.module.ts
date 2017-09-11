import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { routes } from './app.routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_MESSAGE_CONFIG, NZ_NOTIFICATION_CONFIG } from '../../index.showcase';
import { NzCodeBoxModule } from './share/nz-codebox/nz-codebox.module';
import { NzHighlightModule } from './share/nz-highlight/nz-highlight.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports     : [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule.forRoot({ extraFontName: 'anticon', extraFontUrl: './assets/fonts/iconfont' }),
    NzCodeBoxModule,
    NzHighlightModule,
    RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers   : [
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 3000 } },
    { provide: NZ_NOTIFICATION_CONFIG, useValue: { nzTop: '20px' } },
    Title,
  ],
  bootstrap   : [ AppComponent ]
})
export class AppModule {
}
