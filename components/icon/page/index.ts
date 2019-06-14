import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { manifest } from '@ant-design/icons-angular';
import { AccountBookFill } from '@ant-design/icons-angular/icons';
import { NzIconService } from 'ng-zorro-antd/icon';

export interface Categories {
  direction: string[];
  suggestion: string[];
  logo: string[];
  data: string[];
  edit: string[];
  other?: string[];
}

export type CategoriesKeys = keyof Categories;

const categories: Categories = {
  direction: [
    'step-backward',
    'step-forward',
    'fast-backward',
    'fast-forward',
    'shrink',
    'arrows-alt',
    'down',
    'up',
    'left',
    'right',
    'caret-up',
    'caret-down',
    'caret-left',
    'caret-right',
    'up-circle',
    'down-circle',
    'left-circle',
    'right-circle',
    'double-right',
    'double-left',
    'vertical-left',
    'vertical-right',
    'vertical-align-top',
    'vertical-align-middle',
    'vertical-align-bottom',
    'forward',
    'backward',
    'rollback',
    'enter',
    'retweet',
    'swap',
    'swap-left',
    'swap-right',
    'arrow-up',
    'arrow-down',
    'arrow-left',
    'arrow-right',
    'play-circle',
    'up-square',
    'down-square',
    'left-square',
    'right-square',
    'login',
    'logout',
    'menu-fold',
    'menu-unfold',
    'border-bottom',
    'border-horizontal',
    'border-inner',
    'border-outer',
    'border-left',
    'border-right',
    'border-top',
    'border-verticle',
    'pic-center',
    'pic-left',
    'pic-right',
    'radius-bottomleft',
    'radius-bottomright',
    'radius-upleft',
    'radius-upright',
    'fullscreen',
    'fullscreen-exit'
  ],
  suggestion: [
    'question',
    'question-circle',
    'plus',
    'plus-circle',
    'pause',
    'pause-circle',
    'minus',
    'minus-circle',
    'plus-square',
    'minus-square',
    'info',
    'info-circle',
    'exclamation',
    'exclamation-circle',
    'close',
    'close-circle',
    'close-square',
    'check',
    'check-circle',
    'check-square',
    'clock-circle',
    'warning',
    'issues-close',
    'stop'
  ],
  edit: [
    'edit',
    'form',
    'copy',
    'scissor',
    'delete',
    'snippets',
    'diff',
    'highlight',
    'align-center',
    'align-left',
    'align-right',
    'bg-colors',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'redo',
    'undo',
    'zoom-in',
    'zoom-out',
    'font-colors',
    'font-size',
    'line-height',
    'colum-height',
    'colum-width',
    'dash',
    'small-dash',
    'sort-ascending',
    'sort-descending',
    'drag',
    'ordered-list',
    'unordered-list',
    'radius-setting',
    'column-width'
  ],
  data: [
    'area-chart',
    'pie-chart',
    'bar-chart',
    'dot-chart',
    'line-chart',
    'radar-chart',
    'heat-map',
    'fall',
    'rise',
    'stock',
    'box-plot',
    'fund',
    'sliders'
  ],
  logo: [
    'android',
    'apple',
    'windows',
    'ie',
    'chrome',
    'github',
    'aliwangwang',
    'dingding',
    'weibo-square',
    'weibo-circle',
    'taobao-circle',
    'html5',
    'weibo',
    'twitter',
    'wechat',
    'youtube',
    'alipay-circle',
    'taobao',
    'skype',
    'qq',
    'medium-workmark',
    'gitlab',
    'medium',
    'linkedin',
    'google-plus',
    'dropbox',
    'facebook',
    'codepen',
    'code-sandbox',
    'code-sandbox-circle',
    'amazon',
    'google',
    'codepen-circle',
    'alipay',
    'ant-design',
    'ant-cloud',
    'aliyun',
    'zhihu',
    'slack',
    'slack-square',
    'behance',
    'behance-square',
    'dribbble',
    'dribbble-square',
    'instagram',
    'yuque',
    'alibaba',
    'yahoo',
    'reddit',
    'sketch'
  ]
};

const newIconNames: string[] = [
  // direction
  'border-outter',
  'radius-upright',
  // suggestion
  // edit
  'colum-width',
  // data
  // other
  'eye-invisible',
  'batch-folding',
  // logo
  'code-sandbox',
  'code-sandbox-circle'
];

