import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NzColor, NzColorPickerModule } from 'ng-zorro-antd/color-picker';

import { FooterColComponent } from './footer-col.component';
import { FooterItemComponent } from './footer-item.component';

@Component({
  selector: 'app-footer',
  imports: [NzColorPickerModule, FooterColComponent, FooterItemComponent],
  template: `
    <footer class="rc-footer rc-footer-dark">
      <section class="rc-footer-container">
        <section class="rc-footer-columns">
          <div app-footer-col [title]="language === 'zh' ? '相关资源' : 'Resources'">
            <app-footer-item
              title="NG-ZORRO-MOBILE"
              link="https://ng.mobile.ant.design/"
              description="Angular"
            ></app-footer-item>
            <app-footer-item
              title="Ant Design"
              link="https://ant.design/docs/react/introduce-cn"
              description="React"
            ></app-footer-item>
            <app-footer-item title="Ant Design" link="https://vue.ant.design/" description="Vue"></app-footer-item>
            <app-footer-item
              title="Angular"
              [link]="language === 'zh' ? 'https://angular.cn/' : 'https://angular.dev/'"
            ></app-footer-item>
            <app-footer-item
              title="Angular CLI"
              [link]="language === 'zh' ? 'https://angular.cn/tools/cli' : 'https://angular.dev/tools/cli'"
            ></app-footer-item>
          </div>
          <div app-footer-col [title]="language === 'zh' ? '社区' : 'Community'">
            <app-footer-item
              icon="ant-design"
              title="Awesome Ant Design"
              link="https://github.com/websemantics/awesome-ant-design"
            ></app-footer-item>
            <app-footer-item icon="global" title="Blog" link="https://ng.ant.design/blog"></app-footer-item>
            <app-footer-item icon="x" title="X" link="https://x.com/ng_zorro"></app-footer-item>
            @if (language === 'zh') {
              <app-footer-item
                icon="zhihu"
                title="知乎专栏"
                link="https://zhuanlan.zhihu.com/100000"
              ></app-footer-item>
            }
            <app-footer-item icon="medium" title="Medium" link="https://medium.com/ng-zorro"></app-footer-item>
          </div>
          <div app-footer-col [title]="language === 'zh' ? '帮助' : 'Help'">
            <app-footer-item
              icon="github"
              title="GitHub"
              link="https://github.com/NG-ZORRO/ng-zorro-antd"
            ></app-footer-item>
            <app-footer-item
              icon="history"
              [title]="language === 'zh' ? '更新日志' : 'Changelog'"
              [link]="
                language === 'zh'
                  ? 'https://ng.ant.design/docs/changelog/zh'
                  : 'https://ng.ant.design/docs/changelog/en'
              "
            ></app-footer-item>
            <app-footer-item
              icon="profile"
              [title]="language === 'zh' ? '常见问题' : 'FAQ'"
              [link]="language === 'zh' ? 'https://ng.ant.design/docs/faq/zh' : 'https://ng.ant.design/docs/faq/en'"
            ></app-footer-item>
            <app-footer-item
              icon="bug"
              [title]="language === 'zh' ? '报告 Bug' : 'Bug Report'"
              [link]="
                language === 'zh'
                  ? 'https://ng.ant.design/issue-helper/#/zh'
                  : 'https://ng.ant.design/issue-helper/#/en'
              "
            ></app-footer-item>
            <app-footer-item
              icon="issues-close"
              [title]="language === 'zh' ? '讨论列表' : 'Issue'"
              [link]="
                language === 'zh'
                  ? 'https://ng.ant.design/issue-helper/#/zh'
                  : 'https://ng.ant.design/issue-helper/#/en'
              "
            ></app-footer-item>
            @if (language === 'zh') {
              <app-footer-item
                icon="book"
                title="NG-ZORRO 实战教程"
                link="https://github.com/NG-ZORRO/today-ng-steps"
              ></app-footer-item>
            }
            <app-footer-item
              icon="question-circle"
              title="StackOverflow"
              link="https://stackoverflow.com/questions/tagged/ng-zorro-antd"
            ></app-footer-item>
            <div class="rc-footer-item" style="margin-top: 20px;">
              <nz-color-picker [nzValue]="colorHex" (nzOnChange)="colorChange.emit($event)"></nz-color-picker>
            </div>
          </div>
        </section>
      </section>
      <section class="rc-footer-bottom">
        <div class="rc-footer-bottom-container">
          Made with
          <span style="color: rgb(255, 255, 255);">❤</span>
          by NG-ZORRO team
        </div>
      </section>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  @Input() language: string = 'zh';
  @Input() colorHex: string = '#1890ff';
  @Output() colorChange = new EventEmitter<{ color: NzColor; format: string }>();
}
