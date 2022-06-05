import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

const CNMirrorSite = 'ng-zorro.gitee.io';

@Component({
  selector: 'ul[nz-menu][app-navagation]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li nz-menu-item [nzSelected]="page === 'docs'">
      <a [routerLink]="['docs', 'introduce', language]">
        <span>{{ language == 'zh' ? '文档' : 'Docs' }}</span>
      </a>
    </li>
    <li nz-menu-item [nzSelected]="page === 'components'">
      <a [routerLink]="['components', 'overview', language]">
        <span>{{ language == 'zh' ? '组件' : 'Components' }}</span>
      </a>
    </li>
    <li nz-menu-item [nzSelected]="page === 'experimental'">
      <a [routerLink]="['experimental', 'pipes', language]">
        <span>{{ language == 'zh' ? '实验性功能' : 'Experimental' }}</span>
      </a>
    </li>
    <li *ngIf="showCNMirror && language == 'zh'" nz-menu-item [nzSelected]="false">
      <a href="https://ng-zorro.gitee.io/">国内镜像</a>
    </li>
    <ng-container *ngIf="!isMobile && responsive === 'crowded'">
      <li nz-submenu [nzTitle]="additionalTitle" nzMenuClassName="top-menu-additional">
        <ng-template #additionalTitle><span nz-icon nzType="unordered-list" nzTheme="outline"></span></ng-template>
        <ul>
          <ng-container [ngTemplateOutlet]="additionalItems"></ng-container>
        </ul>
      </li>
    </ng-container>
    <ng-container *ngIf="isMobile">
      <ng-container [ngTemplateOutlet]="additionalItems"></ng-container>
    </ng-container>
    <ng-template #additionalItems>
      <li nz-menu-item>
        <a href="https://github.com/NG-ZORRO/ng-zorro-antd" target="_blank" rel="noopener noreferrer">Github</a>
      </li>
      <li nz-menu-item>
        <a (click)="changeLanguage(language === 'zh' ? 'en' : 'zh', $event)">{{ language == 'zh' ? 'English' : '中文' }}</a>
      </li>
    </ng-template>
  `,
  styles: [
    `
      ::ng-deep .top-menu-additional {
        position: relative;
        right: 80px;
        width: 190px;
      }
    `
  ],
  host: {
    id: 'nav'
  },
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {
  @Input() language: 'zh' | 'en' = 'zh';
  @Output() languageChange = new EventEmitter<'zh' | 'en'>();
  @Input() responsive: null | 'narrow' | 'crowded' = null;
  @Input() page: 'docs' | 'components' | 'experimental' | string = 'docs';
  @Input() isMobile = false;
  showCNMirror = false;

  constructor(private platform: Platform) {}

  ngOnInit(): void {
    if (this.platform.isBrowser) {
      this.showCNMirror = location.hostname !== CNMirrorSite;
    }
  }

  changeLanguage(language: 'zh' | 'en', e: MouseEvent): void {
    e.preventDefault();
    this.languageChange.emit(language);
  }
}
