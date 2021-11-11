/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { MessageConfig, NzConfigService } from 'ng-zorro-antd/core/config';
import { toCssPixel } from 'ng-zorro-antd/core/util';

import { NzMNContainerComponent } from './base';

const NZ_CONFIG_COMPONENT_NAME = 'message';

const NZ_MESSAGE_DEFAULT_CONFIG: Required<MessageConfig> = {
  nzAnimate: true,
  nzDuration: 3000,
  nzMaxStack: 7,
  nzPauseOnHover: true,
  nzTop: 24,
  nzDirection: 'ltr'
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-message-container',
  exportAs: 'nzMessageContainer',
  preserveWhitespaces: false,
  template: `
    <div class="ant-message" [class.ant-message-rtl]="dir === 'rtl'" [style.top]="top">
      <nz-message
        *ngFor="let instance of instances"
        [instance]="instance"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-message>
    </div>
  `
})
export class NzMessageContainerComponent extends NzMNContainerComponent {
  dir: Direction = 'ltr';
  top?: string | null;

  constructor(cdr: ChangeDetectorRef, nzConfigService: NzConfigService) {
    super(cdr, nzConfigService);
    const config = this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME);
    this.dir = config?.nzDirection || 'ltr';
  }

  protected subscribeConfigChange(): void {
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateConfig();
        const config = this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME);
        if (config) {
          const { nzDirection } = config;
          this.dir = nzDirection || this.dir;
        }
      });
  }

  protected updateConfig(): void {
    this.config = {
      ...NZ_MESSAGE_DEFAULT_CONFIG,
      ...this.config,
      ...this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME)
    };

    this.top = toCssPixel(this.config.nzTop);
    this.cdr.markForCheck();
  }
}
