import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { manifest } from '@ant-design/icons-angular';
import { AccountBookFill } from '@ant-design/icons-angular/icons';
import { NzIconService } from 'ng-zorro-antd';

const categories = {
  direction : [
    'step-backward', 'step-forward', 'fast-backward',
    'fast-forward', 'shrink', 'arrows-alt', 'down', 'up', 'left',
    'right', 'caret-up', 'caret-down', 'caret-left', 'caret-right',
    'up-circle', 'down-circle', 'left-circle', 'right-circle',
    'double-right', 'double-left', 'vertical-left', 'vertical-right',
    'forward', 'backward', 'rollback', 'enter', 'retweet',
    'swap', 'swap-left', 'swap-right', 'arrow-up', 'arrow-down',
    'arrow-left', 'arrow-right', 'play-circle',
    'up-square', 'down-square', 'left-square', 'right-square',
    'login', 'logout', 'menu-fold', 'menu-unfold',
    'border-bottom', 'border-horizontal', 'border-inner',
    'border-left', 'border-right', 'border-top',
    'border-verticle', 'pic-center', 'pic-left', 'pic-right',
    'radius-bottomleft', 'radius-bottomright', 'radius-upleft',
    'fullscreen', 'fullscreen-exit'
  ],
  suggestion: [
    'question', 'question-circle',
    'plus', 'plus-circle', 'pause',
    'pause-circle', 'minus',
    'minus-circle', 'plus-square', 'minus-square',
    'info', 'info-circle',
    'exclamation', 'exclamation-circle',
    'close', 'close-circle', 'close-square',
    'check', 'check-circle',
    'check-square',
    'clock-circle', 'warning',
    'issues-close', 'stop'
  ],
  edit      : [
    'edit', 'form', 'copy', 'scissor', 'delete', 'snippets', 'diff', 'highlight',
    'align-center', 'align-left', 'align-right', 'bg-colors',
    'bold', 'italic', 'underline',
    'strikethrough', 'redo', 'undo', 'zoom-in', 'zoom-out',
    'font-colors', 'font-size', 'line-height', 'colum-height',
    'dash', 'small-dash', 'sort-ascending', 'sort-descending',
    'drag', 'ordered-list', 'radius-setting'
  ],
  data      : [
    'area-chart', 'pie-chart', 'bar-chart', 'dot-chart', 'line-chart',
    'radar-chart', 'heat-map', 'fall', 'rise', 'stock', 'box-plot', 'fund',
    'sliders'
  ],
  other     : [
    'lock', 'unlock', 'bars', 'book', 'calendar', 'cloud', 'cloud-download',
    'code', 'copy', 'credit-card', 'delete', 'desktop',
    'download', 'ellipsis', 'file', 'file-text',
    'file-unknown', 'file-pdf', 'file-word', 'file-excel',
    'file-jpg', 'file-ppt', 'file-markdown', 'file-add',
    'folder', 'folder-open', 'folder-add', 'hdd', 'frown',
    'meh', 'smile', 'inbox',
    'laptop', 'appstore', 'link',
    'mail', 'mobile', 'notification', 'paper-clip', 'picture',
    'poweroff', 'reload', 'search', 'setting', 'share-alt',
    'shopping-cart', 'tablet', 'tag', 'tags',
    'to-top', 'upload', 'user', 'video-camera',
    'home', 'loading', 'loading-3-quarters',
    'cloud-upload',
    'star', 'heart', 'environment',
    'eye', 'camera', 'save', 'team',
    'solution', 'phone', 'filter', 'exception', 'export',
    'customer-service', 'qrcode', 'scan', 'like',
    'dislike', 'message', 'pay-circle',
    'calculator', 'pushpin',
    'bulb', 'select', 'switcher', 'rocket', 'bell', 'disconnect',
    'database', 'compass', 'barcode', 'hourglass', 'key',
    'flag', 'layout', 'printer', 'sound', 'usb', 'skin', 'tool',
    'sync', 'wifi', 'car', 'schedule', 'user-add', 'user-delete',
    'usergroup-add', 'usergroup-delete', 'man', 'woman', 'shop',
    'gift', 'idcard', 'medicine-box', 'red-envelope', 'coffee',
    'copyright', 'trademark', 'safety', 'wallet', 'bank', 'trophy',
    'contacts', 'global', 'shake', 'api', 'fork', 'dashboard',
    'table', 'profile',
    'alert', 'audit', 'branches',
    'build', 'border', 'crown',
    'experiment', 'fire',
    'money-collect', 'property-safety', 'read', 'reconciliation',
    'rest', 'security-scan', 'insurance', 'interation', 'safety-certificate',
    'project', 'thunderbolt', 'block', 'cluster', 'deployment-unit',
    'dollar', 'euro', 'pound', 'file-done', 'file-exclamation', 'file-protect',
    'file-search', 'file-sync', 'gateway', 'gold', 'robot', 'shopping'
  ],
  logo      : [
    'android', 'apple', 'windows',
    'ie', 'chrome', 'github', 'aliwangwang',
    'dingding',
    'weibo-square', 'weibo-circle', 'taobao-circle', 'html5',
    'weibo', 'twitter', 'wechat', 'youtube', 'alipay-circle',
    'taobao', 'skype', 'qq', 'medium-workmark', 'gitlab', 'medium',
    'linkedin', 'google-plus', 'dropbox', 'facebook', 'codepen',
    'amazon', 'google', 'codepen-circle', 'alipay', 'ant-design',
    'aliyun', 'zhihu', 'slack', 'slack-square', 'behance',
    'behance-square', 'dribbble', 'dribbble-square',
    'instagram', 'yuque',
    'alibaba', 'yahoo'
  ]
};

