import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

import { NzIconModule } from 'ng-zorro-antd/icon';

import { ROUTER_LIST } from '../router';

@Component({
  selector: 'nz-nav-bottom',
  imports: [RouterLink, NzIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="prev-next-nav">
      @if (index > 1) {
        <a class="prev-page" [routerLink]="list[index - 1]?.path">
          <nz-icon nzType="left" class="footer-nav-icon-before" />
          {{ list[index - 1]?.label }}
          <nz-icon nzType="right" class="footer-nav-icon-after" />
        </a>
      }
      @if (index < list.length - 1) {
        <a class="next-page" [routerLink]="list[index + 1]?.path">
          <nz-icon nzType="left" class="footer-nav-icon-before" />
          {{ list[index + 1]?.label }}
          <nz-icon nzType="right" class="footer-nav-icon-after" />
        </a>
      }
    </section>
  `
})
export class NzNavBottomComponent implements OnInit {
  list: any[] = [];
  index = 0;
  language = 'en';

  constructor(private router: Router, private platform: Platform, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = window.location.pathname.slice(1);
        this.language = this.router.url.split('/')[this.router.url.split('/').length - 1].split('#')[0];
        const componentsList = ROUTER_LIST.components
          .filter(e => e.language === this.language)
          .reduce(
            (pre, cur) => {
              return pre.concat(cur.children);
            },
            [] as any[]
          );
        this.list = [
          ...ROUTER_LIST.intro.filter(item => item.language === this.language),
          ...componentsList.filter(item => !item.experimental)
        ];
        this.index = this.list.findIndex(item => item.path === url);
        this.cdr.markForCheck();
      }
    });
  }
}
