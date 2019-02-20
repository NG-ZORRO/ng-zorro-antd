import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { IconDefinition } from '@ant-design/icons-angular';
import { LeftOutline, RightOutline } from '@ant-design/icons-angular/icons';
import { NgZorroAntdModule, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from 'ng-zorro-antd';

import { AppComponent } from './app.component';
import { routes } from './app.routing.module';
{{importPart}}

const icons: IconDefinition[] = [ LeftOutline, RightOutline ];

@NgModule({
  declarations: [
    AppComponent,
{{declarationPart}}
  ],
  imports     : [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    RouterModule.forRoot(routes,{ useHash: true })
  ],
  providers   : [
    Title,
    { provide: NZ_ICONS, useValue: icons },
    { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#1890ff' }
  ],
  bootstrap   : [ AppComponent ]
})
export class AppModule {
}