const newIconNames: string[] = [
  // direction
  'border-bottom', 'border-horizontal', 'border-inner',
  'border-outter', 'border-left', 'border-right', 'border-top',
  'border-verticle', 'pic-center', 'pic-left', 'pic-right',
  'radius-bottomleft', 'radius-bottomright', 'radius-upleft', 'radius-upleft',
  'fullscreen', 'fullscreen-exit',
  // suggestion
  'issues-close', 'stop',

  // edit
  'scissor', 'snippets', 'diff', 'highlight',
  'align-center', 'align-left', 'align-right', 'bg-colors',
  'bold', 'italic', 'underline', 'redo', 'undo', 'zoom-in', 'zoom-out',
  'font-colors', 'font-size', 'line-height', 'colum-height', 'colum-width',
  'dash', 'small-dash', 'sort-ascending', 'sort-descending',
  'drag', 'ordered-list', 'radius-setting',

  // data
  'radar-chart', 'heat-map', 'fall', 'rise', 'stock', 'box-plot', 'fund',
  'sliders',

  // other
  'alert', 'audit', 'batch-folding', 'branches',
  'build', 'border', 'crown',
  'experiment', 'fire',
  'money-collect', 'property-safety', 'read', 'reconciliation',
  'rest', 'security-scan', 'insurance', 'interation', 'safety-certificate',
  'project', 'thunderbolt', 'block', 'cluster', 'deployment-unit',
  'dollar', 'euro', 'pound', 'file-done', 'file-exclamation', 'file-protect',
  'file-search', 'file-sync', 'gateway', 'gold', 'robot',
  'strikethrough', 'shopping',

  // logo
  'alibaba', 'yahoo'
];

