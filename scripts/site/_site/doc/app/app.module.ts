import { BidiModule } from '@angular/cdk/bidi';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IconDefinition } from '@ant-design/icons-angular';
import { EditOutline, LeftOutline, RightOutline } from '@ant-design/icons-angular/icons';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ColorSketchModule } from 'ngx-color/sketch';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

import { environment } from '../environments/environment';
import { DEMOComponent } from './_demo/demo.component';
import { AppComponent } from './app.component';
import { routes } from './app.routing.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { NzContributorsListModule } from './share/contributors-list/contributors-list.module';
import { FixedWidgetsModule } from './share/fixed-widgets/fixed-widgets.module';
import { NzNavBottomModule } from './share/nav-bottom/nav-bottom.module';
import { SideComponent } from './side/side.component';

const icons: IconDefinition[] = [LeftOutline, RightOutline, EditOutline];

@NgModule({
  declarations: [AppComponent, DEMOComponent, SideComponent],
  imports: [
    BidiModule,
    BrowserModule.withServerTransition({ appId: 'docs' }),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NzNavBottomModule,
    ColorSketchModule,
    NzIconModule.forRoot(icons),
    NzGridModule,
    NzAffixModule,
    NzMenuModule,
    NzI18nModule,
    NzSelectModule,
    NzMessageModule,
    NzPopoverModule,
    NzButtonModule,
    NzInputModule,
    NzBadgeModule,
    HttpClientJsonpModule,
    HeaderModule,
    FooterModule,
    NzContributorsListModule,
    FixedWidgetsModule,
    QuicklinkModule,
    RouterModule.forRoot(
      routes,
      environment.production
        ? {
            preloadingStrategy: QuicklinkStrategy,
            scrollPositionRestoration: 'enabled'
          }
        : { preloadingStrategy: QuicklinkStrategy }
    ),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production && !environment.preProduction })
  ],
  providers: [
    Title,
    {
      provide: NZ_CONFIG,
      useValue: {
        codeEditor: {
          monacoEnvironment: { globalAPI: true }
        },
        icon: { nzTwotoneColor: '#1890ff' },
        global: { nzDirection: 'ltr' }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
