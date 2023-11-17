/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';

import { isNonEmptyString, isTemplateRef } from 'ng-zorro-antd/core/util';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzModeType } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NzIconModule],
  selector: 'nz-hash-code',
  exportAs: 'nzHashCode',
  template: `
    <div class="ant-hashCode-header" *ngIf="nzMode !== 'single' && nzMode !== 'rect'">
      <div class="ant-hashCode-header-title">{{ nzTitle }}</div>
      <div class="ant-hashCode-header-copy" (click)="copyHandle()">
        <span nz-icon nzType="copy" nzTheme="outline"></span>
      </div>
      <div class="ant-hashCode-header-logo">
        <ng-container [ngSwitch]="true">
          <ng-container *ngSwitchCase="isTemplateRef(nzLogo)">
            <ng-container *ngTemplateOutlet="$any(nzLogo)"></ng-container>
          </ng-container>
          <ng-container *ngSwitchCase="isNonEmptyString(nzLogo)">
            <span [innerHTML]="nzLogo"></span>
          </ng-container>
        </ng-container>
      </div>
    </div>
    <div class="ant-hashCode-header-copy" *ngIf="nzMode === 'single' || nzMode === 'rect'" (click)="copyHandle()">
      <span nz-icon nzType="copy" nzTheme="outline"></span>
    </div>
    <div
      class="ant-hashCode-contant"
      [class.ant-hashCode-value-default]="nzType === 'default'"
      [class.ant-hashCode-value-primary]="nzType === 'primary'"
    >
      <div
        class="ant-hashCode-code-value"
        [ngStyle]="{ height: nzMode === 'rect' ? '70px' : nzMode === 'single' ? '18px' : '35px' }"
      >
        <ng-container *ngIf="nzMode === 'double'">
          <ng-container *ngIf="hashDataList.length > 8; else fullDoubleDisplay">
            <div class="ant-hashCode-code-value-block" *ngFor="let v of hashDataList.slice(0, 6)">{{ v }}</div>
            <div class="ant-hashCode-code-value-block">····</div>
            <div class="ant-hashCode-code-value-block">{{ hashDataList[hashDataList.length - 1] }}</div>
          </ng-container>
          <ng-template #fullDoubleDisplay>
            <div class="ant-hashCode-code-value-block" *ngFor="let v of hashDataList">{{ v }}</div>
          </ng-template>
        </ng-container>
        <ng-container *ngIf="nzMode === 'single'">
          <div class="ant-hashCode-code-value-block">{{ hashDataList[0] }}</div>
          <div class="ant-hashCode-code-value-block">····</div>
          <div class="ant-hashCode-code-value-block">{{ hashDataList[hashDataList.length - 1] }}</div>
        </ng-container>
        <ng-container *ngIf="nzMode === 'rect' || nzMode === 'strip'">
          <ng-container *ngIf="hashDataList.length > 16; else fullDisplay">
            <div class="ant-hashCode-code-value-block" *ngFor="let v of hashDataList.slice(0, 14)">{{ v }}</div>
            <div class="ant-hashCode-code-value-block">····</div>
            <div class="ant-hashCode-code-value-block">{{ hashDataList[hashDataList.length - 1] }}</div>
          </ng-container>
          <ng-template #fullDisplay>
            <div class="ant-hashCode-code-value-block" *ngFor="let v of hashDataList">{{ v }}</div>
          </ng-template>
        </ng-container>
      </div>
      <div
        class="ant-hashCode-texaure"
        [class.ant-hashCode-texaure-double]="nzMode === 'double'"
        [class.ant-hashCode-texaure-single]="nzMode === 'single'"
        [class.ant-hashCode-texaure-strip]="nzMode === 'strip'"
        [class.ant-hashCode-texaure-rect]="nzMode === 'rect'"
      >
        <svg width="545px" height="111px" viewBox="0 0 545 111" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient
              x1="15.7162414%"
              y1="50.0992184%"
              x2="49.5266564%"
              y2="50.0234565%"
              id="linearGradient-2bm6v9icte-1"
            >
              <stop stop-color="#A76A00" offset="0%"></stop>
              <stop stop-color="#F50006" offset="61.2716995%"></stop>
              <stop stop-color="#DA8500" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g
              id="画板"
              transform="translate(-163.000000, -315.000000)"
              stroke="url(#linearGradient-2bm6v9icte-1)"
              stroke-width="0.72"
            >
              <g id="编组-9" transform="translate(163.535712, 316.000000)" style="mix-blend-mode: exclusion;">
                <path
                  d="M0,0 C22.68,0 22.68,5.76 45.36,5.76 C68.04,5.76 68.04,0 90.72,0 C113.4,0 113.4,5.76 136.08,5.76 C158.76,5.76 158.76,0 181.44,0 C204.12,0 204.12,5.76 226.8,5.76 C249.48,5.76 249.48,0 272.16,0"
                  id="路径-3"
                ></path>
                <path
                  d="M0,28.08 C22.68,28.08 22.68,33.84 45.36,33.84 C68.04,33.84 68.04,28.08 90.72,28.08 C113.4,28.08 113.4,33.84 136.08,33.84 C158.76,33.84 158.76,28.08 181.44,28.08 C204.12,28.08 204.12,33.84 226.8,33.84 C249.48,33.84 249.48,28.08 272.16,28.08"
                  id="路径-3备份-2"
                ></path>
                <path
                  d="M0,37.44 C22.68,37.44 22.68,43.2 45.36,43.2 C68.04,43.2 68.04,37.44 90.72,37.44 C113.4,37.44 113.4,43.2 136.08,43.2 C158.76,43.2 158.76,37.44 181.44,37.44 C204.12,37.44 204.12,43.2 226.8,43.2 C249.48,43.2 249.48,37.44 272.16,37.44"
                  id="路径-3备份-2"
                ></path>
                <path
                  d="M0,9.36 C22.68,9.36 22.68,15.12 45.36,15.12 C68.04,15.12 68.04,9.36 90.72,9.36 C113.4,9.36 113.4,15.12 136.08,15.12 C158.76,15.12 158.76,9.36 181.44,9.36 C204.12,9.36 204.12,15.12 226.8,15.12 C249.48,15.12 249.48,9.36 272.16,9.36"
                  id="路径-3备份-2"
                ></path>
                <path
                  d="M0,18.72 C22.68,18.72 22.68,24.48 45.36,24.48 C68.04,24.48 68.04,18.72 90.72,18.72 C113.4,18.72 113.4,24.48 136.08,24.48 C158.76,24.48 158.76,18.72 181.44,18.72 C204.12,18.72 204.12,24.48 226.8,24.48 C249.48,24.48 249.48,18.72 272.16,18.72"
                  id="路径-3备份-2"
                ></path>
                <path
                  d="M0,46.8 C22.68,46.8 22.68,52.56 45.36,52.56 C68.04,52.56 68.04,46.8 90.72,46.8 C113.4,46.8 113.4,52.56 136.08,52.56 C158.76,52.56 158.76,46.8 181.44,46.8 C204.12,46.8 204.12,52.56 226.8,52.56 C249.48,52.56 249.48,46.8 272.16,46.8"
                  id="路径-3备份-2"
                ></path>
              </g>
              <g id="编组-9" transform="translate(163.535712, 373.000000)" style="mix-blend-mode: exclusion;">
                <path
                  d="M0,0 C22.68,0 22.68,5.76 45.36,5.76 C68.04,5.76 68.04,0 90.72,0 C113.4,0 113.4,5.76 136.08,5.76 C158.76,5.76 158.76,0 181.44,0 C204.12,0 204.12,5.76 226.8,5.76 C249.48,5.76 249.48,0 272.16,0"
                  id="路径-3"
                ></path>
                <path
                  d="M0,28.08 C22.68,28.08 22.68,33.84 45.36,33.84 C68.04,33.84 68.04,28.08 90.72,28.08 C113.4,28.08 113.4,33.84 136.08,33.84 C158.76,33.84 158.76,28.08 181.44,28.08 C204.12,28.08 204.12,33.84 226.8,33.84 C249.48,33.84 249.48,28.08 272.16,28.08"
                  id="路径-3备份-2"
                ></path>
                <path
                  d="M0,37.44 C22.68,37.44 22.68,43.2 45.36,43.2 C68.04,43.2 68.04,37.44 90.72,37.44 C113.4,37.44 113.4,43.2 136.08,43.2 C158.76,43.2 158.76,37.44 181.44,37.44 C204.12,37.44 204.12,43.2 226.8,43.2 C249.48,43.2 249.48,37.44 272.16,37.44"
                  id="路径-3备份-2"
                ></path>
                <path
                  d="M0,9.36 C22.68,9.36 22.68,15.12 45.36,15.12 C68.04,15.12 68.04,9.36 90.72,9.36 C113.4,9.36 113.4,15.12 136.08,15.12 C158.76,15.12 158.76,9.36 181.44,9.36 C204.12,9.36 204.12,15.12 226.8,15.12 C249.48,15.12 249.48,9.36 272.16,9.36"
                  id="路径-3备份-2"
                ></path>
                <path
                  d="M0,18.72 C22.68,18.72 22.68,24.48 45.36,24.48 C68.04,24.48 68.04,18.72 90.72,18.72 C113.4,18.72 113.4,24.48 136.08,24.48 C158.76,24.48 158.76,18.72 181.44,18.72 C204.12,18.72 204.12,24.48 226.8,24.48 C249.48,24.48 249.48,18.72 272.16,18.72"
                  id="路径-3备份-2"
                ></path>
                <path
                  d="M0,46.8 C22.68,46.8 22.68,52.56 45.36,52.56 C68.04,52.56 68.04,46.8 90.72,46.8 C113.4,46.8 113.4,52.56 136.08,52.56 C158.76,52.56 158.76,46.8 181.44,46.8 C204.12,46.8 204.12,52.56 226.8,52.56 C249.48,52.56 249.48,46.8 272.16,46.8"
                  id="路径-3备份-2"
                ></path>
              </g>
              <g id="编组-9" transform="translate(435.535712, 316.000000)" style="mix-blend-mode: exclusion;">
                <path
                  d="M0,0 C22.68,0 22.68,5.76 45.36,5.76 C68.04,5.76 68.04,0 90.72,0 C113.4,0 113.4,5.76 136.08,5.76 C158.76,5.76 158.76,0 181.44,0 C204.12,0 204.12,5.76 226.8,5.76 C249.48,5.76 249.48,0 272.16,0"
                  id="路径-3"
                ></path>
                <path
                  d="M0,28.08 C22.68,28.08 22.68,33.84 45.36,33.84 C68.04,33.84 68.04,28.08 90.72,28.08 C113.4,28.08 113.4,33.84 136.08,33.84 C158.76,33.84 158.76,28.08 181.44,28.08 C204.12,28.08 204.12,33.84 226.8,33.84 C249.48,33.84 249.48,28.08 272.16,28.08"
                  id="路径-3备份-2"
                ></path>
                <path
                  d="M0,37.44 C22.68,37.44 22.68,43.2 45.36,43.2 C68.04,43.2 68.04,37.44 90.72,37.44 C113.4,37.44 113.4,43.2 136.08,43.2 C158.76,43.2 158.76,37.44 181.44,37.44 C204.12,37.44 204.12,43.2 226.8,43.2 C249.48,43.2 249.48,37.44 272.16,37.44"
                  id="路径-3备份-2"
                ></path>
                <path
                  d="M0,9.36 C22.68,9.36 22.68,15.12 45.36,15.12 C68.04,15.12 68.04,9.36 90.72,9.36 C113.4,9.36 113.4,15.12 136.08,15.12 C158.76,15.12 158.76,9.36 181.44,9.36 C204.12,9.36 204.12,15.12 226.8,15.12 C249.48,15.12 249.48,9.36 272.16,9.36"
                  id="路径-3备份-2"
                ></path>
                <path
                  d="M0,18.72 C22.68,18.72 22.68,24.48 45.36,24.48 C68.04,24.48 68.04,18.72 90.72,18.72 C113.4,18.72 113.4,24.48 136.08,24.48 C158.76,24.48 158.76,18.72 181.44,18.72 C204.12,18.72 204.12,24.48 226.8,24.48 C249.48,24.48 249.48,18.72 272.16,18.72"
                  id="路径-3备份-2"
                ></path>
                <path
                  d="M0,46.8 C22.68,46.8 22.68,52.56 45.36,52.56 C68.04,52.56 68.04,46.8 90.72,46.8 C113.4,46.8 113.4,52.56 136.08,52.56 C158.76,52.56 158.76,46.8 181.44,46.8 C204.12,46.8 204.12,52.56 226.8,52.56 C249.48,52.56 249.48,46.8 272.16,46.8"
                  id="路径-3备份-2"
                ></path>
              </g>
              <g id="编组-9" transform="translate(435.535712, 373.000000)" style="mix-blend-mode: exclusion;">
                <path
                  d="M0,0 C22.68,0 22.68,5.76 45.36,5.76 C68.04,5.76 68.04,0 90.72,0 C113.4,0 113.4,5.76 136.08,5.76 C158.76,5.76 158.76,0 181.44,0 C204.12,0 204.12,5.76 226.8,5.76 C249.48,5.76 249.48,0 272.16,0"
                  id="路径-3"
                ></path>
                <path
                  d="M0,28.08 C22.68,28.08 22.68,33.84 45.36,33.84 C68.04,33.84 68.04,28.08 90.72,28.08 C113.4,28.08 113.4,33.84 136.08,33.84 C158.76,33.84 158.76,28.08 181.44,28.08 C204.12,28.08 204.12,33.84 226.8,33.84 C249.48,33.84 249.48,28.08 272.16,28.08"
                  id="路径-3备份-2"
                ></path>
                <path
                  d="M0,37.44 C22.68,37.44 22.68,43.2 45.36,43.2 C68.04,43.2 68.04,37.44 90.72,37.44 C113.4,37.44 113.4,43.2 136.08,43.2 C158.76,43.2 158.76,37.44 181.44,37.44 C204.12,37.44 204.12,43.2 226.8,43.2 C249.48,43.2 249.48,37.44 272.16,37.44"
                  id="路径-3备份-2"
                ></path>
                <path
                  d="M0,9.36 C22.68,9.36 22.68,15.12 45.36,15.12 C68.04,15.12 68.04,9.36 90.72,9.36 C113.4,9.36 113.4,15.12 136.08,15.12 C158.76,15.12 158.76,9.36 181.44,9.36 C204.12,9.36 204.12,15.12 226.8,15.12 C249.48,15.12 249.48,9.36 272.16,9.36"
                  id="路径-3备份-2"
                ></path>
                <path
                  d="M0,18.72 C22.68,18.72 22.68,24.48 45.36,24.48 C68.04,24.48 68.04,18.72 90.72,18.72 C113.4,18.72 113.4,24.48 136.08,24.48 C158.76,24.48 158.76,18.72 181.44,18.72 C204.12,18.72 204.12,24.48 226.8,24.48 C249.48,24.48 249.48,18.72 272.16,18.72"
                  id="路径-3备份-2"
                ></path>
                <path
                  d="M0,46.8 C22.68,46.8 22.68,52.56 45.36,52.56 C68.04,52.56 68.04,46.8 90.72,46.8 C113.4,46.8 113.4,52.56 136.08,52.56 C158.76,52.56 158.76,46.8 181.44,46.8 C204.12,46.8 204.12,52.56 226.8,52.56 C249.48,52.56 249.48,46.8 272.16,46.8"
                  id="路径-3备份-2"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  `,
  host: {
    class: 'ant-hashCode',
    '[class.ant-hashCode-default]': `nzType === 'default'`,
    '[class.ant-hashCode-primary]': `nzType === 'primary'`,
    '[class.ant-hashCode-double]': `nzMode === 'double'`,
    '[class.ant-hashCode-single]': `nzMode === 'single'`,
    '[class.ant-hashCode-strip]': `nzMode === 'strip'`,
    '[class.ant-hashCode-rect]': `nzMode === 'rect'`
  }
})
export class NzHashCodeComponent implements OnChanges {
  @Input() nzValue: string = '';
  @Input() nzTitle: string = 'HashCode';
  @Input() nzLogo: TemplateRef<void> | string = '';
  @Input() nzMode: NzModeType = 'double';
  @Input() nzType: 'default' | 'primary' = 'default';
  @Output() readonly nzOnCopy = new EventEmitter<string>();

  hashDataList: string[] = [];

  copyHandle(): void {
    this.nzOnCopy.emit(this.nzValue);
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { nzValue } = changes;

    if (nzValue) {
      this.setData(this.nzValue);
    }
  }

  setData(value: string): void {
    if (this.nzMode !== 'single') {
      this.hashDataList = value.match(/.{1,4}/g) as string[];
    } else {
      this.hashDataList = value.match(/.{1,8}/g) as string[];
    }
    this.cdr.markForCheck();
  }

  protected readonly isTemplateRef = isTemplateRef;
  protected readonly isNonEmptyString = isNonEmptyString;
}
