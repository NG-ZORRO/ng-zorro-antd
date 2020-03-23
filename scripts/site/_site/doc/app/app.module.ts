import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  AntDesignOutline, BookOutline,
  BugOutline,
  CodeOutline,
  EditOutline,
  GithubOutline,
  GlobalOutline,
  HistoryOutline,
  IssuesCloseOutline,
  LeftOutline,
  MediumOutline,
  ProfileOutline,
  QuestionCircleOutline,
  RightOutline,
  SnippetsOutline,
  ThunderboltFill,
  TwitterOutline, ZhihuOutline
} from '@ant-design/icons-angular/icons';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ColorSketchModule } from 'ngx-color/sketch';

import { environment } from '../environments/environment';
import { DEMOComponent } from './_demo/demo.component';
import { AppComponent } from './app.component';
import { routes } from './app.routing.module';

import { NzContributorsListModule } from './share/contributors-list/nz-contributors-list.module';
import { FixedWidgetsModule } from './share/fixed-widgets/fixed-widgets.module';
import { NzNavBottomModule } from './share/nz-nav-bottom/nz-nav-bottom.module';

import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';

const icons: IconDefinition[] = [
  LeftOutline,
  RightOutline,
  ThunderboltFill,
  SnippetsOutline,
  CodeOutline,
  EditOutline,
  AntDesignOutline,
  GlobalOutline,
  TwitterOutline,
  MediumOutline,
  GithubOutline,
  HistoryOutline,
  ProfileOutline,
  BugOutline,
  IssuesCloseOutline,
  QuestionCircleOutline,
  ZhihuOutline,
  BookOutline
];

@NgModule({
  declarations: [AppComponent, DEMOComponent],
  imports: [
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
    NzIconModule,
    NzBadgeModule,
    HttpClientJsonpModule,
    HeaderModule,
    FooterModule,
    NzContributorsListModule,
    FixedWidgetsModule,
    RouterModule.forRoot(
      routes,
      environment.production ? { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' } : {}
    ),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production && !environment.preProduction })
  ],
  providers: [Title, { provide: NZ_CONFIG, useValue: { icon: { nzTwotoneColor: '#1890ff' } } }],
  bootstrap: [AppComponent]
})
export class AppModule {}
