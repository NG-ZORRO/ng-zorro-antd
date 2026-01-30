/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';

import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzModeType } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzIconModule, NzStringTemplateOutletDirective],
  selector: 'nz-hash-code',
  exportAs: 'nzHashCode',
  template: `
    @if (nzMode !== 'single' && nzMode !== 'rect') {
      <div class="ant-hash-code-header">
        <div class="ant-hash-code-header-title">{{ nzTitle }}</div>
        <div class="ant-hash-code-header-copy" (click)="copyHandle()">
          <nz-icon nzType="copy" nzTheme="outline" />
        </div>
        <div class="ant-hash-code-header-logo">
          <ng-template [nzStringTemplateOutlet]="nzLogo">{{ nzLogo }}</ng-template>
        </div>
      </div>
    }

    @if (nzMode === 'single' || nzMode === 'rect') {
      <div class="ant-hash-code-header-copy" (click)="copyHandle()">
        <nz-icon nzType="copy" nzTheme="outline" />
      </div>
    }

    <div
      class="ant-hash-code-contant"
      [class.ant-hash-code-value-default]="nzType === 'default'"
      [class.ant-hash-code-value-primary]="nzType === 'primary'"
    >
      <div
        class="ant-hash-code-code-value"
        [style]="{ height: nzMode === 'rect' ? '70px' : nzMode === 'single' ? '18px' : '35px' }"
      >
        @if (nzMode === 'double') {
          @if (hashDataList.length > 8) {
            @for (v of hashDataList.slice(0, 6); track v) {
              <div class="ant-hash-code-code-value-block">{{ v }}</div>
            }
            <div class="ant-hash-code-code-value-block">····</div>
            <div class="ant-hash-code-code-value-block">{{ hashDataList[hashDataList.length - 1] }}</div>
          } @else {
            @for (v of hashDataList; track v) {
              <div class="ant-hash-code-code-value-block">{{ v }}</div>
            }
          }
        }

        @if (nzMode === 'single') {
          <div class="ant-hash-code-code-value-block">{{ hashDataList[0] }}</div>
          <div class="ant-hash-code-code-value-block">····</div>
          <div class="ant-hash-code-code-value-block">{{ hashDataList[hashDataList.length - 1] }}</div>
        }

        @if (nzMode === 'rect' || nzMode === 'strip') {
          @if (hashDataList.length > 16) {
            @for (v of hashDataList.slice(0, 14); track v) {
              <div class="ant-hash-code-code-value-block">{{ v }}</div>
            }
            <div class="ant-hash-code-code-value-block">····</div>
            <div class="ant-hash-code-code-value-block">{{ hashDataList[hashDataList.length - 1] }}</div>
          } @else {
            @for (v of hashDataList; track v) {
              <div class="ant-hash-code-code-value-block">{{ v }}</div>
            }
          }
        }
      </div>
      <div
        class="ant-hash-code-texaure"
        [class.ant-hash-code-texaure-double]="nzMode === 'double'"
        [class.ant-hash-code-texaure-single]="nzMode === 'single'"
        [class.ant-hash-code-texaure-strip]="nzMode === 'strip'"
        [class.ant-hash-code-texaure-rect]="nzMode === 'rect'"
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
              <stop stop-color="#A76A00" offset="0%" />
              <stop stop-color="#F50006" offset="61.2716995%" />
              <stop stop-color="#DA8500" offset="100%" />
            </linearGradient>
          </defs>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g
              transform="translate(-163.000000, -315.000000)"
              stroke="url(#linearGradient-2bm6v9icte-1)"
              stroke-width="0.72"
            >
              <g transform="translate(163.535712, 316.000000)" style="mix-blend-mode: exclusion;">
                <path
                  d="M0,0 C22.68,0 22.68,5.76 45.36,5.76 C68.04,5.76 68.04,0 90.72,0 C113.4,0 113.4,5.76 136.08,5.76 C158.76,5.76 158.76,0 181.44,0 C204.12,0 204.12,5.76 226.8,5.76 C249.48,5.76 249.48,0 272.16,0"
                />
                <path
                  d="M0,28.08 C22.68,28.08 22.68,33.84 45.36,33.84 C68.04,33.84 68.04,28.08 90.72,28.08 C113.4,28.08 113.4,33.84 136.08,33.84 C158.76,33.84 158.76,28.08 181.44,28.08 C204.12,28.08 204.12,33.84 226.8,33.84 C249.48,33.84 249.48,28.08 272.16,28.08"
                />
                <path
                  d="M0,37.44 C22.68,37.44 22.68,43.2 45.36,43.2 C68.04,43.2 68.04,37.44 90.72,37.44 C113.4,37.44 113.4,43.2 136.08,43.2 C158.76,43.2 158.76,37.44 181.44,37.44 C204.12,37.44 204.12,43.2 226.8,43.2 C249.48,43.2 249.48,37.44 272.16,37.44"
                />
                <path
                  d="M0,9.36 C22.68,9.36 22.68,15.12 45.36,15.12 C68.04,15.12 68.04,9.36 90.72,9.36 C113.4,9.36 113.4,15.12 136.08,15.12 C158.76,15.12 158.76,9.36 181.44,9.36 C204.12,9.36 204.12,15.12 226.8,15.12 C249.48,15.12 249.48,9.36 272.16,9.36"
                />
                <path
                  d="M0,18.72 C22.68,18.72 22.68,24.48 45.36,24.48 C68.04,24.48 68.04,18.72 90.72,18.72 C113.4,18.72 113.4,24.48 136.08,24.48 C158.76,24.48 158.76,18.72 181.44,18.72 C204.12,18.72 204.12,24.48 226.8,24.48 C249.48,24.48 249.48,18.72 272.16,18.72"
                />
                <path
                  d="M0,46.8 C22.68,46.8 22.68,52.56 45.36,52.56 C68.04,52.56 68.04,46.8 90.72,46.8 C113.4,46.8 113.4,52.56 136.08,52.56 C158.76,52.56 158.76,46.8 181.44,46.8 C204.12,46.8 204.12,52.56 226.8,52.56 C249.48,52.56 249.48,46.8 272.16,46.8"
                />
              </g>
              <g transform="translate(163.535712, 373.000000)" style="mix-blend-mode: exclusion;">
                <path
                  d="M0,0 C22.68,0 22.68,5.76 45.36,5.76 C68.04,5.76 68.04,0 90.72,0 C113.4,0 113.4,5.76 136.08,5.76 C158.76,5.76 158.76,0 181.44,0 C204.12,0 204.12,5.76 226.8,5.76 C249.48,5.76 249.48,0 272.16,0"
                />
                <path
                  d="M0,28.08 C22.68,28.08 22.68,33.84 45.36,33.84 C68.04,33.84 68.04,28.08 90.72,28.08 C113.4,28.08 113.4,33.84 136.08,33.84 C158.76,33.84 158.76,28.08 181.44,28.08 C204.12,28.08 204.12,33.84 226.8,33.84 C249.48,33.84 249.48,28.08 272.16,28.08"
                />
                <path
                  d="M0,37.44 C22.68,37.44 22.68,43.2 45.36,43.2 C68.04,43.2 68.04,37.44 90.72,37.44 C113.4,37.44 113.4,43.2 136.08,43.2 C158.76,43.2 158.76,37.44 181.44,37.44 C204.12,37.44 204.12,43.2 226.8,43.2 C249.48,43.2 249.48,37.44 272.16,37.44"
                />
                <path
                  d="M0,9.36 C22.68,9.36 22.68,15.12 45.36,15.12 C68.04,15.12 68.04,9.36 90.72,9.36 C113.4,9.36 113.4,15.12 136.08,15.12 C158.76,15.12 158.76,9.36 181.44,9.36 C204.12,9.36 204.12,15.12 226.8,15.12 C249.48,15.12 249.48,9.36 272.16,9.36"
                />
                <path
                  d="M0,18.72 C22.68,18.72 22.68,24.48 45.36,24.48 C68.04,24.48 68.04,18.72 90.72,18.72 C113.4,18.72 113.4,24.48 136.08,24.48 C158.76,24.48 158.76,18.72 181.44,18.72 C204.12,18.72 204.12,24.48 226.8,24.48 C249.48,24.48 249.48,18.72 272.16,18.72"
                />
                <path
                  d="M0,46.8 C22.68,46.8 22.68,52.56 45.36,52.56 C68.04,52.56 68.04,46.8 90.72,46.8 C113.4,46.8 113.4,52.56 136.08,52.56 C158.76,52.56 158.76,46.8 181.44,46.8 C204.12,46.8 204.12,52.56 226.8,52.56 C249.48,52.56 249.48,46.8 272.16,46.8"
                />
              </g>
              <g transform="translate(435.535712, 316.000000)" style="mix-blend-mode: exclusion;">
                <path
                  d="M0,0 C22.68,0 22.68,5.76 45.36,5.76 C68.04,5.76 68.04,0 90.72,0 C113.4,0 113.4,5.76 136.08,5.76 C158.76,5.76 158.76,0 181.44,0 C204.12,0 204.12,5.76 226.8,5.76 C249.48,5.76 249.48,0 272.16,0"
                />
                <path
                  d="M0,28.08 C22.68,28.08 22.68,33.84 45.36,33.84 C68.04,33.84 68.04,28.08 90.72,28.08 C113.4,28.08 113.4,33.84 136.08,33.84 C158.76,33.84 158.76,28.08 181.44,28.08 C204.12,28.08 204.12,33.84 226.8,33.84 C249.48,33.84 249.48,28.08 272.16,28.08"
                />
                <path
                  d="M0,37.44 C22.68,37.44 22.68,43.2 45.36,43.2 C68.04,43.2 68.04,37.44 90.72,37.44 C113.4,37.44 113.4,43.2 136.08,43.2 C158.76,43.2 158.76,37.44 181.44,37.44 C204.12,37.44 204.12,43.2 226.8,43.2 C249.48,43.2 249.48,37.44 272.16,37.44"
                />
                <path
                  d="M0,9.36 C22.68,9.36 22.68,15.12 45.36,15.12 C68.04,15.12 68.04,9.36 90.72,9.36 C113.4,9.36 113.4,15.12 136.08,15.12 C158.76,15.12 158.76,9.36 181.44,9.36 C204.12,9.36 204.12,15.12 226.8,15.12 C249.48,15.12 249.48,9.36 272.16,9.36"
                />
                <path
                  d="M0,18.72 C22.68,18.72 22.68,24.48 45.36,24.48 C68.04,24.48 68.04,18.72 90.72,18.72 C113.4,18.72 113.4,24.48 136.08,24.48 C158.76,24.48 158.76,18.72 181.44,18.72 C204.12,18.72 204.12,24.48 226.8,24.48 C249.48,24.48 249.48,18.72 272.16,18.72"
                />
                <path
                  d="M0,46.8 C22.68,46.8 22.68,52.56 45.36,52.56 C68.04,52.56 68.04,46.8 90.72,46.8 C113.4,46.8 113.4,52.56 136.08,52.56 C158.76,52.56 158.76,46.8 181.44,46.8 C204.12,46.8 204.12,52.56 226.8,52.56 C249.48,52.56 249.48,46.8 272.16,46.8"
                />
              </g>
              <g transform="translate(435.535712, 373.000000)" style="mix-blend-mode: exclusion;">
                <path
                  d="M0,0 C22.68,0 22.68,5.76 45.36,5.76 C68.04,5.76 68.04,0 90.72,0 C113.4,0 113.4,5.76 136.08,5.76 C158.76,5.76 158.76,0 181.44,0 C204.12,0 204.12,5.76 226.8,5.76 C249.48,5.76 249.48,0 272.16,0"
                />
                <path
                  d="M0,28.08 C22.68,28.08 22.68,33.84 45.36,33.84 C68.04,33.84 68.04,28.08 90.72,28.08 C113.4,28.08 113.4,33.84 136.08,33.84 C158.76,33.84 158.76,28.08 181.44,28.08 C204.12,28.08 204.12,33.84 226.8,33.84 C249.48,33.84 249.48,28.08 272.16,28.08"
                />
                <path
                  d="M0,37.44 C22.68,37.44 22.68,43.2 45.36,43.2 C68.04,43.2 68.04,37.44 90.72,37.44 C113.4,37.44 113.4,43.2 136.08,43.2 C158.76,43.2 158.76,37.44 181.44,37.44 C204.12,37.44 204.12,43.2 226.8,43.2 C249.48,43.2 249.48,37.44 272.16,37.44"
                />
                <path
                  d="M0,9.36 C22.68,9.36 22.68,15.12 45.36,15.12 C68.04,15.12 68.04,9.36 90.72,9.36 C113.4,9.36 113.4,15.12 136.08,15.12 C158.76,15.12 158.76,9.36 181.44,9.36 C204.12,9.36 204.12,15.12 226.8,15.12 C249.48,15.12 249.48,9.36 272.16,9.36"
                />
                <path
                  d="M0,18.72 C22.68,18.72 22.68,24.48 45.36,24.48 C68.04,24.48 68.04,18.72 90.72,18.72 C113.4,18.72 113.4,24.48 136.08,24.48 C158.76,24.48 158.76,18.72 181.44,18.72 C204.12,18.72 204.12,24.48 226.8,24.48 C249.48,24.48 249.48,18.72 272.16,18.72"
                />
                <path
                  d="M0,46.8 C22.68,46.8 22.68,52.56 45.36,52.56 C68.04,52.56 68.04,46.8 90.72,46.8 C113.4,46.8 113.4,52.56 136.08,52.56 C158.76,52.56 158.76,46.8 181.44,46.8 C204.12,46.8 204.12,52.56 226.8,52.56 C249.48,52.56 249.48,46.8 272.16,46.8"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  `,
  host: {
    class: 'ant-hash-code',
    '[class.ant-hash-code-default]': `nzType === 'default'`,
    '[class.ant-hash-code-primary]': `nzType === 'primary'`,
    '[class.ant-hash-code-double]': `nzMode === 'double'`,
    '[class.ant-hash-code-single]': `nzMode === 'single'`,
    '[class.ant-hash-code-strip]': `nzMode === 'strip'`,
    '[class.ant-hash-code-rect]': `nzMode === 'rect'`
  }
})
export class NzHashCodeComponent implements OnChanges {
  private cdr = inject(ChangeDetectorRef);

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
}
