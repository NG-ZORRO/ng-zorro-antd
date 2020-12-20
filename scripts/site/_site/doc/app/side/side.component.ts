import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterList } from '../router';

@Component({
  selector: 'app-side',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul nz-menu [nzMode]="'inline'" class="aside-container menu-site" [nzInlineIndent]="40" [class.ant-menu-rtl]="direction === 'rtl'">
      <ng-container *ngIf="page === 'docs'">
        <li *ngFor="let intro of routerList.intro" nz-menu-item nzMatchRouter [hidden]="intro.language !== language">
          <a routerLink="{{ intro.path }}">{{ intro.label }}</a>
        </li>
      </ng-container>

      <ng-container *ngIf="page === 'components'">
        <li nz-menu-item nzMatchRouter>
          <a routerLink="components/overview/{{ language }}">
            <span *ngIf="language === 'en'">Components Overview</span>
            <span *ngIf="language === 'zh'">组件总览</span>
          </a>
        </li>

        <li nz-menu-group *ngFor="let group of routerList.components" [hidden]="group.language !== language" [nzTitle]="group.name">
          <ul>
            <ng-container>
              <li nz-menu-item nzMatchRouter *ngFor="let component of group.children">
                <a routerLink="{{ component.path }}">
                  <span>{{ component.label }}</span>
                  <span class="chinese">{{ component.zh }}</span>
                </a>
              </li>
            </ng-container>
          </ul>
        </li>
      </ng-container>

      <ng-container *ngIf="page === 'experimental'">
        <li
          nz-menu-group
          *ngFor="let group of routerList.components"
          [hidden]="group.language !== language || group.experimentalChildren.length === 0"
          [nzTitle]="group.name"
        >
          <ul>
            <ng-container>
              <li nz-menu-item nzMatchRouter *ngFor="let component of group.experimentalChildren">
                <a routerLink="{{ component.path }}">
                  <span>{{ component.label }}</span>
                  <span class="chinese">{{ component.zh }}</span>
                </a>
              </li>
            </ng-container>
          </ul>
        </li>
      </ng-container>
    </ul>
  `
})
export class SideComponent {
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  @Input() page: 'docs' | 'components' | 'experimental' | string = 'docs';
  @Input() routerList: RouterList = {} as RouterList;
  @Input() language: 'zh' | 'en' = 'en';
}
