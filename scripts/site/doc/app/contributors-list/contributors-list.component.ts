import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

import { APP_LANGUAGE } from '../app.token';

interface GithubCommit {
  author: {
    login: string; // id
    avatar_url: string;
  };
  commit: {
    author: {
      name: string;
    };
  };
}

interface Contributor {
  id: string;
  count: number;
  name: string;
  url: string;
  avatar: string;
}

@Component({
  selector: 'app-contributors-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzAvatarModule, NzTooltipModule, NzFlexModule],
  template: `
    <ul nz-flex nzWrap="wrap" nzGap="small" [style.margin-top.px]="120">
      @for (item of list(); track $index) {
        <a
          nz-tooltip
          [nzTooltipTitle]="(language() === 'en' ? 'Contributors: ' : '文档贡献者: ') + item.name"
          [attr.href]="item.url"
          target="_blank"
        >
          <nz-avatar [nzText]="item.name" [nzSrc]="item.avatar" />
        </a>
      }
    </ul>
  `
})
export class ContributorsListComponent implements OnInit {
  protected language = inject(APP_LANGUAGE).asReadonly();
  private readonly router = inject(Router);
  private readonly platform = inject(Platform);
  private readonly http = inject(HttpClient);
  private readonly elementRef = inject(ElementRef);

  list = signal<Contributor[]>([]);
  filePath = '';
  isIntersecting = false;
  intersectionObserver!: IntersectionObserver;

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.intersectionObserver?.unobserve(this.elementRef.nativeElement);
    });
  }

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
      const language = this.router.url.split('/')[this.router.url.split('/').length - 1].split('#')[0];
      let filePath = '';
      const docsMatch = /docs\/(.+)\//.exec(url);
      const componentMatch = /(?:components|experimental)\/(.+)\//.exec(url);

      if (docsMatch && docsMatch[1]) {
        filePath = `docs/${docsMatch[1]}.${language === 'en' ? 'en-US' : 'zh-CN'}.md`;
      } else if (componentMatch && componentMatch[1]) {
        filePath = `components/${componentMatch[1]}/doc`;
      }
      this.list.set([]);
      this.filePath = filePath;
      this.reloadContributors();
    });
  }

  reloadContributors(): void {
    if (this.isIntersecting && this.filePath && this.list.length === 0) {
      this.getContributors(this.filePath);
    }
  }

  getContributors(path: string): void {
    this.http
      .get<GithubCommit[]>(`https://api.github.com/repos/NG-ZORRO/ng-zorro-antd/commits`, {
        params: { path }
      })
      .pipe(
        map(data => {
          const list: Contributor[] = [];
          data
            .filter(e => e.author?.login)
            .forEach(e => {
              const id = e.author.login;
              const index = list.findIndex(i => i.id === id);
              if (index === -1) {
                list.push({
                  id,
                  count: 1,
                  name: e.commit.author.name,
                  url: `https://github.com/${id}`,
                  avatar: e.author.avatar_url
                });
              } else {
                list[index].count = list[index].count + 1;
              }
            });
          return list.sort((a, b) => b.count - a.count);
        })
      )
      .subscribe(this.list.set);
  }
}
