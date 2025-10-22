import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { APP_LANGUAGE, APP_PAGE } from '../app.token';
import { AppService } from '../app.service';

@Component({
  selector: 'ul[nz-menu][app-navigation]',
  imports: [RouterLink, NgTemplateOutlet, NzButtonModule, NzMenuModule, NzIconModule],
  template: `
    <li nz-menu-item [nzSelected]="page() === 'docs'">
      <a [routerLink]="['docs', 'introduce', language()]">
        <span>{{ language() === 'zh' ? '文档' : 'Docs' }}</span>
      </a>
    </li>
    <li nz-menu-item [nzSelected]="page() === 'components'">
      <a [routerLink]="['components', 'overview', language()]">
        <span>{{ language() === 'zh' ? '组件' : 'Components' }}</span>
      </a>
    </li>
    <li nz-menu-item [nzSelected]="page() === 'experimental'">
      <a [routerLink]="['experimental', 'pipes', language()]">
        <span>{{ language() === 'zh' ? '实验性功能' : 'Experimental' }}</span>
      </a>
    </li>
    @if (app.isMobile()) {
      <ng-container [ngTemplateOutlet]="additionalItems"></ng-container>
    } @else if (app.responsive() === 'crowded') {
      <li nz-submenu [nzTitle]="additionalTitle" nzMenuClassName="top-menu-additional">
        <ng-template #additionalTitle>
          <nz-icon nzType="unordered-list" />
        </ng-template>
        <ul>
          <ng-container [ngTemplateOutlet]="additionalItems"></ng-container>
        </ul>
      </li>
    }
    <ng-template #additionalItems>
      <li nz-menu-item>
        <a href="https://github.com/NG-ZORRO/ng-zorro-antd" target="_blank" rel="noopener noreferrer">Github</a>
      </li>
      <li nz-menu-item>
        <a (click)="changeLanguage()">{{ language() == 'zh' ? 'English' : '中文' }}</a>
      </li>
    </ng-template>
  `,
  styles:
    `
      ::ng-deep .top-menu-additional {
        position: relative;
        inset-inline-end: 80px;
        width: 190px;
      }
    `
  ,
  host: {
    id: 'nav'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent {
  protected readonly page = inject(APP_PAGE).asReadonly();
  protected readonly language = inject(APP_LANGUAGE);
  protected readonly app = inject(AppService);

  changeLanguage(): void {
    this.language.update(lang => lang === 'zh' ? 'en' : 'zh');
  }
}
