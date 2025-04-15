import { BidiModule, Direction } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { Component, NgZone, OnInit, Renderer2, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NzColor } from 'ng-zorro-antd/color-picker';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzI18nService, en_US, zh_CN } from 'ng-zorro-antd/i18n';
import { NzMessageRef, NzMessageService } from 'ng-zorro-antd/message';
import { VERSION } from 'ng-zorro-antd/version';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { AppService } from './app.service';
import { NzContributorsListComponent } from './contributors-list/contributors-list.component';
import { FixedWidgetsComponent } from './fixed-widgets/fixed-widgets.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NzNavBottomComponent } from './nav-bottom/nav-bottom.component';
import { ROUTER_LIST } from './router';
import { SideComponent } from './side/side.component';

import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';

interface DocPageMeta {
  path: string;
  label: string;
  order?: number;
  zh: string;
  description: string;
}

type SiteTheme = 'default' | 'dark' | 'compact' | 'aliyun';
const defaultKeywords =
  'angular, ant design, ant, angular ant design, web, ui, components, ng, zorro, responsive, typescript, css, mobile web, open source, 组件库, 组件, UI 框架';

@Component({
  selector: 'app-root',
  imports: [
    BidiModule,
    NgTemplateOutlet,
    RouterOutlet,
    NzGridModule,
    NzAffixModule,
    NzMenuModule,
    NzIconModule,
    NzSelectModule,
    NzPopoverModule,
    NzButtonModule,
    NzInputModule,
    NzBadgeModule,
    NzNavBottomComponent,
    NzContributorsListComponent,
    HeaderComponent,
    FooterComponent,
    SideComponent,
    FixedWidgetsComponent
  ],
  templateUrl: './app.component.html',
  styles: [
    `
      @media (max-width: 767px) {
        .main-menu {
          display: none;
        }
      }
    `
  ]
})
export class AppComponent implements OnInit {
  /**
   * When the screen size is smaller than 768 pixel, show the drawer and hide
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
  // region: color
  color = `#1890ff`;

  language: 'zh' | 'en' = 'en';
  direction: 'ltr' | 'rtl' = 'ltr';
  currentVersion = VERSION.full;

  private document: Document = inject(DOCUMENT);

  get isEn(): boolean {
    return this.language === 'en';
  }

  switchLanguage(language: string): void {
    const url = this.router.url.split('/');
    url.splice(-1);
    this.router.navigateByUrl(`${url.join('/')}/${language}`).then();
  }

  switchDirection(direction: Direction): void {
    this.direction = direction;
  }

  initTheme(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    const theme = (localStorage.getItem('site-theme') as SiteTheme) || 'default';
    this.onThemeChange(theme, false);
  }

  onThemeChange(theme: string, notification: boolean = true): void {
    if (!this.platform.isBrowser) {
      return;
    }
    let loading: NzMessageRef | null = null;
    if (notification) {
      loading = this.nzMessageService.loading(this.isEn ? `Switching theme...` : `切换主题中...`, {
        nzDuration: 0
      });
    }
    this.renderer.addClass(this.document.activeElement, 'preload');
    const successLoaded = () => {
      this.theme = theme as SiteTheme;
      this.appService.theme$.next(theme);
      this.renderer.setAttribute(document.body, 'data-theme', theme);
      localStorage.removeItem('site-theme');
      localStorage.setItem('site-theme', theme);
      ['dark', 'compact', 'aliyun']
        .filter(item => item !== theme)
        .forEach(item => {
          const dom = document.getElementById(`site-theme-${item}`);
          if (dom) {
            dom.remove();
          }
        });
      setTimeout(() => this.renderer.removeClass(this.document.activeElement, 'preload'));
      if (notification) {
        this.nzMessageService.remove(loading?.messageId);
        this.nzMessageService.success(this.isEn ? `Switching theme successfully` : `切换主题成功`);
      }
    };
    if (theme !== 'default') {
      const style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.id = `site-theme-${theme}`;
      style.href = `assets/${theme}.css`;
      document.body.append(style);

      style.onload = () => {
        successLoaded();
      };
      style.onerror = () => {
        this.nzMessageService.remove(loading?.messageId);
        this.nzMessageService.error(this.isEn ? `Switching theme failed` : `切换主题失败`);
        document.getElementById(style.id)?.remove();
      };
    } else {
      successLoaded();
    }
  }

  constructor(
    private appService: AppService,
    private router: Router,
    private title: Title,
    private nzI18nService: NzI18nService,
    private nzMessageService: NzMessageService,
    private nzConfigService: NzConfigService,
    private ngZone: NgZone,
    private platform: Platform,
    private meta: Meta,
    private renderer: Renderer2
  ) {}

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
      window.location.href = `${window.location.origin}/version/${version}`;
    } else {
      window.location.href = window.location.origin;
    }
    this.currentVersion = version;
  }

  private getLanguageFromURL(url: string): 'en' | 'zh' | null {
    const language = url.split('/')[url.split('/').length - 1].split('#')[0].split('?')[0];
    if (['zh', 'en'].indexOf(language) !== -1) {
      return language as 'en' | 'zh';
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
        this.nzI18nService.setLocale(this.isEn ? en_US : zh_CN);
        const currentDemoComponent = this.componentList.find(component =>
          // url may contains hash
          this.router.url.startsWith(`/${component.path}`)
        );

        if (currentDemoComponent) {
          const path = currentDemoComponent.path.replace(/\/(en|zh)/, '');
          if (this.isEn) {
            this.updateMetaTitle(`${currentDemoComponent.label} | NG-ZORRO`);
          } else {
            this.updateMetaTitle(`${currentDemoComponent.zh}(${currentDemoComponent.label}) | NG-ZORRO`);
          }
          this.updateDocMetaAndLocale(
            currentDemoComponent.description,
            `${currentDemoComponent.label}, ${currentDemoComponent.zh}`,
            path
          );
        }

        const currentIntroComponent = this.routerList.intro.find(component => `/${component.path}` === this.router.url);
        if (currentIntroComponent) {
          const path = currentIntroComponent.path.replace(/\/(en|zh)/, '');
          if (/docs\/introduce/.test(this.router.url)) {
            if (this.isEn) {
              this.updateMetaTitle(`NG-ZORRO - Angular UI component library`);
            } else {
              this.updateMetaTitle(`NG-ZORRO - 企业级 UI 设计语言和 Angular 组件库`);
            }
          } else {
            this.updateMetaTitle(`${currentIntroComponent.label} | NG-ZORRO`);
          }
          this.updateDocMetaAndLocale(currentIntroComponent.description, currentIntroComponent.label, path);
        }

        if (!currentIntroComponent && !currentDemoComponent) {
          if (/components\/overview/.test(this.router.url)) {
            if (this.isEn) {
              this.updateMetaTitle('Components | NG-ZORRO');
              this.updateDocMetaAndLocale(
                'NG-ZORRO provides plenty of UI components to enrich your web applications, and we will improve components experience consistently.',
                'overview',
                'components/overview'
              );
            } else {
              this.updateMetaTitle('组件(Components) | NG-ZORRO');
              this.updateDocMetaAndLocale(
                'NG-ZORRO 为 Web 应用提供了丰富的基础 UI 组件，我们还将持续探索企业级应用的最佳 UI 实践。',
                'overview, 预览',
                'components/overview'
              );
            }
          } else {
            this.updateMetaTitle(`NG-ZORRO - Angular UI component library`);
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

    this.initTheme();
    this.detectLanguage();
  }

  updateMetaTitle(title: string = 'NG-ZORRO | Angular UI component library'): void {
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
    const enDescription =
      'An enterprise-class UI design language and Angular-based implementation with a set of high-quality Angular components, one of best Angular UI library for enterprises';
    const zhDescription =
      'Ant Design 的 Angular 实现，开发和服务于企业级后台产品，开箱即用的高质量 Angular UI 组件库。';
    const descriptionContent = description ?? (this.isEn ? enDescription : zhDescription);

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
      content: this.isEn ? 'en_US' : 'zh_CN'
    });
    const doc = this.document as Document;
    this.renderer.setAttribute(doc.documentElement, 'lang', this.isEn ? 'en' : 'zh-Hans');
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
      ];
      hreflangs.forEach(hreflang => {
        const link = this.renderer.createElement('link');
        this.renderer.setAttribute(link, 'rel', 'alternate');
        this.renderer.setAttribute(link, 'hreflang', hreflang.hreflang);
        this.renderer.setAttribute(link, 'href', `https://ng.ant.design/${href}/${hreflang.suffix}`);
        this.renderer.appendChild(this.document.head, link);
      });
    }
  }

  changeColor(res: { color: NzColor; format: string }): void {
    if (!this.platform.isBrowser) {
      return;
    }

    this.nzConfigService.set('theme', { primaryColor: res.color.toHexString() });
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
      this.router.navigate(['docs', 'introduce', 'zh']).then();
    }
  }
}
