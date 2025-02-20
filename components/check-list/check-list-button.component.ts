/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, input, TemplateRef, ViewEncapsulation } from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzCheckListI18nInterface } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-check-list-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NzIconModule, NzOutletModule],
  template: `
    @if (!!triggerRender()) {
      <ng-container *nzStringTemplateOutlet="triggerRender()">{{ triggerRender() }}</ng-container>
    } @else {
      <nz-icon nzType="check-circle" nzTheme="outline" class="ant-check-list-icon" />
      <div class="ant-check-list-description">{{ locale().checkList }}</div>
    }
  `,
  host: {
    class: 'ant-btn ant-btn-primary ant-check-list-button'
  }
})
export class NzCheckListButtonComponent {
  triggerRender = input<string | TemplateRef<void> | null>();
  locale = input.required<NzCheckListI18nInterface>();
}
