import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule.withServerTransition({ appId: 'zorroApp' }), NgZorroAntdModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
