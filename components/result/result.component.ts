/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, TemplateRef, ViewEncapsulation } from '@angular/core';

export type NzResultIconType = 'success' | 'error' | 'info' | 'warning';
export type NzExceptionStatusType = '404' | '500' | '403';
export type NzResultStatusType = NzExceptionStatusType | NzResultIconType;

const IconMap = {
  success: 'check-circle',
  error: 'close-circle',
  info: 'exclamation-circle',
  warning: 'warning'
};
const ExceptionStatus = ['404', '500', '403'];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-result',
  exportAs: 'nzResult',
  template: `
    <div class="ant-result-icon">
      <ng-container *ngIf="!isException; else exceptionTpl">
        <ng-container *ngIf="icon">
          <ng-container *nzStringTemplateOutlet="icon; let icon">
            <i nz-icon [nzType]="icon" nzTheme="fill"></i>
          </ng-container>
        </ng-container>
        <ng-content *ngIf="!icon" select="[nz-result-icon]"></ng-content>
      </ng-container>
    </div>
    <ng-container *ngIf="nzTitle">
      <div class="ant-result-title" *nzStringTemplateOutlet="nzTitle">
        {{ nzTitle }}
      </div>
    </ng-container>
    <ng-content *ngIf="!nzTitle" select="div[nz-result-title]"></ng-content>
    <ng-container *ngIf="nzSubTitle">
      <div class="ant-result-subtitle" *nzStringTemplateOutlet="nzSubTitle">
        {{ nzSubTitle }}
      </div>
    </ng-container>
    <ng-content *ngIf="!nzSubTitle" select="div[nz-result-subtitle]"></ng-content>
    <ng-content select="nz-result-content, [nz-result-content]"></ng-content>
    <div class="ant-result-extra" *ngIf="nzExtra">
      <ng-container *nzStringTemplateOutlet="nzExtra">
        {{ nzExtra }}
      </ng-container>
    </div>
    <ng-content *ngIf="!nzExtra" select="div[nz-result-extra]"></ng-content>

    <ng-template #exceptionTpl>
      <ng-container [ngSwitch]="nzStatus">
        <nz-result-not-found *ngSwitchCase="'404'"></nz-result-not-found>
        <nz-result-server-error *ngSwitchCase="'500'"></nz-result-server-error>
        <nz-result-unauthorized *ngSwitchCase="'403'"></nz-result-unauthorized>
      </ng-container>
    </ng-template>
  `,
  host: {
    '[class.ant-result-success]': `nzStatus === 'success'`,
    '[class.ant-result-error]': `nzStatus === 'error'`,
    '[class.ant-result-info]': `nzStatus === 'info'`,
    '[class.ant-result-warning]': `nzStatus === 'warning'`
  }
})
export class NzResultComponent implements OnChanges {
  @Input() nzIcon?: string | TemplateRef<void>;
  @Input() nzTitle?: string | TemplateRef<void>;
  @Input() nzStatus: NzResultStatusType = 'info';
  @Input() nzSubTitle?: string | TemplateRef<void>;
  @Input() nzExtra?: string | TemplateRef<void>;

  icon?: string | TemplateRef<void>;
  isException = false;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('ant-result');
  }

  ngOnChanges(): void {
    this.setStatusIcon();
  }

  private setStatusIcon(): void {
    const icon = this.nzIcon;

    this.isException = ExceptionStatus.indexOf(this.nzStatus) !== -1;
    this.icon = icon
      ? typeof icon === 'string'
        ? IconMap[icon as NzResultIconType] || icon
        : icon
      : this.isException
      ? undefined
      : IconMap[this.nzStatus as NzResultIconType];
  }
}
