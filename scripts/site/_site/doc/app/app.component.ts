import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, NgZone, OnInit, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { VERSION } from 'ng-zorro-antd/version';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { AppService } from './app.service';
import { ROUTER_LIST } from './router';
import { loadScript } from './utils/load-script';

interface DocPageMeta {
  path: string;
  label: string;
  order?: number;
  zh: string;
  description: string;
}

type SiteTheme = 'default' | 'dark' | 'compact';
const defaultKeywords = 'angular, ant design, ant, angular ant design, web, ui, components, ng, zorro, responsive, typescript, css, mobile web, open source, 组件库, 组件, UI 框架'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    @media (max-width:767px){
      .main-menu {
        display: none;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  /**
   * When the screen size is smaller that 768 pixel, show the drawer and hide
   * the navigation on the side.
   **/
  showDrawer = false;
  isDrawerOpen = false;
  page: 'docs' | 'components' | 'experimental' | string = 'docs';
  windowWidth = 1400;
  routerList = ROUTER_LIST;
  componentList: DocPageMeta[] = [];
  searchComponent = null;

  theme: SiteTheme = 'default';

  language: 'zh' | 'en' = 'en';
  currentVersion = VERSION.full;

  switchLanguage(language: string): void {
    const url = this.router.url.split('/');
    url.splice(-1);
    // tslint:disable-next-line:prefer-template
    this.router.navigateByUrl(url.join('/') + '/' + language);
  }

  initTheme(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    const theme = (localStorage.getItem('site-theme') as SiteTheme) || 'default';
    this.onThemeChange(theme);
  }

  onThemeChange(theme: string): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.theme = theme as SiteTheme;
    this.appService.theme$.next(theme);
    this.renderer.setAttribute(document.body, 'data-theme', theme);
    const dom = document.getElementById('site-theme');
    if (dom) {
      dom.remove();
    }
    localStorage.removeItem('site-theme');
    if (theme !== 'default') {
      const style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.id = 'site-theme';
      style.href = `assets/${theme}.css`;

      localStorage.setItem('site-theme', theme);
      document.body.append(style);
    }
  }

  constructor(
    private appService: AppService,
    private router: Router,
    private title: Title,
    private nzI18nService: NzI18nService,
    private msg: NzMessageService,
    private ngZone: NgZone,
    private platform: Platform,
    private meta: Meta,
    private renderer: Renderer2,
    // tslint:disable-next-line:no-any
    @Inject(DOCUMENT) private document: any
  ) {
  }

  navigateToPage(url: string): void {
    if (url) {
      this.router.navigateByUrl(url);
    }
  }

  setPage(url: string): void {
    const match = url.match(/\/(\w+)/);
    if (match && match[1]) {
      this.page = match[1];
    }
  }

  navigateToVersion(version: string): void {
    if (!this.platform.isBrowser) {
      return;
    }
    if (version !== this.currentVersion) {
      window.location.href = window.location.origin + `/version/` + version;
    } else {
      window.location.href = window.location.origin;
    }
    this.currentVersion = version;
  }

  private getLanguageFromURL(url: string): 'en' | 'zh' | null {
    const language = url.split('/')[url.split('/').length - 1].split('#')[0].split('?')[0];
    if (['zh', 'en'].indexOf(language) !== -1) {
      return language as 'en' | 'zh'
    }
    return null;
  }

  ngOnInit(): void {

    if (this.platform.isBrowser) {
      this.renderer.removeClass(this.document.activeElement, 'preload');
      this.addWindowWidthListener();
    }

    this.routerList.components.forEach(group => {
      this.componentList = this.componentList.concat([...group.children]);
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const language = this.getLanguageFromURL(event.url);
        if (language) {
          this.language = language;
          this.setPage(event.url);
        }
      }
      if (event instanceof NavigationEnd) {
        this.language = this.getLanguageFromURL(this.router.url)!;

        this.appService.language$.next(this.language);
        this.nzI18nService.setLocale(this.language === 'en' ? en_US : zh_CN);
        const currentDemoComponent = this.componentList.find(component => `/${component.path}` === this.router.url);

        if (currentDemoComponent) {
          const path  = currentDemoComponent.path.replace(/\/(en|zh)/, '');
          this.updateMateTitle(`${currentDemoComponent.zh}(${currentDemoComponent.label}) | NG-ZORRO`);
          this.updateDocMetaAndLocale(currentDemoComponent.description, `${currentDemoComponent.label}, ${currentDemoComponent.zh}`, path);
        }

        const currentIntroComponent = this.routerList.intro.find(component => `/${component.path}` === this.router.url);
        if (currentIntroComponent) {
          const path  = currentIntroComponent.path.replace(/\/(en|zh)/, '');
          if ( (/docs\/introduce/.test(this.router.url))) {
            if (this.language === 'en') {
              this.updateMateTitle(`NG-ZORRO - Angular UI component library`)
            } else {
              this.updateMateTitle(`NG-ZORRO - 企业级 UI 设计语音和 Angular 组件库`)
            }
          } else {
            this.updateMateTitle(`${currentIntroComponent.label} | NG-ZORRO`)
          }
          this.updateDocMetaAndLocale(currentIntroComponent.description, currentIntroComponent.label, path);
        }

        if (!currentIntroComponent && !currentDemoComponent) {
          if (/components\/overview/.test(this.router.url)) {
            if (this.language === 'en') {
              this.updateMateTitle('Components | NG-ZORRO')
              this.updateDocMetaAndLocale(
                'NG-ZORRO provides plenty of UI components to enrich your web applications, and we will improve components experience consistently.',
                'overview',
                'components/overview'
              );
            } else {
              this.updateMateTitle('组件(Components) | NG-ZORRO')
              this.updateDocMetaAndLocale(
                'NG-ZORRO 为 Web 应用提供了丰富的基础 UI 组件，我们还将持续探索企业级应用的最佳 UI 实践.',
                'overview, 预览',
                'components/overview'
              );
            }
          } else {
            this.updateDocMetaAndLocale();
          }
        }

        if (this.router.url !== '/' + this.searchComponent) {
          this.searchComponent = null;
        }
        this.setPage(this.router.url);

        if (environment.production && this.platform.isBrowser) {
          window.scrollTo(0, 0);
        }
        setTimeout(() => {
          const toc = this.router.parseUrl(this.router.url).fragment || '';
          if (toc) {
            if (this.platform.isBrowser) {
              document.querySelector(`#${toc}`)!.scrollIntoView();
            }
          }
        }, 200);
      }
    });

    this.initColor();
    this.initTheme();
    this.detectLanguage();
  }

  updateMateTitle(title: string = 'NG-ZORRO | Angular UI component library'): void {
    this.title.setTitle(title);
    this.meta.updateTag({
      property: 'og:title',
      content: title
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: title
    });
  }

  updateDocMetaAndLocale(description?: string, keywords?: string, path?: string): void {
    const isEn = this.language === 'en';
    const enDescription =
      'An enterprise-class UI design language and Angular-based implementation with a set of high-quality Angular components, one of best Angular UI library for enterprises';
    const zhDescription = 'Ant Design 的 Angular 实现，开发和服务于企业级后台产品，开箱即用的高质量 Angular UI 组件库。';
    let descriptionContent = isEn ? enDescription : zhDescription;
    if (description) {
      descriptionContent = description;
    }

    if (path) {
      this.addHreflang(path);
    }

    this.meta.updateTag({
      name: 'keywords',
      content: keywords ? `${defaultKeywords}, ${keywords}` : defaultKeywords
    });

    this.meta.updateTag({
      name: 'description',
      content: descriptionContent
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: descriptionContent
    });
    this.meta.updateTag({
      property: 'og:description',
      content: descriptionContent
    });
    this.meta.updateTag({
      property: 'og:locale',
      content: isEn ? 'en_US' : 'zh_CN'
    });
    const doc = this.document as Document;
    this.renderer.setAttribute(doc.documentElement, 'lang', isEn ? 'en' : 'zh-Hans');

  }

  private addHreflang(href: string): void {
    if (!this.platform.isBrowser) {
      const hreflangs = [
        {
          hreflang: 'en',
          suffix: 'en'
        },
        {
          hreflang: 'x-default',
          suffix: 'en'
        },
        {
          hreflang: 'zh',
          suffix: 'zh'
        }
      ]
      hreflangs.forEach(hreflang => {
        const link = this.renderer.createElement('link');
        this.renderer.setAttribute(link, 'rel', 'alternate');
        this.renderer.setAttribute(link, 'hreflang', hreflang.hreflang);
        this.renderer.setAttribute(link, 'href', `https://ng.ant.design/${href}/${hreflang.suffix}`);
        this.renderer.appendChild(this.document.head, link);
      })
    }
  }

  // region: color
  color = `#1890ff`;

  initColor(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    const node = document.createElement('link');
    node.rel = 'stylesheet/less';
    node.type = 'text/css';
    node.href = '/assets/color.less';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  lessLoaded = false;

  changeColor(res: any): void {
    if (!this.platform.isBrowser) {
      return;
    }
    const changeColor = () => {
      (window as any).less
        .modifyVars({
          '@primary-color': res.color.hex
        })
        .then(() => {
          this.msg.success(`应用成功`);
          this.color = res.color.hex;
          window.scrollTo(0, 0);
        });
    };

    const lessUrl = 'https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js';

    if (this.lessLoaded) {
      changeColor();
    } else {
      (window as any).less = {
        async: true
      };
      loadScript(lessUrl).then(() => {
        this.lessLoaded = true;
        changeColor();
      });
    }
  }

  // endregion
  private addWindowWidthListener(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.setShowDrawer();
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(debounceTime(50))
        .subscribe(() => {
          this.setShowDrawer();
        });
    });
  }

  setShowDrawer(): void {
    if (this.platform.isBrowser) {
      const width = window.innerWidth;
      this.windowWidth = width;
      this.showDrawer = width <= 768;
    }
  }

  private detectLanguage(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    const language = navigator.language.toLowerCase();
    const pathname = location.pathname;
    const hasLanguage = pathname.match(/(en|zh)(\/?)$/);
    if (language === 'zh-cn' && !hasLanguage) {
      this.nzI18nService.setLocale(zh_CN);
      this.router.navigate(['docs', 'introduce', 'zh']);
    }
  }
}
