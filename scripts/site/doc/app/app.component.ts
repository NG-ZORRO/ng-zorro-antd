import { BidiModule } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { debounceTime, filter, startWith } from 'rxjs/operators';

import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzColor } from 'ng-zorro-antd/color-picker';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageRef, NzMessageService } from 'ng-zorro-antd/message';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { AppService, SiteTheme } from './app.service';
import { APP_LANGUAGE, APP_PAGE } from './app.token';
import { ContributorsListComponent } from './contributors-list/contributors-list.component';
import { FixedWidgetsComponent } from './fixed-widgets/fixed-widgets.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavBottomComponent } from './nav-bottom/nav-bottom.component';
import { NavProgressBar } from './nav-progress-bar/nav-progress-bar.component';
import { ROUTER_LIST } from './router';
import { SideComponent } from './side/side.component';

interface DocPageMeta {
  path: string;
  label: string;
  order?: number;
  zh: string;
  description: string;
}

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
    NavBottomComponent,
    ContributorsListComponent,
    HeaderComponent,
    FooterComponent,
    SideComponent,
    FixedWidgetsComponent,
    NavProgressBar
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[dir]': 'dir()'
  },
})
export class AppComponent implements OnInit {
  private readonly page = inject(APP_PAGE);
  protected readonly language = inject(APP_LANGUAGE);
  protected readonly app = inject(AppService);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly nzI18nService = inject(NzI18nService);
  private readonly nzMessageService = inject(NzMessageService);
  private readonly nzConfigService = inject(NzConfigService);
  private readonly platform = inject(Platform);
  private readonly meta = inject(Meta);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  protected readonly dir = this.app.directionality.valueSignal.asReadonly();

  isDrawerOpen = false;
  routerList = ROUTER_LIST;
  componentList: DocPageMeta[] = [];
  searchComponent = null;
  color = `#1890ff`;

  readonly isEn = computed(() => this.language() === 'en')

  constructor() {
    effect(() => {
      const language = this.language();
      const languageFromURL = this.getLanguageFromURL(this.router.url);
      if (languageFromURL && languageFromURL !== language) {
        this.switchLanguage(this.language());
      }
    });
  }

  switchLanguage(language: string): void {
    const url = this.router.url.split('/');
    url.splice(-1);
    this.router.navigateByUrl(`${url.join('/')}/${language}`).then();
  }

  initTheme(): void {
    const theme = (localStorage.getItem('site-theme') as SiteTheme) || 'default';
    this.onThemeChange(theme, false);
  }

  onThemeChange(theme: SiteTheme, notification: boolean = true): void {
    if (!this.platform.isBrowser) {
      return;
    }
    let loading: NzMessageRef | null = null;
    if (notification) {
      loading = this.nzMessageService.loading(this.isEn() ? `Switching theme...` : `切换主题中...`, {
        nzDuration: 0
      });
    }
    this.renderer.addClass(this.document.activeElement, 'preload');
    const successLoaded = () => {
      this.app.theme.set(theme);
      localStorage.setItem('site-theme', theme);
      this.renderer.setAttribute(document.body, 'data-theme', theme);
      // remove previous theme
      ['dark', 'compact', 'aliyun']
        .filter(item => item !== theme)
        .forEach(item => {
          const dom = document.getElementById(`site-theme-${item}`);
          dom?.remove();
        });
      setTimeout(() => this.renderer.removeClass(this.document.activeElement, 'preload'));
      if (notification) {
        this.nzMessageService.remove(loading?.messageId);
        this.nzMessageService.success(this.isEn() ? `Switching theme successfully` : `切换主题成功`);
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
        this.nzMessageService.error(this.isEn() ? `Switching theme failed` : `切换主题失败`);
        document.getElementById(style.id)?.remove();
      };
    } else {
      successLoaded();
    }
  }

  setPage(url: string): void {
    const match = url.match(/\/(\w+)/);
    if (match && match[1]) {
      this.page.set(match[1]);
    }
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
      this.initTheme();
      this.detectLanguage();
    }

    this.routerList.components.forEach(group => {
      this.componentList = this.componentList.concat([...group.children]);
    });

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.language.set(this.getLanguageFromURL(this.router.url)!);

      this.nzI18nService.setLocale(this.isEn() ? en_US : zh_CN);
      const currentDemoComponent = this.componentList.find(component =>
        // url may contains hash
        this.router.url.startsWith(`/${component.path}`)
      );

      if (currentDemoComponent) {
        const path = currentDemoComponent.path.replace(/\/(en|zh)/, '');
        if (this.isEn()) {
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
          if (this.isEn()) {
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
          if (this.isEn()) {
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

      if (this.platform.isBrowser) {
        window.scrollTo(0, 0);

        setTimeout(() => {
          const toc = this.router.parseUrl(this.router.url).fragment || '';
          if (toc) {
            document.getElementById(toc)?.scrollIntoView();
          }
        }, 200);
      }
    });
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
    const descriptionContent = description ?? (this.isEn() ? enDescription : zhDescription);

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
      content: this.isEn() ? 'en_US' : 'zh_CN'
    });
    this.renderer.setAttribute(this.document.documentElement, 'lang', this.isEn() ? 'en' : 'zh-Hans');
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
    fromEventOutsideAngular(window, 'resize')
      .pipe(startWith(true), debounceTime(50))
      .subscribe(() => this.app.windowWidth.set(window.innerWidth));
  }

  private detectLanguage(): void {
    const language = navigator.language.toLowerCase();
    const pathname = location.pathname;
    const hasLanguage = pathname.match(/(en|zh)(\/?)$/);
    if (language === 'zh-cn' && !hasLanguage) {
      this.nzI18nService.setLocale(zh_CN);
      // redirect to default page
      this.router.navigate(['docs', 'introduce', 'zh']).then();
    }
  }
}
