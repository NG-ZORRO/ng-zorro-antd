/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { nzInjectDirectionality } from 'ng-zorro-antd/cdk/bidi';

import { NzFloatButtonContentComponent } from './float-button-content.component';

@Component({
  selector: 'nz-float-button',
  exportAs: 'nzFloatButton',
  imports: [NzButtonModule, NzFloatButtonContentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!!nzHref) {
      <a
        [target]="nzTarget"
        [href]="nzHref"
        nz-button
        [nzType]="nzType"
        [class.ant-float-btn-default]="nzType === 'default'"
        class="ant-float-btn-inner"
        (click)="nzOnClick.emit(true)"
      >
        <nz-float-button-content
          [nzIcon]="nzIcon"
          [nzDescription]="nzDescription"
          [nzShape]="nzShape"
        ></nz-float-button-content>
      </a>
    } @else {
      <button
        nz-button
        [nzType]="nzType"
        [class.ant-float-btn-default]="nzType === 'default'"
        class="ant-float-btn-inner"
        (click)="nzOnClick.emit(true)"
      >
        <nz-float-button-content
          [nzIcon]="nzIcon"
          [nzDescription]="nzDescription"
          [nzShape]="nzShape"
        ></nz-float-button-content>
      </button>
    }
  `,
  host: {
    class: 'ant-float-btn',
    '[class.ant-float-btn-circle]': `nzShape === 'circle'`,
    '[class.ant-float-btn-square]': `nzShape === 'square'`,
    '[class.ant-float-btn-rtl]': `dir.isRtl()`
  }
})
export class NzFloatButtonComponent {
  @Input() nzHref: string | null = null;
  @Input() nzTarget: string | null = null;
  @Input() nzType: 'default' | 'primary' = 'default';
  @Input() nzShape: 'circle' | 'square' = 'circle';
  @Input() nzIcon: TemplateRef<void> | null = null;
  @Input() nzDescription: TemplateRef<void> | string | null = null;
  @Output() readonly nzOnClick = new EventEmitter<boolean>();

  readonly dir = nzInjectDirectionality();
}
