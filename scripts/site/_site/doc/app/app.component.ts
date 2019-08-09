import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, Component, ElementRef, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { en_US, zh_CN, NzI18nService, NzMessageService, VERSION } from 'ng-zorro-antd';
import { fromEvent } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { AppService } from './app.service';
import { ROUTER_LIST } from './router';

// tslint:disable-next-line:no-any
declare const docsearch: any;

interface DocPageMeta {
  path: string;
  label: string;
  order?: number;
  zh: string;
}

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
  /**
   * When the screen size is smaller that 768 pixel, show the drawer and hide
   * the navigation on the side.
   **/
  showDrawer = false;
  isDrawerOpen = false;
  isExperimental = false;
  routerList = ROUTER_LIST;
  componentList: DocPageMeta[] = [];
  searchComponent = null;
  // tslint:disable-next-line:no-any
  docsearch: any = null;

  get useDocsearch(): boolean {
    if (!this.platform.isBrowser) {
      return false;
    }
    return window && window.location.href.indexOf('/version') === -1;
  }

  language = 'zh';
  oldVersionList = [ '0.5.x', '0.6.x', '0.7.x', '1.8.x', '7.5.x' ];
  currentVersion = VERSION.full;

  @ViewChild('searchInput', { static: false }) searchInput: ElementRef<HTMLInputElement>;

  switchLanguage(language: string): void {
    const url = this.router.url.split('/');
    url.splice(-1);
    // tslint:disable-next-line:prefer-template
    this.router.navigateByUrl(url.join('/') + '/' + language);
  }

  constructor(
    private appService: AppService,
    private router: Router,
    private title: Title,
    private nzI18nService: NzI18nService,
    private msg: NzMessageService,
    private ngZone: NgZone,
    private platform: Platform
  ) {
  }

  navigateToPage(url: string): void {
    if (url) {
      this.router.navigateByUrl(url);
    }
  }

  setExperimental(isExperimental: boolean): void {
    this.isExperimental = isExperimental;
    if (isExperimental) {
      this.router.navigateByUrl(`/docs/experimental/${this.language}`);
    } else {
      this.router.navigateByUrl(`/docs/introduce/${this.language}`);
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
        this.isExperimental = this.router.url.search('experimental') !== -1;
        this.language = this.router.url
          .split('/')[this.router.url.split('/').length - 1]
          .split('#')[0]
          .split('?')[0];
        this.appService.language$.next(this.language);
        this.nzI18nService.setLocale(this.language === 'en' ? en_US : zh_CN);

        if (this.docsearch) {
          this.docsearch!.algoliaOptions = { hitsPerPage: 5, facetFilters: [ `tags:${this.language}` ] };
        }

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
    this.detectLanguage();
  }

  ngAfterViewInit(): void {
    if (this.useDocsearch) {
      this.initDocsearch();
    }

    this.addWindowWidthListener();
  }

  initDocsearch() {
    this.loadScript('https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js').then(() => {
      this.docsearch = docsearch({
        appId         : 'BH4D9OD16A',
        apiKey        : '9f7d9d6527ff52ec484e90bb1f256971',
        indexName     : 'ng_zorro',
        inputSelector : '#search-box input',
        algoliaOptions: { hitsPerPage: 5, facetFilters: [ `tags:${this.language}` ] },
        transformData(hits: any) {
          // tslint:disable-line:no-any
          hits.forEach((hit: any) => {
            // tslint:disable-line:no-any
            hit.url = hit.url.replace('ng.ant.design', location.host);
            hit.url = hit.url.replace('https:', location.protocol);
          });
          return hits;
        },
        debug         : false
      });
    });
  }

  @HostListener('document:keyup.s', [ '$event' ])
  onKeyUp(event: KeyboardEvent) {
    if (this.useDocsearch && this.searchInput && this.searchInput.nativeElement && event.target === document.body) {
      this.searchInput.nativeElement.focus();
    }
  }

  // region: color
  color = `#1890ff`;

  initColor() {
    if (!this.platform.isBrowser) {
      return
    }
    const node = document.createElement('link');
    node.rel = 'stylesheet/less';
    node.type = 'text/css';
    node.href = '/assets/color.less';
    document.getElementsByTagName('head')[ 0 ].appendChild(node);
  }

  lessLoaded = false;

  changeColor(res: any) {
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
      this.loadScript(lessUrl).then(() => {
        this.lessLoaded = true;
        changeColor();
      });
    }
  }

  loadScript(src: string) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head!.appendChild(script);
    });
  }

  // endregion
  private addWindowWidthListener(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
      .pipe(
        startWith(true),
        debounceTime(50),
        map(() => window.innerWidth)
      )
      .subscribe(width => {
        const showDrawer = width <= 995;
        if (this.showDrawer !== showDrawer) {
          this.showDrawer = showDrawer;
        }
      });
    });
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
      this.router.navigate([ 'docs', 'introduce', 'zh' ]);
    }
  }
}