@Component({
  selector       : 'nz-page-demo-icon',
  template       : `
    <h3>{{localeObj.chooseTheme}}</h3>
    <nz-radio-group [ngModel]="currentTheme" (ngModelChange)="setIconsShouldBeDisplayed($event)">
      <label nz-radio-button nzValue="outline">
        <i nz-icon>
          <svg>
            <path d="M864 64H160C107 64 64 107 64 160v704c0 53 43 96 96 96h704c53 0 96-43 96-96V160c0-53-43-96-96-96z m-12 800H172c-6.6 0-12-5.4-12-12V172c0-6.6 5.4-12 12-12h680c6.6 0 12 5.4 12 12v680c0 6.6-5.4 12-12 12z"></path>
          </svg>
        </i> Outlined
      </label>
      <label nz-radio-button nzValue="fill">
        <i nz-icon>
          <svg>
            <path d="M864 64H160C107 64 64 107 64 160v704c0 53 43 96 96 96h704c53 0 96-43 96-96V160c0-53-43-96-96-96z"></path>
          </svg>
        </i> Filled
      </label>
      <label nz-radio-button nzValue="twotone">
        <i nz-icon>
          <svg>
            <path d="M16 512c0 273.932 222.066 496 496 496s496-222.068 496-496S785.932 16 512 16 16 238.066 16 512z m496 368V144c203.41 0 368 164.622 368 368 0 203.41-164.622 368-368 368z"></path>
          </svg>
        </i> Two Tone
      </label>
    </nz-radio-group>
    <ng-container *ngFor="let category of categoryNames; let i = index;">
      <h3>{{ localeObj[category] }}</h3>
      <ul class="anticons-list">
        <li *ngFor="let icon of displayedNames[i].icons; trackBy: trackByFn" (click)="onIconClick($event, icon)">
          <i nz-icon [type]="icon" [theme]="currentTheme"></i>
          <span class="anticon-class">
            <nz-badge *ngIf="isNewIcon(icon); else notNewTpl" nzDot>
              {{ icon }}
            </nz-badge>
            <ng-template #notNewTpl>
              {{ icon }}
            </ng-template>
          </span>
        </li>
      </ul>
    </ng-container>
  `,
  styles         : [
      `h3 {
      margin: 1.6em 0 0.6em;
      font-size: 18px;
    }`,
      `ul.anticons-list li .anticon {
      font-size: 24px;
    }`
  ]
})
export class NzPageDemoIconComponent implements OnInit {
  displayedNames = {};
  categoryNames = [];
  currentTheme = 'outline';
  localeObj = locale;

  trackByFn = (index: number, item: string) => {
    return `${item}-${this.currentTheme}`;
  }

  isNewIcon = (name) => {
    return newIconNames.indexOf(name) > -1;
  }

  onIconClick(e: MouseEvent, icon: string): void {
    const target = e.target as HTMLElement;
    const copiedString = `<i nz-icon type="${icon}" theme="${this.currentTheme}"></i>`;
    target.classList.add('copied');
    this._copy(copiedString).then(() => {
      setTimeout(() => {
        target.classList.remove('copied');
      }, 1000);
    });
  }

  private _copy(value: string): Promise<string> {
    const promise = new Promise<string>((resolve, reject): void => {
        let copyTextArea = null as HTMLTextAreaElement;
        try {
          copyTextArea = this.dom.createElement('textarea');
          copyTextArea.style.height = '0px';
          copyTextArea.style.opacity = '0';
          copyTextArea.style.width = '0px';
          this.dom.body.appendChild(copyTextArea);
          copyTextArea.value = value;
          copyTextArea.select();
          this.dom.execCommand('copy');
          resolve(value);
        } finally {
          if (copyTextArea && copyTextArea.parentNode) {
            copyTextArea.parentNode.removeChild(copyTextArea);
          }
        }
      }
    );

    return (promise);

  }

  setIconsShouldBeDisplayed(value: string): void {
    // tslint:disable
    const names = Object.keys(categories)
    .map(category => ({
      name : category,
      icons: categories[ category ].filter(name => manifest[ value ].indexOf(name) > -1)
    }))
    .filter(({ icons }) => Boolean(icons.length));

    this.displayedNames = names;
    this.categoryNames = names.map(({ name }) => name);
    this.currentTheme = value;
  }

  constructor(@Inject(DOCUMENT) private dom: any, private _iconService: NzIconService) {
    // This is to test that tree shake works!
    this._iconService.addIcon(AccountBookFill);
  }

  ngOnInit() {
    this.setIconsShouldBeDisplayed('outline');
  }
}
