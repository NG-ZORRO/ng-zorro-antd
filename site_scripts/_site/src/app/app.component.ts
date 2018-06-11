import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { en_US, zh_CN, NzI18nService, NzMessageService } from 'ng-zorro-antd';
import { environment } from '../environments/environment';
import { ROUTER_LIST } from './router';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  hide = true;
  routerList = ROUTER_LIST;
  componentList = [];
  searchComponent = null;
  language = 'zh';
  oldVersionList = [
    '0.5.x',
    '0.6.x',
    '0.7.x'
  ];
  currentVersion = '1.0.0';

  switchLanguage(language) {
    const url = this.router.url.split('/');
    url.splice(-1);
    this.router.navigateByUrl(url.join('/') + '/' + language);
  }

  toggleHide() {
    this.hide = !this.hide;
  }

  constructor(private router: Router, private title: Title, private nzI18nService: NzI18nService, private msg: NzMessageService) {

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
    this.currentVersion = version;
  }

  ngOnInit(): void {
    console.log('打开钉钉扫码加入 NG-ZORRO 自助服务群');
    console.log('%c', 'padding:100px;background:url(\'https://img.alicdn.com/tfs/TB1XNAjteuSBuNjy1XcXXcYjFXa-200-232.png\') no-repeat;');
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
        this.nzI18nService.setLocale(this.language === 'en' ? en_US : zh_CN);
        if (environment.production) {
          window.scrollTo(0, 0);
        }
        setTimeout(() => {
          const toc = this.router.parseUrl(this.router.url).fragment || '';
          if (toc) {
            document.querySelector(`#${toc}`).scrollIntoView();
          }
        }, 200);
      }
    });
    this.initColor();
  }

  // region: color
  color = `#1890ff`;
  initColor() {
    const node = document.createElement('link');
    node.rel = 'stylesheet/less';
    node.type = 'text/css';
    node.href = '/assets/color.less';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  lessLoaded = false;
  changeColor(res: any) {
    const changeColor = () => {
      (window as any).less.modifyVars({
        '@primary-color': res.color.hex
      }).then(() => {
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
      document.head.appendChild(script);
    });
  }
  // endregion
}
