import { Component, EventEmitter, Input, Output, ViewEncapsulation, } from "@angular/core";

@Component({
  selector: 'ul[nz-menu][app-navagation]',
  template: `
    <li nz-menu-item [nzSelected]="true">
      <a href="https://ng.ant.design/blog/" *ngIf="language=='zh'" target="_blank">
        <span>文档</span>
      </a>
      <a href="https://ng.ant.design/blog/en" *ngIf="language=='en'" target="_blank">
        <span>Docs</span>
      </a>
    </li>
    <li nz-menu-item>
      <a>
        <span *ngIf="language=='en'">Components</span>
        <span *ngIf="language=='zh'">组件</span>
      </a>
    </li>
    <li nz-menu-item>
      <a>
        <span *ngIf="language=='en'">Experimental</span>
        <span *ngIf="language=='zh'">实验性功能</span>
      </a>
    </li>
    <ng-container *ngIf="!isMobile && responsive === 'crowded'">
      <li nz-submenu [nzTitle]="additionalTitle" nzMenuClassName="top-menu-additional">
        <ng-template #additionalTitle><i nz-icon nzType="unordered-list" nzTheme="outline"></i></ng-template>
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
        <a href="https://github.com/NG-ZORRO/ng-zorro-antd" target="_blank" rel="noopener noreferrer">
          Github
        </a>
      </li>
      <li nz-menu-item>
        <a href="#" (click)="changeLanguage(language==='zh'?'en':'zh')">{{language == 'zh' ? 'English' : '中文'}}</a>
      </li>
      <li nz-menu-group [nzTitle]="language == 'zh' ? '生态' : 'Ecosystem'">
        <ul>
          <li nz-menu-item>
            <a href="https://ant.design/" class="header-link" target="_blank">
              Ant Design of React
            </a>
          </li>
          <li nz-menu-item>
            <a href="http://vue.ant.design" class="header-link" target="_blank">
              Ant Design of Vue
            </a>
          </li>
          <li nz-menu-item *ngIf="language == 'zh'">
            <a href="https://github.com/NG-ZORRO/today-ng-steps" class="header-link" target="_blank">
              实战教程
            </a>
          </li>
          <li nz-menu-item>
            <a href="https://ng.ant.design/blog/" class="header-link" target="_blank">
              Blog
            </a>
          </li>
        </ul>
      </li>
    </ng-template>
  `,
  styleUrls: ['./navigation.component.less'],
  styles: [`
    ::ng-deep .top-menu-additional {
      position: relative;
      right: 80px;
      width: 190px;
    }
  `],
  host: {
    id: 'nav'
  },
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent {

  @Input() language: 'zh' | 'en' = 'zh';
  @Output() languageChange = new EventEmitter<string>()
  @Input() responsive: null | 'narrow' | 'crowded' = null;
  @Input() isMobile = false;
  constructor() {
  }
  changeLanguage(language: string): void {
    this.languageChange.emit(language)
  }

}