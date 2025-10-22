/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzResultNotFoundComponent } from './partial/not-found';
import { NzResultServerErrorComponent } from './partial/server-error.component';
import { NzResultUnauthorizedComponent } from './partial/unauthorized';

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
  selector: 'nz-result',
  exportAs: 'nzResult',
  template: `
    <div class="ant-result-icon">
      @if (!isException) {
        @if (icon) {
          <ng-container *nzStringTemplateOutlet="icon; let icon">
            <nz-icon [nzType]="icon" nzTheme="fill" />
          </ng-container>
        } @else {
          <ng-content select="[nz-result-icon]"></ng-content>
        }
      } @else {
        @switch (nzStatus) {
          @case ('404') {
            <nz-result-not-found />
          }
          @case ('500') {
            <nz-result-server-error />
          }
          @case ('403') {
            <nz-result-unauthorized />
          }
        }
      }
    </div>
    @if (nzTitle) {
      <div class="ant-result-title" *nzStringTemplateOutlet="nzTitle">
        {{ nzTitle }}
      </div>
    } @else {
      <ng-content select="div[nz-result-title]"></ng-content>
    }

    @if (nzSubTitle) {
      <div class="ant-result-subtitle" *nzStringTemplateOutlet="nzSubTitle">
        {{ nzSubTitle }}
      </div>
    } @else {
      <ng-content select="div[nz-result-subtitle]"></ng-content>
    }
    <ng-content select="nz-result-content, [nz-result-content]"></ng-content>
    @if (nzExtra) {
      <div class="ant-result-extra" *nzStringTemplateOutlet="nzExtra">
        {{ nzExtra }}
      </div>
    } @else {
      <ng-content select="div[nz-result-extra]"></ng-content>
    }
  `,
  host: {
    class: 'ant-result',
    '[class.ant-result-success]': `nzStatus === 'success'`,
    '[class.ant-result-error]': `nzStatus === 'error'`,
    '[class.ant-result-info]': `nzStatus === 'info'`,
    '[class.ant-result-warning]': `nzStatus === 'warning'`,
    '[class.ant-result-rtl]': `dir === 'rtl'`
  },
  imports: [
    NzOutletModule,
    NzIconModule,
    NzResultNotFoundComponent,
    NzResultServerErrorComponent,
    NzResultUnauthorizedComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzResultComponent implements OnChanges, OnInit {
  private cdr = inject(ChangeDetectorRef);
  private directionality = inject(Directionality);
  private destroyRef = inject(DestroyRef);

  @Input() nzIcon?: string | TemplateRef<void>;
  @Input() nzTitle?: string | TemplateRef<void>;
  @Input() nzStatus: NzResultStatusType = 'info';
  @Input() nzSubTitle?: string | TemplateRef<void>;
  @Input() nzExtra?: string | TemplateRef<void>;

  icon?: string | TemplateRef<void>;
  isException = false;
  dir: Direction = 'ltr';

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
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
