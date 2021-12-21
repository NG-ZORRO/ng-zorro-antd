/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

import { manifest, ThemeType } from '@ant-design/icons-angular';
import { AccountBookFill } from '@ant-design/icons-angular/icons';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconService } from 'ng-zorro-antd/icon';

export interface Categories {
  direction: string[];
  suggestion: string[];
  logo: string[];
  data: string[];
  edit: string[];
  other?: string[];
}

const direction = [
  'StepBackward',
  'StepForward',
  'FastBackward',
  'FastForward',
  'Shrink',
  'ArrowsAlt',
  'Down',
  'Up',
  'Left',
  'Right',
  'CaretUp',
  'CaretDown',
  'CaretLeft',
  'CaretRight',
  'UpCircle',
  'DownCircle',
  'LeftCircle',
  'RightCircle',
  'DoubleRight',
  'DoubleLeft',
  'VerticalLeft',
  'VerticalRight',
  'VerticalAlignTop',
  'VerticalAlignMiddle',
  'VerticalAlignBottom',
  'Forward',
  'Backward',
  'Rollback',
  'Enter',
  'Retweet',
  'Swap',
  'SwapLeft',
  'SwapRight',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'PlayCircle',
  'UpSquare',
  'DownSquare',
  'LeftSquare',
  'RightSquare',
  'Login',
  'Logout',
  'MenuFold',
  'MenuUnfold',
  'BorderBottom',
  'BorderHorizontal',
  'BorderInner',
  'BorderOuter',
  'BorderLeft',
  'BorderRight',
  'BorderTop',
  'BorderVerticle',
  'PicCenter',
  'PicLeft',
  'PicRight',
  'RadiusBottomleft',
  'RadiusBottomright',
  'RadiusUpleft',
  'RadiusUpright',
  'Fullscreen',
  'FullscreenExit'
];

const suggestion = [
  'Question',
  'QuestionCircle',
  'Plus',
  'PlusCircle',
  'Pause',
  'PauseCircle',
  'Minus',
  'MinusCircle',
  'PlusSquare',
  'MinusSquare',
  'Info',
  'InfoCircle',
  'Exclamation',
  'ExclamationCircle',
  'Close',
  'CloseCircle',
  'CloseSquare',
  'Check',
  'CheckCircle',
  'CheckSquare',
  'ClockCircle',
  'Warning',
  'IssuesClose',
  'Stop'
];

const edit = [
  'Edit',
  'Form',
  'Copy',
  'Scissor',
  'Delete',
  'Snippets',
  'Diff',
  'Highlight',
  'AlignCenter',
  'AlignLeft',
  'AlignRight',
  'BgColors',
  'Bold',
  'Italic',
  'Underline',
  'Strikethrough',
  'Redo',
  'Undo',
  'ZoomIn',
  'ZoomOut',
  'FontColors',
  'FontSize',
  'LineHeight',
  'Dash',
  'SmallDash',
  'SortAscending',
  'SortDescending',
  'Drag',
  'OrderedList',
  'UnorderedList',
  'RadiusSetting',
  'ColumnWidth',
  'ColumnHeight'
];

const data = [
  'AreaChart',
  'PieChart',
  'BarChart',
  'DotChart',
  'LineChart',
  'RadarChart',
  'HeatMap',
  'Fall',
  'Rise',
  'Stock',
  'BoxPlot',
  'Fund',
  'Sliders'
];

const logo = [
  'Android',
  'Apple',
  'Windows',
  'Ie',
  'Chrome',
  'Github',
  'Aliwangwang',
  'Dingding',
  'WeiboSquare',
  'WeiboCircle',
  'TaobaoCircle',
  'Html5',
  'Weibo',
  'Twitter',
  'Wechat',
  'Youtube',
  'AlipayCircle',
  'Taobao',
  'Skype',
  'Qq',
  'MediumWorkmark',
  'Gitlab',
  'Medium',
  'Linkedin',
  'GooglePlus',
  'Dropbox',
  'Facebook',
  'Codepen',
  'CodeSandbox',
  'CodeSandboxCircle',
  'Amazon',
  'Google',
  'CodepenCircle',
  'Alipay',
  'AntDesign',
  'AntCloud',
  'Aliyun',
  'Zhihu',
  'Slack',
  'SlackSquare',
  'Behance',
  'BehanceSquare',
  'Dribbble',
  'DribbbleSquare',
  'Instagram',
  'Yuque',
  'Alibaba',
  'Yahoo',
  'Reddit',
  'Sketch'
];

const categories: Categories = {
  direction,
  suggestion,
  edit,
  data,
  logo
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

declare const locale: NzSafeAny;

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
          <i nz-icon [nzType]="kebabCase(icon)" [nzTheme]="currentTheme"></i>
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
  currentTheme: ThemeType = 'outline';
  localeObj: { [key: string]: string } = locale;
  searchingString = '';

  trackByFn = (_index: number, item: string): string => `${item}-${this.currentTheme}`;

  kebabCase = (str: string): string => kebabCase(str);

  isNewIcon = (name: string): boolean => newIconNames.indexOf(name) > -1;

  onIconClick(e: MouseEvent, icon: string): void {
    const target = e.target as HTMLElement;
    const copiedString = `<i nz-icon nzType="${kebabCase(icon)}" nzTheme="${this.currentTheme}"></i>`;
    target.classList.add('copied');
    this._copy(copiedString).then(() => {
      setTimeout(() => {
        target.classList.remove('copied');
      }, 1000);
    });
  }

  private _copy(value: string): Promise<string> {
    const promise = new Promise<string>((resolve): void => {
      let copyTextArea: HTMLTextAreaElement | null = null;
      try {
        copyTextArea = this.dom.createElement('textarea') as HTMLTextAreaElement;
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
    });

    return promise;
  }

  prepareIcons(): void {
    const theme = this.currentTheme;

    const currentThemeIcons = (manifest[theme] as string[])
      .filter((name: string) => !['interation', 'canlendar'].includes(name))
      .map(name => upperCamelCase(name));

    let notEmptyCategories = Object.keys(categories).map(category => ({
      name: category,
      icons: categories[category as keyof Categories]!.filter(
        (name: string) =>
          currentThemeIcons.indexOf(name) > -1 && name.toLowerCase().includes(this.searchingString.toLowerCase())
      )
    }));

    const otherIcons = currentThemeIcons
      .filter(icon => notEmptyCategories.filter(({ name }) => name !== 'all').every(item => !item.icons.includes(icon)))
      .filter(name => name.toLowerCase().includes(this.searchingString.toLocaleLowerCase()));

    notEmptyCategories.push({ name: 'other', icons: otherIcons });
    notEmptyCategories = notEmptyCategories.filter(({ icons }) => Boolean(icons.length));

    this.displayedNames = notEmptyCategories;
    this.categoryNames = notEmptyCategories.map(({ name }) => name);
  }

  setIconsShouldBeDisplayed(theme: ThemeType): void {
    this.currentTheme = theme;
    this.prepareIcons();
  }

  onSearchChange(): void {
    this.prepareIcons();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(@Inject(DOCUMENT) private dom: any, private _iconService: NzIconService) {
    // This is to test that tree shake works!
    this._iconService.addIcon(AccountBookFill);
  }

  ngOnInit(): void {
    this.setIconsShouldBeDisplayed('outline');
  }
}

function camelCase(value: string): string {
  return value.replace(/-\w/g, (_r, i) => value.charAt(i + 1).toUpperCase());
}

function upperCamelCase(value: string): string {
  const camelCased = camelCase(value);
  return camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
}

function kebabCase(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([0-9])([a-zA-Z]+)$/g, '-$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}
