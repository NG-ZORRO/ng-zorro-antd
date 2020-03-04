import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="rc-footer rc-footer-dark">
      <section class="rc-footer-container">
        <section class="rc-footer-columns">
          <div app-footer-col [title]="language === 'zh' ? '相关资源' : 'Resources'">
            <app-footer-item
              title="NG-ZORRO-MOBILE"
              link="http://ng.mobile.ant.design/"
              description="Angular">
            </app-footer-item>
            <app-footer-item
              title="Ant Design"
              link="https://ant.design/docs/react/introduce-cn"
              description="React">
            </app-footer-item>
            <app-footer-item
              title="Ant Design"
              link="http://vue.ant.design/"
              description="Vue">
            </app-footer-item>
            <app-footer-item
              title="Angular"
              link="https://angular.io/">
            </app-footer-item>
            <app-footer-item
              title="Angular CLI"
              link="https://cli.angular.io/">
            </app-footer-item>
          </div>
          <div app-footer-col [title]="language === 'zh' ? '社区' : 'Community'">
            <app-footer-item
              icon="ant-design"
              title="Awesome Ant Design"
              link="https://github.com/websemantics/awesome-ant-design">
            </app-footer-item>
            <app-footer-item
              icon="global"
              title="Blog"
              link="https://ng.ant.design/blog">
            </app-footer-item>
            <app-footer-item
              icon="twitter"
              title="Twitter"
              link="https://twitter.com/ng_zorro">
            </app-footer-item>
            <app-footer-item
              *ngIf="language === 'zh'"
              icon="zhihu"
              title="知乎专栏"
              link="https://zhuanlan.zhihu.com/100000">
            </app-footer-item>
            <app-footer-item
              icon="medium"
              title="Medium"
              link="https://medium.com/ng-zorro">
            </app-footer-item>
          </div>
          <div app-footer-col [title]="language === 'zh' ? '帮助' : 'Help'">
            <app-footer-item
              icon="github"
              title="GitHub"
              link="https://github.com/NG-ZORRO/ng-zorro-antd">
            </app-footer-item>
            <app-footer-item
              icon="history"
              [title]="language === 'zh' ? '更新日志': 'Changelog'"
              [link]="language === 'zh' ? 'http://ng.ant.design/docs/changelog/zh' : 'http://ng.ant.design/docs/changelog/en'">
            </app-footer-item>
            <app-footer-item
              icon="profile"
              [title]="language === 'zh' ? '常见问题': 'FAQ'"
              [link]="language === 'zh' ? 'http://ng.ant.design/docs/faq/zh' : 'http://ng.ant.design/docs/faq/en'">
            </app-footer-item>
            <app-footer-item
              icon="bug"
              [title]="language === 'zh' ? '报告 Bug': 'Bug Report'"
              [link]="language === 'zh' ? 'https://ng.ant.design/issue-helper/#/zh' : 'https://ng.ant.design/issue-helper/#/en'">
            </app-footer-item>
            <app-footer-item
              icon="issues-close"
              [title]="language === 'zh' ? '讨论列表': 'Issue'"
              [link]="language === 'zh' ? 'https://ng.ant.design/issue-helper/#/zh' : 'https://ng.ant.design/issue-helper/#/en'">
            </app-footer-item>
            <app-footer-item
              *ngIf="language === 'zh'"
              icon="book"
              title="NG-ZORRO 实战教程"
              link="https://github.com/NG-ZORRO/today-ng-steps">
            </app-footer-item>
            <app-footer-item
              icon="question-circle"
              title="StackOverflow"
              link="https://stackoverflow.com/questions/tagged/ng-zorro-antd">
            </app-footer-item>
          </div>
          <div app-footer-col
               imgSrc="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
               imgAlt="Ant XTech"
               [title]="language === 'zh' ? '更多产品' : 'More Products'">
            <app-footer-item
              link="https://www.yuque.com/"
              imgSrc="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
              imgAlt="yuque"
              [description]="language === 'zh' ? '知识创作与分享工具' : 'Write your document as a team'"
              [title]="language === 'zh' ? '语雀': 'YuQue'">
            </app-footer-item>
            <app-footer-item
              link="https://www.yunfengdie.com/"
              imgSrc="https://gw.alipayobjects.com/zos/rmsportal/uHocHZfNWZOdsRUonZNr.png"
              imgAlt="yunfengdie"
              [description]="language === 'zh' ? '移动建站平台' : 'Console Applications Builder'"
              [title]="language === 'zh' ? '云凤蝶': 'FengDie'">
            </app-footer-item>
            <app-footer-item
              link="https://antv.vision/"
              imgSrc="https://gw.alipayobjects.com/zos/antfincdn/nc7Fc0XBg5/8a6844f5-a6ed-4630-9177-4fa5d0b7dd47.png"
              imgAlt="AntV"
              [description]="language === 'zh' ? '数据可视化' : 'Data Visualization'"
              title="ant v">
            </app-footer-item>
            <app-footer-item
              link="https://eggjs.org/"
              imgSrc="https://gw.alipayobjects.com/zos/antfincdn/v2%24rh7lqpu/82f338dd-b0a6-41bc-9a86-58aaa9df217b.png"
              imgAlt="egg"
              [description]="language === 'zh' ? '企业级 Node 开发框架' : 'Enterprise Node.js Framework'"
              title="Egg">
            </app-footer-item>
            <app-footer-item
              link="https://kitchen.alipay.com/"
              imgSrc="https://gw.alipayobjects.com/zos/rmsportal/DMDOlAUhmktLyEODCMBR.ico"
              imgAlt="kitchen"
              [description]="language === 'zh' ? 'Sketch 工具集' : 'Sketch Toolkit'"
              title="Kitchen">
            </app-footer-item>
            <app-footer-item
              link="https://xtech.antfin.com/"
              imgSrc="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
              imgAlt="xtech"
              [description]="language === 'zh' ? 'Sketch 工具集' : 'Sketch Toolkit'"
              [title]="language === 'zh' ? '蚂蚁体验科技' : 'Ant Financial Experience Tech'">
            </app-footer-item>
            <div class="rc-footer-item" style="margin-top: 20px;">
              <div class="theme-pick-wrap"
                   nz-popover
                   [nzPopoverTrigger]="'click'"
                   nzOverlayClassName="theme-color-content"
                   [nzPopoverContent]="colorTpl">
                <div class="theme-pick" [ngStyle]="{'background': colorHex}"></div>
              </div>
              <ng-template #colorTpl>
                <color-sketch [color]="colorHex" (onChangeComplete)="changeColor($event)"></color-sketch>
              </ng-template>
            </div>
          </div>
        </section>
      </section>
      <section class="rc-footer-bottom">
        <div class="rc-footer-bottom-container">
          Made with <span style="color: rgb(255, 255, 255);">❤</span> by NG-ZORRO team
        </div>
      </section>
    </footer>
  `,
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

  @Input() language: string = 'zh';
  @Input() colorHex: string = '#1890ff'
  // tslint:disable-next-line:no-any
  @Output() colorChange = new EventEmitter<any>()

  constructor() {
  }

  // tslint:disable-next-line:no-any
  changeColor(res: any): void {
    this.colorChange.emit(res);
  }

  ngOnInit(): void {
  }

}