@Component({
  selector: 'nz-page-demo-icon',
  template: `
    <h3>{{ localeObj.chooseTheme }}</h3>
    <div class="icon-selector">
      <nz-radio-group [ngModel]="currentTheme" (ngModelChange)="setIconsShouldBeDisplayed($event)">
        <label nz-radio-button nzValue="outline">
          <i nz-icon>
            <svg>
              <path
                d="M864 64H160C107 64 64 107 64 160v704c0 53 43 96 96 96h704c53 0 96-43 96-96V160c0-53-43-96-96-96z m-12 800H172c-6.6 0-12-5.4-12-12V172c0-6.6 5.4-12 12-12h680c6.6 0 12 5.4 12 12v680c0 6.6-5.4 12-12 12z"
              ></path>
            </svg>
          </i>
          Outlined
        </label>
        <label nz-radio-button nzValue="fill">
          <i nz-icon>
            <svg>
              <path
                d="M864 64H160C107 64 64 107 64 160v704c0 53 43 96 96 96h704c53 0 96-43 96-96V160c0-53-43-96-96-96z"
              ></path>
            </svg>
          </i>
          Filled
        </label>
        <label nz-radio-button nzValue="twotone">
          <i nz-icon>
            <svg>
              <path
                d="M16 512c0 273.932 222.066 496 496 496s496-222.068 496-496S785.932 16 512 16 16 238.066 16 512z m496 368V144c203.41 0 368 164.622 368 368 0 203.41-164.622 368-368 368z"
              ></path>
            </svg>
          </i>
          Two Tone
        </label>
      </nz-radio-group>
      <nz-input-group [nzSuffix]="suffixIconSearch">
        <input
          nz-input
          [placeholder]="localeObj.search"
          [(ngModel)]="searchingString"
          (ngModelChange)="onSearchChange()"
        />
      </nz-input-group>
      <ng-template #suffixIconSearch>
        <i nz-icon nzType="search"></i>
      </ng-template>
    </div>
    <ng-container *ngFor="let category of categoryNames; let i = index">
      <h3>{{ localeObj[category] }}</h3>
      <ul class="anticons-list">
        <li *ngFor="let icon of displayedNames[i].icons; trackBy: trackByFn" (click)="onIconClick($event, icon)">
          <i nz-icon [nzType]="icon" [nzTheme]="currentTheme"></i>
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
  styles: [
    `
      h3 {
        margin: 1.6em 0 0.6em;
        font-size: 18px;
      }
    `,
    `
      ul.anticons-list li .anticon {
        font-size: 24px;
      }
    `,
    `
      .icon-selector {
        display: flex;
        justify-content: space-between;
      }

      nz-input-group {
        margin-left: 10px;
        flex: 1 1 0%;
      }
    `
  ]
})
export class NzPageDemoIconComponent implements OnInit {
  displayedNames: Array<{ name: string; icons: string[] }> = [];
  categoryNames: string[] = [];
  currentTheme = 'outline';
  localeObj: { [key: string]: string } = locale;
  searchingString = '';

  trackByFn = (_index: number, item: string) => {
    return `${item}-${this.currentTheme}`;
  };

  isNewIcon = (name: string) => {
    return newIconNames.indexOf(name) > -1;
  };

  onIconClick(e: MouseEvent, icon: string): void {
    const target = e.target as HTMLElement;
    const copiedString = `<i nz-icon nzType="${icon}" nzTheme="${this.currentTheme}"></i>`;
    target.classList.add('copied');
    this._copy(copiedString).then(() => {
      setTimeout(() => {
        target.classList.remove('copied');
      }, 1000);
    });
  }

  private _copy(value: string): Promise<string> {
    const promise = new Promise<string>(
      (resolve): void => {
        let copyTextArea = (null as any) as HTMLTextAreaElement; // tslint:disable-line:no-any
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

    return promise;
  }

  prepareIcons(): void {
    const theme = this.currentTheme;
    // @ts-ignore
    const currentThemeIcons = (manifest[theme] as string[]).filter(
      (name: string) => !['interation', 'canlendar'].includes(name)
    );
    let notEmptyCategories = Object.keys(categories).map(category => ({
      name: category,
      // @ts-ignore
      icons: categories[category].filter(
        (name: string) => currentThemeIcons.indexOf(name) > -1 && name.includes(this.searchingString)
      )
    }));

    const otherIcons = currentThemeIcons
      .filter(icon => {
        return notEmptyCategories.filter(({ name }) => name !== 'all').every(item => !item.icons.includes(icon));
      })
      .filter(name => name.includes(this.searchingString));

    notEmptyCategories.push({ name: 'other', icons: otherIcons });
    notEmptyCategories = notEmptyCategories.filter(({ icons }) => Boolean(icons.length));

    this.displayedNames = notEmptyCategories;
    this.categoryNames = notEmptyCategories.map(({ name }) => name);
  }

  setIconsShouldBeDisplayed(theme: string): void {
    this.currentTheme = theme;
    this.prepareIcons();
  }

  onSearchChange(): void {
    this.prepareIcons();
  }

  // tslint:disable-next-line:no-any
  constructor(@Inject(DOCUMENT) private dom: any, private _iconService: NzIconService) {
    // This is to test that tree shake works!
    this._iconService.addIcon(AccountBookFill);
  }

  ngOnInit(): void {
    this.setIconsShouldBeDisplayed('outline');
  }
}
