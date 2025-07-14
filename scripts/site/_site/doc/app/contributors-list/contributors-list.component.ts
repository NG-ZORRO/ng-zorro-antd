import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'nz-contributors-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzAvatarModule, NzAvatarModule, NzTooltipModule],
  template: `
    <ul class="contributors-list">
      @for (item of list; track $index) {
        <a
          nz-tooltip
          [nzTooltipTitle]="(language === 'en' ? 'Contributors: ' : '文档贡献者: ') + item.name"
          [attr.href]="item.url"
          target="_blank"
        >
          <nz-avatar [nzText]="item.name" [nzSrc]="item.avatar"></nz-avatar>
        </a>
      }
    </ul>
  `,
  styleUrl: './contributors-list.component.less'
})
export class NzContributorsListComponent implements OnInit, OnDestroy {
  language = 'en';
  list: any[] = [];
  filePath = '';
  isIntersecting = false;
  intersectionObserver!: IntersectionObserver;

  constructor(
    private router: Router,
    private platform: Platform,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        this.isIntersecting = isIntersecting;
        this.reloadContributors();
      });
    });
    const navigationEnd$ = this.router.events.pipe(filter(e => e instanceof NavigationEnd));
    navigationEnd$.pipe(take(1)).subscribe(() => {
      this.intersectionObserver.observe(this.elementRef.nativeElement);
    });
    navigationEnd$.subscribe(() => {
      const url = window.location.pathname.slice(1);
      this.language = this.router.url.split('/')[this.router.url.split('/').length - 1].split('#')[0];
      let filePath = '';
      const docsMatch = /docs\/(.+)\//.exec(url);
      const componentMatch = /(?:components|experimental)\/(.+)\//.exec(url);

      if (docsMatch && docsMatch[1]) {
        filePath = `docs/${docsMatch[1]}.${this.language === 'en' ? 'en-US' : 'zh-CN'}.md`;
      } else if (componentMatch && componentMatch[1]) {
        filePath = `components/${componentMatch[1]}/doc`;
      }
      this.list = [];
      this.filePath = filePath;
      this.reloadContributors();
    });
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.unobserve(this.elementRef.nativeElement);
  }

  reloadContributors(): void {
    if (this.isIntersecting && this.filePath && this.list.length === 0) {
      this.getContributors(this.filePath);
      this.cdr.markForCheck();
    }
  }

  getContributors(path: string): void {
    this.http
      .get(`https://api.github.com/repos/NG-ZORRO/ng-zorro-antd/commits`, {
        params: {
          path
        }
      })
      .subscribe(data => {
        if (Array.isArray(data)) {
          const list: any[] = [];
          data
            .filter(e => e.author && e.author.login)
            .forEach(e => {
              const id = e.author.login;
              const index = list.findIndex(i => i.id === id);
              if (index === -1) {
                list.push({
                  id,
                  count: 1,
                  name: e.commit && e.commit.author.name,
                  url: `https://github.com/${id}`,
                  avatar: e.author.avatar_url
                });
              } else {
                list[index].count = list[index].count + 1;
              }
            });

          this.list = list.sort((a, b) => b.count - a.count);
        } else {
          this.list = [];
        }
        this.cdr.markForCheck();
      });
  }
}
