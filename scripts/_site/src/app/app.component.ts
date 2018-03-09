import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { enUS, zhCN, NzLocaleService } from 'ng-zorro-antd';
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd';
import { ROUTER_LIST } from './router';
import { environment } from '../environments/environment';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  routerList = ROUTER_LIST;
  componentList = [];
  searchComponent = null;
  language = 'zh';
  versionList = [
    '0.5.x',
    '0.6.x'
  ];
  currentVersion = '0.6.x';

  switchLanguage(language) {
    const url = this.router.url.split('/');
    url.splice(-1);
    this.router.navigateByUrl(url.join('/') + '/' + language);
  }

  constructor(private router: Router, private title: Title, private localeService: NzLocaleService, private nzI18nService: NzI18nService) {

  }

  navigateToPage(url) {
    console.log(url);
    if (url) {
      this.router.navigateByUrl(url);
    }
  }

  navigateToVersion(version) {
    if (version !== this.currentVersion) {
      window.location.href = window.location.origin + `/version/` + version;
    } else {
      window.location.href = window.location.origin;
    }
  }

  ngOnInit(): void {
    this.routerList.components.forEach(group => {
      this.componentList = this.componentList.concat([ ...group.children ]);
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentDemoComponent = this.componentList.find(component => `/${component.path}` === this.router.url);
        if (currentDemoComponent) {
          this.title.setTitle(`${currentDemoComponent.zh} ${currentDemoComponent.label} - NG-ZORRO`);
        }
        const currentIntroComponent = this.routerList.intro.find(component => `/${component.path}` === this.router.url);
        if (currentIntroComponent) {
          this.title.setTitle(`${currentIntroComponent.label} - NG-ZORRO`);
        }
        if (this.router.url !== '/' + this.searchComponent) {
          this.searchComponent = null;
        }
        this.language = this.router.url.split('/')[ this.router.url.split('/').length - 1 ].split('#')[ 0 ];
        this.localeService.setLocale(this.language === 'en' ? enUS : zhCN);
        this.nzI18nService.setLocale(this.language === 'en' ? en_US : zh_CN);
        if (environment.production && (this.router.url.indexOf('#') < -1)) {
          window.scrollTo(0, 0);
        }
      }
    });
  }

}
