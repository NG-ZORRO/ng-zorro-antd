/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzResultNotFoundComponent } from './partial/not-found';
import { NzResultServerErrorComponent } from './partial/server-error.component';
import { NzResultUnauthorizedComponent } from './partial/unauthorized';

export type NzResultIconType = 'success' | 'error' | 'info' | 'warning';
export type NzExceptionStatusType = '404' | '500' | '403';
export type NzResultStatusType = NzExceptionStatusType | NzResultIconType;

const IconMap: Record<NzResultIconType, string> = {
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
      @if (!isException()) {
        @if (icon()) {
          <ng-container *nzStringTemplateOutlet="icon(); let icon">
            <nz-icon [nzType]="icon" nzTheme="fill" />
          </ng-container>
        } @else {
          <ng-content select="[nz-result-icon]"></ng-content>
        }
      } @else {
        @switch (nzStatus()) {
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
    @if (nzTitle()) {
      <div class="ant-result-title" *nzStringTemplateOutlet="nzTitle()">
        {{ nzTitle() }}
      </div>
    } @else {
      <ng-content select="div[nz-result-title]"></ng-content>
    }

    @if (nzSubTitle()) {
      <div class="ant-result-subtitle" *nzStringTemplateOutlet="nzSubTitle()">
        {{ nzSubTitle() }}
      </div>
    } @else {
      <ng-content select="div[nz-result-subtitle]"></ng-content>
    }
    <ng-content select="nz-result-content, [nz-result-content]"></ng-content>
    @if (nzExtra()) {
      <div class="ant-result-extra" *nzStringTemplateOutlet="nzExtra()">
        {{ nzExtra() }}
      </div>
    } @else {
      <ng-content select="div[nz-result-extra]"></ng-content>
    }
  `,
  host: {
    '[class]': 'class()'
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
export class NzResultComponent {
  private readonly dir = inject(Directionality).valueSignal;

  readonly nzIcon = input<string | TemplateRef<void>>();
  readonly nzTitle = input<string | TemplateRef<void>>();
  readonly nzSubTitle = input<string | TemplateRef<void>>();
  readonly nzExtra = input<string | TemplateRef<void>>();
  readonly nzStatus = input<NzResultStatusType>('info');

  protected readonly class = computed(() => {
    return {
      'ant-result': true,
      [`ant-result-${this.nzStatus()}`]: true,
      'ant-result-rtl': this.dir() === 'rtl'
    };
  });

  readonly isException = computed(() => ExceptionStatus.indexOf(this.nzStatus()) !== -1);
  readonly icon = computed(() => {
    const icon = this.nzIcon();
    return typeof icon === 'string' ? IconMap[icon as NzResultIconType] || icon : icon;
  });
}
