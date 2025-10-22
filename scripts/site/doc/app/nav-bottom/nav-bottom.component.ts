import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

import { NzIconModule } from 'ng-zorro-antd/icon';

import { ROUTER_LIST } from '../router';
import { APP_LANGUAGE } from '../app.token';
import { filter, withLatestFrom } from 'rxjs/operators';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-nav-bottom',
  imports: [RouterLink, NzIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="prev-next-nav">
      @if (index() > 1) {
        @let prev = list()[index() - 1];
        <a class="prev-page" [routerLink]="prev.path">
          <nz-icon nzType="left" class="footer-nav-icon-before" />
          {{ prev.label }}
          <nz-icon nzType="right" class="footer-nav-icon-after" />
        </a>
      }
      @if (index() < list().length - 1) {
        @let next = list()[index() + 1];
        <a class="next-page" [routerLink]="next.path">
          <nz-icon nzType="left" class="footer-nav-icon-before" />
          {{ next.label }}
          <nz-icon nzType="right" class="footer-nav-icon-after" />
        </a>
      }
    </section>
  `
})
export class NavBottomComponent {
  readonly list = signal<any[]>([]);
  readonly index = signal(0);

  constructor() {
    if (inject(Platform).isBrowser) {
      const navigated$ = inject(Router).events.pipe(filter(e => e instanceof NavigationEnd));
      const language$ = toObservable(inject(APP_LANGUAGE));

      navigated$.pipe(withLatestFrom(language$), takeUntilDestroyed()).subscribe(([_, language]) => {
        const url = window.location.pathname.slice(1);
        const componentsList = ROUTER_LIST.components
          .filter(e => e.language === language)
          .map(({ children }) => children)
          .flat();
        const list = [
          ...ROUTER_LIST.intro.filter(item => item.language === language),
          ...componentsList.filter(item => !item.experimental)
        ];

        this.list.set(list);
        this.index.set(list.findIndex(item => item.path === url));
      });
    }
  }
}
